
import React from 'react';
import { StickerData, formatCurrency } from '@/utils/excelProcessor';

interface StickerPreviewProps {
  data: StickerData;
  width: number;
  height: number;
}

const StickerPreview: React.FC<StickerPreviewProps> = ({ data, width, height }) => {
  const { name, mrp, sellPrice } = data;
  
  // Calculate font sizes based on dimensions
  const nameFontSize = Math.max(10, Math.min(16, width / 10));
  const priceFontSize = Math.max(12, Math.min(20, width / 8));
  const mrpFontSize = Math.max(8, Math.min(14, width / 12));
  
  return (
    <div 
      className="sticker animate-fade-in"
      style={{ 
        width: `${width}mm`, 
        height: `${height}mm`,
        padding: `${Math.max(4, height / 10)}mm`,
        maxWidth: '100%'
      }}
    >
      <div 
        className="sticker-name"
        style={{ fontSize: `${nameFontSize}px` }}
      >
        {name}
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div 
          className="sticker-mrp"
          style={{ fontSize: `${mrpFontSize}px` }}
        >
          MRP {formatCurrency(mrp)}
        </div>
        
        <div 
          className="sticker-price"
          style={{ fontSize: `${priceFontSize}px` }}
        >
          {formatCurrency(sellPrice)}
        </div>
      </div>
    </div>
  );
};

export default StickerPreview;
