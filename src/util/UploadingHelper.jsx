import {
  uploadFileToStorage,
  deleteFileFromStorage,
  pushModelDataToRealTimeDatabase,
} from "./Firebase";

async function upload(
  epochMillis,
  formData,
  userId,
  setUploadProgress,
  setUploadLabel,
  setError,
  setErrorMessage
) {
  const thumbnail = formData.thumbnail;
  const audio = formData.audioFile;
  const model = formData.modelFile;
  const model_name = formData.modelName;

  let model_file_name = epochMillis + ".glb";

  let thumbnail_file_name = null;
  if (thumbnail?.name) {
    const ext = thumbnail.name.split(".").pop();
    thumbnail_file_name = "thumbnail_" + epochMillis + "." + ext;
  }

  let audio_file_name = null;
  if (audio?.name) {
    const ext = audio.name.split(".").pop();
    audio_file_name = "audio_" + epochMillis + "." + ext;
  }

  const base_path = `/Models/${userId}/${epochMillis}_${model_name}`;
  const modelPath = `${base_path}/${model_file_name.replace(/\s/g, "_")}`;
  const audioPath = `${base_path}/${audio_file_name}`;
  const thumnailPath = `${base_path}/${thumbnail_file_name}`;

  let downloadUrls = {
    model: "",
    audio: "",
    thumbnail: "",
  };
  let failed = false; // flag

  try {
    setUploadLabel("Uploading Model File.......");
    let modelDownloadUrl = await uploadFileToStorage(
      model,
      modelPath,
      setUploadProgress,
      setError,
      setErrorMessage
    );
    downloadUrls["model"] = modelDownloadUrl;
  } catch (e) {
    failed = true;
    setError(true);
    setErrorMessage("FAILED TO UPLOAD MODEL FILE, TRY AGAIN!");
  }

  if (failed) return downloadUrls;

  if (audio?.name) {
    try {
      setUploadLabel("Uploading Aduio File.......");
      let audioDownloadUrl = await uploadFileToStorage(
        audio,
        audioPath,
        setUploadProgress,
        setError,
        setErrorMessage
      );
      downloadUrls["audio"] = audioDownloadUrl;
    } catch (e) {
      failed = true;
      setError(true);
      setErrorMessage("FAILED TO UPLOAD MODEL FILE, TRY AGAIN!");
      deleteFileFromStorage(modelPath);
    }
  }

  if (failed) return downloadUrls;

  try {
    setUploadLabel("Uploading Thumbnail File.......");
    let thumbnailDownloadUrl = await uploadFileToStorage(
      thumbnail,
      thumnailPath,
      setUploadProgress,
      setError,
      setErrorMessage
    );
    downloadUrls["thumbnail"] = thumbnailDownloadUrl;
  } catch (e) {
    failed = true;
    setError(true);
    setErrorMessage("FAILED TO UPLOAD MODEL FILE, TRY AGAIN!");
    deleteFileFromStorage(modelPath);
    if (audio?.name) {
      deleteFileFromStorage(audioPath);
    }
  }

  return downloadUrls;
}

async function push(data, userId, setUploadLabel, setError, setErrorMessage) {
  const bashPath = `/ForReview/FileSubmission/${userId}`;
  try {
    setUploadLabel("Pushing Data Into Real Time Database.......");
    await pushModelDataToRealTimeDatabase(bashPath, data);
    return true;
  } catch (e) {
    setError(true);
    setErrorMessage("FAILED TO PUSH MODE DATA INTO DB, TRY AGAIN!");
    return false;
  }
}

export { upload, push };
