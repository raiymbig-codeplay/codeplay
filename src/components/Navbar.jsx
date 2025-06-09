import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Функция плавного скролла к секции
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Функция для возврата в начало страницы
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
      {/* Логотип с функцией скролла вверх */}
      <div className="logo" onClick={scrollToTop}>
        CodePlay
      </div>

      {/* Навигационные ссылки */}
      <ul className="nav-links">
  <li>
  <button onClick={() => scrollToSection("advantages")}>Advantages</button>
  </li>
  <li>
  <button onClick={() => scrollToSection("courses-challenges")}>Courses</button>
  </li>
  <li>
  <button onClick={() => scrollToSection("learning-path")}>Learning Path</button>
  </li>
  <li>
  <button onClick={() => scrollToSection("mini-games-section")}>MiniGames</button>
  </li>
  <li>
  <button onClick={() => scrollToSection("leaderboard")}>Leaderboard</button>
  </li>
</ul>

      {/* Кнопка авторизации */}
      <button className="signin-btn" onClick={() => navigate("/auth")}>
        Sign In
      </button>
    </div>
    </nav>
  );
};

export default Navbar;
