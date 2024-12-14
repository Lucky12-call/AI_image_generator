import { User } from "../models/user.model.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await User.findById(userId);

    if (!user || !prompt) {
      res.json({ success: false, message: "Missing details" });
    }

    if (user.creditBalance === 0 || user.creditBalance < 0) {
      res.json({ success: false, message: "No credit balance" });
    }

    //multipart form data
    const fromData = new FormData();
    fromData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      fromData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(`error while generating image: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};