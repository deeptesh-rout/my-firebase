import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { geminiPro } from '@genkit-ai/googleai';
import * as z from 'zod';
import { googleAI } from '@genkit-ai/googleai';

configureGenkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Suggest an item for the menu of a ${subject} themed restaurant`,
      model: geminiPro,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

startFlowsServer();
