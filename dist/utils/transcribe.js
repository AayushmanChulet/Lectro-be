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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transcribe;
const axios_1 = __importDefault(require("axios"));
const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : url.trim();
};
function transcribe(videoInput) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const videoId = extractVideoId(videoInput);
        const options = {
            method: 'GET',
            url: 'https://yt-api.p.rapidapi.com/get_transcript',
            params: {
                id: videoId
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
        try {
            const response = yield axios_1.default.request(options);
            //@ts-ignore
            const transcriptData = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.transcript;
            if (!transcriptData || transcriptData.length === 0) {
                throw new Error('Transcript is empty or disabled for this video.');
            }
            const fullText = transcriptData.map((item) => item.text).join(' ');
            return cleanTranscription(fullText);
        }
        catch (err) {
            console.error("RapidAPI Error:", err.message);
            throw new Error(`Failed to fetch transcript: ${err.message}`);
        }
    });
}
const cleanTranscription = (text) => {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\b(um|uh|like|you know)\b/gi, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};
