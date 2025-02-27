
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
        
        // Transform the data into our required format
        const stickerData: StickerData[] = jsonData.map((row: any) => {
          // Try to find the correct column names regardless of case
          const nameKey = Object.keys(row).find(key => 
            key.toLowerCase() === 'name' || 
            key.toLowerCase() === 'item name' || 
            key.toLowerCase() === 'product name'
          );
          
          const mrpKey = Object.keys(row).find(key => 
            key.toLowerCase() === 'mrp' || 
            key.toLowerCase() === 'maximum retail price' || 
            key.toLowerCase() === 'retail price'
          );
          
          const sellPriceKey = Object.keys(row).find(key => 
            key.toLowerCase() === 'sell price' || 
            key.toLowerCase() === 'selling price' || 
            key.toLowerCase() === 'price' || 
            key.toLowerCase() === 'sale price'
          );
          
          if (!nameKey || !mrpKey || !sellPriceKey) {
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
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading the file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

export const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') {
    // Try to parse the string as a number
    const numValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
    if (isNaN(numValue)) return value.toString();
    value = numValue;
  }
  
  return `₹ ${value.toFixed(2)}`;
};
