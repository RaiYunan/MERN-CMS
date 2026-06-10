import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/blogService";
import toast from "react-hot-toast";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [status, setStatus] = useState("draft");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBlogById(id)
      .then((res) => {
        const blog = res.data.data;
        setTitle(blog.title || "");
        setSubtitle(blog.subtitle || "");
        setDescription(blog.description || "");
        setCategory(blog.category || "Other");
        setStatus(blog.status || "draft");
        setFetching(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load blog.");
        setFetching(false);
      });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await updateBlog(id, { title, subtitle, description, category, status });
      toast.success("Blog updated successfully!");
      setTimeout(() => navigate("/posts"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update blog.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3 text-gray-500 dark:text-gray-400 text-sm">
          Loading blog...
        </p>
      </div>
    );

  if (error) return <p className="text-red-500 text-sm">Error: {error}</p>;
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Blog
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Update the details and save your changes
          </p>
        </div>
        <button
          onClick={() => navigate("/posts")}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          ← Back
        </button>
      </div>

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
              <option value="Technology">Technology</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="AI & Machine Learning">
                AI & Machine Learning
              </option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Design & UI/UX">Design & UI/UX</option>
              <option value="Career & Productivity">
                Career & Productivity
              </option>
              <option value="Tutorial">Tutorial</option>
              <option value="News & Trends">News & Trends</option>
              <option value="Opinion">Opinion</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-700" />

          {/* Buttons */}
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
                onClick={() => {
                  setStatus("draft");
                  setTimeout(
                    () => document.querySelector("form").requestSubmit(),
                    0,
                  );
                }}
                className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Save Draft
              </button>

              {/* Update */}
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setStatus("published");
                  setTimeout(
                    () => document.querySelector("form").requestSubmit(),
                    0,
                  );
                }}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
              >
                {loading ? "Saving..." : "Update & Publish"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
