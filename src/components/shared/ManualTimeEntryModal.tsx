"use client";

import { useState } from "react";
import FullScreenLoader from "../ui/FullScreenLoader";

interface ManualTimeEntryModalProps {
  taskId: string;
  onClose: () => void;
  onEntryAdded: () => void; // callback to refresh logs
}

export default function ManualTimeEntryModal({
  taskId,
  onClose,
  onEntryAdded,
}: ManualTimeEntryModalProps) {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/timelogs", {
        method: "POST",
        body: JSON.stringify({ taskId, hours: Number(hours), date }),
        headers: { "Content-Type": "application/json" },
      });
      onEntryAdded();
      onClose();
    } catch (err) {
      console.error("Error adding manual entry:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
      {submitting && <FullScreenLoader />}
      <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Manual Entry</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium">Hours</label>
          <input
            type="number"
            step="0.1"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
