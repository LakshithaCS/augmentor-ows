import { ref as dbRef, get, getDatabase, push, set } from "firebase/database";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  deleteObject
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_DATABASE_NAME}.firebaseio.com/`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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

async function uploadFileToStorage(file, path, setUploadProgress) {
  const fileref = storageRef(storage, path);
  const uploadTask = uploadBytesResumable(fileref, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}


function deleteFileFromStorage(path) {
  const fileref = storageRef(storage, path);

  deleteObject(fileref).catch((error) => {
    console.error("Error deleting file:", error);
  });
}


async function pushModelDataToRealTimeDatabase(basePath, jsonData) {
  const baseRef = dbRef(database, basePath);

  // Generate unique ID without writing data yet
  const newChildRef = push(baseRef); 
  const uniqueId = newChildRef.key; // This is your unique ID

  try {
    // Now upload data to that child node
    await set(newChildRef, jsonData);
    return uniqueId; // Return the unique ID used
  } catch (err) {
    throw err;
  }
}

export {
  getModelUrl,
  getDownloadURLFromStorage,
  getModelCategories,
  uploadFileToStorage,
  deleteFileFromStorage,
  pushModelDataToRealTimeDatabase,
  auth,
  googleProvider
};
