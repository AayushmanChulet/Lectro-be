import { GoogleGenAI } from "@google/genai";
import { chatBotPrompt, flashCardsPrompt, notesPrompt, quizPrompt, summaryPrompt, transcriptionSummary } from "../static/prompts";

interface PrevResponses {
  party : "user" | "bot",
  message : string
}

interface Props {
    type : "notes" | "flashCards" | "chatbot" |  "summary" | "quiz",
    transcription : string,
    userInput? : string,
    prevResponses? : PrevResponses[],
}

const prompt = {
    chatbot : chatBotPrompt,
    notes : notesPrompt,
    flashCards : flashCardsPrompt,
    summary : summaryPrompt,
    quiz : quizPrompt
} 

export async function aiRequest(props : Props) {

    const aiReqest = {
    notes : `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
    flashCards : `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
    summary : `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
    chatbot : `${prompt[props.type]}\ntranscription:${props.transcription}\n Last 5 messages are:${props.prevResponses}\nUser input:${props.userInput}\n\nOutput:`,
    quiz : `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`

}

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDw-04aoIe6lBsE7bUmS7AJfykPLk3pHP8",
  });
  const config = {
  };
  const model = 'gemma-3n-e2b-it';
  const contents = [
    {
      role: 'user',
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
  const res : string  = response?.candidates[0]?.content?.parts[0].text;

  return res;
}