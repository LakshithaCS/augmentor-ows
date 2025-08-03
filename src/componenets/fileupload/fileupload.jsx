import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "./fileupload.css";

const FileUpload = ({ heading, uploadButtonText, acceptFileType }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = () => {
    alert("File submitted: " + fileName);
  };

  return (
    <Box
      sx={{
        width: "80%",
        height: "80%",
        margin: "2% 10% 10% 10%",
        border: "2px solid #ccc",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        p: 2,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        sx={{ position: "absolute", top: "10px", left: "15px", fontSize: "20px", color: "#fff"}}
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
          sx={{ height: "50px", borderRadius: "50px", background: "rgba(0, 213, 255, 0.37)" }}
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
      </Box>
    </Box>
  );
};

export default FileUpload;