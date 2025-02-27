
import React from 'react';
import { Sliders, Printer, TextIcon } from 'lucide-react';

interface AdjustmentControlsProps {
  width: number;
  height: number;
  columns: number;
  rows: number;
  nameFontSize: number;
  mrpFontSize: number;
  priceFontSize: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onColumnsChange: (columns: number) => void;
  onRowsChange: (rows: number) => void;
  onNameFontSizeChange: (size: number) => void;
  onMrpFontSizeChange: (size: number) => void;
  onPriceFontSizeChange: (size: number) => void;
  onPrint: () => void;
  disabled?: boolean;
}

const AdjustmentControls: React.FC<AdjustmentControlsProps> = ({
  width,
  height,
  nameFontSize,
  mrpFontSize,
  priceFontSize,
  onWidthChange,
  onHeightChange,
  onNameFontSizeChange,
  onMrpFontSizeChange,
  onPriceFontSizeChange,
  onPrint,
  disabled = false
}) => {
  return (
    <div className="control-panel animate-slide-up">
      <div className="flex items-center space-x-2 mb-4">
        <Sliders size={18} className="text-primary" />
        <h2 className="text-lg font-semibold">Sticker Settings</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="width-slider" className="text-sm font-medium">
                Width: {width}mm
              </label>
            </div>
            <input 
              id="width-slider"
              type="range" 
              min="30" 
              max="150" 
              value={width} 
              onChange={(e) => onWidthChange(parseInt(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              disabled={disabled}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="height-slider" className="text-sm font-medium">
                Height: {height}mm
              </label>
            </div>
            <input 
              id="height-slider"
              type="range" 
              min="20" 
              max="100" 
              value={height} 
              onChange={(e) => onHeightChange(parseInt(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              disabled={disabled}
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-3">
            <TextIcon size={16} className="text-primary" />
            <h3 className="text-sm font-medium">Font Size Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="name-font-slider" className="text-xs text-gray-500">
                  Product Name: {nameFontSize}px
                </label>
              </div>
              <input 
                id="name-font-slider"
                type="range" 
                min="8" 
                max="24" 
                value={nameFontSize} 
                onChange={(e) => onNameFontSizeChange(parseInt(e.target.value))} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                disabled={disabled}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="mrp-font-slider" className="text-xs text-gray-500">
                  MRP: {mrpFontSize}px
                </label>
              </div>
              <input 
                id="mrp-font-slider"
                type="range" 
                min="6" 
                max="18" 
                value={mrpFontSize} 
                onChange={(e) => onMrpFontSizeChange(parseInt(e.target.value))} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                disabled={disabled}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="price-font-slider" className="text-xs text-gray-500">
                  Sell Price: {priceFontSize}px
                </label>
              </div>
              <input 
                id="price-font-slider"
                type="range" 
                min="8" 
                max="28" 
                value={priceFontSize} 
                onChange={(e) => onPriceFontSizeChange(parseInt(e.target.value))} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                disabled={disabled}
              />
            </div>
          </div>
        </div>
        
        <button
          onClick={onPrint}
          disabled={disabled}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Printer size={18} />
          <span>Print Stickers</span>
        </button>
      </div>
    </div>
  );
};

export default AdjustmentControls;
