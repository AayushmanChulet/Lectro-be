"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/v1/index"));
const app = (0, express_1.default)();
app.use("/api/v1/", index_1.default);
app.listen(3000, () => {
    console.log('server is live at port 3000');
});
