import firebase from "firebase";
import 'firebase/storage'

var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTS,
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    
  }
  const storage = firebase.storage()
  export  {
    storage, firebase as default
  }


