// backend/routes/progressRoutes.js
import express from "express";
import UserProgress from "../models/UserProgress.js";
import User from "../models/User.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================================
// POST /api/progress/complete
// Отмечает задачу как выполненную + начисляет XP
// ==============================================
router.post("/complete", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const { taskId, courseId, topicId, packId, xp = 10 } = req.body;

    if (!taskId) {
      return res.status(400).json({ success: false, error: "Missing required field: taskId" });
    }

    if (!courseId && !packId) {
      return res.status(400).json({ success: false, error: "Either courseId or packId is required" });
    }

    let progress = await UserProgress.findOne({ userId: uid });
    if (!progress) {
      progress = new UserProgress({ userId: uid, completedTasks: [], xp: 0 });
    }

    const alreadyCompleted = progress.completedTasks.some(
      (item) =>
        item.taskId === taskId &&
        (courseId ? item.courseId === courseId : true) &&
        (topicId ? item.topicId === topicId : true) &&
        (packId ? item.packId === packId : true)
    );

    if (!alreadyCompleted) {
      progress.completedTasks.push({ taskId, courseId, topicId, packId });
      progress.xp += xp;
      await progress.save();

      const user = await User.findOne({ firebaseUid: uid });
      if (user) {
        user.xp = (user.xp || 0) + xp;
        user.tasksSolved = (user.tasksSolved || 0) + 1;
        user.streak = (user.streak || 0) + 1;
        await user.save();
      }
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Ошибка в /api/progress/complete:", error);
    return res.status(500).json({ success: false, error: "Внутренняя ошибка сервера" });
  }
});

// ==============================================
// GET /api/progress/:uid
// Возвращает список выполненных задач по userId (uid)
// ==============================================
router.get("/:uid", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.params;
    const progress = await UserProgress.findOne({ userId: uid });
    if (!progress) {
      return res.json({ completedTasks: [] });
    }
    return res.json({ completedTasks: progress.completedTasks });
  } catch (error) {
    console.error("Ошибка получения прогресса:", error);
    return res
      .status(500)
      .json({ completedTasks: [] });
  }
});

export default router;
