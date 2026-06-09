import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";

export default function NewPost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [status, setStatus] = useState("draft");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createBlog({ title, subtitle, description, category, status });
      setSuccess(true);
      setTimeout(() => navigate("/posts"), 1500); // go to posts after 1.5s
    } catch (err) {
      // show the error message from your Express API
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Create New Blog
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill in the details and publish your blog
          </p>
        </div>
        <button
          onClick={() => navigate("/posts")}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          ← Back
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
          ✅ Blog created successfully! Redirecting...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          ❌ {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              required
              className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subtitle
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A short description of your blog..."
              className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your blog content here..."
              rows={8}
              className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
            {/* Character count */}
            <p className="text-xs text-gray-400 mt-1 text-right">
              {description.length} characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="MongoDB">MongoDB</option>
              <option value="Express">Express</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-700" />

          {/* Buttons — Save Draft on left, Publish on right */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/posts")}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              {/* Save as Draft */}
              <button
                type="button"
                disabled={loading}
                onClick={() => { setStatus("draft"); setTimeout(() => document.querySelector("form").requestSubmit(), 0); }}
                className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Save Draft
              </button>

              {/* Publish */}
              <button
                type="button"
                disabled={loading}
                onClick={() => { setStatus("published"); setTimeout(() => document.querySelector("form").requestSubmit(), 0); }}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
              >
                {loading ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}