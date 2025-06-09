// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firebaseUid:        { type: String, required: true, unique: true },
  username:           { type: String, required: true },
  email:              { type: String, required: true, unique: true },
  avatar:             { type: String, default: "" },

  // Уже были:
  xp:                 { type: Number, default: 0 },
  tasksSolved:        { type: Number, default: 0 },

  // Стрим входов:
  streak:             { type: Number, default: 0 },
  lastLogin:          { type: Date,   default: null },

  // Остальное:
  score:              { type: Number, default: 0 },
  completedChallenges:{ type: [String], default: [] },
  achievements:       { type: [String], default: [] },
  name:               { type: String,   default: "" },
  location:           { type: String,   default: "" },
  education:          { type: String,   default: "" },
  work:               { type: String,   default: "" },
  bio:                { type: String,   default: "" },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
