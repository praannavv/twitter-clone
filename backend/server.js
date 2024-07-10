import express from "express";
import conf from "./conf/conf.js";
import authRouter from "./routes/auth.routes.js";
import { connect } from "mongoose";
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
const PORT = conf.PORT || 8000



app.use(
  "/api/auth",
  authRouter
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}` );
  connectMongoDB();
});
