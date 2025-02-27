
import * as XLSX from 'xlsx';

export interface StickerData {
  name: string;
  mrp: number | string;
  sellPrice: number | string;
}

export const processExcelFile = async (file: File): Promise<StickerData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convert the worksheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        console.log("Extracted JSON data:", jsonData);
        console.log("Column keys:", jsonData.length > 0 ? Object.keys(jsonData[0]) : "No data rows found");
        
        if (jsonData.length === 0) {
          throw new Error('No data found in the Excel file');
        }
        
        // Transform the data into our required format
        const stickerData: StickerData[] = jsonData.map((row: any) => {
          // Try to find the correct column names regardless of case or whitespace
          const nameKey = findMatchingKey(row, ['name', 'item name', 'product name', 'product']);
          const mrpKey = findMatchingKey(row, ['mrp', 'maximum retail price', 'retail price', 'max price']);
          const sellPriceKey = findMatchingKey(row, ['sell price', 'selling price', 'price', 'sale price', 'sell']);
          
          console.log("Found keys:", { nameKey, mrpKey, sellPriceKey });
          
          if (!nameKey || !mrpKey || !sellPriceKey) {
            console.error("Column mapping:", { 
              availableKeys: Object.keys(row), 
              nameKey, 
              mrpKey, 
              sellPriceKey 
            });
            throw new Error('Required columns (Name, MRP, Sell Price) not found in the Excel file');
          }
          
          return {
            name: row[nameKey]?.toString() || '',
            mrp: row[mrpKey] || '',
            sellPrice: row[sellPriceKey] || ''
          };
        });
        
        resolve(stickerData);
      } catch (error) {
        console.error("Excel processing error:", error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading the file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

// Helper function to find a matching key with more flexible matching
function findMatchingKey(row: any, possibleMatches: string[]): string | undefined {
  const keys = Object.keys(row);
  
  // First try direct match (case insensitive)
  for (const key of keys) {
    const keyLower = key.toLowerCase().trim();
    if (possibleMatches.some(match => match.toLowerCase() === keyLower)) {
      return key;
    }
  }
  
  // Then try contains match
  for (const key of keys) {
    const keyLower = key.toLowerCase().trim();
    if (possibleMatches.some(match => keyLower.includes(match.toLowerCase()) || match.toLowerCase().includes(keyLower))) {
      return key;
    }
  }
  
  return undefined;
}

export const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') {
    // Try to parse the string as a number
    const numValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
    if (isNaN(numValue)) return value.toString();
    value = numValue;
  }
  
  return `₹ ${value.toFixed(2)}`;
};
