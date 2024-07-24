"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = 8000;
mongoose_1.default.connect("mongodb://127.0.0.1:27017/user-ts").then(() => console.log('mongodb connected')).catch(err => console.log('Mongo error', err));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/", user_1.default);
app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));
