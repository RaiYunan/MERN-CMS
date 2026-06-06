import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "Getting Started with React", category: "React", status: "Published" },
  { id: 2, title: "MERN Stack Auth Guide", category: "Node.js", status: "Draft" },
  { id: 3, title: "MongoDB Aggregation", category: "MongoDB", status: "Published" },
  { id: 4, title: "REST API Best Practices", category: "Express", status: "Published" },
];

export default function Posts() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Posts</h1>
        <Link
          to="/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{post.title}</p>
              <p className="text-sm text-gray-400 mt-1">{post.category}</p>
            </div>
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
      </div>
    </div>
  );
}