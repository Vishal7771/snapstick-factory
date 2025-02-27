
import React from 'react';
import { Sliders, Printer, DownloadIcon } from 'lucide-react';

interface AdjustmentControlsProps {
  width: number;
  height: number;
  columns: number;
  rows: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onColumnsChange: (columns: number) => void;
  onRowsChange: (rows: number) => void;
  onPrint: () => void;
  disabled?: boolean;
}

const AdjustmentControls: React.FC<AdjustmentControlsProps> = ({
  width,
  height,
  columns,
  rows,
  onWidthChange,
  onHeightChange,
  onColumnsChange,
  onRowsChange,
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
          <h3 className="text-sm font-medium mb-3">Layout Settings</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="columns-input" className="text-xs text-gray-500 block mb-1">
                Columns
              </label>
              <input 
                id="columns-input"
                type="number" 
                min="1" 
                max="10" 
                value={columns} 
                onChange={(e) => onColumnsChange(parseInt(e.target.value))} 
                className="w-full p-2 border rounded-md text-sm"
                disabled={disabled}
              />
            </div>
            
            <div>
              <label htmlFor="rows-input" className="text-xs text-gray-500 block mb-1">
                Rows
              </label>
              <input 
                id="rows-input"
                type="number" 
                min="1" 
                max="20" 
                value={rows} 
                onChange={(e) => onRowsChange(parseInt(e.target.value))} 
                className="w-full p-2 border rounded-md text-sm"
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
