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
exports.promptSummrize = exports.chatBotController = exports.quizController = exports.summaryController = exports.flashcardController = exports.notesController = void 0;
const transcribe_1 = __importDefault(require("../../utils/transcribe"));
const zod_1 = __importDefault(require("zod"));
const useAi_1 = require("../../utils/useAi");
const parseJson_1 = require("../../utils/parseJson");
const notesSchema = zod_1.default.object({
    link: zod_1.default.string(),
});
const notesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link } = req.params;
    if (!link) {
        return res.status(403).json({
            message: "Invalid input",
            status: "rejected",
            data: {},
        });
    }
    const transcription = yield (0, transcribe_1.default)(link);
    const notes = yield (0, useAi_1.aiRequest)({ type: "notes", transcription });
    res.status(200).json({
        message: "notes generated successfully",
        status: "success",
        data: notes,
    });
});
exports.notesController = notesController;
const flashcardSchema = zod_1.default.object({
    link: zod_1.default.string(),
});
const flashcardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link } = req.params;
    if (!link) {
        return res.status(403).json({
            message: "Invalid input",
            status: "rejected",
            data: {},
        });
    }
    const transcription = yield (0, transcribe_1.default)(link);
    const rawFlashCardsResponse = yield (0, useAi_1.aiRequest)({
        type: "flashCards",
        transcription,
    });
    const flashCardsResponse = (0, parseJson_1.cleanJsonString)(rawFlashCardsResponse);
    let flashCards;
    try {
        flashCards = JSON.parse(flashCardsResponse);
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            status: "rejected",
            data: {},
        });
        throw new Error("Something went wrong while processing flashcards.");
    }
    res.status(200).json({
        message: "flashcard generated successfully",
        status: "success",
        data: flashCards,
    });
});
exports.flashcardController = flashcardController;
const summarySchema = zod_1.default.object({
    link: zod_1.default.string(),
});
const summaryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link } = req.params;
    if (!link) {
        return res.status(403).json({
            message: "Invalid input",
            status: "rejected",
            data: {},
        });
    }
    const transcription = yield (0, transcribe_1.default)(link);
    const summary = yield (0, useAi_1.aiRequest)({ type: "summary", transcription });
    res.status(200).json({
        message: "summary generated successfully",
        status: "success",
        data: summary,
    });
});
exports.summaryController = summaryController;
const quizSchema = zod_1.default.object({
    link: zod_1.default.string(),
});
const quizController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link } = req.params;
    if (!link) {
        return res.status(403).json({
            message: "Invalid input",
            status: "rejected",
            data: {},
        });
    }
    const transcription = yield (0, transcribe_1.default)(link);
    const rawQuizResponse = yield (0, useAi_1.aiRequest)({ type: "quiz", transcription });
    const quizResponse = (0, parseJson_1.cleanJsonString)(rawQuizResponse);
    console.log(quizResponse);
    let quiz;
    try {
        quiz = JSON.parse(quizResponse);
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            status: "rejected",
            data: {},
        });
        throw new Error("Something went wrong while processing quiz.");
    }
    res.status(200).json({
        message: "quiz generated successfully",
        status: "success",
        data: quiz,
    });
});
exports.quizController = quizController;
const chatSchema = zod_1.default.object({
    party: zod_1.default.enum(["user", "bot"]),
    message: zod_1.default.string(),
});
const ChatbotSchema = zod_1.default.object({
    link: zod_1.default.string(),
    lastChats: zod_1.default.array(chatSchema),
    currMessage: zod_1.default.string(),
});
const chatBotController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, error } = ChatbotSchema.safeParse(req.body);
    if (!success) {
        console.log("error : ", error.errors);
        return res.status(403).json({
            message: "Invalid input",
            status: "rejected",
            data: {},
        });
    }
    const { link, lastChats, currMessage } = req.body;
    const transcription = yield (0, transcribe_1.default)(link);
    const chatResponse = yield (0, useAi_1.aiRequest)({
        type: "chatbot",
        transcription,
        prevResponses: lastChats,
        userInput: currMessage,
    });
    res.status(200).json({
        message: "chat generated successfully",
        status: "success",
        data: chatResponse,
    });
});
exports.chatBotController = chatBotController;
const promptSummrize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link } = req.params;
    if (!link) {
        return res.status(403).json({
            message: "Invalid input",
            status: "rejected",
            data: {},
        });
    }
    const transcription = yield (0, transcribe_1.default)(link);
    const getSummarizeTranscription = yield (0, useAi_1.aiRequest)({
        type: "summarizeTranscription",
        transcription,
    });
    res.status(200).json({
        message: "transcription generated successfully",
        status: "success",
        data: getSummarizeTranscription,
    });
});
exports.promptSummrize = promptSummrize;
