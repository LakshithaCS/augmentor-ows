import { ref as dbRef, get } from "firebase/database";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_DATABASE_NAME}.firebaseio.com/`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

async function getModelCategories() {
  try {
    const snapshot = await get(dbRef(database, "/Models"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const keys = Object.keys(data); // Extract keys from the object
      return keys;
    } else {
      console.warn("No data available at path: /Models");
      return [];
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

async function getModelUrl(path) {
  try {
    const snapshot = await get(dbRef(database, path));
    if (snapshot.exists()) {
      let data = snapshot.val();
      return { modelUrl: data.modelUrl, audioUrl: data.audioUrl };
    } else {
      console.warn("No data available at path:", path);
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

async function getDownloadURLFromStorage(path) {
  try {
    const url = await getDownloadURL(storageRef(storage, path));
    return url;
  } catch (error) {
    console.error("Error getting file from storage:", error);
    throw error;
  }
}

function uploadFileToStorage(file, path) {
  const fileref = storageRef(storage, path);
  const uploadTask = uploadBytesResumable(fileref, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
      console.log(error.code);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
}

export {
  getModelUrl,
  getDownloadURLFromStorage,
  getModelCategories,
  uploadFileToStorage,
};
