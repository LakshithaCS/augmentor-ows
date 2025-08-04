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
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

import FileUpload from "../fileupload/fileupload";
import ImageUpload from "../fileupload/imageupload";
import { getModelCategories } from "../../util/Firebase";
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
  const [error, setError] = React.useState("Something Went Wrong!");
  const [userProfile, setUserProfile] = React.useState({
    sub: "",
    name: "",
    given_name: "",
    family_name: "",
    picture: "",
    email: "",
    email_verified: false,
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);

      // Optional: Fetch user info from Google API using access token
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          setUserProfile({...userProfile, user});
          alert("Hello " + user.given_name + " " + user.family_name);
          localStorage.setItem("GOOGLE_USER_INFO", JSON.stringify(user));
        });
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    localStorage.removeItem("GOOGLE_USER_INFO");
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
      setError("Please select the thumbnail and mark the price!");
      handleClick();
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    console.log("Submitting form data:", formData);
    login();
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
    const userinfo = localStorage.getItem("GOOGLE_USER_INFO");
    if (userinfo && userinfo !== undefined) {
      let temp = JSON.parse(userinfo);
      setUserProfile({...userProfile, temp});
      alert("Hello " + temp.given_name + " " + temp.family_name);
    }
  }, []);

  function Error() {
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={
          <span style={{ color: "#fff", fontWeight: "bold" }}>{error}</span>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            backgroundColor: "#d32f2f", // darker red
            color: "#fff",
            fontSize: "15px",
            borderRadius: "8px",
            padding: "10px 16px",
            fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif", // Clean & standard
            fontWeight: 600, // Adds emphasis for error
            letterSpacing: "0.5px", // Slight spacing for readability
          },
        }}
      />
    );
  }

  return (
    <section className="container" style={{ minHeight: "100vh" }}>
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
      <Error />
      <div className="row" style={{ paddingTop: "50px" }}>
        <div className="col-sm-12 col-lg-6">
          <TextField
            label="Name Your Model"
            variant="outlined"
            sx={styles}
            value={formData.modelName}
            onChange={(e) => handleChange("modelName", e.target.value)}
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
              <TextField {...params} label="Categorize Your Model" />
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
        <div className="col-sm-12 col-lg-6" style={{ height: "350px" }}>
          <FileUpload
            heading={"3D Model File"}
            uploadButtonText={"CHOOSE FILE"}
            acceptFileType={".glb"}
            onFileSelect={(file) => handleFileChange("modelFile", file)}
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
          style={{ height: "350px" }}
          hidden={!formData.syncAudio}
        >
          <FileUpload
            heading={"Audio Track"}
            uploadButtonText={"CHOOSE AUDIO FILE"}
            acceptFileType={"audio/*"}
            onFileSelect={(file) => handleFileChange("audioFile", file)}
          />
        </div>

        {!formData.syncAudio && (
          <div className="col-sm-12 col-lg-6 d-none d-lg-block">
            <div className="row" hidden={formData.isFree}>
              <TextField
                label="Mark Your Price"
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
        <div className="col-sm-12 col-lg-6" style={{ height: "280px" }}>
          <ImageUpload
            heading={"Select a Thumbnail"}
            uploadButtonText={"CHOOSE FILE"}
            acceptFileType={"image/*"}
            onFileSelect={(file) => handleFileChange("thumbnail", file)}
          />
        </div>
        <div className="col-sm-12 col-lg-6" hidden={!formData.syncAudio}>
          <div className="row" hidden={formData.isFree}>
            <TextField
              label="Mark Your Price"
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

export default Publish;
