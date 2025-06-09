import express from "express";
import User from "../models/User.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 1) POST /api/users/register
router.post("/register", verifyFirebaseToken, async (req, res) => {
  try {
    console.log("🔑 Данные из Firebase токена:", req.user);
    const { uid, email, name, displayName, firebase } = req.user;

    // Проверка по UID
    let user = await User.findOne({ firebaseUid: uid });
    if (user) {
      return res.status(200).json({ message: "Пользователь уже зарегистрирован", user });
    }

    // Дополнительная проверка по email (на случай, если UID поменялся, но email тот же)
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(200).json({ message: "Email уже зарегистрирован", user: emailExists });
    }

    // Устанавливаем имя пользователя с фолбэками
    const username =
      name ||
      displayName ||
      firebase?.identities?.email?.[0] ||
      email?.split("@")[0] ||
      "user";

    user = await User.create({
      firebaseUid: uid,
      username,
      email,
    });

    return res.status(201).json({ message: "Пользователь создан", user });
  } catch (error) {
    console.error("❌ Ошибка в /api/users/register:", error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

// 2) GET /api/users/profile
router.get("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = user.lastLogin
      ? Math.floor((now - user.lastLogin) / msPerDay)
      : 0;

    if (!user.lastLogin) user.streak = 1;
    else if (diffDays === 1) user.streak += 1;
    else if (diffDays > 1) user.streak = 1;

    user.lastLogin = now;
    await user.save();

    return res.json(user);
  } catch (error) {
    console.error("Ошибка при получении профиля:", error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

// 3) PATCH /api/users/profile
router.patch("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    Object.assign(user, req.body);
    await user.save();
    return res.json({ message: "Профиль обновлён", user });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

// 4) POST /api/users/upload-avatar
router.post(
  "/upload-avatar",
  verifyFirebaseToken,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const { uid } = req.user;
      const user = await User.findOne({ firebaseUid: uid });
      if (!user) return res.status(404).json({ message: "Пользователь не найден" });

      if (!req.file) return res.status(400).json({ message: "Файл аватарки не прикреплён" });

      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "avatars", public_id: uid, overwrite: true },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);
      user.avatar = result.secure_url;
      await user.save();

      return res.json({ avatarUrl: result.secure_url });
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
);

// 5) GET /api/users/all
router.get("/all", verifyFirebaseToken, async (req, res) => {
  try {
    const users = await User.find()
      .select("name username avatar xp tasksSolved streak")
      .sort({ xp: -1 });
    return res.json(users);
  } catch (error) {
    console.error("Ошибка при получении списка пользователей:", error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

export default router;
