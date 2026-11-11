import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const ruralSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    rural: { type: String, required: true },
    time: { type: String, required: true },
});

export const ruraldevelopment = mongoose.model("ruraldevelopment", ruralSchema);

export default connectDb;