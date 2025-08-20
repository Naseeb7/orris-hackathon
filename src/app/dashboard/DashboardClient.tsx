"use client";
import { useMemo } from "react";

type Log = {
  _id: string;
  taskId: { _id: string; title: string; project: string };
  hours: number;
  date: Date | string;
};

export default function DashboardClient({ logs }: { logs: Log[] }) {
  // Memoize calculations for performance
  const { totalHours, hoursByProject, hoursByDate } = useMemo(() => {
    const total = logs.reduce((sum, l) => sum + l.hours, 0);

    const byProject: Record<string, number> = {};
    logs.forEach((l) => {
      const project = l.taskId?.project || "Unassigned";
      byProject[project] = (byProject[project] || 0) + l.hours;
    });

    const byDate: Record<string, number> = {};
    logs.forEach((l) => {
      const date = new Date(l.date).toLocaleDateString();
      byDate[date] = (byDate[date] || 0) + l.hours;
    });

    return {
      totalHours: total,
      hoursByProject: byProject,
      hoursByDate: byDate,
    };
  }, [logs]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Total Hours */}
      <div className="p-4  shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Total Hours</h2>
        <p className="text-xl font-bold">{totalHours.toFixed(2)} hrs</p>
      </div>

      {/* Hours by Project */}
      <div className="p-4  shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Hours by Project</h2>
        <table className="w-full border border-gray-400">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left p-2 border border-gray-400">Project</th>
              <th className="text-left p-2 border border-gray-400">Hours</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(hoursByProject).map(([project, hrs]) => (
              <tr key={project}>
                <td className="p-2 border border-gray-400">{project}</td>
                <td className="p-2 border border-gray-400">{hrs.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hours by Date */}
      <div className="p-4  shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Hours by Date</h2>
        <table className="w-full border border-gray-400">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left p-2 border border-gray-400">Date</th>
              <th className="text-left p-2 border border-gray-400">Hours</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(hoursByDate).map(([date, hrs]) => (
              <tr key={date}>
                <td className="p-2 border border-gray-400">
                  {new Date(date).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-400">{hrs.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
