import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../styles/InputDesign.module.css";
import ContentCard from "./ContentCard";
import TaskCard from "./TaskCard";
import challengesData from "../data/challengesData";

function ChallengeSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOpenPack = (packId) => {
    const pack = challengesData.find((p) => p.packId === packId);
    if (!pack || pack.tasks.length === 0) return;
    const firstTaskId = pack.tasks[0].id;
    switch (pack.language.toLowerCase()) {
      case "css":
        navigate(`/css-task/${packId}/${firstTaskId}`);
        break;
      case "html":
        navigate(`/html-task/${packId}/${firstTaskId}`);
        break;
      default:
        navigate(`/task/${packId}/${firstTaskId}`);
    }
  };

  return (
    <ContentCard
      className={styles.codeplaySection}
      title={t("challengeSection.title")}
      description={t("challengeSection.description")}
    >
      <div className={styles.codeplayCardGroup}>
        <TaskCard
          title="Python"
          description={t("challengeSection.python")}
          count={6}
          time={30}
          color="#FFD166"
          onOpen={() => handleOpenPack("python-basics")}
        />
        <TaskCard
          title="JavaScript"
          description={t("challengeSection.javascript")}
          count={6}
          time={30}
          color="#06D6A0"
          onOpen={() => handleOpenPack("js-arrays-logic")}
        />
        <TaskCard
          title="HTML"
          description={t("challengeSection.html")}
          count={4}
          time={30}
          color="#EF476F"
          onOpen={() => handleOpenPack("html-basics")}
        />
        <TaskCard
          title="CSS"
          description={t("challengeSection.css")}
          count={6}
          time={30}
          color="#118AB2"
          onOpen={() => handleOpenPack("css-selectors")}
        />
      </div>
    </ContentCard>
  );
}

export default ChallengeSection;
