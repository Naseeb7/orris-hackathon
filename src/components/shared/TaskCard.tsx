"use client";

import { useState, useEffect } from "react";
import ManualTimeEntryModal from "@/components/shared/ManualTimeEntryModal";
import { TaskCardProps } from "@/types";

export default function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  const [isRunning, setIsRunning] = useState(task.isActive);
  const [elapsed, setElapsed] = useState(0); // milliseconds
  const [showModal, setShowModal] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    const start = Date.now() - elapsed;
    const interval = setInterval(() => setElapsed(Date.now() - start), 1000);
    return () => clearInterval(interval);
  }, [isRunning, elapsed]);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const startTimer = async () => {
    setIsRunning(true);
    try {
      await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: true }),
      });
      onTaskUpdated?.();
    } catch (err) {
      console.error("Error starting task:", err);
    }
  };

  const stopTimer = async () => {
    setIsRunning(false);
    const hours = elapsed / (1000 * 60 * 60);

    try {
      // Save the elapsed time as a timelog
      await fetch("/api/timelogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task._id, hours }),
      });

      // Mark task as inactive
      await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false }),
      });

      onTaskUpdated?.();
      setElapsed(0);
    } catch (err) {
      console.error("Error stopping task:", err);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-sm flex flex-col gap-3 bg-gray-600">
      <div className="flex justify-between md:items-center flex-col md:flex-row">
        <div>
          <h2 className="font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-500">{task.project}</p>
        </div>

        <div className="flex gap-3 items-center flex-col md:flex-row">
          {isRunning && <p className="font-mono">{formatTime(elapsed)}</p>}

          {isRunning ? (
            <button
              onClick={stopTimer}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={startTimer}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Start
            </button>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-900 px-3 py-1 rounded hover:bg-gray-700 hover:cursor-pointer"
          >
            + Manual
          </button>
        </div>
      </div>

      {showModal && (
        <ManualTimeEntryModal
          taskId={task._id}
          onClose={() => setShowModal(false)}
          onEntryAdded={onTaskUpdated}
        />
      )}
    </div>
  );
}
