import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../styles/ProfileDropdownMenu.css";

const ProfileDropdownMenu = ({ onSignOut }) => {
  return (
    <div className="profile-dropdown-card">
      <ul className="profile-dropdown-list">
        <li className="profile-dropdown-item">
          <FaUser className="profile-icon" />
          <Link to="/profile">Профиль</Link>
        </li>
        <li className="profile-dropdown-item">
          <FaCog className="profile-icon" />
          <Link to="/profile/edit">Настройки</Link>
        </li>
        <li className="profile-dropdown-item logout" onClick={onSignOut}>
          <FaSignOutAlt className="profile-icon" />
          Выйти
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdownMenu;
