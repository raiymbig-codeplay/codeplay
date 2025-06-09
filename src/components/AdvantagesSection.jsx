import React from 'react';
import WhyCodePlayCard from './WhyCodePlay.jsx'; // путь зависит от структуры проекта
import '../styles/AdvantagesSection.css';

const advantages = [
  {
    title: 'Интерактивное обучение',
    subtitle: 'Учись программированию через практику и интерактивные задачи.',
    description: 'Практикуйся прямо в браузере, сразу получая обратную связь. Выполняй реальные задания, накапливай опыт и отслеживай прогресс в личном кабинете.',
    image: '/images/123.png',
  },
  {
    title: 'Геймификация обучения',
    subtitle: 'Получай баллы, соревнуйся с друзьями и занимай топ.',
    description: 'Каждое решение — шаг к уровню выше! Получай XP, открывай достижения и участвуй в рейтинге лучших.',
    image: '/images/1234.png',
  },
  {
    title: 'Мгновенная проверка решений',
    subtitle: 'Запускай код и получай фидбэк в реальном времени.',
    description: 'Встроенный автотестер покажет ошибки и подскажет путь. Исправляй код и смотри результат сразу — без ожидания и вручную.',
    image: '/images/12345.png',
  }
];

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="advantages-section">
      <h2>🚀 Почему CodePlay?</h2>
      <div className="advantages-container">
        {advantages.map((adv, index) => (
          <WhyCodePlayCard
            key={index}
            title={adv.title}
            subtitle={adv.subtitle}
            description={adv.description}
            image={adv.image}
          />
        ))}
      </div>
    </section>
  );
};

export default AdvantagesSection;
