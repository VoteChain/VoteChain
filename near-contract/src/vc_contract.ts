// votechain/src/contract.ts
import {
  NearBindgen,
  context, //
  PersistentVector,
  PersistentMap,
  PersistentSet,
  u128,
  //   u64,
  //   u32,
  ContractPromiseBatch,
  logging,
} from "near-sdk-as";

// Types for our entities
type AccountId = string;
type PollId = string;
type CandidateId = string;
type PartyId = string;
type VoteId = string;

/**
 * Represents a candidate in a poll
 */
@NearBindgen
class Candidate {
  constructor(
    public id: CandidateId,
    public name: string,
    public partyId: PartyId | null = null
  ) {}
}

/**
 * Represents a political party
 */
@NearBindgen
class Party {
  constructor(public id: PartyId, public name: string) {}
}

/**
 * Represents a voting poll
 *
 * Constraints:
 * - Once voting starts, only `endOn` can be extended (not shortened)
 * - Candidates and parties can only be modified before voting starts
 */
@NearBindgen
class Poll {
  constructor(
    public id: PollId,
    public name: string,
    public description: string,
    public creator: AccountId,
    public startOn: u64, // Timestamp in milliseconds
    public endOn: u64, // Timestamp in milliseconds
    public createdOn: u64 = context.blockTimestamp,
    public limit: u32 = 0, // 0 = unlimited votes
    public passcodeHash: string | null = null, // SHA-256 hash of passcode
    public candidates: Candidate[] = [],
    public parties: Party[] = [],
    public type: string = "candidate", // "candidate" or "candidate_party"
    public eligibility: string = "all", // "all", "token_holders", "verified", "custom"
    public eligibleVoters: AccountId[] = [] // Only for "custom" eligibility
  ) {}

  /**
   * Check if poll is currently active
   */
  isActive(): bool {
    const now = context.blockTimestamp;
    return now >= this.startOn && now <= this.endOn;
  }

  /**
   * Check if poll is upcoming
   */
  isUpcoming(): bool {
    return context.blockTimestamp < this.startOn;
  }

  /**
   * Check if poll has ended
   */
  hasEnded(): bool {
    return context.blockTimestamp > this.endOn;
  }

  /**
   * Get poll status as string
   */
  getStatus(): string {
    if (this.hasEnded()) return "ended";
    if (this.isActive()) return "active";
    return "upcoming";
  }
}

/**
 * Represents a vote cast in a poll
 */
@NearBindgen
class Vote {
  constructor(
    public id: VoteId,
    public pollId: PollId,
    public voter: AccountId,
    public candidateId: CandidateId,
    public partyId: PartyId | null = null
  ) {}
}

/**
 * Represents a user profile
 *
 * Note: Passwords are not stored on-chain for security reasons.
 * NEAR uses public-key cryptography for authentication.
 */
@NearBindgen
class UserProfile {
  constructor(
    public walletId: AccountId,
    public name: string,
    public about: string = ""
  ) {}
}

// ====================
// Storage Definitions
// ====================

// All polls
const polls = new PersistentMap<PollId, Poll>("p");

// All votes stored by poll ID
const votesByPoll = new PersistentMap<PollId, PersistentVector<Vote>>("vp");

// All votes stored by voter
const votesByVoter = new PersistentMap<AccountId, PersistentSet<VoteId>>("vv");

// User profiles
const userProfiles = new PersistentMap<AccountId, UserProfile>("u");

// Poll IDs for easy listing
const pollIds = new PersistentVector<PollId>("pi");

// ====================
// Contract Methods
// ====================

/**
 * Create a new poll
 *
 * @param name - Name of the poll
 * @param description - Description of the poll
 * @param startOn - Start timestamp (milliseconds)
 * @param endOn - End timestamp (milliseconds)
 * @param options - Additional poll options
 */
export function createPoll(
  name: string,
  description: string,
  startOn: u64,
  endOn: u64,
  options?: {
    limit?: u32;
    passcodeHash?: string | null;
    candidates?: Candidate[];
    parties?: Party[];
    type?: string;
    eligibility?: string;
    eligibleVoters?: AccountId[];
  }
): PollId {
  // Only allow creation by signed-in users
  assert(context.sender.length > 0, "Must be signed in");
  assert(endOn > startOn, "End time must be after start time");

  const pollId = `poll_${context.blockTimestamp}_${polls.length}`;
  const creator = context.sender;

  const poll = new Poll(
    pollId,
    name,
    description,
    creator,
    startOn,
    endOn,
    context.blockTimestamp,
    options?.limit || 0,
    options?.passcodeHash || null,
    options?.candidates || [],
    options?.parties || [],
    options?.type || "candidate",
    options?.eligibility || "all",
    options?.eligibleVoters || []
  );

  // Save poll
  polls.set(pollId, poll);
  pollIds.push(pollId);

  // Initialize votes storage for this poll
  votesByPoll.set(pollId, new PersistentVector<Vote>(`v_${pollId}`));

  return pollId;
}

/**
 * Update poll details (only allowed before voting starts)
 *
 * @param pollId - ID of the poll to update
 * @param updates - Partial poll object with updates
 */
export function updatePoll(
  pollId: PollId,
  updates: {
    name?: string;
    description?: string;
    endOn?: u64;
    limit?: u32;
    passcodeHash?: string | null;
    candidates?: Candidate[];
    parties?: Party[];
    eligibility?: string;
    eligibleVoters?: AccountId[];
  }
): void {
  const poll = getPoll(pollId);

  // Only creator can update
  assert(poll.creator === context.sender, "Only poll creator can update");

  // Cannot update after voting starts
  assert(
    context.blockTimestamp < poll.startOn,
    "Cannot update after voting starts"
  );

  // Apply updates
  if (updates.name) poll.name = updates.name;
  if (updates.description) poll.description = updates.description;
  if (updates.endOn) {
    assert(updates.endOn > poll.startOn, "End time must be after start time");
    poll.endOn = updates.endOn;
  }
  if (updates.limit !== undefined) poll.limit = updates.limit;
  if (updates.passcodeHash !== undefined)
    poll.passcodeHash = updates.passcodeHash;
  if (updates.candidates) poll.candidates = updates.candidates;
  if (updates.parties) poll.parties = updates.parties;
  if (updates.eligibility) poll.eligibility = updates.eligibility;
  if (updates.eligibleVoters) poll.eligibleVoters = updates.eligibleVoters;

  polls.set(pollId, poll);
}

/**
 * Delete a poll (only allowed before voting starts)
 *
 * @param pollId - ID of the poll to delete
 */
export function deletePoll(pollId: PollId): void {
  const poll = getPoll(pollId);

  // Only creator can delete
  assert(poll.creator === context.sender, "Only poll creator can delete");

  // Cannot delete after voting starts
  assert(
    context.blockTimestamp < poll.startOn,
    "Cannot delete after voting starts"
  );

  // Remove poll and its votes
  polls.delete(pollId);

  // Find and remove from pollIds
  const index = pollIds.indexOf(pollId);
  if (index > -1) {
    pollIds.swap_remove(index);
  }

  // Delete votes storage
  votesByPoll.delete(pollId);
}

/**
 * Register or update user profile
 *
 * @param name - User's display name
 * @param about - About text
 */
export function updateProfile(name: string, about: string = ""): void {
  assert(context.sender.length > 0, "Must be signed in");

  const profile = new UserProfile(context.sender, name, about);
  userProfiles.set(context.sender, profile);
}

/**
 * Cast a vote in a poll
 *
 * @param pollId - ID of the poll
 * @param candidateId - ID of the candidate being voted for
 * @param partyId - ID of the party (required for candidate_party polls)
 * @param passcode - Passcode for protected polls (optional)
 */
export function vote(
  pollId: PollId,
  candidateId: CandidateId,
  partyId: PartyId | null = null,
  passcode: string | null = null
): void {
  const poll = getPoll(pollId);
  const voter = context.sender;

  // Check poll status
  assert(poll.isActive(), "Voting is not active for this poll");

  // Verify voter eligibility
  assert(isVoterEligible(poll, voter), "Voter not eligible");

  // Check passcode if required
  if (poll.passcodeHash) {
    assert(passcode !== null, "Passcode required");
    // In a real implementation, we would hash the passcode and compare
    // This is simplified for demonstration
    assert(passcode === "valid_passcode", "Invalid passcode");
  }

  // Check vote limit
  const votes = getVotesByVoter(voter);
  const pollVotes = votes.filter((voteId) => {
    const vote = getVote(voteId);
    return vote.pollId === pollId;
  });

  if (poll.limit > 0 && pollVotes.length >= poll.limit) {
    throw new Error("Vote limit reached for this poll");
  }

  // Verify candidate exists in poll
  const candidateExists = poll.candidates.some((c) => c.id === candidateId);
  assert(candidateExists, "Candidate not found in poll");

  // Verify party if required
  if (poll.type === "candidate_party") {
    assert(partyId !== null, "Party selection required");
    const partyExists = poll.parties.some((p) => p.id === partyId);
    assert(partyExists, "Party not found in poll");
  }

  // Create vote
  const voteId = `vote_${context.blockTimestamp}_${voter}`;
  const vote = new Vote(voteId, pollId, voter, candidateId, partyId);

  // Save vote
  const pollVotesVec = votesByPoll.getSome(pollId);
  pollVotesVec.push(vote);
  votesByPoll.set(pollId, pollVotesVec);

  // Add to voter's vote set
  let voterVotes = votesByVoter.get(voter);
  if (!voterVotes) {
    voterVotes = new PersistentSet<VoteId>(`vset_${voter}`);
  }
  voterVotes.add(voteId);
  votesByVoter.set(voter, voterVotes);
}

// ====================
// View Methods
// ====================

/**
 * Get a poll by ID
 *
 * @param pollId - ID of the poll
 */
export function getPoll(pollId: PollId): Poll {
  return polls.getSome(pollId);
}

/**
 * Get all polls (paginated)
 *
 * @param offset - Starting index
 * @param limit - Number of polls to return
 */
export function getPolls(offset: u32 = 0, limit: u32 = 10): Poll[] {
  const result: Poll[] = [];
  const end = min(offset + limit, pollIds.length);

  for (let i = offset; i < end; i++) {
    const pollId = pollIds[i];
    result.push(polls.getSome(pollId));
  }

  return result;
}

/**
 * Get votes for a specific poll (paginated)
 *
 * @param pollId - ID of the poll
 * @param offset - Starting index
 * @param limit - Number of votes to return
 */
export function getVotesForPoll(
  pollId: PollId,
  offset: u32 = 0,
  limit: u32 = 10
): Vote[] {
  if (!votesByPoll.contains(pollId)) {
    return [];
  }

  const votesVec = votesByPoll.getSome(pollId);
  const result: Vote[] = [];
  const end = min(offset + limit, votesVec.length);

  for (let i = offset; i < end; i++) {
    result.push(votesVec[i]);
  }

  return result;
}

/**
 * Get a user profile
 *
 * @param userId - Account ID of the user
 */
export function getUser(userId: AccountId): UserProfile | null {
  return userProfiles.get(userId, null);
}

/**
 * Verify if a user has voted in a specific poll
 *
 * @param pollId - ID of the poll
 * @param userId - Account ID of the user
 */
export function hasVoted(pollId: PollId, userId: AccountId): bool {
  if (!votesByVoter.contains(userId)) {
    return false;
  }

  const voteIds = votesByVoter.getSome(userId);
  for (let i = 0; i < voteIds.size; i++) {
    const voteId = voteIds.values()[i];
    const vote = getVote(voteId);
    if (vote.pollId === pollId) {
      return true;
    }
  }

  return false;
}

// ====================
// Helper Functions
// ====================

function getVote(voteId: string): Vote {
  // In a real implementation, we would store votes separately
  // This is simplified for demonstration
  return new Vote(voteId, "", "", "", null);
}

function getVotesByVoter(voter: AccountId): string[] {
  if (!votesByVoter.contains(voter)) {
    return [];
  }
  return votesByVoter.getSome(voter).values();
}

function isVoterEligible(poll: Poll, voter: AccountId): bool {
  switch (poll.eligibility) {
    case "all":
      return true;
    case "token_holders":
      // In a real implementation, check token balance
      return true; // Simplified
    case "verified":
      // Check if user has verified profile
      return userProfiles.contains(voter);
    case "custom":
      return poll.eligibleVoters.includes(voter);
    default:
      return false;
  }
}

function min(a: u32, b: u32): u32 {
  return a < b ? a : b;
}
