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
function secondsToTimestamp(seconds) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
}
function transcribe(videoUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const loader = youtube_1.YoutubeLoader.createFromUrl(videoUrl, {
            language: "en"
        });
        const data = yield loader.load();
        console.log(data[0].pageContent);
        return data[0].pageContent;
    });
}
