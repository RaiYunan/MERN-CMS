import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../services/blogService";
import { FileText, CheckCircle, FilePen, Plus, Tag, Calendar, ArrowUpRight, Sparkles } from "lucide-react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs()
      .then((res) => {
        setBlogs(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalBlogs = blogs.length;
  const published = blogs.filter((b) => b.status === "published").length;
  const drafts = blogs.filter((b) => b.status === "draft").length;
  const recentBlogs = blogs.slice(0, 5);

  const stats = [
    {
      label: "Total Blogs",
      value: totalBlogs,
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      border: "border-indigo-100 dark:border-indigo-500/20",
    },
    {
      label: "Published",
      value: published,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-100 dark:border-emerald-500/20",
    },
    {
      label: "Drafts",
      value: drafts,
      icon: FilePen,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-100 dark:border-amber-500/20",
    },
  ];

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Greeting Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">👋</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here's a quick look at your writing journey
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.border} border rounded-2xl p-5 transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon size={18} className={stat.color} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </span>
              </div>
              {loading ? (
                <div className="h-9 w-16 bg-white/50 dark:bg-gray-700/50 rounded-lg animate-pulse" />
              ) : (
                <p className={`text-3xl font-bold tracking-tight ${stat.color}`}>
                  {stat.value}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent posts
            </h2>
          </div>
          {blogs.length > 5 && (
            <Link
              to="/posts"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              View all
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          {loading ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-6 py-4 space-y-2">
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-50 dark:bg-gray-700/50 rounded w-1/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : recentBlogs.length > 0 ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {recentBlogs.map((blog, index) => (
                <Link
                  to={`/posts/${blog._id}`}
                  key={blog._id}
                  className="flex items-center gap-5 px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group relative"
                >
                  {/* Number indicator */}
                  <span className="text-xs font-mono text-gray-300 dark:text-gray-600 w-4 text-right">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate mb-1">
                      {blog.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <Tag size={10} />
                        {blog.category || "Uncategorized"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={10} />
                        {formatDate(blog.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                        blog.status === "published"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        blog.status === "published" ? "bg-emerald-500" : "bg-amber-500"
                      }`}></span>
                      {blog.status === "published" ? "Live" : "Draft"}
                    </span>
                    <ArrowUpRight 
                      size={14} 
                      className="text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Your blog canvas awaits
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
                Tap the button below to start writing
              </p>
              <Link
                to="/posts/new"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                <Plus size={15} />
                Write your first post
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Floating write button for mobile */}
      <Link
        to="/posts/new"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors sm:hidden"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}