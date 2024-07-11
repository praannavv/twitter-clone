import dotenv from 'dotenv'
dotenv.config()
const conf = {
  MONGO_URL: String(process.env.MONGO_URL),
  PORT:String(process.env.PORT),
  JWT_SECRET:String(process.env.JWT_SECRET),
  NODE_ENV:String(process.env.NODE_ENV),
  CLOUDINARY_CLOUD_NAME:String(process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY:String(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET:String(process.env.CLOUDINARY_API_SECRET)
};

export default conf;
