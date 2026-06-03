import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const app = express();
const port = 3000;


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
+
app.get("/", (req, res) => {
    res.send("Can Portugal win the world cup 2026?");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});