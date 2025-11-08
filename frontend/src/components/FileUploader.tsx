import React, { useState } from "react";

function FileUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    console.log("File selected :", file);
    alert(`Uploading: ${file.name}`);
  };

  return (
    <div>
      {/* input caché */}
      <input
        type="file"
        id="fileInput"
        accept="audio/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      
      {/* label stylé comme bouton */}
      <label htmlFor="fileInput" style={{ 
        padding: "8px 16px", 
        backgroundColor: "#4CAF50", 
        color: "white", 
        cursor: "pointer", 
        borderRadius: "4px", 
        marginRight: "8px"
      }}>
        Select an audio file
      </label>

      {/* bouton d’upload */}
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>

      {file && <p>File selected: {file.name}</p>}
    </div>
  );
}

export default FileUploader;
