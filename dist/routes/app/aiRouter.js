"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiController_1 = require("../../controller/app/aiController");
const router = express_1.default.Router();
router.get("/notes", aiController_1.notesController);
router.get("/flashcards", aiController_1.flashcardController);
router.get("/summary", aiController_1.summaryController);
router.get("/quiz", aiController_1.quizController);
router.get("/chat", aiController_1.chatBotController);
exports.default = router;
