import React from 'react';
import LearningStepCard from './LearningStepCard';
import '../styles/LearningPath.css';

const LearningPath = ({ id }) => {
  const learningSteps = [
    {
      id: 1,
      title: "Основы программирования",
      description: "Знакомство с базовыми понятиями и синтаксисом.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      mainImage: "https://cdn-icons-png.flaticon.com/512/270/270798.png",
      backgroundPattern: "https://www.transparenttextures.com/patterns/asfalt-light.png"
    },
    {
      id: 2,
      title: "Структуры данных",
      description: "Изучение массивов, списков, деревьев и других структур данных.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      mainImage: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
      backgroundPattern: "https://www.transparenttextures.com/patterns/asfalt-light.png"
    },
    {
      id: 3,
      title: "Алгоритмы",
      description: "Решение классических алгоритмических задач.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      mainImage: "https://cdn-icons-png.flaticon.com/512/2620/2620970.png",
      backgroundPattern: "https://www.transparenttextures.com/patterns/asfalt-light.png"
    },
    {
      id: 4,
      title: "Продвинутые темы",
      description: "Углубленное изучение продвинутых концепций программирования.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      mainImage: "https://cdn-icons-png.flaticon.com/512/2061/2061374.png",
      backgroundPattern: "https://www.transparenttextures.com/patterns/asfalt-light.png"
    }
  ];

  return (
    <section id={id} className="learning-path">
      <h2>🗺️ Учебный путь</h2>
      <div className="steps-container">
        {learningSteps.map((step) => (
          <LearningStepCard
            key={step.id}
            title={step.title}
            description={step.description}
            icon={step.icon}
            mainImage={step.mainImage}
            backgroundPattern={step.backgroundPattern}
          />
        ))}
      </div>
    </section>
  );
};

export default LearningPath;
