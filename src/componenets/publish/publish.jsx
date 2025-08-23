import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import { signInWithPopup } from "firebase/auth";

import FileUpload from "../fileupload/fileupload";
import ImageUpload from "../fileupload/imageupload";
import { getModelCategories } from "../../util/Firebase";
import { upload, push } from "../../util/UploadingHelper";
import UploadDialog from "./upload/upload";
import ErrorDialog from "../error/error";
import SuccessDialog from "../success/success";
import { auth, googleProvider } from "../../util/Firebase";
import "./publish.css";

var styles = {
  width: "80%",
  margin: "3% 10%",
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    fontFamily: "Arial",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: "2px",
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "secondary.main",
        borderWidth: "1px",
      },
    },
    "&:hover:not(.Mui-focused)": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
      },
    },
  },
  "& .MuiInputLabel-outlined": {
    color: "#fff",
    "&.Mui-focused": {
      color: "secondary.main",
    },
  },
};

function isPositiveNumber(str) {
  const num = Number(str);
  if (Number.isNaN(num)) return false; // not a number
  return num > 0; // only true if greater than 0
}

function Publish() {
  const [formData, setFormData] = useState({
    modelName: "",
    category: "",
    isFree: false,
    syncAudio: false,
    price: "",
    modelFile: null,
    audioFile: null,
    thumbnail: null,
    preview: false,
    email: "",
  });

  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadLabel, setUploadLabel] = React.useState("Please Wait..........");

  const [errorMessage, setErrorMessage] = React.useState(
    "ERROR OCCURRED, PLEASE TRY AGAIN!"
  );
  const [successMessage, setSuccessMessage] = React.useState(
    "SUCCESSFULLY COMPLETED!"
  );
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const loginAndUpload = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      let user = result.user;
      let photo = user.photoURL;
      let email = user.email;
      let uid = user.uid;
      let name = user.displayName;

      const userData = {
        photo,
        email,
        uid,
        name,
      };

      localStorage.setItem("GOOGLE_USER_INFO", JSON.stringify(userData));

      await uploadToStorage(userData);
    } catch (error) {
      setErrorMessage("FAILED TO LOG IN");
      setError(true);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (field, value) => {
    if (
      field === "preview" &&
      value &&
      (formData.thumbnail === null || formData.price === "")
    ) {
      setErrorMessage("PLEASE SELECT THE THUMBNAIL AND MARK THE PRICE!");
      setError(true);
      handleClick();
    } else if (field === "preview") {
      handleClickOpen();
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const uploadToStorage = async (user) => {
    const epochMillis = Date.now();

    try {
      const downloadUrls = await upload(
        epochMillis,
        formData,
        user.uid,
        setUploadProgress,
        setUploadLabel,
        setError,
        setErrorMessage
      );

      await uploadToRealTimeDatabase(downloadUrls, user, epochMillis);
    } catch (e) {
      console.log(e);
    }

    setUploadOpen(false);
    if (!error) {
      setSuccessMessage("UPLOADING SUCCESS");
      setSuccess(true);
    }
    
  };

  const uploadToRealTimeDatabase = async (downloadUrls, user, epochMillis) => {
    const modelData = {
      createdBy: user.name,
      creatorEmail: user.email,
      category: formData.category,
      isNew: false,
      modelUrl: downloadUrls.model,
      audioUrl: downloadUrls.audio,
      thumbnailUrl: downloadUrls.thumbnail,
      nameOfTheModel: formData.modelName,
      postedDate: epochMillis,
      markPrice: formData.isFree ? "0.0" : formData.price,
      clientEmail: formData.email,
      isPublishedForFree: formData.isFree,
      paymentStatus: "pending",
      audioLink: "",
      modelLink: "",
    };
    await push(modelData, user.uid, setUploadLabel, setError, setErrorMessage);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    const valid =
      formData.modelName.length > 0 &&
      formData.modelFile != null &&
      formData.category.length > 0 &&
      formData.thumbnail != null &&
      (formData.syncAudio === false || formData.audioFile != null) &&
      (formData.isFree === true || isPositiveNumber(formData.price.length)) &&
      (formData.category.length == 0 ||
        formData.category !== "Housing" ||
        formData.email.length > 0);

    if (valid) {
      setUploadOpen(true);
      const userinfo = localStorage.getItem("GOOGLE_USER_INFO");
      if (userinfo && userinfo !== undefined) {
        let user = JSON.parse(userinfo);
        await uploadToStorage(user);
      } else {
        loginAndUpload();
      }
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const keys = await getModelCategories();
        setCategories(keys);
      } catch (e) {
        setError(
          "We are facing an internal server error, please try again later!"
        );
        handleClick();
      }
    }
    fetchCategories();
  }, []);

  return (
    <section
      className="container"
      style={{ Height: "100vh", paddingTop: "70px" }}
    >
      <ErrorDialog
        open={error}
        msg={errorMessage}
        onClose={() => setError(false)}
      />
      <SuccessDialog
        open={success}
        msg={successMessage}
        onClose={() => setSuccess(false)}
      />
      <UploadDialog
        open={uploadOpen && (!error || !success)}
        onClose={() => {}}
        progress={uploadProgress}
        label={uploadLabel}
      />
      <PreviewDialog open={openDialog} onClose={handleClickClose} />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={categories.length === 0}
      >
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          size={80}
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </Backdrop>
      <div className="row" style={{ paddingTop: "50px" }}>
        <div className="col-sm-12 col-lg-6">
          <TextField
            label="Name Your Model"
            variant="outlined"
            sx={styles}
            value={formData.modelName}
            onChange={(e) => handleChange("modelName", e.target.value)}
            helperText={
              formData.modelName == "" && submit ? "Name cannot be empty" : ""
            }
            error={formData.modelName == "" && submit}
          />
        </div>
        <div className="col-sm-12 col-lg-6">
          <Autocomplete
            disablePortal
            freeSolo
            forcePopupIcon
            options={categories}
            value={formData.category}
            onChange={(event, newValue) => handleChange("category", newValue)}
            onInputChange={(event, newInputValue) =>
              handleChange("category", newInputValue)
            }
            sx={styles}
            popupIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categorize Your Model"
                helperText={
                  formData.category == "" && submit
                    ? "Category cannot be empty"
                    : ""
                }
                error={formData.category == "" && submit}
              />
            )}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <h5 style={{ ...styles, fontWeight: "1000" }}>
            Publish for free
            <Switch
              checked={formData.isFree}
              onChange={(e) => handleChange("isFree", e.target.checked)}
              color="default"
            />
          </h5>
        </div>
        <div
          className="d-none d-lg-block col-sm-12 col-lg-6 "
          style={{ color: "black" }}
        >
          <h5 style={{ ...styles, fontWeight: "1000" }}>
            Synchronized Audio Track
            <Switch
              checked={formData.syncAudio}
              onChange={(e) => handleChange("syncAudio", e.target.checked)}
              color="default"
            />
          </h5>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6" style={{ height: "300px" }}>
          <FileUpload
            heading={"3D Model File"}
            uploadButtonText={"CHOOSE FILE"}
            acceptFileType={".glb"}
            onFileSelect={(file) => handleFileChange("modelFile", file)}
            helperText="3D model file cannot be empty"
            error={formData.modelFile == null && submit}
          />
        </div>
        <div
          className="d-block d-lg-none col-sm-12 col-lg-6 "
          style={{ color: "black" }}
        >
          <h5 style={{ ...styles, fontWeight: "1000" }}>
            Synchronized Audio Track
            <Switch
              checked={formData.syncAudio}
              onChange={(e) => handleChange("syncAudio", e.target.checked)}
              color="default"
            />
          </h5>
        </div>

        <div
          className="col-sm-12 col-lg-6"
          style={{ height: "300px" }}
          hidden={!formData.syncAudio}
        >
          <FileUpload
            heading={"Audio Track"}
            uploadButtonText={"CHOOSE AUDIO FILE"}
            acceptFileType={"audio/*"}
            onFileSelect={(file) => handleFileChange("audioFile", file)}
            helperText="Audio track cannot be empty"
            error={formData.audioFile == null && submit}
          />
        </div>

        {!formData.syncAudio && (
          <div className="col-sm-12 col-lg-6 d-none d-lg-block">
            <div className="row" hidden={formData.isFree}>
              <TextField
                label="Mark Your Price"
                helperText={
                  isPositiveNumber(formData.price) && !formData.isFree && submit
                    ? "Price cannot be empty or zero"
                    : ""
                }
                error={formData.price == "" && !formData.isFree && submit}
                variant="outlined"
                sx={styles}
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CurrencyExchangeIcon
                          sx={{ color: "rgba(0, 212, 255, 0.6);" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div
              className="row"
              hidden={!(formData.category?.toLowerCase() === "housing")}
            >
              <TextField
                label="Your Client's AugmentoR Email Id"
                helperText={
                  formData.category?.toLowerCase() === "housing" &&
                  submit &&
                  formData.email == ""
                    ? "Email id cannot be empty"
                    : ""
                }
                error={
                  formData.category?.toLowerCase() === "housing" &&
                  submit &&
                  formData.email == ""
                }
                variant="outlined"
                sx={styles}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="row d-none d-lg-block" style={{ color: "black" }}>
              <h5 style={{ ...styles, fontWeight: "1000" }}>
                Preview
                <Switch
                  checked={formData.preview}
                  onChange={(e) => handleChange("preview", e.target.checked)}
                  color="default"
                />
              </h5>
            </div>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6" style={{ height: "285px" }}>
          <ImageUpload
            heading={"Select a Thumbnail"}
            uploadButtonText={"CHOOSE FILE"}
            acceptFileType={"image/*"}
            onFileSelect={(file) => handleFileChange("thumbnail", file)}
            helperText="Thumbnail cannot be empty"
            error={formData.thumbnail == null && submit}
          />
        </div>
        <div className="col-sm-12 col-lg-6" hidden={!formData.syncAudio}>
          <div className="row" hidden={formData.isFree}>
            <TextField
              label="Mark Your Price"
              helperText={
                isPositiveNumber(formData.price) && !formData.isFree && submit
                  ? "Price cannot be empty or zero"
                  : ""
              }
              error={formData.price == "" && !formData.isFree && submit}
              variant="outlined"
              sx={styles}
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CurrencyExchangeIcon
                        sx={{ color: "rgba(0, 212, 255, 0.6);" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <div
            className="row"
            hidden={!(formData.category?.toLowerCase() === "housing")}
          >
            <TextField
              label="Your Client's AugmentoR Email Id"
              helperText={
                formData.category?.toLowerCase() === "housing" &&
                submit &&
                formData.email == ""
                  ? "Email id cannot be empty"
                  : ""
              }
              error={
                formData.category?.toLowerCase() === "housing" &&
                submit &&
                formData.email == ""
              }
              variant="outlined"
              sx={styles}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="row" style={{ color: "black" }}>
            <h5 style={{ ...styles, fontWeight: "1000" }}>
              Preview
              <Switch
                checked={formData.preview}
                onChange={(e) => handleChange("preview", e.target.checked)}
                color="default"
              />
            </h5>
          </div>
        </div>
      </div>

      {!formData.syncAudio && (
        <>
          {!formData.isFree && (
            <div className="row d-block d-lg-none">
              <TextField
                label="Mark Your Price"
                helperText={
                  isPositiveNumber(formData.price) && !formData.isFree && submit
                    ? "Price cannot be empty or zero"
                    : ""
                }
                error={formData.price == "" && !formData.isFree && submit}
                variant="outlined"
                sx={styles}
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CurrencyExchangeIcon
                          sx={{ color: "rgba(0, 212, 255, 0.6);" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          )}

          {formData.category?.toLowerCase() === "housing" && (
            <div className="row d-block d-lg-none">
              <TextField
                label="Your Client's AugmentoR Email Id"
                helperText={
                  formData.category?.toLowerCase() === "housing" &&
                  submit &&
                  formData.email == ""
                    ? "Email id cannot be empty"
                    : ""
                }
                error={
                  formData.category?.toLowerCase() === "housing" &&
                  submit &&
                  formData.email == ""
                }
                variant="outlined"
                sx={styles}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          )}

          <div className="row d-block d-lg-none" style={{ color: "black" }}>
            <h5 style={{ ...styles, fontWeight: "1000" }}>
              Preview
              <Switch
                checked={formData.preview}
                onChange={(e) => handleChange("preview", e.target.checked)}
                color="default"
              />
            </h5>
          </div>
        </>
      )}

      <div className="row">
        <div
          className="col-12"
          style={{ textAlign: "center", margin: "30px 0" }}
        >
          <Button
            className="form-submit-button"
            onClick={handleSubmit}
            sx={{
              padding: "10px 30px",
              color: "#fff",
              backgroundColor: "#000",
              height: "50px",
              borderRadius: "50px",
              minWidth: "120px",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </section>
  );
}

function PreviewDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Chip label="FREE" color="primary" variant="outlined" />
      </DialogTitle>
    </Dialog>
  );
}

export default Publish;
