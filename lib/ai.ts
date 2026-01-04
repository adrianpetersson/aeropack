import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const googleProvider = createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_GENERATION_AI_API_KEY,
});

export const geminiFlash = googleProvider("gemini-2.5-flash-lite");
