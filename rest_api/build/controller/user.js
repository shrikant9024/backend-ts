"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignup = handleSignup;
exports.handleLogin = handleLogin;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../jwt");
function handleSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, firstname, password } = req.body;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).send('user already registered');
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield user_1.default.create({
            email, password: hashedPassword, firstname
        });
        return res.status(201).json({ msg: "user registration successfull" });
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Find the user by email
            const loginUser = yield user_1.default.findOne({ email });
            if (!loginUser) {
                return res.status(404).json({ msg: "User not found" });
            }
            // Compare the password with the hashed password
            const match = yield bcrypt_1.default.compare(password, loginUser.password);
            if (!match) {
                return res.status(401).json({ error: "Wrong password" });
            }
            // Create a JWT token
            const accessToken = (0, jwt_1.createToken)(loginUser);
            // Set the token in a cookie
            res.cookie("jwt", accessToken, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true, // Prevent client-side access to the cookie
            });
            // Respond with success message
            return res.status(200).json({
                msg: "Login successful",
                user: {
                    email: loginUser.email,
                    // Avoid sending sensitive information like password
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
