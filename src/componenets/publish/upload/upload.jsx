import Dialog from "@mui/material/Dialog";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function UploadDialog({ onClose, open, progress, label }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm" // change to "md" if you need wider
    >
      <div className="flex flex-col p-4 w-full">
        <div className="mb-3 text-lg font-medium text-center">{label}</div>
        <div className="w-full">
            <LinearProgressWithLabel value={progress} />
        </div>
      </div>
    </Dialog>
  );
}

export default UploadDialog;
