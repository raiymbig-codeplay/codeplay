import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isResetVisible, setIsResetVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fade, setFade] = useState("fade-in");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      navigate("/home");
    } catch (error) {
      const errorCode = error.code ? error.code.trim() : "";
      switch (errorCode) {
        case "auth/user-not-found":
          setErrorMessage("Пользователь не найден. Проверьте email или зарегистрируйтесь.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Неверный пароль. Попробуйте снова.");
          break;
        case "auth/invalid-credential":
          setErrorMessage("Неверный email или пароль.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage("Email уже используется.");
          break;
        case "auth/weak-password":
          setErrorMessage("Слишком слабый пароль. Введите минимум 6 символов.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Некорректный формат email.");
          break;
        default:
          setErrorMessage(error.message || "Произошла ошибка. Попробуйте ещё раз.");
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setErrorMessage("Введите email для сброса пароля");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Письмо для восстановления пароля отправлено!");
      setIsResetVisible(false);
    } catch (error) {
      setErrorMessage("Ошибка при отправке письма: " + error.message);
    }
  };

  const handleTabChange = (tab) => {
    setFade("fade-out");
    setTimeout(() => {
      setIsLogin(tab === "login");
      setErrorMessage("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFade("fade-in");
    }, 300);
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Ошибка при входе через Google");
    }
  };

  return (
    <div className="auth-page">
      <div className={`auth-content ${fade}`}>
        <div className="auth-card">
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {isLogin && (
              <a onClick={() => {
                setErrorMessage("");
                setIsResetVisible(true);
              }} className="forgot-password">Забыли пароль?</a>
            )}
            <button type="submit" className="submit-btn">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="social-login">
            <button className="google-btn" onClick={handleGoogleSignIn}>
              <img src="/images/google-icon.png" alt="Google icon" className="google-icon" />
              Войти через Google
            </button>
          </div>

          <p className="switch-auth">
            {isLogin ? "Впервые в CodePlay?" : "Уже есть аккаунт?"}{" "}
            <span onClick={() => handleTabChange(isLogin ? "signup" : "login")}>
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
      </div>

      {isResetVisible && (
        <div className="password-reset-modal">
          <div className="modal-content">
            <h3>Reset Password</h3>
            <p>Enter your email to receive a password reset link.</p>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handlePasswordReset} className="submit-btn">Send Reset Email</button>
            <button onClick={() => setIsResetVisible(false)} className="close-btn">Close</button>
            {errorMessage && <p className="global-error">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
