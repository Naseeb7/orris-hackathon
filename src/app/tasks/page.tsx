"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/shared/TaskCard";
import { Task } from "@/types";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, project }),
        headers: { "Content-Type": "application/json" },
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle("");
      setProject("");
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {loading && <FullScreenLoader />}

      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {/* Add Task Form */}
      <div className="flex gap-3 flex-col md:flex-row">
        <input
          className="border p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onTaskUpdated={loadTasks} />
        ))}
      </div>
    </div>
  );
}
