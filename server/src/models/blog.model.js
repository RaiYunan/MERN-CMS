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
    slug: {
      type: String,
      unique: true,
    },
    coverImage: {
      type: String, 
    },
    category: {
      type: String,
      enum: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Other"],
      default: "Other",
    },
    tags: {
      type: [String], 
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: String,
      default: "Admin",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } 
);

export const Blog = mongoose.model("Blog", blogSchema);