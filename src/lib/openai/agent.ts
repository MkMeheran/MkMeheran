import OpenAI from "openai";

// Lazy initialization to avoid errors during build
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIAgentOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

const DEFAULT_SYSTEM_PROMPT = `You are a helpful AI assistant integrated into a Next.js application. 
You help users with tasks related to GIS, data analysis, and automation workflows.
Be concise, accurate, and helpful in your responses.`;

/**
 * Generate a response from the AI agent
 */
export async function generateResponse(
  prompt: string,
  options: AIAgentOptions = {}
): Promise<{
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}> {
  const {
    model = "gpt-4o-mini",
    maxTokens = 1024,
    temperature = 0.7,
    systemPrompt = DEFAULT_SYSTEM_PROMPT,
  } = options;

  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model,
    max_tokens: maxTokens,
    temperature,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
  });

  const message = response.choices[0]?.message?.content || "";

  return {
    content: message,
    usage: response.usage
      ? {
          prompt_tokens: response.usage.prompt_tokens,
          completion_tokens: response.usage.completion_tokens,
          total_tokens: response.usage.total_tokens,
        }
      : undefined,
  };
}

/**
 * Generate a response with conversation history
 */
export async function generateChatResponse(
  messages: ChatMessage[],
  options: AIAgentOptions = {}
): Promise<{
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}> {
  const {
    model = "gpt-4o-mini",
    maxTokens = 1024,
    temperature = 0.7,
    systemPrompt = DEFAULT_SYSTEM_PROMPT,
  } = options;

  const allMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages,
  ];

  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model,
    max_tokens: maxTokens,
    temperature,
    messages: allMessages,
  });

  const message = response.choices[0]?.message?.content || "";

  return {
    content: message,
    usage: response.usage
      ? {
          prompt_tokens: response.usage.prompt_tokens,
          completion_tokens: response.usage.completion_tokens,
          total_tokens: response.usage.total_tokens,
        }
      : undefined,
  };
}

export { getOpenAIClient as openai };
