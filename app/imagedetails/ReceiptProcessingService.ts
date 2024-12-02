import axios from 'axios';
import { 
  BaseReceipt, 
  FuelReceipt, 
  MaterialReceipt, 
  HaulOffReceipt, 
  ReceiptType 
} from './ReceiptInterfaces';


export class ReceiptProcessingService {
  static async classifyReceiptType(extractedText: string): Promise<ReceiptType | null> {
    try {
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
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      return result.data.choices[0]?.message?.content?.trim() as ReceiptType;
    } catch (error) {
      console.error("Error classifying receipt type:", error.response?.data || error.message);
      return null;
    }
  }

  static async processReceiptByType(
    extractedText: string, 
    type: ReceiptType
  ): Promise<BaseReceipt | null> {
    try {
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
              content: `Extract details for a ${type} receipt from this text: ${extractedText}

              For Fuel Receipt, extract:
              - Fuel Type (Diesel/Gas)
              - Quantity (Gallons)
              - Price per Gallon
              - Total Cost
              - Vehicle ID
              - Date
              - Odometer Reading

              For Material Transport Receipt, extract:
              - Material Type
              - Quantity
              - Quantity Unit
              - Origin Location
              - Destination Location
              - Transportation Cost
              - Material Cost
              - Vehicle ID
              - Driver Name
              - Date

              For Haul Off Receipt, extract:
              - Waste Type
              - Weight
              - Weight Unit
              - Disposal Site
              - Environmental Fees
              - Vehicle ID
              - Date
              - Total Cost`
            }
          ],
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const processedData = JSON.parse(
        result.data.choices[0]?.message?.content || '{}'
      );

      // Add receipt type to processed data
      processedData.receiptType = type;
      processedData.id = `receipt_${Date.now()}`;

      return processedData;
    } catch (error) {
      console.error(`Error processing ${type} receipt:`, error.response?.data || error.message);
      return null;
    }
  }
}
