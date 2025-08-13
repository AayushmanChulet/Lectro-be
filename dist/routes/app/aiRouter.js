"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiController_1 = require("../../controller/app/aiController");
const router = express_1.default.Router();
router.get("/notes/:link", aiController_1.notesController);
router.get("/flashcards/:link", aiController_1.flashcardController);
router.get("/summary/:link", aiController_1.summaryController);
router.get("/quiz/:link", aiController_1.quizController);
router.post("/chat", aiController_1.chatBotController);
router.get("/transcription/:link", aiController_1.promptSummrize);
exports.default = router;
