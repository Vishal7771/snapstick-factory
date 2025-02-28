
import React, { useState, useCallback } from 'react';
import FileUploader from '@/components/FileUploader';
import AdjustmentControls from '@/components/AdjustmentControls';
import StickersGrid from '@/components/StickersGrid';
import StickerPreview from '@/components/StickerPreview';
import { processExcelFile, StickerData } from '@/utils/excelProcessor';
import { printStickers } from '@/utils/printHelper';
import { useToast } from '@/hooks/use-toast';
import { FileSpreadsheet, Loader2 } from 'lucide-react';

const Index = () => {
  const [stickerData, setStickerData] = useState<StickerData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(45); // Reduced width to fit more items
  const [height, setHeight] = useState(35); // Reduced height to fit more items
  const [columns, setColumns] = useState(4); // 4 columns
  const [rows, setRows] = useState(6); // Increased to 6 rows
  const [nameFontSize, setNameFontSize] = useState(11); // Slightly reduced font size
  const [mrpFontSize, setMrpFontSize] = useState(8);
  const [priceFontSize, setPriceFontSize] = useState(14); // Slightly reduced font size
  const [nameSpacing, setNameSpacing] = useState(4); // Reduced space after product name in px
  const [priceSpacing, setPriceSpacing] = useState(2); // Space between MRP and price in px
  const { toast } = useToast();
  
  const handleFileProcessed = useCallback(async (file: File) => {
    setIsLoading(true);
    
    try {
      const data = await processExcelFile(file);
      setStickerData(data);
      
      toast({
        title: "File processed successfully",
        description: `${data.length} stickers ready for printing`,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      
      toast({
        title: "Error processing file",
        description: error instanceof Error ? error.message : "Failed to extract data from the Excel file",
        variant: "destructive"
      });
      
      setStickerData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handlePrint = useCallback(() => {
    if (stickerData.length === 0) {
      toast({
        title: "No data to print",
        description: "Please upload an Excel file first",
        variant: "destructive"
      });
      return;
    }
    
    printStickers('print-area');
  }, [stickerData]);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 transition-all animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sticker Factory</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your Excel data with Name, MRP, and Sell Price columns to generate printable stickers
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-6">
              <FileUploader 
                onFileProcessed={handleFileProcessed}
                isLoading={isLoading}
              />
            </div>
            
            <div className="md:col-span-6">
              <AdjustmentControls 
                width={width}
                height={height}
                columns={columns}
                rows={rows}
                nameFontSize={nameFontSize}
                mrpFontSize={mrpFontSize}
                priceFontSize={priceFontSize}
                nameSpacing={nameSpacing}
                priceSpacing={priceSpacing}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
                onColumnsChange={setColumns}
                onRowsChange={setRows}
                onNameFontSizeChange={setNameFontSize}
                onMrpFontSizeChange={setMrpFontSize}
                onPriceFontSizeChange={setPriceFontSize}
                onNameSpacingChange={setNameSpacing}
                onPriceSpacingChange={setPriceSpacing}
                onPrint={handlePrint}
                disabled={stickerData.length === 0 || isLoading}
              />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12 animate-pulse">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-gray-600">Processing your file...</span>
          </div>
        ) : stickerData.length > 0 ? (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="preview-container">
                <StickerPreview 
                  data={stickerData[0]} 
                  width={width} 
                  height={height} 
                  nameFontSize={nameFontSize}
                  mrpFontSize={mrpFontSize}
                  priceFontSize={priceFontSize}
                  nameSpacing={nameSpacing}
                  priceSpacing={priceSpacing}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Print Layout (A4)</h2>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <StickersGrid 
                  data={stickerData}
                  width={width}
                  height={height}
                  columns={columns}
                  rows={rows}
                  nameFontSize={nameFontSize}
                  mrpFontSize={mrpFontSize}
                  priceFontSize={priceFontSize}
                  nameSpacing={nameSpacing}
                  priceSpacing={priceSpacing}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center animate-fade-in">
            <FileSpreadsheet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No stickers yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Upload an Excel file with Name, MRP, and Sell Price columns to generate stickers
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
