// src/pages/LandingPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AdvantagesSection from "../components/AdvantagesSection";
import CoursesChallengesSection from "../components/CoursesChallengesSection";
import LearningPath from "../components/LearningPath";
import MiniGamesSection from "../components/MiniGamesSection";
import LeaderboardSection from "../components/LeaderboardSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AdvantagesSection id="advantages"/>
      <CoursesChallengesSection id="courses-challenges"/>
      <LearningPath id="learning-path"/> 
      <MiniGamesSection id="mini-games-section"/> 
      <LeaderboardSection id="leaderboard"/>
      <Footer />
    </>
  );
};

export default LandingPage;
