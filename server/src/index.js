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
    try {
        const blog = await Blog.create({
            title: title,
            subTitle: subtitle,
            description: description
        })

        res.status(201).json({
            message: 'Blog created Sucessfully',
            data: blog
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating blog",
            error: error.message
        })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});