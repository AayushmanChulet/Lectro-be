import { getSubtitles } from 'youtube-caption-extractor';
const extractVideoId = (url: string): string => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : url.trim();
};

export default async function transcribe(videoInput: string) {
  const videoId = extractVideoId(videoInput);

  try {
    let subtitles = await getSubtitles({
      videoID: videoId,
      lang: 'en'
    });

    if (!subtitles || subtitles.length === 0) {
      console.log("No English captions, attempting Hindi...");
      subtitles = await getSubtitles({
        videoID: videoId,
        lang: 'hi'
      });
    }

    if (!subtitles || subtitles.length === 0) {
      console.log("Attempting default/auto-generated fetch...");
      subtitles = await getSubtitles({ videoID: videoId });
    }

    if (!subtitles || subtitles.length === 0) {
      throw new Error('YouTube blocked this request or No Captions available.');
    }

    const fullText = subtitles.map(part => part.text).join(' ');
    return cleanTranscription(fullText);

  } catch (err: any) {
    console.error("Transcription Error:", err.message);
    throw new Error(`Cloud Fetch Failed: ${err.message}`);
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