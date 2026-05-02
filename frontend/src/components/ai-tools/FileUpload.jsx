import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, acceptedFormats = '.pdf,.docx,.doc', maxSize = 5 }) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [error, setError] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const fileInputRef = React.useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];

    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF and DOCX files are allowed');
      return false;
    }

    setError('');
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setFileName(file.name);
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setFileName(file.name);
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
          dragActive
            ? 'border-blue-700 bg-blue-50'
            : error
            ? 'border-red-300 bg-red-50'
            : fileName
            ? 'border-green-300 bg-green-50'
            : 'border-slate-300 bg-slate-50 hover:border-blue-700 hover:bg-blue-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFormats}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center text-center">
          {fileName ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
              >
                <FileText className="w-8 h-8 text-green-600" />
              </motion.div>
              <p className="text-lg font-semibold text-slate-900 mb-2">{fileName}</p>
              <p className="text-sm text-slate-500">Click to change file</p>
            </>
          ) : (
            <>
              <motion.div
                animate={{ y: dragActive ? -5 : 0 }}
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
              >
                <Upload className="w-8 h-8 text-blue-700" />
              </motion.div>
              <p className="text-lg font-semibold text-slate-900 mb-2">
                {dragActive ? 'Drop your resume here' : 'Upload your resume'}
              </p>
              <p className="text-sm text-slate-500 mb-4">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-slate-400">
                Supports PDF, DOCX (Max {maxSize}MB)
              </p>
            </>
          )}
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 text-red-600 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
