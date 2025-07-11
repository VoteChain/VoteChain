// React
import React from "react";

// Style
import "./detail-card.css";

function DetailCard({ icon, title, theme, amount, description }) {
  return (
    <div className={`detail-card ${theme}`}>
      <div className="title">
        {icon}
        <span>{title}</span>
      </div>
      <h3 className="amount">{amount}</h3>
      <p className="desc">{description}</p>
    </div>
  );
}

export default DetailCard;
