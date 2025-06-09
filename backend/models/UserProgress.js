// backend/models/UserProgress.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  courseId:   { type: String, required: false },
  topicId:    { type: String, required: false },

  packId:     { type: String, required: false },
  taskId:     { type: String, required: true },
  completedAt:{ type: Date, default: Date.now }
});

const userProgressSchema = new mongoose.Schema({
  userId:         { type: String, required: true, unique: true },
  completedTasks: { type: [taskSchema], default: [] },
  xp:             { type: Number, default: 0 }
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
