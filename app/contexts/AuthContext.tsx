"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface User {
  uid: string
  email: string | null
  displayName: string | null
  restaurante_id?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
})

function AuthLoader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Usuario ha iniciado sesión, ahora obtenemos su perfil de Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              restaurante_id: userData.businessId // Usamos el businessId del perfil
            })
        } else {
            // El documento de usuario aún no existe, esto puede pasar brevemente durante el registro.
            // Establecemos un usuario básico sin ID de restaurante por ahora.
            setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
            });
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    });

    return () => unsubscribe();
  }, [])

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/auth/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {loading ? <AuthLoader /> : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
