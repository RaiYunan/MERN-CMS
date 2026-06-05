import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { Blog } from "./models/blog.model.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MONGODB CONNECTION SUCCESSFUL!!\n MONGODB HOST :- ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error("Error : ", error);
        process.exit(1);
    }
}

connectDB();

app.get("/", (req, res) => {
    res.send("Can Portugal win the world cup 2026?");
});

//create blog api
app.post("/createBlog", async (req, res) => {
    const { title, subtitle, description } = req.body
    if (!req.body.title) {
        return res.status(400).json({
            message: "Title field is required.."
        })
    }
    const duplicateBlog = await Blog.find({ title: title });
    if (duplicateBlog) {
        return res.status(400).json({
            message: "The blog is already created.."
        })
    }
    try {
        const blog = await Blog.create({
            title: title,
            subTitle: subtitle,
            description: description
        })


        res.status(201).json({
            message: 'Blog created Sucessfully',
            data: blog,
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating blog",
            error: error.message
        })
    }
})

//get api=> fetch all blogs
app.get("/blogs", async (req, res) => {
    const blogData = await Blog.find()

    if (blogData.length == 0) {
        return res.status(404).json({
            message: "No blogs is found"
        })
    }

    res.status(200).json({
        message: "Blogs fetched successfully.",
        data: blogData,
        length: blogData.length
    })
})

//get api=> single blog
app.get("/blog/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const blogData = await Blog.findById(userId);

        if (!blogData) {
            return res.status(404).json({
                message: "No blog found."
            });
        }

        res.status(200).json({
            message: "Blog fetched successfully.",
            data: blogData
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

//update blpg api
app.patch("/blog/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const updatedBlog = await Blog.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedBlog) {
            return res.status(404).json({
                message: "No blog found."
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


//delete api blog
app.delete("/blog/:id", async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await Blog.findByIdAndDelete(blogId);


        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog is not found"
            })
        }

        res.status(200).json({
            messgae: "Blog deleted Successfully",
            data: deletedBlog
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});