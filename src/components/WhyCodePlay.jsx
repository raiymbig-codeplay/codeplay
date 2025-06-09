import React from 'react';
import '../styles/WhyCodePlayCard.css';

const WhyCodePlayCard = ({ title, subtitle, description, image}) => {
  return (
    <div className="advantages-card">
        <img src={image} alt={title} className="advantages-card-image"/>
      <div className="advantages-card-content">
        <span className="advantages-card-title">{title}</span>
        <span className="advantages-card-subtitle">{subtitle}</span>
        <p className="advantages-card-description">{description}</p>
      </div>
    </div>
  );
};

export default WhyCodePlayCard;
