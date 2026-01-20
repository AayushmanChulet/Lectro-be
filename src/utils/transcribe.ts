import { getSubtitles } from 'youtube-caption-extractor';
const extractVideoId = (url: string): string => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : url.trim();
};

export default async function transcribe(videoInput: string) {
  const videoId = extractVideoId(videoInput);
  try {
    const subtitles = await getSubtitles({
      videoID: videoId,
      lang: 'en'
    });
    if (!subtitles || subtitles.length === 0) {
      throw new Error('No captions found for this video.');
    }
    const fullText = subtitles.map(part => part.text).join(' ');
    return cleanTranscription(fullText);
  } catch (err: any) {
    console.error("Transcription Error Detail:", err.message || err);
    throw new Error(`Could not fetch transcript: ${err.message || 'Check if CC is enabled'}`);
  }
}

const cleanTranscription = (text: string): string => {
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