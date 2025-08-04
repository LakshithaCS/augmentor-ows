import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const ImageUpload = ({ heading, acceptFileType, onFileSelect }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileSelect(selectedFile);
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Create image preview URL
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        height: "80%",
        margin: "2% 10% 10% 10%",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        p: 2,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        sx={{
          fontSize: "20px",
          color: "#fff",
        }}
      >
        {heading}
      </Typography>

      {/* Image Upload Icon or Preview */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start", // Left align
          alignItems: "center", // Vertically center
          margin: 0
        }}
      >
        <label htmlFor="file-upload">
          {file ? (
            <Box
              component="img"
              src={file}
              alt="Preview"
              sx={{
                maxWidth: "150px",
                maxHeight: "150px",
                borderRadius: "8px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          ) : (
            <IconButton
              component="span"
              sx={{
                width: "auto",
                height: "auto",
                p: 0,
              }}
            >
              <ImageIcon sx={{ fontSize: 150, color: "rgba(0, 213, 255, 0.37)" }} />
            </IconButton>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          accept={acceptFileType}
          hidden
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
};

export default ImageUpload;
