// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0L36-sX1h00ro-mJaoId7hOIJves4cyo",
  authDomain: "studio-8826287417-b7920.firebaseapp.com",
  projectId: "studio-8826287417-b7920",
  storageBucket: "studio-8826287417-b7920.firebasestorage.app",
  messagingSenderId: "327916829793",
  appId: "1:327916829793:web:eb00b55acc76b8f8457e20"
};

// Prevent reinitializing Firebase in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);