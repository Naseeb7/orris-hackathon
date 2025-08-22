import { Schema, model, models } from "mongoose";
import "@/models/Task";

const TimeLogSchema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
  hours: Number,
  date: { type: Date, default: Date.now },
});

export default models.TimeLog || model("TimeLog", TimeLogSchema);
