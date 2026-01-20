import axios from 'axios';

const extractVideoId = (url: string): string => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : url.trim();
};

export default async function transcribe(videoInput: string) {
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
    const response = await axios.request(options);
    //@ts-ignore
    const transcriptData = response?.data?.transcript;

    if (!transcriptData || transcriptData.length === 0) {
      throw new Error('Transcript is empty or disabled for this video.');
    }
    const fullText = transcriptData.map((item: any) => item.text).join(' ');
    
    return cleanTranscription(fullText);

  } catch (err: any) {
    console.error("RapidAPI Error:", err.message);
    throw new Error(`Failed to fetch transcript: ${err.message}`);
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
    .replace(/\[.*?\]/g, '') 
    .replace(/\s+/g, ' ') 
    .trim();
};