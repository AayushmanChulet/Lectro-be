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
    quiz: prompts_1.quizPrompt
};
function aiRequest(props) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const aiReqest = {
            notes: `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
            flashCards: `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
            summary: `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`,
            chatbot: `${prompt[props.type]}\ntranscription:${props.transcription}\n Last 5 messages are:${props.prevResponses}\nUser input:${props.userInput}\n\nOutput:`,
            quiz: `${prompt[props.type]}\ntranscription:${props.transcription}\n\noutput:`
        };
        const ai = new genai_1.GoogleGenAI({
            apiKey: "AIzaSyDw-04aoIe6lBsE7bUmS7AJfykPLk3pHP8",
        });
        const config = {};
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
        const response = yield ai.models.generateContent({
            model,
            config,
            contents,
        });
        //@ts-ignore
        const res = (_b = (_a = response === null || response === void 0 ? void 0 : response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.parts[0].text;
        return res;
    });
}
