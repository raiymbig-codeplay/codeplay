import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/InputDesign.module.css";

function WelcomeSection() {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className={styles.codeplaySectionTitle}>
        {t("welcome")}
      </h2>
    </section>
  );
}

export default WelcomeSection;
