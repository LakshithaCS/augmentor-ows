import { Dialog } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function SuccessDialog({ onClose, open, msg }) {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: { padding: "24px", textAlign: "center" },
      }}
    >
      <div className="flex flex-col items-center w-full">
        <CheckCircleIcon className="text-green-600" style={{ fontSize: 48, color: '#01579b' }} />
        <div className="text-lg font-medium text-green-700 mt-3" style={{color: '#01579b'}}>
          {msg}
        </div>
      </div>
    </Dialog>
  );
}

export default SuccessDialog;
