
import { Dialog } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

function ErrorDialog({ onClose, open, msg }) {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: { padding: '24px', textAlign: 'center' }, // center content horizontally
      }}
    >
      <div className="flex flex-col items-center w-full">
        <ErrorIcon className="text-red-600" style={{ fontSize: 48, color: '#ef5350' }} />
        <div className="text-lg font-medium text-red-700 mt-3" style={{color: "#ef5350"}}>
          {msg}
        </div>
      </div>
    </Dialog>
  );
}



export default ErrorDialog;