// React
import React from "react";

// Style
import "./vote-card.css";

// Components
import DetailCard from "../DetailCard/DetailCard";

// Others
import { TiMediaPlay } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FaEnvelopeOpenText } from "react-icons/fa";

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
        <DetailCard
          icon={<GoPeople />}
          title={"Total Candidates"}
          theme={"green"}
          amount={"$5,000"}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, culpa?"
          }
        />
        <DetailCard
          icon={<FaEnvelopeOpenText />}
          title={"Total Votes Casted"}
          theme={"blue"}
          amount={"43"}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, culpa?"
          }
        />
      </div>
      <div className="footer">
        <div className="foot-content">
            <span>Duration: May 22nd, 2025 8:30AM - May 30, 2025 8:30AM</span>
            <div className="icons">
              <TiMediaPlay />
              <GoPeople />
              <FaEnvelopeOpenText />
            </div>
        </div>
      </div>
    </div>
  );
}

export default VoteCard;
