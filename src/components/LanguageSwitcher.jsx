import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSwitcher.css"; 

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select className="language-select" onChange={handleChange} value={i18n.language}>
      <option value="en">🇺🇸 EN</option>
      <option value="ru">🇷🇺 RU</option>
      <option value="kk">🇰🇿 KK</option>
    </select>
  );
}
