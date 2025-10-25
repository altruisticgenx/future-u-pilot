let generator: any = null;

export async function ensureLocalGenerator() {
  if (generator) return generator;
  
  // Lazy import - only loads when user clicks button (prevents page freeze)
  const { pipeline } = await import("@huggingface/transformers");
  
  try {
    generator = await pipeline(
      "text-generation",
      "Xenova/distilgpt2",
      { device: "webgpu" }
    );
    return generator;
  } catch (error) {
    console.error("Failed to initialize AI model:", error);
    throw new Error("Could not load AI model. Please try again.");
  }
}

export async function explainImpact(stats: {
  name: string;
  county?: string;
  pop?: number;
  broadband_poor?: number;
  median_income?: number;
}) {
  try {
    await ensureLocalGenerator();
    
    const prompt = `Explain in one friendly paragraph how better broadband and quantum technology funding would impact ${stats.name} in ${stats.county} County, PA. Use these facts: population ${stats.pop?.toLocaleString()}, poor broadband ${(stats.broadband_poor! * 100).toFixed(0)}%, median income $${stats.median_income?.toLocaleString()}. Avoid jargon.`;
    
    const output = await generator(prompt, { 
      max_new_tokens: 90,
      temperature: 0.7,
      top_p: 0.9
    });
    
    return output?.[0]?.generated_text?.slice(prompt.length).trim() || "Unable to generate explanation at this time.";
  } catch (error) {
    console.error("Impact explainer error:", error);
    throw new Error("Failed to generate explanation. Please try again.");
  }
}
