import { pipeline } from "@huggingface/transformers";

let generator: any = null;

export async function ensureLocalGenerator() {
  if (generator) return generator;
  
  generator = await pipeline(
    "text-generation",
    "Xenova/distilgpt2",
    { device: "webgpu" }
  );
  
  return generator;
}

export async function explainImpact(stats: {
  name: string;
  county?: string;
  pop?: number;
  broadband_poor?: number;
  median_income?: number;
}) {
  await ensureLocalGenerator();
  
  const prompt = `Explain in one friendly paragraph how better broadband and quantum technology funding would impact ${stats.name} in ${stats.county} County, PA. Use these facts: population ${stats.pop?.toLocaleString()}, poor broadband ${(stats.broadband_poor! * 100).toFixed(0)}%, median income $${stats.median_income?.toLocaleString()}. Avoid jargon.`;
  
  const output = await generator(prompt, { 
    max_new_tokens: 90,
    temperature: 0.7,
    top_p: 0.9
  });
  
  return output?.[0]?.generated_text?.slice(prompt.length).trim() || "";
}
