import OpenAI from "openai";
import asyncHandler from '../middlewares/asyncHandler.js';

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET_KEY,
})

// const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         "role": "system",
//         "content": "You will be provided with statements, and your task is to convert them to standard English."
//       },
//       {
//         "role": "user",
//         "content": "She no went to the market."
//       }
//     ],
//     temperature: 0.7,
//     max_tokens: 64,
//     top_p: 1,
//   });

const getPerformanceEstimate = asyncHandler(async (req, res) => {
  
    const { configuration, game, settings, display } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable assistant that provides gaming performance estimates based on computer configurations."
        },
        {
          role: "user",
          content: `Here's the computer configuration:

          CPU: ${configuration.cpu}
          Motherboard: ${configuration.motherboard}
          Cooling System: ${configuration.coolingSystem}
          RAM: ${configuration.ram}
          GPU: ${configuration.gpu}

          Game: ${game}
          Settings: ${settings}
          Display: ${display}

          Based on this configuration, what gaming performance can I expect?
          The response needs to be structured in the following way
          1st paragraph that is separated by new line - Overall insight of the current configuration in around 30 words.

          2nd paragraph that is separated by new line - Overall insight of the performance for the above game and display settings in around 30 words.

          3rd paragraph that is separated by new line - An expected average approximate FPS in not more than 10 words
          
          4th paragraph that is separated by new line - An expected overall performance on a scale of 1 to 10, 10 being the highest in not more than 10 words`
        }
      ],
      max_tokens: 150
    });
      res.status(200).json(response.choices[0].message.content)
    } catch (error) {
      console.error("Error fetching the performance estimate:", error);
      res.status(400).json({ error: "An error occurred while fetching the performance estimate." });
    }
  });

  export default getPerformanceEstimate;