import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './context/AuthContext'; 
import "react-toastify/dist/ReactToastify.css"; 
import LandingPage from "./pages/LandingPage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import SubtopicPage from './pages/SubtopicPage';
import HtmlCoursePage from './pages/HtmlCoursePage';
import HtmlSubtopicPage from './pages/HtmlSubtopicPage';
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import MiniGamesPage from './pages/MiniGamesPage';
import CodePuzzlePage from './pages/CodePuzzlePage';
import OutputGuessPage from './pages/OutputGuessPage';
import TrueFalseQuizPage from './pages/TrueFalseQuizPage';
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from './pages/EditProfilePage';
import ChallengesPage from "./pages/ChallengesPage";
import TaskPage from './pages/TaskPage';
import HtmlTaskPage from './pages/HtmlTaskPage';
import CssTaskPage from './pages/CssTaskPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
      <ToastContainer 
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
          <Route path="/courses/:courseId/:topicSlug/:subtopicIndex" element={<SubtopicPage />} />
          <Route path="/courses/html-builder" element={<HtmlCoursePage />} />
          <Route path="/html-task/:courseId/:topicId/:taskId" element={<HtmlSubtopicPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/minigames" element={<MiniGamesPage />} />
          <Route path="/minigames/code-puzzle" element={<CodePuzzlePage />} />
          <Route path="/minigames/true-false" element={<TrueFalseQuizPage />} />
          <Route path="/minigames/output-guess" element={<OutputGuessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/task/:packId/:taskId" element={<TaskPage />} />
          <Route path="/html-task/:packId/:taskId" element={<HtmlTaskPage />} />
          <Route path="/css-task/:packId/:taskId" element={<CssTaskPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
