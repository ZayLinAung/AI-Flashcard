import { NextResponse } from "next/server";
import GoogleGenerativeAI from "gemini-ai";

const systemPrompt = `You are a flashcard creator
json format:
{
    "flashcard": [{
        "front": str,
        "back": str
    }]
}
`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const data = await req.text();
  const prompt = systemPrompt + data;

  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });
  let result = await model.generateContent({
    contents: [
      {
        role: "model",
        parts: [{ text: prompt }],
      },
      {
        role: "user",
        parts: [{ text: data }],
      },
    ],
  });

  const text = result.response.text();
  const flashcards = JSON.parse(text);

  return NextResponse.json(flashcards.flashcard);
}
