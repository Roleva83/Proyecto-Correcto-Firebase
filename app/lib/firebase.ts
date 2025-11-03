
"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC04VBuPFf47I5_wfJij-XM28eEShsQsXc",
  authDomain: "lola-ai-j1cmn.firebaseapp.com",
  projectId: "lola-ai-j1cmn",
  storageBucket: "lola-ai-j1cmn.firebasestorage.app",
  messagingSenderId: "996350649746",
  appId: "1:996350649746:web:33371287f654955dc84d4b",
  measurementId: "G-NZD96WHJN5"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export { app }
