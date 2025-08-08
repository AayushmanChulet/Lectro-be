import express from 'express'
import { chatBotController, flashcardController, notesController, quizController, summaryController } from '../../controller/app/aiController';
import { quizPrompt } from '../../static/prompts';

const router = express.Router();

router.get("/notes/:link", notesController);
router.get("/flashcards/:link", flashcardController);
router.get("/summary/:link", summaryController);
router.get("/quiz/:link", quizController);
router.post("/chat", chatBotController)

export default router;