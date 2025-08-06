"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiRouter_1 = __importDefault(require("../app/aiRouter"));
const router = express_1.default.Router();
router.use("/app", aiRouter_1.default);
exports.default = router;
