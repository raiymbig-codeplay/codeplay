import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MiniGamesPage.css';
import GameCard from '../components/GameCard'; 
import codePuzzleImg from '../assets/code-puzzle.png';
import trueFalseImg from '../assets/true-false.png';
import outputGuessImg from '../assets/output-guess.png';
import NavbarAuth from '../components/NavbarAuth';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function MiniGamesPage() {
  const navigate = useNavigate();
  const { currentUser, profile } = useAuth();
  const { t } = useTranslation();

  const games = [
    {
      title: t('gameSection.puzzle'),
      image: codePuzzleImg,
      path: '/minigames/code-puzzle'
    },
    {
      title: t('gameSection.truefalse'),
      image: trueFalseImg,
      path: '/minigames/true-false'
    },
    {
      title: t('gameSection.output'),
      image: outputGuessImg,
      path: '/minigames/output-guess'
    }
  ];

  return (
    <>
      <NavbarAuth profile={profile} />
      <div className="minigamepage-page">
        <h1>{t('games.title')}</h1>
        <div className="minigamepage-list">
          {games.map((game, index) => (
            <div key={index} onClick={() => navigate(game.path)}>
              <GameCard title={game.title} bg={game.image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
