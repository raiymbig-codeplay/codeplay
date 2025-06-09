import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAuth from '../components/NavbarAuth';
import WelcomeSection from '../components/WelcomeSection';
import CourseSection from '../components/CourseSection';
import ChallengeSection from '../components/ChallengeSection';
import GameSection from '../components/GameSection';
import ProfileSidebar from '../components/ProfileSidebar';
import HomeLeaderboard from "../components/HomeLeaderboard";
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/InputDesign.module.css';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, authLoading, profile } = useAuth();

  // Редирект, если пользователь не авторизован
  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/auth');
    }
  }, [authLoading, currentUser, navigate]);

  // Пока загружается или профиль ещё не получен — показываем Loader
  if (authLoading || !currentUser || profile === null) {
    return <Loader />;
  }

  return (
    <>
      <NavbarAuth />
      <main className={`${styles.codeplayContainer} ${styles.codeplayWrapper}`}>
        <section className={styles.codeplayMain}>
          <div className={styles.codeplaySection}>
            <WelcomeSection />
          </div>
          <div className={styles.codeplaySection}>
            <CourseSection />
          </div>
          <div className={styles.codeplaySection}>
            <ChallengeSection />
          </div>
          <div className={styles.codeplaySection}>
            <GameSection />
          </div>
        </section>
        <aside style={{ alignSelf: 'flex-start' }}>
          <ProfileSidebar />
          <HomeLeaderboard />
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;