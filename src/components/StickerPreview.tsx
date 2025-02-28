
import React from 'react';
import { StickerData, formatCurrency } from '@/utils/excelProcessor';

interface StickerPreviewProps {
  data: StickerData;
  width: number;
  height: number;
  nameFontSize?: number;
  mrpFontSize?: number;
  priceFontSize?: number;
  nameSpacing?: number; // Space after name
  priceSpacing?: number; // Space between MRP and price
}

const StickerPreview: React.FC<StickerPreviewProps> = ({ 
  data, 
  width, 
  height,
  nameFontSize,
  mrpFontSize,
  priceFontSize,
  nameSpacing = 6,
  priceSpacing = 2
}) => {
  const { name, mrp, sellPrice } = data;
  
  // Use the provided font sizes or calculate defaults based on dimensions
  const calculatedNameFontSize = nameFontSize || Math.max(10, Math.min(16, width / 10));
  const calculatedMrpFontSize = mrpFontSize || Math.max(8, Math.min(14, width / 12));
  const calculatedPriceFontSize = priceFontSize || Math.max(12, Math.min(20, width / 8));
  
  return (
    <div 
      className="sticker animate-fade-in"
      style={{ 
        width: `${width}mm`, 
        height: `${height}mm`,
        padding: `${Math.max(4, height / 10)}mm`,
        maxWidth: '100%',
        border: '1px solid #000000e6',
      }}
    >
      <div 
        className="sticker-name"
        style={{ 
          fontSize: `${calculatedNameFontSize}px`,
          color: '#000000e6',
          marginBottom: `${nameSpacing}px`
        }}
      >
        {name}
      </div>
      
      <div className="flex flex-col items-center justify-center" style={{ gap: `${priceSpacing}px` }}>
        <div 
          className="sticker-mrp"
          style={{ 
            fontSize: `${calculatedMrpFontSize}px`,
            color: '#0006' 
          }}
        >
          MRP {formatCurrency(mrp)}
        </div>
        
        <div 
          className="sticker-price"
          style={{ 
            fontSize: `${calculatedPriceFontSize}px`,
            color: '#000000e6'
          }}
        >
          {formatCurrency(sellPrice)}
        </div>
      </div>
    </div>
  );
};

export default StickerPreview;
