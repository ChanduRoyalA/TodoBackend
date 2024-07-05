import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({ message: "Incorrect password" })
        }

        res.status(200).json({ message: "logged in successfully", token: user._id });

    } catch (error) {
        console.log(`error in Login: ${error}`);
        res.status(500).json({ message: error.message });
    }
}

export const signup = async (req, res) => {

    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already taken" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = await User({
            username,
            password: hashPass,
        })

        await newUser.save();

        res.status(200).json({ message: "SignedUp successfully", newUser })
    }
    catch (error) {
        console.log(`error in SignUp: ${error}`);
        res.status(500).json({ message: error.message });
    }

}