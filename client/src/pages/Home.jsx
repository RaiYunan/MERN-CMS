import { Link } from "react-router-dom";

const stats = [
  { label: "Total Posts", value: 24 },
  { label: "Published", value: 18 },
  { label: "Drafts", value: 6 },
];

const recentPosts = [
  { id: 1, title: "Getting Started with React", status: "Published" },
  { id: 2, title: "MERN Stack Guide", status: "Draft" },
  { id: 3, title: "MongoDB Basics", status: "Published" },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700"
          >
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-white">Recent Posts</h2>
          <Link to="/posts/new" className="text-sm text-blue-600 hover:underline">
            + New Post
          </Link>
        </div>

        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
          >
            <span className="text-gray-700 dark:text-gray-200">{post.title}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                post.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {post.status}
            </span>
          </div>
        ))}

        <div className="px-5 py-3">
          <Link to="/posts" className="text-sm text-blue-600 hover:underline">
            View all posts →
          </Link>
        </div>
      </div>
    </div>
  );
}