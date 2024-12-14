import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user and save to db
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new User(userData);
    const user = await newUser.save();

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error(`Error while registering user: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    //match the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(`Error while login user: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};

//user credits
const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    res.json({ success: true, credits: user.creditBalance, user: user.name });
  } catch (error) {
    console.error(`Error while user credits: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, userCredits };
