import { NextRequest, NextResponse } from "next/server";
import { generateResponse, generateChatResponse } from "@/lib/openai";
import type { ChatMessage } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, messages, options } = body;

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "OpenAI API key not configured",
        },
        { status: 500 }
      );
    }

    let response;

    if (messages && Array.isArray(messages)) {
      // Multi-turn conversation
      response = await generateChatResponse(messages as ChatMessage[], options);
    } else if (prompt) {
      // Single prompt
      response = await generateResponse(prompt, options);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Either 'prompt' or 'messages' is required",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("AI Agent error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
