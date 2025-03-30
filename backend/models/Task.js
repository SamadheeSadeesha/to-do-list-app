import mongoose from "mongoose";
const { Schema } = mongoose;

const Task = new Schema({
  userId: Schema.Types.ObjectId,
  title: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", Task);
