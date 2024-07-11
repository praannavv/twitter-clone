import express from "express";
import conf from "./conf/conf.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js'
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
  cloud_name: conf.CLOUDINARY_CLOUD_NAME, 
  api_key: conf.CLOUDINARY_API_KEY, 
  api_secret: conf.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


const app = express();
const PORT = conf.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use('/api/users',userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
