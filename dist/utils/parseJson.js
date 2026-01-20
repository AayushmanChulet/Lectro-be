"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanJsonString = cleanJsonString;
function cleanJsonString(input) {
    return input
        .replace(/^json\s*/i, '')
        .replace(/^```(?:json)?/i, '')
        .replace(/```$/, '')
        .trim();
}
