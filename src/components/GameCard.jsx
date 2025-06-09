import React from 'react';
import '../styles/GameCard.css';

const GameCard = ({ title, bg }) => {
  return (
    <div className="game-article-wrapper">
      <div
        className="game-container"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="game-info">
        <div className="game-flex">
          <div className="game-title">{title}</div>
          <div className="game-hover">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth={2} fill="none" stroke="currentColor">
              <line y2={12} x2={19} y1={12} x1={5} />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
