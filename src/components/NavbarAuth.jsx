import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/NavbarAuth.css";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import MiniProfileStats from "./MiniProfileStats";
import { useTranslation } from "react-i18next";

function NavbarAuth({ profile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef();
  const langRef = useRef();
  const { t, i18n } = useTranslation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/auth");
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <nav className="navbar-auth">
      <div className="navbar-auth-inner">
        <div className="logo" onClick={() => navigate("/home")}>
          CodePlay
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/courses" className={location.pathname === "/courses" ? "active-link" : ""}>
              {t("navbar.courses")}
            </Link>
          </li>
          <li>
            <Link to="/challenges" className={location.pathname === "/challenges" ? "active-link" : ""}>
              {t("navbar.challenges")}
            </Link>
          </li>
          <li>
            <Link to="/minigames" className={location.pathname === "/minigames" ? "active-link" : ""}>
              {t("navbar.games")}
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={location.pathname === "/leaderboard" ? "active-link" : ""}>

              {t("navbar.leaderboard")} <img src="/images/award.png" alt="🏆" className="nav-icon" />
            </Link>
          </li>
        </ul>

        <div className="avatar-section">
          <div className="language-dropdown-wrapper" ref={langRef}>
            <button className="language-toggle" onClick={() => setLangOpen(!langOpen)}>
              🌐 {i18n.language.toUpperCase()}
            </button>
            {langOpen && (
              <ul className="language-dropdown">
                <li onClick={() => changeLanguage("en")}>🇺🇸 English</li>
                <li onClick={() => changeLanguage("ru")}>🇷🇺 Русский</li>
                <li onClick={() => changeLanguage("kk")}>🇰🇿 Қазақша</li>
              </ul>
            )}
          </div>

          <div className="mini-profile-wrapper" ref={menuRef}>
            <MiniProfileStats
              profile={profile}
              onAvatarClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && <ProfileDropdownMenu onSignOut={handleSignOut} />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAuth;
