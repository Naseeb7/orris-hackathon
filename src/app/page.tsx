import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* App Title */}
      <h1 className="text-4xl font-bold mb-4">⏱️ TimeTracker</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Manage tasks, log hours, and get insights into your team’s productivity.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          View Dashboard
        </Link>
        <Link
          href="/tasks"
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Manage Tasks
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400">
        Built with ❤️ using Next.js & TailwindCSS
      </footer>
    </main>
  );
}
