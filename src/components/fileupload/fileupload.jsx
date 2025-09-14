import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "./fileupload.css";

const FileUpload = ({
  heading,
  uploadButtonText,
  acceptFileType,
  onFileSelect,
  helperText,
  error,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
    setFileName(file ? file.name : "");
  };

  return (
    <Box
      sx={{
        width: "80%",
        height: "80%",
        margin: "2% 10% 10% 10%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: error ? "#d32f2f" : "rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        p: 2,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          top: "10px",
          left: "15px",
          fontSize: "20px",
          color: "#fff",
        }}
      >
        {heading}
      </Typography>

      {/* Center Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{
            height: "50px",
            borderRadius: "50px",
            background: "rgba(0, 213, 255, 0.37)",
          }}
        >
          {uploadButtonText}
          <input
            type="file"
            accept={acceptFileType}
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {fileName && (
          <Typography variant="body2" sx={{ mt: 1, color: "#fff" }}>
            filename: {fileName}
          </Typography>
        )}
        {error && (
          <Typography sx={{ mt: 1, color: "#d32f2f" }}>{helperText}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FileUpload;
