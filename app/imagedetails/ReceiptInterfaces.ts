// src/types/ReceiptInterfaces.ts

export interface BaseReceipt {
    id: string;
    date: string;
    totalCost: number;
    receiptType: 'Fuel' | 'Material' | 'HaulOff';
    [key: string]: any; // Allows for dynamic fields based on the receipt type
  }
  
  export interface FuelReceipt extends BaseReceipt {
    fuelType: 'Diesel' | 'Gas';
    quantity: number;
    pricePerGallon: number;
    vehicleId?: string;
    odometerReading?: number;
  }
  
  export interface MaterialReceipt extends BaseReceipt {
    materialType: string;
    quantity: number;
    quantityUnit: 'Tons' | 'Cubic Yards';
    originLocation: string;
    destinationLocation: string;
    transportationCost: number;
    materialCost: number;
    vehicleId?: string;
    driverName?: string;
  }
  
  export interface HaulOffReceipt extends BaseReceipt {
    wasteType: string;
    weight: number;
    weightUnit: 'Pounds' | 'Tons';
    disposalSite: string;
    environmentalFees: number;
    vehicleId?: string;
  }
  
  export type ReceiptType = 'Fuel' | 'Material' | 'HaulOff';