import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, deleteBlog } from "../services/blogService";
import { Plus, Pencil, Trash2, Tag, Calendar, FileText } from "lucide-react";

export default function Posts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchBlogs() {
    getAllBlogs()
      .then((res) => {
        setBlogs(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    deleteBlog(id)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => {
        alert("Failed to delete: " + err.message);
      });
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (loading)
    return <p className="text-gray-500 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              All Blogs
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 pl-4">
            {blogs.length} {blogs.length === 1 ? "blog" : "blogs"} published
          </p>
        </div>
        <Link
          to="/posts/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          <Plus size={16} />
          New Blog
        </Link>
      </div>

      {/* Blog List */}
      <div className="space-y-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {blog.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md font-medium ${
                      blog.status === "published"
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        blog.status === "published"
                          ? "bg-green-500"
                          : "bg-amber-500"
                      }`}
                    ></span>
                    {blog.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {blog.subtitle}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag size={14} />
                    {blog.category || "Other"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-1">
                <Link
                  to={`/posts/${blog._id}/edit`}
                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText
                size={40}
                className="text-gray-300 dark:text-gray-600"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              No blogs written yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Get started by creating your first blog post
            </p>
            <Link
              to="/posts/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Plus size={16} />
              Create First Blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
