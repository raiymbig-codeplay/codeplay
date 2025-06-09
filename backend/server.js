// backend/server.js
import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import admin from "./config/firebase.js";

dotenv.config();

// Оборачиваем в async IIFE, чтобы дожидаться connectDB() (с таймаутом)
(async () => {
  // Попытка подключения к MongoDB (timeout 5 секунд из config/db.js)
  await connectDB();

  const app = express();
  app.use(cors());
  app.options('*', cors());
  app.use(express.json());

  // === API для выполнения кода (оставляем как было) ===
  app.post("/api/execute", (req, res) => {
    const code = req.body.code?.trim();
    const language = req.body.language;
    console.log("Получен запрос:", req.body);

    if (!code || !language) {
      return res.status(400).json({ error: "Отсутствует код или язык" });
    }

    let command = "";
    const tempDir = "./temp";
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    try {
      if (language === "python") {
        const filePath = path.join(tempDir, "code.py");
        fs.writeFileSync(filePath, code);
        command = `python3 "${filePath}"`;
      } else if (language === "cpp" || language === "c++") {
        const cppFile = path.join(tempDir, "code.cpp");
        const outputFile = path.join(tempDir, "code.exe");
        fs.writeFileSync(cppFile, code);
        command = `g++ "${cppFile}" -o "${outputFile}" && "${outputFile}"`;
      } else if (language === "javascript") {
        const jsFile = path.join(tempDir, "code.js");
        fs.writeFileSync(jsFile, code);
        command = `node "${jsFile}"`;
      } else if (language === "html") {
        return res.json({ output: code });
      } else {
        return res.json({ error: "Unsupported language" });
      }

      exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
        console.log("⚙️ exec stdout:", stdout);
        console.log("⚠️ exec stderr:", stderr);
        console.log("❌ exec error:", error);

        if (error) {
          if (error.killed) {
            return res.json({ error: "Время выполнения превышено (таймаут)." });
          }
          return res.json({ error: stderr || error.message });
        }
        res.json({ output: stdout });
      });
    } catch (err) {
      console.error("Ошибка сервера:", err.message);
      return res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  });

  // Подключаем пользовательские маршруты
  app.use("/api/users", userRoutes);
  app.use("/api/progress", progressRoutes);

  // Проверяем Firebase Admin SDK
  admin
    .auth()
    .listUsers()
    .then(() => console.log("🔥 Firebase Admin SDK подключен!"))
    .catch((error) => console.error("❌ Ошибка Firebase:", error));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();
