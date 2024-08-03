import express from "express";
import conf from "./conf/conf.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import notificationRoutes from "./routes/notification.routes.js"
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: conf.CLOUDINARY_CLOUD_NAME,
  api_key: conf.CLOUDINARY_API_KEY,
  api_secret: conf.CLOUDINARY_API_SECRET,
});


const app = express();
const PORT = conf.PORT || 8000;

app.use(cookieParser());
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notification",notificationRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
