import React from "react";
import styles from "../styles/InputDesign.module.css";

function ContentCard({ className, title, description, children }) {
  return (
    <article className={className}>
      <h3 className={styles.div13}>{title}</h3>
      <p className={styles.div14}>{description}</p>
      {children}
    </article>
  );
}

export default ContentCard;
