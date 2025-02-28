
export interface PrintSettings {
  paperSize: 'a4' | 'letter' | 'custom';
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
  columns: number;
  rows: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const defaultPrintSettings: PrintSettings = {
  paperSize: 'a4',
  orientation: 'portrait',
  width: 210, // A4 width in mm
  height: 297, // A4 height in mm
  columns: 4,  // 4 columns
  rows: 6,     // Increased to 6 rows
  margins: {
    top: 3, // Further reduced top margin
    right: 3, // Further reduced right margin
    bottom: 3, // Further reduced bottom margin
    left: 3   // Further reduced left margin
  }
};

export const printStickers = (printAreaId: string): void => {
  const printContent = document.getElementById(printAreaId);
  
  if (!printContent) {
    console.error('Print area not found');
    return;
  }
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    console.error('Unable to open print window');
    return;
  }
  
  // Get all stickers for font size extraction
  const stickers = printContent.querySelectorAll('.sticker');
  
  // Extract font sizes from the DOM elements
  const fontSizes = [];
  for (let i = 0; i < stickers.length && i < 1; i++) {
    const sticker = stickers[i];
    const nameElement = sticker.querySelector('.sticker-name');
    const mrpElement = sticker.querySelector('.sticker-mrp');
    const priceElement = sticker.querySelector('.sticker-price');
    
    const nameStyle = window.getComputedStyle(nameElement);
    const mrpStyle = window.getComputedStyle(mrpElement);
    const priceStyle = window.getComputedStyle(priceElement);
    
    fontSizes.push({
      name: nameStyle.fontSize,
      mrp: mrpStyle.fontSize,
      price: priceStyle.fontSize,
      nameMarginBottom: nameStyle.marginBottom,
      priceGap: window.getComputedStyle(nameElement.parentElement.querySelector('.flex')).gap
    });
  }
  
  // Add the necessary CSS
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Stickers</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          .print-area {
            width: 100%;
            max-width: 100%;
            padding: 0;
          }
          
          .print-grid {
            display: grid;
            grid-template-columns: repeat(var(--columns), 1fr);
            gap: 0.2rem;
            padding: 0.2rem;
            page-break-inside: avoid;
            margin-bottom: 0.2rem;
          }
          
          .sticker {
            border: 1px solid #000000e6;
            border-radius: 2px;
            padding: 0.3rem;
            text-align: center;
            background-color: white;
            page-break-inside: avoid;
          }
          
          .sticker-name {
            font-weight: bold;
            color: #000000e6;
            margin-bottom: ${fontSizes[0]?.nameMarginBottom || '4px'};
            font-size: ${fontSizes[0]?.name || '0.85rem'};
          }
          
          .flex {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: ${fontSizes[0]?.priceGap || '2px'};
          }
          
          .sticker-mrp {
            color: #0006;
            text-decoration: line-through;
            font-size: ${fontSizes[0]?.mrp || '0.7rem'};
          }
          
          .sticker-price {
            font-weight: bold;
            color: #000000e6;
            font-size: ${fontSizes[0]?.price || '0.9rem'};
          }
          
          @page {
            size: ${defaultPrintSettings.paperSize} ${defaultPrintSettings.orientation};
            margin: ${defaultPrintSettings.margins.top}mm 
                    ${defaultPrintSettings.margins.right}mm 
                    ${defaultPrintSettings.margins.bottom}mm 
                    ${defaultPrintSettings.margins.left}mm;
          }
          
          /* Ensure page breaks work properly */
          .print-grid[style*="page-break-after: always"] {
            page-break-after: always;
          }
        </style>
      </head>
      <body>
        ${printContent.outerHTML}
      </body>
    </html>
  `);
  
  // Add variable for columns
  printWindow.document.documentElement.style.setProperty('--columns', String(defaultPrintSettings.columns));
  
  // Close the document and initiate print
  printWindow.document.close();
  printWindow.focus();
  
  // Give the browser a moment to render before printing
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};
