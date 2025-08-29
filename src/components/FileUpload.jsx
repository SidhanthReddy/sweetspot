import React from 'react';

const FileUpload = ({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  selectedFiles,
  onShowModal,
  onShowQuickDrawModal // Add this new prop
}) => {
  const handleRemoveFile = () => {
    onFileSelect([]);
  };
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Always replace with the most recent selection (first file only)
      const fileArray = [files[0]];
      onFileSelect(fileArray);
    }
  };

  return (
    <div className="space-y-0">
      <div className="flex items-center mb-4 text-xl">
        <span className="flex-1 text-gray-500">
          <button
            type="button"
            onClick={onShowModal}
            className="font-medium transition-colors hover:underline text-[rgba(224,99,99,0.85)]"
          >
            Select
          </button>{" "}
          from Existing Cakes
        </span>
        <span className="text-gray-500 mx-4">OR</span>
        <div className="flex-1"></div>
      </div>


      
      <div
        className={`border-2 border-dashed ${isDragOver ? 'border-[rgba(224,99,99,0.85)] bg-amber-50' : 'border-gray-300'} p-12 text-center transition-colors`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="text-gray-500 text-sm mb-4 font-medium">
          DROP FILE HERE OR
        </div>
        <div className="relative inline-block">
          <input
            type="file"
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt,.max"
          />
          <button
            type="button"
            className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-2 text-sm rounded font-medium hover:bg-amber-700 transition-colors"
          >
            SELECT FILE
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Accepted file types: .jpg, .gif, .png, .pdf, .jpeg, .bmp, .Max, file size: 2 MB, Max. files: 1.
      </p>
      <div className="flex items-center mb-4 mt-4 text-xl">
        <span className="text-gray-500">
          You can also use{" "}
          <button
            type="button"
            onClick={onShowQuickDrawModal}
            className="font-medium transition-colors hover:underline text-[rgba(224,99,99,0.85)]"
          >
            QuickDraw AI Generator
          </button>{" "}
          to create custom cake designs
        </span>
      </div>


      {/* Display Selected File */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-sm font-medium text-gray-700">Selected File:</p>
          <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded">
            <span>
              {selectedFiles[0].name} ({Math.round(selectedFiles[0].size / 1024)}KB)
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-auto text-red-500 hover:text-red-700 text-smtransition-colors p-1"
              title="Remove file"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;