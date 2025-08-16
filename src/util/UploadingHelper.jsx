import { uploadFileToStorage } from "./Firebase";

async function upload(formData, userId) {
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

  const modelPath = `/Models/${userId}/${epochMillis}/${model_file_name}`;
  const audioPath = `/Models/${userId}/${epochMillis}/${audio_file_name}`;
  const thumnailPath = `/Models/${userId}/${epochMillis}/${thumbnail_file_name}`;

  let modelDownloadUrl = await uploadFileToStorage(model, modelPath);
  console.log("model is uploaded successfully : " + modelDownloadUrl);

  if (audio?.name) {
    let audioDownloadUrl = await uploadFileToStorage(audio, audioPath);
    console.log("audio is uploaded successfully : " + audioDownloadUrl);
  }

  let thumbnailDownloadUrl = await uploadFileToStorage(thumbnail, thumnailPath);
  console.log("thumbnail is uploaded successfully : " + thumbnailDownloadUrl);
}

export { upload };
