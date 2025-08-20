import { dbConnect } from "@/lib/mongodb";
import TimeLog from "@/models/TimeLog";
import DashboardClient from "./DashboardClient";
import { DashboardLog } from "@/types";

export default async function DashboardPage() {
  await dbConnect();

  const rawLogs = await TimeLog.find()
    .populate("taskId", "title project")
    .select("taskId hours date")
    .lean();

  const logs: DashboardLog[] = rawLogs.map((log: any) => ({
    _id: log._id.toString(),
    taskId: {
      _id: log.taskId?._id?.toString() || "",
      title: log.taskId?.title || "",
      project: log.taskId?.project || "",
    },
    hours: Number(log.hours) || 0,
    date: new Date(log.date).toISOString(),
  }));

  return <DashboardClient logs={logs} />;
}
