import { uploadFileToStorage } from "./Firebase";

function upload(formData) {
  const thumbnail = formData.thumbnail;
  const audio = formData.audioFile;
  const model = formData.modelFile;

  const epochMillis = Date.now();

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

  console.log(model_file_name, audio_file_name, thumbnail_file_name);


  // uploading mode file
  const path = `/Models/test/${model_file_name}`;
  console.log(path);
  console.log(model);
  uploadFileToStorage(model, path);

}

export { upload };
