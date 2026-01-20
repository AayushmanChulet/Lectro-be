import { GoogleGenAI } from "@google/genai";
import {
  chatBotPrompt,
  flashCardsPrompt,
  notesPrompt,
  quizPrompt,
  summaryPrompt,
  transcriptionSummary,
} from "../static/prompts";

interface PrevResponses {
  party: "user" | "bot";
  message: string;
}

interface Props {
  type: "notes" | "flashCards" | "chatbot" | "summary" | "quiz" | "summarizeTranscription";
  transcription: string;
  userInput?: string;
  prevResponses?: PrevResponses[];
}

const prompt = {
  chatbot: chatBotPrompt,
  notes: notesPrompt,
  flashCards: flashCardsPrompt,
  summary: summaryPrompt,
  quiz: quizPrompt,
  summarizeTranscription : transcriptionSummary
};

function chunkText(text: string, maxChars = 4000) {
  const sentences = text.split(/(?<=[.?!])\s+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChars) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + " ";
      continue;
    }
    currentChunk += sentence + " ";
  }
  if (currentChunk) chunks.push(currentChunk.trim());

  return chunks;
}

export async function aiRequest(props: Props) {
  const aiReqest = {
    notes: `${prompt[props.type]}\n\n**Content from the Video**:${
      props.transcription
    }\n\n**Your Output**- Write detailed, well-structured Markdown notes that fully reflect the content.`,
    flashCards: `${prompt[props.type]}\ntranscription:${
      props.transcription
    }\n\noutput:`,
    summary: `${prompt[props.type]}\n\n**Content from the Video**
${
      props.transcription
    }\n\n**Your Output**- A clear, engaging Markdown summary that captures the full educational value of the video.`,
    chatbot: `${prompt[props.type]}\Video Transcription:${
      props.transcription
    }\n\n**Last 5 Messages**:${props.prevResponses}\n\n**User's Question**:${
      props.userInput
    }\n\nOutput:`,
    quiz: `${prompt[props.type]}\ntranscription:${
      props.transcription
    }\n\noutput:`,
    summarizeTranscription : `${prompt[props.type]}\ntranscription:${
      props.transcription
    }\n\n**Your Response (Markdown only)**-Follow the decision flow above.\n\n**Output (Markdown formatted)**: A well-structured, accurate answer based solely on the transcription.  `
  };

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {};
  const model = "gemini-2.5-flash-lite";

  if(props.type == "summarizeTranscription") {
    const chunks = chunkText(props.transcription, 4000);
    const partialSummaries: string[] = [];

    for (const chunk of chunks) {
      const contents = [
        {
          role: "user",
          parts: [
            {
              text:  aiReqest[props.type],
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      //@ts-ignore
      const text: string = response?.candidates[0]?.content?.parts[0].text || "";
      partialSummaries.push(text.trim());
    }

    const mergePrompt = `Here are summaries of parts of a transcript:\n${partialSummaries.join(
      "\n\n"
    )}\n\nPlease combine them into one clear, cohesive summary without repetition.`;

    const finalResponse = await ai.models.generateContent({
      model,
      config,
      contents: [{ role: "user", parts: [{ text: mergePrompt }] }],
    });

    //@ts-ignore
    return finalResponse?.candidates[0]?.content?.parts[0].text as string;
  }

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: aiReqest[props.type],
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  //@ts-ignore
  const res: string = response?.candidates[0]?.content?.parts[0].text;

  return res;
}