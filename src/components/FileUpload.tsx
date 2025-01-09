import React, { useState } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in bytes
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes = '.jpg,.jpeg,.png,.pdf',
  maxFileSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!file.type.match(/(image\/.*|application\/pdf)/)) {
      setError('Lütfen sadece resim veya PDF dosyası yükleyin');
      return false;
    }

    if (file.size > maxFileSize) {
      setError(`Dosya boyutu ${maxFileSize / 1024 / 1024}MB'dan küçük olmalıdır`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="flex items-center justify-between p-4 border-2 border-indigo-600 rounded-lg bg-indigo-50">
          <div className="flex items-center space-x-3">
            {selectedFile.type.includes('image') ? (
              <Image className="h-6 w-6 text-indigo-600" />
            ) : (
              <FileText className="h-6 w-6 text-indigo-600" />
            )}
            <span className="text-sm text-gray-600">{selectedFile.name}</span>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-indigo-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 ${
            dragActive
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-300 bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={acceptedFileTypes}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Dosyayı buraya sürükleyin veya seçmek için tıklayın
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG veya PDF. Maksimum {maxFileSize / 1024 / 1024}MB
            </p>
          </div>
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 