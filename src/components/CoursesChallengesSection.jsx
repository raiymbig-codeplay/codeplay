// src/components/CoursesChallengesSection.jsx
import React from "react";
import CoursesSwipeList from "./CoursesSwipeList";
import "../styles/CoursesChallengesSection.css";

const CoursesChallengesSection = ({ id }) => {
  return (
    <section id={id} className="courses-challenges-section">
      <h2>📚 Курсы </h2>
      <div style={{ marginTop: "50px" }}>
        <CoursesSwipeList />
      </div>
    </section>
  );
};

export default CoursesChallengesSection;
