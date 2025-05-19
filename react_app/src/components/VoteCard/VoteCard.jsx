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
import { SlLock, SlLockOpen } from "react-icons/sl";
import { FaRegClock, FaPlayCircle, FaCheckCircle } from "react-icons/fa";

function VoteCard({
  name,
  desc,
  role,
  creator,
  openTime,
  closeTime,
  createdOn,
  limit,
  opened,
  passcode,
  candidates,
  parties,
  voters,
  status,
}) {
  const statusIcon = {
    upcoming: <FaRegClock aria-label="Not started" />,
    active: <FaPlayCircle aria-label="Ongoing" />,
    ended: <FaCheckCircle aria-label="Ended" />,
  };

  return (
    <div className="vote-card">
      <div className="heading">
        <div className="title">
          <h3>{name}</h3>
          <p>{creator}</p>
        </div>
        <div className={`tag ${status}`}>
          {statusIcon[status]}
          <p>{status.charAt(0).toUpperCase().concat(status.substr(1))}</p>
        </div>
      </div>
      <div className="details">
        <DetailCard
          icon={<GoPeople />}
          title={"Total Candidates"}
          theme={"green"}
          amount={candidates.length}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, culpa?"
          }
        />
        <DetailCard
          icon={<FaEnvelopeOpenText />}
          title={"Total Votes Casted"}
          theme={"blue"}
          amount={voters.length}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, culpa?"
          }
        />
      </div>
      <div className="footer">
        <div className="foot-content">
          <p>
            <FaRegClock />
            <span>Duration: May 22nd, 2025 8:30AM - May 30, 2025 8:30AM</span>
          </p>
          <div className="icons">
            <SlLockOpen title={`Locked`} />
            {/* <GoPeople /> */}
            {/* <FaEnvelopeOpenText /> */}
            {/* <SlLock /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteCard;
