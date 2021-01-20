import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORA_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  // ANDROID_CLIENT_ID,
  // IOS_CLIENT_ID,
  // FACEBOOK_APP_ID,
} from "@env";
import fb from "firebase";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORA_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app();
