import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-3 mb-6">Page not found</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}