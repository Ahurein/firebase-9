import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

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

getDocs(booksRef)
  .then((snapshot) => {
    const books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((error) => {
    console.log(error.message);
  });
