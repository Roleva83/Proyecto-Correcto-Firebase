import { initializeApp, getApps } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC04VBuPFf47I5_wfJij-XM28eEShsQsXc",
  authDomain: "lola-ai-j1cmn.firebaseapp.com",
  projectId: "lola-ai-j1cmn",
  storageBucket: "lola-ai-j1cmn.firebasestorage.app",
  messagingSenderId: "996350649746",
  appId: "1:996350649746:web:33371287f654955dc84d4b",
  measurementId: "G-NZD96WHJN5"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

let analytics
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export const auth = getAuth(app)
export const db = getFirestore(app)
export { app, analytics }
