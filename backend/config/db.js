// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/codeplay",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Ждём не более 5 секунд, после чего бросаем ошибку, а не "висим" бесконечно
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log(`🔥 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // НЕ вызываем process.exit(1), чтобы сервер всё равно запускался даже без БД
  }
};

export default connectDB;
