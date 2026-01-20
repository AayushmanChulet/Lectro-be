"use strict";
// import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
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
// export default async function transcribe(videoUrl : string) {
//   if(!videoUrl.includes("https://www.youtube.com/watch?v=")){
//     videoUrl = `https://www.youtube.com/watch?v=${videoUrl}`
//   }
//   let data;
//   try{
//     const loader = YoutubeLoader.createFromUrl(
//         videoUrl,
//         {
//           language : "en"
//         }
//       );
//      data = await loader.load();
//   }catch(err) {
//     throw new Error('Something went wrong');
//   }
//   const cleanTranscription = (transcriptionProp: string): string => {
//     return transcriptionProp
//       .replace(/\b(um|uh|like|you know)\b/gi, '') 
//       .replace(/\[\d+:\d+\]/g, '') 
//       .replace(/\s+/g, ' ') 
//       .trim();
//   };
//   // const processedTranscription = cleanTranscription(data[0].pageContent);
//   const processedTranscription = cleanTranscription("adsjkfdskjfkzjfkj");
//   return processedTranscription;
// }
const youtube_transcript_1 = require("youtube-transcript");
/**
 * Extracts the 11-character Video ID from any YouTube URL format.
 */
const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : url; // Returns ID if found, otherwise original string
};
function transcribe(videoInput) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Clean the input to get just the ID
        const videoId = extractVideoId(videoInput);
        try {
            // 2. Fetch using only the ID (most stable method)
            console.log("videoId: " + videoId);
            const transcriptConfig = yield youtube_transcript_1.YoutubeTranscript.fetchTranscript(videoId);
            console.log("Transcript: " + transcriptConfig);
            if (!transcriptConfig || transcriptConfig.length === 0) {
                throw new Error('Transcript array is empty.');
            }
            // 3. Join the parts
            const fullText = transcriptConfig.map(t => t.text).join(' ');
            // 4. Clean and return the ACTUAL fetched text
            return cleanTranscription(fullText);
        }
        catch (err) {
            console.error("Transcription Error:", err);
            throw new Error('Could not fetch transcript. Ensure the video has captions (CC) enabled and is not age-restricted.');
        }
    });
}
const cleanTranscription = (text) => {
    if (!text)
        return "";
    return text
        // Handle HTML entities (common in YouTube transcripts)
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        // Remove filler words
        .replace(/\b(um|uh|like|you know)\b/gi, '')
        // Remove common bracketed notes like [Music] or [Laughter]
        .replace(/\[.*?\]/g, '')
        // Clean up whitespace
        .replace(/\s+/g, ' ')
        .trim();
};
