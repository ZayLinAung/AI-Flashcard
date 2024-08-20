import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"; 

const systemPrompt = `You are a flashcard creator. Output your response in the following JSON format:
{
    "flashcard": [
    {
        "front": "str",
        "back": "str"
    }
  ]
}
`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    
    const data = await req.text();
    const prompt = systemPrompt + data;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const result = await model.generateContent([prompt]);


    const responseText = await result.response.text();
  console.log("Raw response text:", responseText);


    const flashcards = JSON.parse(responseText);
    console.log("here are the falshcards:" , flashcards);
    

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("Error generating flashcards:", error);

    return NextResponse.json({ flashcard: [] });
  }
}