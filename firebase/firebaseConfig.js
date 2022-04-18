import { APIKEY_FB, APPID_FB, AUTHDOMAIN_FB, MESSAGINGSENDERID_FB, PROJECTID_FB, STORAGEBUCKET_FB } from "../config/config";

//console.log("APIKEY_FB: ", APIKEY_FB);
//console.log("AUTHDOMAIN_FB: ", AUTHDOMAIN_FB);
console.log("PROJECTID_FB: ", PROJECTID_FB);
//console.log("STORAGEBUCKET_FB: ", STORAGEBUCKET_FB);
//console.log("MESSAGINGSENDERID_FB: ", MESSAGINGSENDERID_FB);
//console.log("APPID_FB: ", APPID_FB);

// objeto que contiene la config de firebase al crear el proyecto
export const firebaseConfig = {
  apiKey: APIKEY_FB,
  authDomain: AUTHDOMAIN_FB,
  projectId: PROJECTID_FB,
  storageBucket: STORAGEBUCKET_FB,
  messagingSenderId: MESSAGINGSENDERID_FB,
  appId: APPID_FB,
};
