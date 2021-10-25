import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2jNNYsl__F4EQFnx9boGJO2JQgJN5RFM",
  authDomain: "choiceless-6eaf0.firebaseapp.com",
  projectId: "choiceless-6eaf0",
  storageBucket: "choiceless-6eaf0.appspot.com",
  messagingSenderId: "645984724343",
  appId: "1:645984724343:web:2ef3c8a20520a5f2796d72",
  measurementId: "G-B5TW7J6MDF",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {}
export default firebaseConfig;
