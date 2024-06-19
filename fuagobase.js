import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDgIiMncRouvvvd6wbt0xxOXNToPDm4sIY",
    authDomain: "dsaasddsa-157e9.firebaseapp.com",
    projectId: "dsaasddsa-157e9",
    storageBucket: "dsaasddsa-157e9.appspot.com",
    messagingSenderId: "8114542873",
    appId: "1:8114542873:web:0b315a940105fa446f4d88"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = (emp) => {
    addDoc(collection(db, 'Empleados'), emp);
};

export const getData = (callback) => {
    onSnapshot(collection(db, 'Empleados'), callback);
};

export const eliminar = (id) => {
    deleteDoc(doc(db, 'Empleados', id));
};

export const obtener = (id) => {
    return getDoc(doc(db, 'Empleados', id));
};

export const update = (id, empleado) => {
    updateDoc(doc(db, 'Empleados', id), empleado);
};
