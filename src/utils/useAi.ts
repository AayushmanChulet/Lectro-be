import { GoogleGenAI } from "@google/genai";

interface Props {
    prompt : string,
    type : "notes" | "flashCards" | "chatbot" |  "summary",
    userInput? : string,
    prevRes? : string[],
}



async function useAi(props : Props) {

    const aiReqest = {
    notes : `${props.prompt}\n\noutput:`,
    flashCards : `${props.prompt}\n\noutput:`,
    summary : `${props.prompt}\n\noutput:`,
    chatbot : `${props.prompt}\n\n Last 5 messages are:${props.prevRes}\nInput:${props.userInput}\nOutput:`,
}

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
  };
  const model = 'gemini-2.5-pro';
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
  const res : string = response?.candidates[0]?.content?.parts[0].text;

  return res;
}