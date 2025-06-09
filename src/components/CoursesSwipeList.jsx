// src/components/CoursesSwipeList.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CoursesSwipeList.css";
import CustomCard from "./CustomCard";

const coursesData = [
  {
    id: 1,
    title: "Frontend Основы",
    chapters: 10,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Изучение HTML, CSS и базового JavaScript",
  },
  {
    id: 2,
    title: "Основы Node.js",
    chapters: 8,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Создание серверов и API на Node.js",
  },
  {
    id: 3,
    title: "Python для Data Science",
    chapters: 12,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: "Работа с данными на Python и библиотеки",
  },
  {
    id: 4,
    title: "Алгоритмы и структуры данных",
    chapters: 15,
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    description: "Сортировки, графы, деревья, динамическое программирование",
  },
  {
    id: 5,
    title: "Основы баз данных",
    chapters: 8,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    description: "Работа с SQL, создание и запросы к базам данных",
  },
  {
    id: 6,
    title: "Основы DevOps",
    chapters: 7,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    description: "CI/CD, облачные технологии и автоматизация.",
  },
];

const CoursesSwipeList = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleClick = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="courses-wrapper">
      <h2 className="section-title"></h2>

      <div className="courses-container" ref={carouselRef}>
        {coursesData.map((course) => (
          <CustomCard
            key={course.id}
            icon={course.icon}
            title={course.title}
            chapters={course.chapters}
            description={course.description}
            onClick={() => handleClick(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesSwipeList;
