import React from "react";
import "./button.css";

function Button({ icon, badge, title, handleClick, theme }) {
  return (
    <>
      {/* <button className={`button ${theme}`} onClick={handleClick}>
        {title}
      </button> */}
      <button className={`button ${theme}`} onClick={handleClick}>
        {icon && icon} {title}
        {badge && <span className="button-badge">{badge}</span>}
      </button>
    </>
  );
}

export default Button;
