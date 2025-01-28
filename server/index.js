import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./db_connection/dbConnection.js";
import userRouter from "./routes/user.route.js";
import imageRouter from "./routes/imageRoute.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
}));

// setup routes
app.get("/", (_, res) => res.send("API working"));

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);


//db connection
dbConnection()

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
