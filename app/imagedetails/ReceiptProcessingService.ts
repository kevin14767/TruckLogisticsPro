import { REACT_NATIVE_OPENAI_API_KEY } from '@env';
import axios from 'axios';
import { 
  BaseReceipt, 
  FuelReceipt, 
  MaterialReceipt, 
  HaulOffReceipt, 
  ReceiptType 
} from './ReceiptInterfaces';

class ReceiptProcessingError extends Error {
  constructor(message, public code = 'PROCESSING_ERROR') {
    super(message);
    this.name = 'ReceiptProcessingError';
  }
}

export class ReceiptProcessingService {
  private static validateEnvironment() {
    if (!REACT_NATIVE_OPENAI_API_KEY) {
      throw new ReceiptProcessingError('OpenAI API key not configured', 'CONFIG_ERROR');
    }
  }

  static async classifyReceiptType(extractedText: string): Promise<ReceiptType | null> {
    try {
      this.validateEnvironment();

      if (!extractedText?.trim()) {
        throw new ReceiptProcessingError('No text provided for classification', 'INVALID_INPUT');
      }

      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `Classify the receipt type into one of these categories:
                - Fuel (Gas or Diesel)
                - Material Transport
                - Haul Off Disposal
                Respond ONLY with the category name.`
            },
            {
              role: "user",
              content: `Analyze and classify this receipt text: ${extractedText}`
            }
          ],
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${REACT_NATIVE_OPENAI_API_KEY}`,
          },
        }
      );

      return result.data.choices[0]?.message?.content?.trim() as ReceiptType;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error?.message || error.message;
        throw new ReceiptProcessingError(`API Error: ${message}`, 'API_ERROR');
      }
      if (error instanceof ReceiptProcessingError) {
        throw error;
      }
      throw new ReceiptProcessingError(
        `Error classifying receipt: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static async processReceiptByType(
    extractedText: string, 
    type: ReceiptType
  ): Promise<BaseReceipt | null> {
    try {
      this.validateEnvironment();

      if (!extractedText?.trim()) {
        throw new ReceiptProcessingError('No text provided for processing', 'INVALID_INPUT');
      }

      if (!type) {
        throw new ReceiptProcessingError('Receipt type not specified', 'INVALID_INPUT');
      }

      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a receipt data extraction assistant. 
                Extract specific details based on the receipt type.
                Always return a JSON object with all possible fields.
                If a field is not found, set it to null.`
            },
            {
              role: "user",
              content: `Extract details for a ${type} receipt from this text: ${extractedText}`
            }
          ],
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${REACT_NATIVE_OPENAI_API_KEY}`,
          },
        }
      );

      const processedData = JSON.parse(
        result.data.choices[0]?.message?.content || '{}'
      );

      processedData.receiptType = type;
      processedData.id = `receipt_${Date.now()}`;

      return processedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error?.message || error.message;
        throw new ReceiptProcessingError(`API Error: ${message}`, 'API_ERROR');
      }
      if (error instanceof ReceiptProcessingError) {
        throw error;
      }
      throw new ReceiptProcessingError(
        `Error processing receipt: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}