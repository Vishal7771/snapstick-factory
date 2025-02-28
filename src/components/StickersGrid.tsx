
import React from 'react';
import StickerPreview from './StickerPreview';
import { StickerData } from '@/utils/excelProcessor';

interface StickersGridProps {
  data: StickerData[];
  width: number;
  height: number;
  columns: number;
  rows: number;
  nameFontSize?: number;
  mrpFontSize?: number;
  priceFontSize?: number;
  nameSpacing?: number;
  priceSpacing?: number;
}

const StickersGrid: React.FC<StickersGridProps> = ({ 
  data,
  width,
  height,
  columns,
  rows,
  nameFontSize,
  mrpFontSize,
  priceFontSize,
  nameSpacing,
  priceSpacing
}) => {
  if (data.length === 0) return null;
  
  // Calculate how many stickers to display based on rows and columns
  const maxStickersToShow = columns * rows;
  const stickersToRender = data.slice(0, maxStickersToShow);
  
  // Fill remaining slots with the first sticker
  const filledStickers = [...stickersToRender];
  
  while (filledStickers.length < maxStickersToShow) {
    filledStickers.push(data[0]);
  }
  
  return (
    <div 
      id="print-area" 
      className="print-area"
    >
      <div 
        className="print-grid"
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '0.5rem',
        }}
      >
        {filledStickers.map((sticker, index) => (
          <StickerPreview 
            key={index}
            data={sticker}
            width={width}
            height={height}
            nameFontSize={nameFontSize}
            mrpFontSize={mrpFontSize}
            priceFontSize={priceFontSize}
            nameSpacing={nameSpacing}
            priceSpacing={priceSpacing}
          />
        ))}
      </div>
    </div>
  );
};

export default StickersGrid;
