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
exports.default = transcribe;
const youtube_1 = require("@langchain/community/document_loaders/web/youtube");
function transcribe(videoUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!videoUrl.includes("https://www.youtube.com/watch?v=")) {
            videoUrl = `https://www.youtube.com/watch?v=${videoUrl}`;
        }
        let data;
        try {
            const loader = youtube_1.YoutubeLoader.createFromUrl(videoUrl, {
                language: "en"
            });
            data = yield loader.load();
        }
        catch (err) {
            throw new Error('Something went wrong');
        }
        const cleanTranscription = (transcriptionProp) => {
            return transcriptionProp
                .replace(/\b(um|uh|like|you know)\b/gi, '')
                .replace(/\[\d+:\d+\]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        };
        const processedTranscription = cleanTranscription(data[0].pageContent);
        return processedTranscription;
    });
}
