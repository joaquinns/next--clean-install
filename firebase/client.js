import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

// objeto que contiene la config de firebase al crear el proyecto
const firebaseConfig = {
  apiKey: "AIzaSyDMrVCx3Czfj5Rcp52Dk544UKTaZ7CzRAg",
  authDomain: "escolapop-db7d2.firebaseapp.com",
  projectId: "escolapop-db7d2",
  storageBucket: "escolapop-db7d2.appspot.com",
  messagingSenderId: "22410271497",
  appId: "1:22410271497:web:a573e2f2e658e5aced91d8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

// mapeamos/transformamos los datos que queremos
const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    name: displayName,
    email,
    avatar: photoURL,
  };
};

// atrapamos el error si ocurre en un objeto
const catchErrorsFromFirebaseAuth = (error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.email;
  const credential = GoogleAuthProvider.credentialFromError(error);
  return { errorCode, errorMessage, email, credential };
};

export const authStateChanged = async (onChange) => {
  return await onAuthStateChanged(auth, (user) => {
    // si el usuario existe transformamos la data a lo que nos interesa
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => result.user)
    .then(mapUserFromFirebaseAuth)
    .catch(catchErrorsFromFirebaseAuth);
};

export const firebaseLogout = () => {
  return signOut(auth)
    .then(console.log("logout"))
    .catch((error) => {
      console.error(error);
    });
};

const storage = getStorage(app);

export const uploadImage = (file) => {
  const reference = ref(storage, `images/${file.name}`);
  // const ref = app.storage().ref(`images/${file.name}`);
  const uploadTask = uploadBytesResumable(reference, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
    }
  );
};
