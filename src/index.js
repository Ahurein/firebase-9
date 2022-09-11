import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy1XpQSDphVB6fM5IZBJV9SC7mzYKPtVU",
  authDomain: "fir-9-2ffe2.firebaseapp.com",
  projectId: "fir-9-2ffe2",
  storageBucket: "fir-9-2ffe2.appspot.com",
  messagingSenderId: "542286763384",
  appId: "1:542286763384:web:b4125e033e6bc26de2a48d",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const booksRef = collection(db, "books");
const q = query(booksRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  const books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

const addForm = document.getElementById("add");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(booksRef, {
    title: addForm.title.value,
    author: addForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addForm.reset();
  });
});

const deleteForm = document.getElementById("delete");
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(booksRef, deleteForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteForm.reset();
  });
});
const updateForm = document.getElementById("update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(booksRef, updateForm.id.value);
  updateDoc(docRef, {
    title: "updated title",
  });
});

const staticDocRef = doc(booksRef, "vmeXY0nXkPIsC2awnuD9");

const createForm = document.getElementById("createAcc");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = createForm.email.value;
  let password = createForm.password.value;
  createUserWithEmailAndPassword(auth, email, password);
  createForm.reset();
});

// const signinForm = document.getElementById("signinAcc");
// createForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const docRef = doc(booksRef, updateForm.id.value);
//   updateDoc(docRef, {
//     title: "updated title",
//   });
// });
