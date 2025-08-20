"use client";
import Link from "next/link";
import LogoutButton from "../ui/LogoutButton";

export default function Navbar() {
  return (
    <nav className="bg-white/80 shadow-sm border-b sticky top-0">
      <div className=" px-8 py-3 flex justify-between items-center text-black">
        <Link href={"/"}>
          <h1 className="text-lg font-bold">⏱️ TimeTracker</h1>
        </Link>
        <div className="flex gap-4 items-center text-md">
          <Link href="/tasks" className="hover:text-blue-600">
            Tasks
          </Link>
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
