import React from "react";
import "./button.css";

function Button({ title, handleClick, theme }) {
  return (
    <>
      <button className={`button ${theme}`} onClick={handleClick}>
        {title}
      </button>
    </>
  );
}

export default Button;
