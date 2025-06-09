import React from 'react';
import '../styles/ProfileBanner.css';

export default function ProfileBanner({
  bannerUrl,   // URL фонового изображения
  avatar,      // URL аватарки
  name,        // настоящее имя
  username,    // логин без @
  following,   // число подписок
  followers,   // число подписчиков
  onEdit       // callback для кнопки редактирования
}) {
  return (
    <div className="profile-header-container">
      {/* фон */}
      <div
        className="profile-header-bg"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      />

      {/* кнопка редактирования */}
      <button className="profile-edit-btn" onClick={onEdit}>
        ✏️
      </button>

      {/* аватар */}
      <div className="profile-avatar-wrapper">
        <img src={avatar} alt="avatar" className="profile-avatar" />
      </div>

      {/* информация */}
      <div className="profile-user-info">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-username">@{username}</p>
      </div>
    </div>
  );
}
