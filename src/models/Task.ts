import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  project: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: false },
});

export default models.Task || model("Task", TaskSchema);
