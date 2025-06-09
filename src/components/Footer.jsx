import React from "react";
import "../styles/Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>© 2025 CodePlay. {t("footer.rights")}</p>
      <ul>
        <li><a href="#">{t("footer.privacy")}</a></li>
        <li><a href="#">{t("footer.terms")}</a></li>
        <li><a href="#">{t("footer.contact")}</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
