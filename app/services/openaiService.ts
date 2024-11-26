import axios from "axios";

const API_KEY = process.env.OPENAI_API_KEY; // Securely store the API key

const openAI = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Function to process extracted text
export const processExtractedText = async (text: string): Promise<string> => {
  try {
    const response = await openAI.post("/completions", {
      model: "text-davinci-004",
      prompt: `Organize this text into JSON format: ${text}`,
      max_tokens: 300,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error processing text:", error);
    throw error;
  }
};
