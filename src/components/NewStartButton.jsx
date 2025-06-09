import React from "react";
import "../styles/NewStartButton.css";

const NewStartButton = ({ onClick }) => {
  return (
    <button className="new-start-button" onClick={onClick}>
      Начать
    </button>
  );
};

export default NewStartButton;
