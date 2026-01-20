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
const youtube_caption_extractor_1 = require("youtube-caption-extractor");
const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : url.trim();
};
function transcribe(videoInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const videoId = extractVideoId(videoInput);
        try {
            const subtitles = yield (0, youtube_caption_extractor_1.getSubtitles)({
                videoID: videoId,
                lang: 'en'
            });
            if (!subtitles || subtitles.length === 0) {
                throw new Error('No captions found for this video.');
            }
            const fullText = subtitles.map(part => part.text).join(' ');
            return cleanTranscription(fullText);
        }
        catch (err) {
            console.error("Transcription Error Detail:", err.message || err);
            throw new Error(`Could not fetch transcript: ${err.message || 'Check if CC is enabled'}`);
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
        .replace(/\[.*?\]/g, '') // Removes [Music], [Applause], etc.
        .replace(/\s+/g, ' ')
        .trim();
};
