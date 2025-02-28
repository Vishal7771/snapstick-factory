
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
  
  // Instead of limiting the products, show all of them
  // Organize them into pages based on the grid size
  const itemsPerPage = columns * rows;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const pages = [];
  for (let page = 0; page < totalPages; page++) {
    const startIndex = page * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const pageData = data.slice(startIndex, endIndex);
    
    // Fill the last page if it's not complete
    const filledPageData = [...pageData];
    while (filledPageData.length < itemsPerPage) {
      filledPageData.push(data[0]);
    }
    
    pages.push(
      <div 
        key={`page-${page}`}
        className="print-grid mb-4 last:mb-0"
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '0.25rem',
          pageBreakAfter: page < totalPages - 1 ? 'always' : 'auto'
        }}
      >
        {filledPageData.map((sticker, index) => (
          <StickerPreview 
            key={`${page}-${index}`}
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
    );
  }
  
  return (
    <div id="print-area" className="print-area">
      {pages}
    </div>
  );
};

export default StickersGrid;
