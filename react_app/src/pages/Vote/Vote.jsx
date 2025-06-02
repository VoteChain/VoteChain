import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VoteCard from "../../containers/VoteCard/VoteCard";
import {
  FaRegClock,
  FaUser,
  FaUsers,
  FaBookmark,
  FaRegBookmark,
  FaCheck,
} from "react-icons/fa";

import "./vote.css";
import Aside from "../../components/Aside/Aside";
import VoteOption from "../../components/VoteOption/VoteOption";

// Mock data - replace with your actual data source
const mockVotes = {
  vote1: {
    id: "vote1",
    name: "2023 Community DAO Election",
    desc: "Elect representatives for the next governance period",
    creator: "DAO Committee",
    openOn: "2023-11-01T00:00:00",
    closeOn: "2023-11-15T23:59:59",
    status: "active",
    passcode: false,
    candidates: [
      { id: "c1", name: "Alex Johnson", party: "Progress Party" },
      { id: "c2", name: "Sam Wilson", party: "Unity Alliance" },
      { id: "c3", name: "Taylor Smith", party: "Independent" },
    ],
    parties: [
      { id: "p1", name: "Progress Party" },
      { id: "p2", name: "Unity Alliance" },
      { id: "p3", name: "Independent" },
    ],
    voters: ["user1", "user2"],
  },
};

const VotingPage = () => {
  const { voteId } = useParams();
  const [selectedTab, setSelectedTab] = useState("candidates");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const vote = mockVotes[voteId] || mockVotes.vote1; // Fallback to sample data

  const handleVoteSubmit = () => {
    if (!selectedOption) return;
    // Here you would typically send the vote to your backend
    console.log(`Voted for ${selectedOption}`);
    setHasVoted(true);
  };

  const toggleWatchlist = () => {
    setIsWatching(!isWatching);
    // Here you would typically update user's watchlist in backend
  };

  return (
    <div className="voting-page">
      <Aside
        objs={[
          {
            name: "Vote page",
            link: `/vote/${voteId}`,
          },
          {
            name: "Result",
            link: `/vote/${voteId}/result`,
          },
        ]}
        active={`/vote/${voteId}`}
        showLogo={false}
        // buttonConf={{ title: "Create new poll", handleClick: () => {} }}
      />
      <div className="vote-header">
        <div className="vote-meta">
          <h1>{vote.name}</h1>
          <p className="creator">Created by: {vote.creator}</p>
          <p className="description">{vote.desc}</p>
          <div className="time-info">
            <FaRegClock />
            <span>
              {vote.status === "active"
                ? `Closes on ${new Date(vote.closeOn).toLocaleString()}`
                : `Opens on ${new Date(vote.openOn).toLocaleString()}`}
            </span>
          </div>
        </div>
        <button
          className={`watchlist-btn ${isWatching ? "watching" : ""}`}
          onClick={toggleWatchlist}
        >
          {isWatching ? <FaBookmark /> : <FaRegBookmark />}
          {isWatching ? "Watching" : "Watch Vote"}
        </button>
      </div>

      {hasVoted ? (
        <div className="vote-confirmation">
          <FaCheck className="success-icon" />
          <h2>Your vote has been submitted!</h2>
          <p>Thank you for participating in this election.</p>
          <button className="view-results-btn">View Preliminary Results</button>
        </div>
      ) : (
        <>
          <div className="vote-tabs">
            <button
              className={`tab-btn ${
                selectedTab === "candidates" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("candidates")}
            >
              <FaUser /> By Candidate
            </button>
            <button
              className={`tab-btn ${selectedTab === "parties" ? "active" : ""}`}
              onClick={() => setSelectedTab("parties")}
            >
              <FaUsers /> By Party
            </button>
          </div>

          <div className="vote-options">
            {selectedTab === "candidates"
              ? vote.candidates.map((candidate) => (
                  <VoteOption
                    key={candidate.id}
                    id={candidate.id}
                    title={candidate.name}
                    subtitle={candidate.party}
                    isSelected={selectedOption === candidate.id}
                    onSelect={setSelectedOption}
                  />
                ))
              : vote.parties.map((party) => (
                  <VoteOption
                    key={party.id}
                    id={party.id}
                    title={party.name}
                    subtitle="All party candidates"
                    isSelected={selectedOption === party.id}
                    onSelect={setSelectedOption}
                  />
                ))}
          </div>

          <div className="vote-actions">
            <button
              className="submit-vote-btn"
              disabled={!selectedOption}
              onClick={handleVoteSubmit}
            >
              Submit Vote
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VotingPage;
