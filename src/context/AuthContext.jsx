import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserProfile(user);
      } else {
        setProfile(null);
        setAuthLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserProfile = async (user) => {
    try {
      const idToken = await user.getIdToken();

      const res = await axios.get("https://codeplay-v8ci.onrender.com/api/users/profile", {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      setProfile(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        try {
          await axios.post(
            "https://codeplay-v8ci.onrender.com/api/users/register",
            {},
            {
              headers: { Authorization: `Bearer ${await user.getIdToken()}` },
            }
          );

          const res = await axios.get("https://codeplay-v8ci.onrender.com/api/users/profile", {
            headers: { Authorization: `Bearer ${await user.getIdToken()}` },
          });

          setProfile(res.data);
        } catch (registerErr) {
          console.error("Ошибка при создании профиля:", registerErr);
        }
      } else {
        console.error("Ошибка при загрузке профиля:", err);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      return user;
    } catch (error) {
      console.error("Ошибка регистрации (AuthContext):", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Ошибка логина:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setProfile(null);
    } catch (error) {
      console.error("Ошибка logout:", error);
    }
  };

  // ✅ ДОБАВЛЕННАЯ ФУНКЦИЯ: addXp
  const addXp = async (amount) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      await axios.post(
        "https://codeplay-v8ci.onrender.com/api/users/add-xp",
        { xp: amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Опционально обновить профиль после начисления XP
      fetchUserProfile(currentUser);
    } catch (err) {
      console.error("Ошибка при начислении XP:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authLoading,
        profile,
        register,
        login,
        logout,
        fetchUserProfile,
        addXp, // ✅ Передаём функцию в контекст
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
