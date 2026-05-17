import { PromptTemplate } from "@langchain/core/prompts";

export const categorizeExpensePrompt =
  PromptTemplate.fromTemplate(`
You are an AI financial assistant.

Analyze the provided weekly financial analytics.

IMPORTANT:
- Use ONLY the provided analytics.
- Do NOT invent calculations.
- Do NOT hallucinate percentages.
- Keep insights concise and realistic.

Analytics:
{analytics}

Provide:
1. Spending summary
2. Main spending category
3. Saving recommendations
4. Financial observations
5. Risk warnings
`);