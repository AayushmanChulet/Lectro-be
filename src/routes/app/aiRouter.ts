import express from 'express'
import { chatBotController, flashcardController, notesController, promptSummrize, quizController, summaryController } from '../../controller/app/aiController';

const router = express.Router();

router.get("/notes/:link", notesController);
router.get("/flashcards/:link", flashcardController);
router.get("/summary/:link", summaryController);
router.get("/quiz/:link", quizController);
router.post("/chat", chatBotController);
router.get("/transcription/:link", promptSummrize)

export default router;