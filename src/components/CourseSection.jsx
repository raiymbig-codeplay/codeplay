import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../styles/InputDesign.module.css";
import ContentCard from "./ContentCard";
import CourseCard from "./CourseCard";
import pythonLogo from "../assets/python-logo.svg";
import jsLogo from "../assets/js-logo.svg";
import htmlLogo from "../assets/html-logo.svg";
import cppLogo from "../assets/cpp-logo.svg";

function CourseSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <ContentCard
      className={styles.codeplaySection}
      title={t("courseSection.title")}
      description={t("courseSection.description")}
    >
      <div className={styles.codeplayCardGroup}>
        <CourseCard
          title={t("courseSection.python.title")}
          description={t("courseSection.python.description")}
          logo={pythonLogo}
          onClick={() => handleNavigate("/courses/python-fundamentals")}
        />
        <CourseCard
          title={t("courseSection.javascript.title")}
          description={t("courseSection.javascript.description")}
          logo={jsLogo}
          onClick={() => handleNavigate("/courses/javascript-starter")}
        />
        <CourseCard
          title={t("courseSection.html.title")}
          description={t("courseSection.html.description")}
          logo={htmlLogo}
          onClick={() => handleNavigate("/courses/html-builder")}
        />
        <CourseCard
          title={t("courseSection.cpp.title")}
          description={t("courseSection.cpp.description")}
          logo={cppLogo}
          onClick={() => handleNavigate("/courses/cpp-core")}
        />
      </div>
    </ContentCard>
  );
}

export default CourseSection;
