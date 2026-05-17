import { JsonOutputParser } from '@langchain/core/output_parsers';
import { categorizeExpensePrompt  } from '../prompts/categorizeExpense';
import { OpenRouterAIModel } from '../openrouter';

export const categoryExpenseChain = categorizeExpensePrompt.pipe(OpenRouterAIModel);