// React
import React from "react";

// Style
import "./all-votes.css";

// Components
import VoteCard from "../../components/VoteCard/VoteCard";

function AllVotes() {
  return (
    <>
      <div className="all-votes">
        <VoteCard />
      </div>
    </>
  );
}

export default AllVotes;
