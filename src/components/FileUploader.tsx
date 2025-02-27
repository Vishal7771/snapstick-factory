
import React, { useCallback, useState } from 'react';
import { Upload, FileX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFileProcessed: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcessed, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    processFile(files[0]);
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, []);
  
  const processFile = (file: File) => {
    if (!file) return;
    
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
      return;
    }
    
    setFileName(file.name);
    onFileProcessed(file);
  };
  
  const resetFile = useCallback(() => {
    setFileName(null);
  }, []);
  
  return (
    <div className="control-panel animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
      
      {!fileName ? (
        <div 
          className={`file-dropzone ${isDragging ? 'file-dropzone-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload size={36} className="text-gray-400" />
          <p className="text-gray-600 text-center">
            Drag and drop your Excel file here, or <span className="text-primary font-medium cursor-pointer">browse</span>
          </p>
          <p className="text-xs text-gray-400">
            File should contain columns for Name, MRP, and Sell Price
          </p>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <Upload size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{fileName}</p>
                <p className="text-xs text-gray-500">Excel file</p>
              </div>
            </div>
            
            <button 
              onClick={resetFile}
              className="text-gray-400 hover:text-destructive transition-colors"
              disabled={isLoading}
            >
              <FileX size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
