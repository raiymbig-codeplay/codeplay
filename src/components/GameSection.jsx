import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../styles/InputDesign.module.css";
import ContentCard from "./ContentCard";
import GameCard from "./GameCard";

function GameSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const games = [
    {
      title: t("gameSection.puzzle"),
      bg: "public/images/puzzle.png",
      path: "/minigames/code-puzzle",
    },
    {
      title: t("gameSection.truefalse"),
      bg: "public/images/truefalse.png",
      path: "/minigames/true-false",
    },
    {
      title: t("gameSection.output"),
      bg: "public/images/output.png",
      path: "/minigames/output-guess",
    },
  ];

  return (
    <ContentCard
      className={styles.codeplaySection}
      title={t("gameSection.title")}
      description={t("gameSection.description")}
    >
      <div className={styles.codeplayCardGroup}>
        {games.map((game, index) => (
          <div key={index} onClick={() => navigate(game.path)} style={{ cursor: "pointer" }}>
            <GameCard title={game.title} bg={game.bg} />
          </div>
        ))}
      </div>
    </ContentCard>
  );
}

export default GameSection;
