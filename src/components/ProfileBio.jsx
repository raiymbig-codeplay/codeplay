import React from 'react';
import '../styles/ProfileBio.css';
import { useTranslation } from 'react-i18next';

export default function ProfileBio({ bio = '', joinDate = '', location = '', education = '', work = '' }) {
  const { t } = useTranslation();

  return (
    <div className="codeplay-profile-bio">
      <h3>ⓘ {t("info")}</h3>
      <p className="bio-text">
        {bio || t("no_bio")}
      </p>

      <div className="bio-meta">
        {location && <p><strong>📍 {t("location")}:</strong> {location}</p>}
        {education && <p><strong>🎓 {t("education")}:</strong> {education}</p>}
        {work && <p><strong>💼 {t("work")}:</strong> {work}</p>}
        {joinDate && <p><strong>🗓 {t("joined")}:</strong> {joinDate}</p>}
      </div>
    </div>
  );
}
