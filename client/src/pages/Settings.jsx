import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { dark, setDark } = useTheme();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        {/* Theme */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="font-medium text-gray-800 dark:text-white">Theme</p>
            <p className="text-sm text-gray-400">Switch between light and dark</p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded text-sm"
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Site Name */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="font-medium text-gray-800 dark:text-white">Site Name</p>
            <p className="text-sm text-gray-400">Shown in the navbar</p>
          </div>
          <input
            type="text"
            defaultValue="CMS Panel"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded px-3 py-1 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Posts per page */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="font-medium text-gray-800 dark:text-white">Posts per page</p>
            <p className="text-sm text-gray-400">How many posts to show</p>
          </div>
          <select
            defaultValue="10"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
}