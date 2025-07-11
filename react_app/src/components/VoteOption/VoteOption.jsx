import React from "react";
import { FaCheck } from "react-icons/fa";
import "./vote-option.css";

const VoteOption = ({ id, title, subtitle, isSelected, onSelect }) => {
  return (
    <div
      className={`vote-option ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      <div className="option-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {isSelected && <div className="selected-indicator"></div>}
    </div>
  );
};

export default VoteOption;
