import express from 'express'
import { chatBotController, flashcardController, notesController, quizController, summaryController } from '../../controller/app/aiController';
import { quizPrompt } from '../../static/prompts';

const router = express.Router();

router.get("/notes", notesController);
router.get("/flashcards", flashcardController);
router.get("/summary", summaryController);
router.get("/quiz", quizController);
router.get("/chat", chatBotController)

export default router;