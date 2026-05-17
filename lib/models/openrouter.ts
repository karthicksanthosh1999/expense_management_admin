import { ChatOpenAI } from '@langchain/openai';


export const OpenRouterAIModel = new ChatOpenAI(
    {
        apiKey: process.env.OPENROUTER_API_KEY,
        model: "meta-llama/llama-3-8b-instruct",
        configuration: {
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "LangChain App",
            },
        },
        temperature:0.7
    }
);