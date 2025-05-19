// React
import React from "react";

// Style
import "./vote-card.css";

// Others
import { TiMediaPlay } from "react-icons/ti";

function VoteCard() {
  return (
    <div className="vote-card">
      <div className="heading">
        <div className="title">
          <h3>2025 Precidential</h3>
          <p>abnakore.near</p>
        </div>
        <div className="tag">
          <TiMediaPlay />
          <p>Ongoing</p>
        </div>
      </div>
      <div className="details">
        <div className="detail-div "></div>
        <div className="detail-div "></div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default VoteCard;
