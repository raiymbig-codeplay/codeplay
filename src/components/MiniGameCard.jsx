import React from 'react';
import '../styles/MiniGameCard.css';

const MiniGameCard = ({ title, description, icon }) => {
  return (
    <div className="parent">
      <div className="mini-game-card">
        <div className="mini-game-content-box">
          <span className="mini-game-card-title">{title}</span>
          <p className="mini-game-card-content">{description}</p>
          <button className="see-more">Играть</button>
        </div>
        <div className="icon-box">
          <img src={icon} alt="game icon" className="game-icon" />
        </div>
      </div>
    </div>
  );
};

export default MiniGameCard;
