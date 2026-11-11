import express from "express";
import connectDb, { ruraldevelopment } from "./database/db.js";

const app = express();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
    res.send("RURAL DEVELOPMENT WEBSITE IS RUNNING..");
});

// Save data
app.post("/add", async (req, res) => {
    try {
        const data = await ruraldevelopment.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all data
app.get("/all", async (req, res) => {
    try {
        const data = await ruraldevelopment.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(4500, () => {
    console.log("server running on the port 4500...");
});