import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import TimeLog from "@/models/TimeLog";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const log = await TimeLog.create(body);
    return NextResponse.json(log);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const logs = await TimeLog.find()
      .populate("taskId", "title project")
      .select("taskId hours date")
      .lean();

    return NextResponse.json(logs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
