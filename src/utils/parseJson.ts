export function cleanJsonString(input: string): string {
  return input
    .replace(/^json\s*/i, '')  
    .replace(/^```(?:json)?/i, '') 
    .replace(/```$/, '') 
    .trim();
}
