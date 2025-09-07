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
    } else if (field == "isFree") {
      if (value) {
        setFormData((prev) => ({ ...prev, ["price"]: "" }));
        setFormData((prev) => ({ ...prev, ["preview"]: false }));
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
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
      className="form-container"
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
      <div className="row">
        <div className="col-9">
          <div className="row" style={{ margin: "1.5% 4%" }}>
            <h3 style={{ margin: "3% 0" }}>
              3D Model Submission & Preview - AugmentoR Creator Hub
            </h3>
            <p style={{ textAlign: "justify" }}>
              Welcome to the AugmentoR Creator Submission page — your gateway to
              bringing your 3D creations into the world of augmented reality by
              ensuring that your 3D models are optimized for the ultimate
              augmented reality experience! At AugmentoR, we empower creators
              from around the world to showcase their unique 3D creations. This
              page is dedicated to helping you preview, validate and submit your
              models into our platform.
            </p>
            <p style={{ textAlign: "justify" }}>
              Before submitting your model, we encourage you to preview and
              validate it to ensure it looks and performs perfectly in AR. This
              helps maintain the quality of experiences across the platform and
              ensures your work is displayed at its best. Use the recommended{" "}
              <a href="https://modelviewer.dev/editor/" target="_blank">
                Model Viewer Tool ↗
              </a>{" "}
              to view your model in 3D and check its AR compatibility before
              uploading. The tool will open in a new tab.
            </p>
          </div>

          <div className="row" style={{ paddingTop: "50px" }}>
            <div className="col-sm-12 col-lg-6">
              <TextField
                label="Name Your Model"
                variant="outlined"
                sx={styles}
                value={formData.modelName}
                onChange={(e) => handleChange("modelName", e.target.value)}
                helperText={
                  formData.modelName == "" && submit
                    ? "Name cannot be empty"
                    : ""
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
                onChange={(event, newValue) =>
                  handleChange("category", newValue)
                }
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
            <div
              className="col-sm-12 col-lg-6"
              style={{
                height:
                  !formData.syncAudio && formData.preview ? "480px" : "300px",
              }}
            >
              <FileUpload
                heading={"3D Model File"}
                uploadButtonText={"CHOOSE FILE"}
                acceptFileType={".glb,model/gltf-binary"}
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
                      isPositiveNumber(formData.price) &&
                      !formData.isFree &&
                      submit
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
                <div
                  className="row d-none d-lg-block"
                  style={{ color: "black" }}
                >
                  <h5 style={{ ...styles, fontWeight: "1000" }}>
                    Preview
                    <Switch
                      checked={formData.preview}
                      onChange={(e) =>
                        handleChange("preview", e.target.checked)
                      }
                      color="default"
                    />
                  </h5>
                </div>
                {formData.preview && (
                  <div class="image-container" style={styles}>
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="Bottom Image"
                      class="bottom-img"
                    />
                    {(formData.isFree || !isPositiveNumber(formData.price)) && (
                      <img
                        src="/images/ribbon.png"
                        alt="Top Image"
                        class="top-img"
                      />
                    )}
                  </div>
                )}
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
                    isPositiveNumber(formData.price) &&
                    !formData.isFree &&
                    submit
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
              {formData.preview && (
                <div class="image-container" style={styles}>
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Bottom Image"
                    class="bottom-img"
                  />
                  {(formData.isFree || !isPositiveNumber(formData.price)) && (
                    <img
                      src="/images/ribbon.png"
                      alt="Top Image"
                      class="top-img"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {!formData.syncAudio && (
            <>
              {!formData.isFree && (
                <div className="row d-block d-lg-none">
                  <TextField
                    label="Mark Your Price"
                    helperText={
                      isPositiveNumber(formData.price) &&
                      !formData.isFree &&
                      submit
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

                {formData.preview && (
                  <div class="image-container" style={styles}>
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="Bottom Image"
                      class="bottom-img"
                    />
                    {(formData.isFree || !isPositiveNumber(formData.price)) && (
                      <img
                        src="/images/ribbon.png"
                        alt="Top Image"
                        class="top-img"
                      />
                    )}
                  </div>
                )}
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

          <div className="row" style={{ margin: "1.5% 4%" }} id="file-requirements">
            <h3 style={{ margin: "3% 0" }}>File requirements for models</h3>
            <p>
              Scene Viewer has the following support and limitations for models.
            </p>
            <table class="file-requirements-table">
              <tbody>
                <tr>
                  <td>
                    <b>File format support</b>
                  </td>
                  <td>
                    <code translate="no" dir="ltr">
                      gl
                      <wbr />
                      TF
                    </code>{" "}
                    2.0/
                    <code translate="no" dir="ltr">
                      glb
                    </code>
                    , using these extensions:
                    <ul>
                      <li>
                        <code translate="no" dir="ltr">
                          KHR_materials_unlit
                        </code>
                      </li>
                      <li>
                        <code translate="no" dir="ltr">
                          KHR_texture_transform
                        </code>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Animation</b>
                  </td>
                  <td>
                    <ul>
                      <li>Looping skeletal animation</li>
                      <li>Looping rigid animation</li>
                      <li>Looping transform animation</li>
                    </ul>
                    The animation will be played on a loop. If the{" "}
                    <code translate="no" dir="ltr">
                      gl
                      <wbr />
                      TF
                    </code>{" "}
                    file contains multiple animations, Scene Viewer plays only
                    the first animation.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Recommended limits</b>
                  </td>
                  <td>
                    The overall performance of assets depends on setting
                    constraints and making tradeoffs between vertices,
                    materials, texture resolution, mesh per material, and other
                    factors. Use the following guidelines to optimize your
                    assets.
                    <br />
                    <ul>
                      <li>
                        Number of triangles: The recommended limit is 100,000
                        triangles, but targeting the lowest number will maintain
                        high performance in Scene Viewer. 30,000 to 50,000 is an
                        ideal range.
                      </li>
                      <li>
                        Number of materials: The recommended limit is 10
                        materials, two of which can be alpha. Target the lowest
                        number possible to keep the asset performing well.
                      </li>
                      <li>Mesh per material: 1</li>
                      <li>Maximum texture resolution: 2048 × 2048</li>
                      <li>
                        Bone (including non-weighted joints): 254 (hard limit)
                      </li>
                      <li>Bone weights per vertex limit: 4 (hard limit)</li>
                      <li>UV: 1 UV per mesh (hard limit)</li>
                      <li>
                        Model size: 10 MB (Bigger models may result in poor user
                        experience.)
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Shadow support</b>
                  </td>
                  <td>
                    Hard shadows are automatically rendered by Scene Viewer when
                    placing an object, so we recommend against baking shadows
                    into your model.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Texture support</b>
                  </td>
                  <td>
                    <ul>
                      <li>
                        PNG format: PNG-24, indexed PNG-8.
                        <br />
                        JPGs are preferred when there is no transparency because
                        they reduce size.
                      </li>
                      <li>Color space: sRGB</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Material</b>
                  </td>
                  <td>PBR</td>
                </tr>
                <tr>
                  <td>
                    <b>File loading</b>
                  </td>
                  <td>HTTPS</td>
                </tr>
                <tr>
                  <td>
                    <b>Scene</b>
                  </td>
                  <td>
                    <ul>
                      <li>
                        Axis: right-handed, with these properties:
                        <ul>
                          <li>+X is right</li>
                          <li>+Y is up</li>
                          <li>
                            -Z points forward from the origin (in other words,
                            the "front" of an asset should be facing +Z)
                          </li>
                        </ul>
                      </li>
                      <li>
                        Scale: 1 unit = 1 meter (as defined by the glTF
                        specification to ensure the model is placed in AR in
                        true scale)
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row" style={{ margin: "1.5% 4%" }} id="model-validation">
            <h3 style={{ margin: "3% 0" }}>Validating your 3D model</h3>
            <p>
              To validate a model, the previewer tool needs one glb or glTF
              file, any associated image and bin files, and an optional audio
              file. The audio file will loop along with animation 0.
            </p>
            <p>
              You can multi-select individual files, or optionally put the glb
              or glTF and its associated files into a zip file. (The zip file
              method doesn't support audio files.)
            </p>
            <p>
              To validate your 3D model:
              <ol>
                <li>
                  <p>
                    Open the{" "}
                    <a
                      href="https://arvr.google.com/scene-viewer-preview"
                      class="external"
                    >
                      online previewer tool
                    </a>
                    in a browser.
                  </p>
                </li>
                <li>
                  <p>
                    Use one of these methods to add the files to the previewer
                    tool:
                  </p>

                  <ul>
                    <li>
                      <p>
                        <strong>Drag and drop</strong>. Select a glb or glTF
                        file and all of its associated files (or a zip file
                        containing these files), and drag the selected files or
                        zip file to the previewer tool.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>From the previewer tool</strong>. In the
                        previewer tool, choose{" "}
                        <strong>Scene Viewer &gt; Load File</strong>. Select a
                        glb or glTF file and all of its associated files (or a
                        zip file containing these files), and click{" "}
                        <strong>Open</strong>.
                      </p>
                    </li>
                  </ul>
                </li>
              </ol>
            </p>
            <p>
              After you load the files consisting of your 3D model into the
              previewer tool, a console at the bottom of the browser displays
              the results, including any error messages.
            </p>
          </div>

          <div className="row" style={{ margin: "1.5% 4%" }} id="adding-model">
            <h3 style={{ margin: "3% 0" }}>Adding 3D models for validation</h3>
            <p>
              To validate a 3D model, add the files that make up the 3D model to
              our{" "}
              <a href="https://modelviewer.dev/editor/" class="external">
                Model Editor tool
              </a>
              .
            </p>
            <p>
              To validate a model, the previewer needs the model's glb or glTF
              file, any associated image and bin files, and an optional audio
              file. You can multi-select individual files or add a single zip
              file.
            </p>
            <p>
              When adding a zip file, the previewer loads the first glb or glTF
              it finds, as well as the associated image and bin files within
              that zip file.
            </p>
            <p>
              <ol>
                <li>
                  <p>
                    Open the{" "}
                    <a href="https://modelviewer.dev/editor/" class="external">
                      Model Editor tool
                    </a>{" "}
                    in a browser.
                  </p>
                </li>
                <li>
                  <p>
                    Use one of these methods to add the files to the previewer
                    tool:
                  </p>

                  <ul>
                    <li>
                      <p>
                        To drag and drop files for validation, multi-select the
                        glb or glTF file and any associated files (or select a
                        zip file containing these files), and drag it to the
                        previewer tool.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Select files from previewer tool</strong>. In
                        the previewer tool, choose{" "}
                        <strong>Scene Viewer &gt; Load File</strong>.
                        Multi-select the glb or glTF file and all of its
                        associated files (or a zip file containing these files),
                        and click <strong>Open</strong>.
                      </p>
                    </li>
                  </ul>
                </li>
              </ol>
            </p>
          </div>

          <div className="row" style={{ margin: "1.5% 4%" }} id="validation-error">
            <h3 style={{ margin: "3% 0" }}>Validation errors</h3>
            <table className="validation-errors-table">
              <tbody>
                <tr>
                  <th>Error Code</th>
                  <th>Severity</th>
                  <th>Message</th>
                  <th>Current Supported Values</th>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      INVALID_
                      <wbr />
                      INPUT_
                      <wbr />
                      FILE_
                      <wbr />
                      EXTENSION
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The input file [filename] has a file extension that is not
                    supported by the validator.
                  </td>
                  <td>
                    <code translate="no" dir="ltr">
                      ['.
                      <wbr />
                      glb',
                      <wbr /> '.
                      <wbr />
                      gltf']
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      REC_
                      <wbr />
                      INPUT_
                      <wbr />
                      BINARY_
                      <wbr />
                      SIZE_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Warning</td>
                  <td>
                    The provided user input has a binary size that exceeds the
                    limit recommended by the Scene Viewer specification, which
                    is a recommended size limit of [size] MB.
                  </td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      MAX_
                      <wbr />
                      INPUT_
                      <wbr />
                      BINARY_
                      <wbr />
                      SIZE_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The provided user input has a binary size that exceeds the
                    maximum limit supported by the Scene Viewer specification,
                    which is a maximum size limit of [size] MB.
                  </td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      UNSUPPORTED_
                      <wbr />
                      GLTF_
                      <wbr />
                      EXTENSION_
                      <wbr />
                      USED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The extension [ext] in the glTF is not supported by the
                    Scene Viewer specification.
                  </td>
                  <td>
                    <code translate="no" dir="ltr">
                      ['KHR_
                      <wbr />
                      materials_
                      <wbr />
                      pbr
                      <wbr />
                      Specular
                      <wbr />
                      Glossiness',
                      <wbr /> 'KHR_
                      <wbr />
                      materials_
                      <wbr />
                      unlit',
                      <wbr /> 'KHR_
                      <wbr />
                      texture_
                      <wbr />
                      transform']
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      ANIMATION_
                      <wbr />
                      LIMIT_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The number of animations in the glTF exceeds the limit
                    supported by the Scene Viewer specification, which is a
                    maximum of [num] animations.
                  </td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      MORPH_
                      <wbr />
                      TARGET_
                      <wbr />
                      USED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The glTF contains a morph target, which is not supported by
                    the Scene Viewer specification.
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      MATERIAL_
                      <wbr />
                      LIMIT_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Warning</td>
                  <td>
                    The number of materials in the glTF exceeds the limit
                    recommended by the Scene Viewer specification, which is a
                    maximum of [num] materials.
                  </td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      TEXTURE_
                      <wbr />
                      RESOLUTION_
                      <wbr />
                      LIMIT_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Warning</td>
                  <td>
                    The resolution of the image at index [idx] in the glTF
                    exceeds the limit recommended by the Scene Viewer
                    specification, which is a maximum resolution of [res] x
                    [res].
                  </td>
                  <td>2048 x 2048</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      UV_
                      <wbr />
                      LIMIT_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The number of UV per mesh in the glTF exceeds the limit
                    supported by the Scene Viewer specification, which is a
                    maximum of [num] UV per mesh.
                  </td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      VERTEX_
                      <wbr />
                      COLOR_
                      <wbr />
                      USED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The glTF contains a vertex color, which is not supported by
                    the Scene Viewer specification.
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      JOINT_
                      <wbr />
                      LIMIT_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The number of joints in the glTF exceeds the limit supported
                    by the Scene Viewer specification, which is a maximum of
                    [num] joints.
                  </td>
                  <td>254</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      TRIANGLE_
                      <wbr />
                      LIMIT_
                      <wbr />
                      EXCEEDED
                    </code>
                  </td>
                  <td>Warning</td>
                  <td>
                    The number of triangles in the glTF exceeds the limit
                    recommended by the Scene Viewer specification, which is a
                    maximum of [num] triangles.
                  </td>
                  <td>100,000</td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      PRIMITIVE_
                      <wbr />
                      MODE_
                      <wbr />
                      UNSUPPORTED
                    </code>
                  </td>
                  <td>Error</td>
                  <td>
                    The primitive mode [mode] is not supported by the Scene
                    Viewer specification.
                  </td>
                  <td>
                    {
                      "{4 : Triangle List, 5 : Triangle Strip, 6 : Triangle Fan}"
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <code translate="no" dir="ltr">
                      MISSING_
                      <wbr />
                      PBR_
                      <wbr />
                      METALLIC_
                      <wbr />
                      ROUGHNESS
                    </code>
                  </td>
                  <td>Information</td>
                  <td>
                    The material at index [idx] is missing the{" "}
                    <code translate="no" dir="ltr">
                      pbr
                      <wbr />
                      Metallic
                      <wbr />
                      Roughness
                    </code>
                    property. This is not required by the Scene Viewer
                    specification if metallic and roughness factors are used
                    instead. If neither of these are used, then the material
                    will use default values, which may lead to unintended
                    behavior.
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row" style={{ margin: "1.5% 4%" }} id="model-compatibility">
            <h3 style={{ margin: "3% 0" }}>Model compatibility</h3>
            <p>
              Models in the{" "}
              <a href="https://www.khronos.org/gltf/">
                <code translate="no" dir="ltr">
                  gltf
                </code>{" "}
                and{" "}
                <code translate="no" dir="ltr">
                  glb
                </code>{" "}
                file format
              </a>{" "}
              are supported by{" "}
              <code translate="no" dir="ltr">
                &lt;model-viewer&gt;
              </code>
              . Refer to the{" "}
              <a href="https://threejs.org/docs/#examples/en/loaders/GLTFLoader">
                <code translate="no" dir="ltr">
                  three.js GLTFLoader documentation
                </code>
              </a>{" "}
              for a list of supported glTF extensions.
            </p>
            <p>
              To ensure that your model will display properly, check your model
              in <a href="https://modelviewer.dev/editor/">Model Editor</a>.
            </p>
          </div>
        </div>
        <div className="col-3">
          <div className="nav-panel">
              <h5>On This Page</h5>
              <br/>
              <ul className="headings">
                <li>
                  <a href="#file-requirements">File requirements for models</a>
                </li>
                <li>
                  <a href="#model-validation">Validating your 3D model</a>
                </li>
                <li>
                  <a href="#adding-model">Adding 3D models for validation</a>
                </li>
                <li>
                  <a href="#validation-error">Validation errors</a>
                </li>
                <li>
                  <a href="#model-compatibility">Model compatibility</a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Publish;
