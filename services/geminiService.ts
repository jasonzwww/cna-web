
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Initialize GoogleGenAI using the mandatory named parameter and direct environment variable access
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getTrackGuide(trackName: string, carType: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a short, professional racing briefing for ${trackName} using a ${carType}. Include 3 key tips for speed and a safety warning. Keep it under 150 words.`,
        config: {
          systemInstruction: "You are an elite race engineer for CNA Racing League. Your tone is supportive but highly focused on performance.",
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to load race briefing at this time. Focus on your lines and stay safe!";
    }
  }

  async generateHypeMessage(leagueName: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a high-energy 2-sentence welcome message for the members of ${leagueName}.`,
        config: {
          temperature: 0.9,
        }
      });
      return response.text;
    } catch (error) {
      return "Welcome to the grid! Let's burn some rubber.";
    }
  }
}

export const geminiService = new GeminiService();
