import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAU5K7HIv4OyfcgXZ9BCHIz-aPvK4Ybesk",
  authDomain: "todoer-ad9ec.firebaseapp.com",
  projectId: "todoer-ad9ec",
  storageBucket: "todoer-ad9ec.appspot.com",
  messagingSenderId: "183252915994",
  appId: "1:183252915994:web:9efa6b5df3fc7b35a03ea3",
};

/**
 * Initializes the firebase SDK.
 */
export function initializeFirebase() {
  return initializeApp(firebaseConfig);
}
