// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage, ref,uploadBytes, getDownloadURL} from 'firebase/storage'

// generador ids unicos
import {v4} from 'uuid'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBbfQZJDfWdg6bD1Fu3MRDkvvflT745pY",
  authDomain: "edunet-4ac2f.firebaseapp.com",
  projectId: "edunet-4ac2f",
  storageBucket: "edunet-4ac2f.appspot.com",
  messagingSenderId: "254406336638",
  appId: "1:254406336638:web:9544018ba30fd600b2782f"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function upload_File(file){
    const storageRef = ref(storage, v4() )
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}