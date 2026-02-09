import React, { useState } from 'react';
import { Upload, X, FileText, Image, FileSpreadsheet } from 'lucide-react';

const FileUpload = ({ onUpload, accept = "image/*,.csv,.xlsx,.pdf", multiple = false }) => {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles.slice(0, 1);
    setFiles(newFiles);
    
    if (onUpload) {
      onUpload(multiple ? newFiles : newFiles[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const filteredFiles = droppedFiles.filter(file => {
      const fileType = file.type;
      const acceptTypes = accept.split(',');
      return acceptTypes.some(type => {
        if (type.includes('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType.includes(type.replace('.', '')) || file.name.endsWith(type);
      });
    });
    
    const newFiles = multiple ? [...files, ...filteredFiles] : filteredFiles.slice(0, 1);
    setFiles(newFiles);
    
    if (onUpload) {
      onUpload(multiple ? newFiles : newFiles[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    
    if (onUpload) {
      onUpload(multiple ? newFiles : newFiles[0]);
    }
  };

  const getFileIcon = (file) => {
    if (file.type.includes('image')) return <Image className="h-5 w-5 text-blue-500" />;
    if (file.type.includes('csv') || file.name.endsWith('.csv')) return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    if (file.type.includes('excel') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    if (file.type.includes('pdf') || file.name.endsWith('.pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload-component">
      <div 
        className={`border-2 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} rounded-xl p-8 transition-all`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center">
          <Upload className={`h-16 w-16 mx-auto mb-4 ${dragOver ? 'text-blue-500' : 'text-gray-400'}`} />
          
          <div className="mb-4">
            <p className="text-xl font-semibold text-gray-800">
              {files.length > 0 ? 'Files Selected' : 'Upload Your Files'}
            </p>
            <p className="text-gray-600 mt-1">
              {files.length > 0 
                ? `${files.length} file${files.length !== 1 ? 's' : ''} ready for upload`
                : 'Drag & drop files here or click to browse'
              }
            </p>
          </div>

          <label className="cursor-pointer inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition">
            <Upload className="h-5 w-5 mr-2" />
            Browse Files
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={accept}
              multiple={multiple}
            />
          </label>

          <p className="text-sm text-gray-500 mt-4">
            Supported formats: CSV, Excel, PDF, Images
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8 space-y-3">
            <h4 className="font-medium text-gray-700">Selected Files:</h4>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{file.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{file.type || 'Unknown type'}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <button
                type="button"
                onClick={() => setFiles([])}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Clear All Files
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;