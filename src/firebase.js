import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHgVoBkcKholHs5DfHdv7MFeIePEGDmxE",
  authDomain: "disney-clone-43d3c.firebaseapp.com",
  projectId: "disney-clone-43d3c",
  storageBucket: "disney-clone-43d3c.appspot.com",
  messagingSenderId: "1069622046135",
  appId: "1:1069622046135:web:977c060c49084eb2298c32",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, "movies");

const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage, colRef };
export default db;
