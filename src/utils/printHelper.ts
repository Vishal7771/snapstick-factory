
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
  columns: 2,
  rows: 4,
  margins: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
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
          
          .print-grid {
            display: grid;
            grid-template-columns: repeat(var(--columns), 1fr);
            gap: 0.5rem;
            padding: 0.5rem;
            page-break-inside: avoid;
          }
          
          .sticker {
            border: 1px solid #222;
            border-radius: 4px;
            padding: 0.5rem;
            text-align: center;
            background-color: white;
            page-break-inside: avoid;
          }
          
          .sticker-name {
            font-weight: bold;
            color: #333;
            margin-bottom: 0.25rem;
            font-size: 0.9rem;
          }
          
          .sticker-mrp {
            color: #666;
            text-decoration: line-through;
            font-size: 0.8rem;
          }
          
          .sticker-price {
            font-weight: bold;
            color: #FF0000;
            font-size: 1rem;
          }
          
          @page {
            size: ${defaultPrintSettings.paperSize} ${defaultPrintSettings.orientation};
            margin: ${defaultPrintSettings.margins.top}mm 
                    ${defaultPrintSettings.margins.right}mm 
                    ${defaultPrintSettings.margins.bottom}mm 
                    ${defaultPrintSettings.margins.left}mm;
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
