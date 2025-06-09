import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/CourseCard.css';

const CourseCard = ({ title, description, logo, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="course-card" onClick={onClick}>
      <div className="top">
        <img src={logo} alt={`${title} Logo`} className="logo" />
        <div className="info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="preview"></div>
      <button>{t('start_course')}</button>
    </div>
  );
};

export default CourseCard;
