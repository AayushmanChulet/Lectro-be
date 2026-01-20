import transcribe from "../../utils/transcribe";
import { Request, response, Response } from "express";
import z from "zod";
import { aiRequest } from "../../utils/useAi";
import { cleanJsonString } from "../../utils/parseJson";

const notesSchema = z.object({
  link: z.string(),
});

type notesType = z.infer<typeof notesSchema>;

export const notesController = async (req: Request, res: Response) => {
  const { link } = req.params;

  if (!link) {
    return res.status(403).json({
      message: "Invalid input",
      status: "rejected",
      data: {},
    });
  }

  const transcription = await transcribe(link as string);

  const notes = await aiRequest({ type: "notes", transcription });

  res.status(200).json({
    message: "notes generated successfully",
    status: "success",
    data: notes,
  });
};

const flashcardSchema = z.object({
  link: z.string(),
});

type flashCardsType = z.infer<typeof flashcardSchema>;

export const flashcardController = async (req: Request, res: Response) => {
  const { link } = req.params;

  if (!link) {
    return res.status(403).json({
      message: "Invalid input",
      status: "rejected",
      data: {},
    });
  }

  const transcription = await transcribe(link as string);

  const rawFlashCardsResponse = await aiRequest({
    type: "flashCards",
    transcription,
  });

  const flashCardsResponse = cleanJsonString(rawFlashCardsResponse);

  let flashCards: any[];

  try {
    flashCards = JSON.parse(flashCardsResponse);
  } catch (err) {
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
};

const summarySchema = z.object({
  link: z.string(),
});

type summaryType = z.infer<typeof summarySchema>;

export const summaryController = async (req: Request, res: Response) => {
  const { link } = req.params;

  if (!link) {
    return res.status(403).json({
      message: "Invalid input",
      status: "rejected",
      data: {},
    });
  }

  const transcription = await transcribe(link as string);

  const summary = await aiRequest({ type: "summary", transcription });

  res.status(200).json({
    message: "summary generated successfully",
    status: "success",
    data: summary,
  });
};

const quizSchema = z.object({
  link: z.string(),
});

type QuizType = z.infer<typeof summarySchema>;

export const quizController = async (req: Request, res: Response) => {
  const { link } = req.params;

  if (!link) {
    return res.status(403).json({
      message: "Invalid input",
      status: "rejected",
      data: {},
    });
  }

  const transcription = await transcribe(link as string);

  const rawQuizResponse = await aiRequest({ type: "quiz", transcription });
  const quizResponse = cleanJsonString(rawQuizResponse);

  console.log(quizResponse);
  let quiz: any[];
  try {
    quiz = JSON.parse(quizResponse);
  } catch (err) {
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
};

const chatSchema = z.object({
  party: z.enum(["user", "bot"]),
  message: z.string(),
});

const ChatbotSchema = z.object({
  link: z.string(),
  lastChats: z.array(chatSchema),
  currMessage: z.string(),
});

type ChatBot = z.infer<typeof ChatbotSchema>;

export const chatBotController = async (req: Request, res: Response) => {
  const { success, error } = ChatbotSchema.safeParse(req.body);
  if (!success) {
    console.log("error : ", error.errors);
    return res.status(403).json({
      message: "Invalid input",
      status: "rejected",
      data: {},
    });
  }

  const { link, lastChats, currMessage }: ChatBot = req.body;

  const transcription = await transcribe(link as string);

  const chatResponse = await aiRequest({
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
};

export const promptSummrize = async (req: Request, res: Response) => {
  const { link } = req.params;

  if (!link) {
    return res.status(403).json({
      message: "Invalid input",
      status: "rejected",
      data: {},
    });
  }

  const transcription = await transcribe(link as string);
  const getSummarizeTranscription = await aiRequest({
    type: "summarizeTranscription",
    transcription,
  });

  res.status(200).json({
    message: "transcription generated successfully",
    status: "success",
    data: getSummarizeTranscription,
  });
}
