// React
import React from "react";

// Style
import "./vote-card.css";

// Components
import DetailCard from "../../components/DetailCard/DetailCard";

// Others
import { TiMediaPlay } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FaEnvelopeOpenText, FaPercentage, FaSpinner } from "react-icons/fa";
import { SlLock, SlLockOpen } from "react-icons/sl";
import { FaRegClock, FaPlayCircle, FaCheckCircle } from "react-icons/fa";
import { FaPercent } from "react-icons/fa6";
import { BsClockFill, BsFillPeopleFill } from "react-icons/bs";
import { formatDate, getTimeRemaining } from "../../scripts/functions";

// Status indicators
import { FaHourglassStart } from "react-icons/fa";

// Actions
import {
  FaInfoCircle,
  FaVoteYea,
  FaBell,
  FaChartBar,
  FaShareAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function VoteCard({
  id = 1,
  name,
  desc,
  role,
  creator,
  openOn,
  closeOn,
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
    upcoming: <FaHourglassStart aria-label="Not started" />,
    active: <FaSpinner aria-label="Ongoing" />,
    ended: <FaCheckCircle aria-label="Ended" />,
  };

  return (
    // <div className="vote-card">
    //   <div className="heading">
    //     <div className="title">
    //       <h3>{name}</h3>
    //       <p>{creator}</p>
    //     </div>
    //     <div className={`tag ${status}`}>
    //       {statusIcon[status]}
    //       <p>{status.charAt(0).toUpperCase().concat(status.substr(1))}</p>
    //     </div>
    //   </div>
    //   <div className="details">
    //     <DetailCard
    //       icon={<GoPeople />}
    //       title={"Total Candidates"}
    //       theme={"green"}
    //       amount={candidates.length}
    //       description={"Number of individuals contesting in this vote."}
    //     />
    //     <DetailCard
    //       icon={<FaEnvelopeOpenText />}
    //       title={"Total Votes Casted"}
    //       theme={"blue"}
    //       amount={voters.length}
    //       description={"Total number of submitted votes in this poll."}
    //     />
    //   </div>
    //   <div className="footer">
    //     <div className="foot-content">
    //       <p>
    //         <FaRegClock />
    //         <span>
    //           Duration: {formatDate(openOn)} - {formatDate(closeOn)}
    //         </span>
    //       </p>
    //       <div className="icons">
    //         {passcode ? (
    //           <SlLock title={`Locked`} />
    //         ) : (
    //           <SlLockOpen title={`Public`} />
    //         )}

    //         {/* <GoPeople /> */}
    //         {/* <FaEnvelopeOpenText /> */}
    //         {/* <SlLock /> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="vote-card">
      <div className="vote-card-header">
        <div className="vote-info">
          <Link to={`/vote/${id}`}>
            <h3 className="vote-title">{name}</h3>
          </Link>
          <Link target="_blank" to={`https://near.social/${creator}`}>
            <p className="vote-desc">{creator}</p>
          </Link>
        </div>
        <span className={`vote-tag tag-${status}`}>
          {statusIcon[status]}{" "}
          {status.charAt(0).toUpperCase().concat(status.substr(1))}
        </span>
      </div>
      <div className="vote-stats">
        <div className="stat-card">
          <span className="stat-label">
            {/* <i className="fas fa-users"></i> */}
            <FaVoteYea /> Votes
          </span>
          <span className="stat-value">{voters.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">
            <BsFillPeopleFill /> Options
          </span>
          <span className="stat-value">{candidates.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">
            <BsClockFill /> Time Left
          </span>
          <span className="stat-value">{getTimeRemaining(closeOn)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">
            <FaPercentage /> Quorum
          </span>
          {/* !!! Implement Quorum */}
          <span className="stat-value">68%</span>
        </div>
      </div>
      <div className="vote-footer">
        <span className="vote-date">
          {/* <i className="fas fa-calendar"></i> */}
          <FaRegClock />
          Ends: {formatDate(closeOn)}
        </span>
        <div className="vote-actions">
          <div className="action-btn">
            <FaInfoCircle />
          </div>
          <div className="action-btn">
            <FaVoteYea />
          </div>
          <div className="action-btn">
            <FaShareAlt />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteCard;
