import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBlogById } from "../services/blogService";
import { ArrowLeft, Tag, Calendar, User, Eye, Pencil } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBlogById(id)
      .then((res) => {
        setBlog(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, [id]);

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3 text-gray-500 dark:text-gray-400 text-sm">
          Loading blog...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye size={32} className="text-red-400" />
        </div>
        <p className="text-red-500 dark:text-red-400 mb-4 font-medium">
          {error}
        </p>
        <button
          onClick={() => navigate("/posts")}
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Posts
        </button>
      </div>
    );

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/posts")}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to all blogs
      </button>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-md font-medium ${
              blog.status === "published"
                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                blog.status === "published" ? "bg-green-500" : "bg-amber-500"
              }`}
            ></span>
            {blog.status === "published" ? "Published" : "Draft"}
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Tag size={14} />
            {blog.category || "Uncategorized"}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {blog.title}
        </h1>

        {blog.subtitle && (
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {blog.subtitle}
          </p>
        )}
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <span className="inline-flex items-center gap-2">
          <User size={16} />
          {blog.author || "Anonymous"}
        </span>
        <span className="inline-flex items-center gap-2">
          <Calendar size={16} />
          {formatDate(blog.createdAt)}
        </span>
        {blog.views !== undefined && (
          <span className="inline-flex items-center gap-2">
            <Eye size={16} />
            {blog.views} views
          </span>
        )}
      </div>

      {/* Blog Content */}
      {blog.description ? (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {blog.description}
        </p>
      ) : (
        <p className="text-gray-400 dark:text-gray-500 italic">
          No content available for this blog post.
        </p>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
        

        {blog.status === "draft" && (
          <Link
            to={`/posts/${blog._id}/edit`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <Pencil size={16} />
            Edit Blog
          </Link>
        )}
      </div>
    </div>
  );
}
