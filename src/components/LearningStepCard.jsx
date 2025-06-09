import React from 'react';
import "../styles/LearningPathCards.css";

const LearningStepCard = ({ title, description, icon, mainImage, backgroundPattern }) => {
  return (
    <div className="learning-card" style={{ backgroundImage: `url(${backgroundPattern})` }}>
      <div className="learning-icon-box">
        <img src={icon} alt="Icon" className="learning-icon-img" />
      </div>
      <img src={mainImage} alt="Main" className="learning-main-img" />
      <div className="learning-card-content">
        <p className="learning-card-title">{title}</p>
        <p className="learning-card-description">{description}</p>
      </div>
    </div>
  );
};

export default LearningStepCard;
