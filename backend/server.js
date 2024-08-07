import express from "express";
import path from "path";
import conf from "./conf/conf.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import notificationRoutes from "./routes/notification.routes.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { v2 as cloudinary } from "cloudinary";

dotenv.config()
cloudinary.config({
  cloud_name: conf.CLOUDINARY_CLOUD_NAME,
  api_key: conf.CLOUDINARY_API_KEY,
  api_secret: conf.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});


const app = express();
const PORT = conf.PORT || 8000;
const __dirname = path.resolve();
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notification", notificationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
