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
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRequest = aiRequest;
const genai_1 = require("@google/genai");
const prompts_1 = require("../static/prompts");
const prompt = {
    chatbot: prompts_1.chatBotPrompt,
    notes: prompts_1.notesPrompt,
    flashCards: prompts_1.flashCardsPrompt,
    summary: prompts_1.summaryPrompt,
    quiz: prompts_1.quizPrompt,
    summarizeTranscription: prompts_1.transcriptionSummary
};
function chunkText(text, maxChars = 4000) {
    const sentences = text.split(/(?<=[.?!])\s+/);
    const chunks = [];
    let currentChunk = "";
    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxChars) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence + " ";
            continue;
        }
        currentChunk += sentence + " ";
    }
    if (currentChunk)
        chunks.push(currentChunk.trim());
    return chunks;
}
function aiRequest(props) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const aiReqest = {
            notes: `${prompt[props.type]}\n\n**Content from the Video**:${props.transcription}\n\n**Your Output**- Write detailed, well-structured Markdown notes that fully reflect the content.`,
            flashCards: `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
            summary: `${prompt[props.type]}\n\n**Content from the Video**
${props.transcription}\n\n**Your Output**- A clear, engaging Markdown summary that captures the full educational value of the video.`,
            chatbot: `${prompt[props.type]}\Video Transcription:${props.transcription}\n\n**Last 5 Messages**:${props.prevResponses}\n\n**User's Question**:${props.userInput}\n\nOutput:`,
            quiz: `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
            summarizeTranscription: `${prompt[props.type]}\ntranscription:${props.transcription}\n\n**Your Response (Markdown only)**-Follow the decision flow above.\n\n**Output (Markdown formatted)**: A well-structured, accurate answer based solely on the transcription.  `
        };
        const ai = new genai_1.GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const config = {};
        const model = "gemini-2.5-flash-lite";
        if (props.type == "summarizeTranscription") {
            const chunks = chunkText(props.transcription, 4000);
            const partialSummaries = [];
            for (const chunk of chunks) {
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
                const response = yield ai.models.generateContent({
                    model,
                    config,
                    contents,
                });
                //@ts-ignore
                const text = ((_b = (_a = response === null || response === void 0 ? void 0 : response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.parts[0].text) || "";
                partialSummaries.push(text.trim());
            }
            const mergePrompt = `Here are summaries of parts of a transcript:\n${partialSummaries.join("\n\n")}\n\nPlease combine them into one clear, cohesive summary without repetition.`;
            const finalResponse = yield ai.models.generateContent({
                model,
                config,
                contents: [{ role: "user", parts: [{ text: mergePrompt }] }],
            });
            //@ts-ignore
            return (_d = (_c = finalResponse === null || finalResponse === void 0 ? void 0 : finalResponse.candidates[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts[0].text;
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
        const response = yield ai.models.generateContent({
            model,
            config,
            contents,
        });
        //@ts-ignore
        const res = (_f = (_e = response === null || response === void 0 ? void 0 : response.candidates[0]) === null || _e === void 0 ? void 0 : _e.content) === null || _f === void 0 ? void 0 : _f.parts[0].text;
        return res;
    });
}
