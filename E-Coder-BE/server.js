import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import cors from "cors";
import bodyParser from "body-parser";
import courseRouter from "./Routes/courseRouter.js";
import userRouter from "./Routes/UserRoutes.js";

// import categoryRouter from "./Routes/categoryRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(express.static("public"));

// API
app.use("/api/course", courseRouter);
app.use("/api/users", userRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
