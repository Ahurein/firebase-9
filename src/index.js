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
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy1XpQSDphVB6fM5IZBJV9SC7mzYKPtVU",
  authDomain: "fir-9-2ffe2.firebaseapp.com",
  projectId: "fir-9-2ffe2",
  storageBucket: "fir-9-2ffe2.appspot.com",
  messagingSenderId: "542286763384",
  appId: "1:542286763384:web:b4125e033e6bc26de2a48d",
};

initializeApp(firebaseConfig);

const db = getFirestore();

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

const staticDocRef = doc(booksRef, "vmeXY0nXkPIsC2awnuD9");

onSnapshot(staticDocRef, (doc) => {
  console.log(doc.data(), doc.id);
});
