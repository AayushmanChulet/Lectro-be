import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

function secondsToTimestamp(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
}

export default async function transcribe(videoUrl : string) {
  const loader = YoutubeLoader.createFromUrl(
    videoUrl,
    {
      language: "en" 
    }
  );
  const data = await loader.load();
  console.log(data[0].pageContent);
  return data[0].pageContent;
}

