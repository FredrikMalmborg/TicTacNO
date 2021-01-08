import firebase from "firebase";
import { firebaseConfig } from "./ApiKeys";

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
