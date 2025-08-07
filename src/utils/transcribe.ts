import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

export default async function transcribe(videoUrl : string) {
  const loader = YoutubeLoader.createFromUrl(
    videoUrl,
    {
      language: "en" 
    }
  );
  const data = await loader.load();

  const cleanTranscription = (transcriptionProp: string): string => {
    return transcriptionProp
      .replace(/\b(um|uh|like|you know)\b/gi, '') 
      .replace(/\[\d+:\d+\]/g, '') 
      .replace(/\s+/g, ' ') 
      .trim();
  };
  
  const processedTranscription = cleanTranscription(data[0].pageContent);

  return processedTranscription
}

