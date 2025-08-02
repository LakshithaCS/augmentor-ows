import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

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
        sx={{ position: "absolute", top: "10px", left: "15px", fontSize: "20px", color: "black" }}
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
          sx={{ color: "white", backgroundColor: "black", height: "50px", borderRadius: "50px" }}
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
          <Typography variant="body2" sx={{ mt: 1, color: "black" }}>
            filename: {fileName}
          </Typography>
        )}
      </Box>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "20%", color: "white", backgroundColor: "black", height: "40px", borderRadius: "40px" }}
          onClick={handleSubmit}
          disabled={!fileName}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default FileUpload;