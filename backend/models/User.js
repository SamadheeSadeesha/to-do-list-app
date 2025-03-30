import mongoose from "mongoose";
const { Schema } = mongoose;

const User = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", User);
