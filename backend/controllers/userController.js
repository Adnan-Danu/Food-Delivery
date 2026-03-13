import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

// SIGNUP: Save data to MongoDB
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "User already exists" });

        // Hashing password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.json({ success: true, message: "Registration Successful!" });
    } catch (error) {
        res.json({ success: false, message: "Error saving data" });
    }
};

// LOGIN: Check data in MongoDB
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

        res.json({ success: true, message: "Login successful", name: user.name });
    } catch (error) {
        res.json({ success: false, message: "Login error" });
    }
};

export { loginUser, registerUser };