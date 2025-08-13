import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

export default async function transcribe(videoUrl : string) {

  if(!videoUrl.includes("https://www.youtube.com/watch?v=")){
    videoUrl = `https://www.youtube.com/watch?v=${videoUrl}`
  }
  let data;
  try{
    const loader = YoutubeLoader.createFromUrl(
        videoUrl,
        {
          language : "en"
        }
      );
     data = await loader.load();
  }catch(err) {
    throw new Error('Something went wrong');
  }
  

  const cleanTranscription = (transcriptionProp: string): string => {
    return transcriptionProp
      .replace(/\b(um|uh|like|you know)\b/gi, '') 
      .replace(/\[\d+:\d+\]/g, '') 
      .replace(/\s+/g, ' ') 
      .trim();
  };
  
  const processedTranscription = cleanTranscription(data[0].pageContent);

  return processedTranscription;
}

