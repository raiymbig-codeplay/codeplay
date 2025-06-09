import React from "react";
import "../styles/CustomCard.css";

const CustomCard = ({ title, icon, chapters, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="header">
        <div className="img-box">
          <img src={icon} alt="logo" className="course-icon-img" />
        </div>
        <span className="title">{title}</span>
      </div>
      <div className="content">
        <p>{chapters} Chapters</p>
        <p className="description">{description}</p> {}
        <button className="btn-link">Start</button>
      </div>
    </div>
  );
};

export default CustomCard;
