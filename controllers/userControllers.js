import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.findOne({ email: email }).then((user) => {
            if (user) {
                res.status(409).json({ message: "User already exists" });
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                const newUser = new User({ username: name, email, password: hash });
                newUser.save();
                res.status(201).json("User created successfully");
            }
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.findOne({ email: email }).then((user) => {
            if (user) {
                const isMatch = bcrypt.compareSync(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "1d" });
                    res.status(200).send({ msg: "User logged in successfully", code: token});
                } else {
                    res.status(401).json("Invalid credentials");
                }
            } else {
                res.status(404).json("User not found");
            }
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const currentUser = async (req, res) => {
    try {
        res.json(req.user);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
}