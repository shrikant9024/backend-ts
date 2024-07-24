"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const jwt_1 = require("../jwt");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("server");
});
router.get('/login', jwt_1.validateToken, (req, res) => {
    res.send('login');
});
router.post("/signup", user_1.handleSignup);
router.post("/login", user_1.handleLogin);
exports.default = router;
