
import { GoogleGenAI } from "@google/genai";

export const getAIAssistantResponse = async (userPrompt: string, context: string) => {
  // Check if API key exists before attempting initialization
  if (!process.env.API_KEY) {
    console.warn("API Key is not defined in the environment.");
    return "I'm having trouble accessing my creative circuits (API key missing). Please ensure your environment is set up correctly!";
  }

  // Initialize right before call to ensure up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context about Design Maker Lab: ${context}\n\nUser Question: ${userPrompt}`,
      config: {
        systemInstruction: "You are a helpful AI mentor at the Design Maker Lab. You help students understand lesson plans, provide career advice in design/engineering, and explain technical concepts simply. Keep responses concise and inspiring.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my creative circuits right now. Please try again in a moment!";
  }
};
