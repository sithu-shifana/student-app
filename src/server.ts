import app from "./app";
import mongoose from "mongoose";

async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/studentdb");
    console.log("MongoDB connected");

    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();
