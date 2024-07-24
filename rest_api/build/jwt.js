"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const crypto_1 = __importDefault(require("crypto"));
const secret = crypto_1.default.randomBytes(11).toString('hex');
const createToken = (user) => {
    const accessToken = (0, jsonwebtoken_1.sign)({
        email: user.email,
        firstname: user.firstname,
        password: user.password
    }, secret);
    return accessToken;
};
exports.createToken = createToken;
//middleware
// export interface authenticatedRequest extends Request{
//             authenticated:boolean
//         }
const validateToken = (req, res, next) => {
    const vaccessToken = req.cookies.jwt;
    if (!vaccessToken) {
        return res.status(401).json({ error: "user is not authenticated" });
    }
    try {
        const validToken = (0, jsonwebtoken_1.verify)(vaccessToken, secret);
        if (validToken)
            return next();
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
};
exports.validateToken = validateToken;
