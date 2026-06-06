import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
      <span className="font-bold text-lg text-gray-800 dark:text-white cursor-pointer">
        CMS Panel
      </span></Link>

      {/* Nav Links */}
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="/posts/new"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
          }
        >
          New Post
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
          }
        >
          Settings
        </NavLink>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded text-sm cursor-pointer"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}