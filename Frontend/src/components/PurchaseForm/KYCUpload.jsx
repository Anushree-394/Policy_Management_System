import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiUpload, FiFile, FiImage, FiX } from 'react-icons/fi';

/**
 * KYC Upload Component
 * @param {Object} props - Component props
 * @param {Function} props.onFileChange - Callback when a file is selected/removed
 * @param {boolean} [props.requiredKyc=false] - Whether the field is required
 * @param {File} [props.initialFile] - Initial file to display
 */
const KYCUpload = ({ onFileChange, requiredKyc = false, initialFile = null }) => {
  const [file, setFile] = useState(initialFile);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Handle initial file or changes to initialFile prop
  useEffect(() => {
    if (initialFile) {
      if (initialFile instanceof File) {
        setFile(initialFile);
        createPreview(initialFile);
      }
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  }, [initialFile]);

  const createPreview = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    onFileChange?.(selectedFile);
    createPreview(selectedFile);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(null);
    onFileChange?.(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const isPdf = file?.type === 'application/pdf';
  const isImage = file?.type.startsWith('image/');

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-700">
          KYC Document <span className="text-red-500">{requiredKyc ? '*' : ''}</span>
        </label>
      </div>
      
      <div 
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          file ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          required={requiredKyc}
        />
        
        {!file ? (
          <div className="flex flex-col items-center justify-center py-6">
            <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, PNG, JPG (max 5MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isImage && previewUrl ? (
                <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                  <FiFile className="w-6 h-6" />
                </div>
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB • {file.type}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
              aria-label="Remove file"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500">
        Accepted formats: PDF, PNG, JPG (max 5MB)
      </p>
    </div>
  );
};

KYCUpload.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  requiredKyc: PropTypes.bool,
  initialFile: PropTypes.instanceOf(File),
};

export default KYCUpload;
