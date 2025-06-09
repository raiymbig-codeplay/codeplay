// backend/middleware/authMiddleware.js
import admin from "../config/firebase.js";

const verifyFirebaseToken = async (req, res, next) => {
  // Ожидаем заголовок Authorization: Bearer <idToken>
  const header = req.headers.authorization || "";
  const idToken = header.startsWith("Bearer ")
    ? header.split("Bearer ")[1]
    : null;

  if (!idToken) {
    return res.status(401).json({ message: "Нет токена авторизации" });
  }

  try {
    // Проверяем токен через Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // Кладём в req.user: { uid, email, name }
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || null,
    };
    next();
  } catch (error) {
    console.error("Ошибка verifyFirebaseToken:", error);
    return res.status(401).json({ message: "Неверный или просроченный токен" });
  }
};

export { verifyFirebaseToken };
