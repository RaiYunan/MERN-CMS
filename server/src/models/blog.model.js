import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Technology",
        "Programming",
        "Web Development",
        "Mobile Development",
        "AI & Machine Learning",
        "Database",
        "DevOps",
        "Cybersecurity",
        "Design & UI/UX",
        "Career & Productivity",
        "Tutorial",
        "News & Trends",
        "Opinion",
        "Other",
      ],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);