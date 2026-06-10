import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Monitor, Type, Bell, Shield, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  const { dark, setDark } = useTheme();

  function handleSave() {
    toast.success("Settings saved.");
  }

  function handleDangerAction(label) {
    toast.error(`${label} - not implemented yet.`);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your CMS preferences
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* ── Appearance ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Monitor size={15} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Appearance
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">

            {/* Theme toggle */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Theme
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Switch between light and dark mode
                </p>
              </div>
              {/* Toggle switch */}
              <button
                onClick={() => setDark(!dark)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
                  dark ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                    dark ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Current theme indicator */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Current Mode
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Active theme applied to the interface
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                {dark ? (
                  <>
                    <Moon size={14} className="text-blue-500" />
                    Dark
                  </>
                ) : (
                  <>
                    <Sun size={14} className="text-yellow-500" />
                    Light
                  </>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ── General ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Type size={15} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              General
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">

            {/* Site name */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Site Name
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Displayed in the navbar
                </p>
              </div>
              <input
                type="text"
                defaultValue="CMS Panel"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Posts per page */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    Posts Per Page
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Number of blogs shown in listing
                  </p>
                </div>
              </div>
              <select
                defaultValue="10"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            {/* Default status */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Default Post Status
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Status applied when creating a new blog
                </p>
              </div>
              <select
                defaultValue="draft"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

          </div>
        </section>

        {/* ── Notifications ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Bell size={15} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Notifications
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">

            {[
              { label: "Blog Published", desc: "Notify when a blog is published" },
              { label: "Blog Deleted", desc: "Notify when a blog is deleted" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                {/* Static toggle — wire up with state when needed */}
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white shadow transition-transform" />
                </button>
              </div>
            ))}

          </div>
        </section>

        {/* ── Danger Zone ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={15} className="text-red-400" />
            <h2 className="text-xs font-semibold text-red-400 uppercase tracking-wider">
              Danger Zone
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900/50 divide-y divide-red-100 dark:divide-red-900/30">

            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Delete All Drafts
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Permanently remove all draft blogs
                </p>
              </div>
              <button
                onClick={() => handleDangerAction("Delete All Drafts")}
                className="inline-flex items-center gap-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 size={14} />
                Delete Drafts
              </button>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Reset CMS
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Delete all blogs and reset to default
                </p>
              </div>
              <button
                onClick={() => handleDangerAction("Reset CMS")}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                <Trash2 size={14} />
                Reset
              </button>
            </div>

          </div>
        </section>

        {/* Save button */}
        <div className="flex justify-end pb-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}