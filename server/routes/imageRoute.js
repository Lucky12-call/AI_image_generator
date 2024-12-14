import { generateImage } from "../controllers/image.controller.js";
import express from "express";
import userAuth from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post("/generate-image", userAuth, generateImage);

export default imageRouter;