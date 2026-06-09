import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Blog } from "./models/blog.model.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "http://localhost:5173"
}));


// Database Connection
async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGO_DB_URI
        );

        console.log(
            `MONGODB CONNECTION SUCCESSFUL!!\nMONGODB HOST :- ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1);
    }
}

connectDB();

// Home Route
app.get("/", (req, res) => {
    res.send("Can Portugal win the World Cup 2026?");
});

// Create Blog
app.post("/createBlog", async (req, res) => {
    try {
        const { title, subTitle, description, category, status } = req.body; 

        if (!title) {
            return res.status(400).json({
                message: "Title is required."
            });
        }

        const duplicateBlog = await Blog.findOne({ title });

        if (duplicateBlog) {
            return res.status(409).json({
                message: "A blog with this title already exists."
            });
        }

        const blog = await Blog.create({
            title,
            subTitle,
            description,
            category,                                 
            status: status || "draft",                 
        });

        res.status(201).json({
            message: "Blog created successfully.",
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get All Blogs
app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();

        if (blogs.length === 0) {
            return res.status(404).json({
                message: "No blogs found."
            });
        }

        res.status(200).json({
            message: "Blogs fetched successfully.",
            count: blogs.length,
            data: blogs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get Single Blog
app.get("/blog/:id", async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                message: "Invalid blog ID."
            });
        }

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        res.status(200).json({
            message: "Blog fetched successfully.",
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update Blog
app.patch("/blog/:id", async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                message: "Invalid blog ID."
            });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        res.status(200).json({
            message: "Blog updated successfully.",
            data: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete Blog
app.delete("/blog/:id", async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                message: "Invalid blog ID."
            });
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully.",
            data: deletedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});