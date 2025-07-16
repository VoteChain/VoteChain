// Custom reusable types

// Wallet address or contract account
export type AccountId = string;
export type PollId = string;
export type CandidateId = string;
export type PartyId = string;
export type VoteId = string;

// A 128-bit unsigned integer used for token amounts, balances, etc.
export type Balance = string; // Usually stored as string to avoid JS number limits

// Used for time-related values (nanoseconds)
export type Timestamp = string; // NEAR represents timestamps in nanoseconds

// Gas is used to track execution cost
export type Gas = string;

// A percentage stored as a string (e.g., "0.05" for 5%)
export type Percentage = string;

// Token ID (for NFT, FT, etc.)
export type TokenId = string;

// Unique identifier for items (e.g., post ID, user ID)
export type UniqueId = string;
