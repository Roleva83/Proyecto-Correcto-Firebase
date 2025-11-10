
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Lock, Building, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp, collection, addDoc, getDoc } from 'firebase/firestore'
import { toast } from 'sonner'

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-.97 2.47-2.05 3.23v2.78h3.57c2.08-1.92 3.28-4.74 3.28-8.02z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.78c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
    <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M9.19795 21.5H13.198V13.4901H16.198L16.698 9.4901H13.198V7.4901C13.198 6.9901 13.698 6.4901 14.198 6.4901H16.198V2.5H13.198C10.998 2.5 9.19795 4.2901 9.19795 6.4901V9.4901H7.19795V13.4901H9.19795V21.5Z"></path>
    </svg>
);

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        try {
            // 1. Crear usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Crear el documento del negocio en la colección 'businesses'
            const businessRef = await addDoc(collection(db, "businesses"), {
                name: restaurantName,
                owner_id: user.uid,
                email: user.email,
                phone: phone,
                type: 'restaurante', // Valor por defecto
                createdAt: serverTimestamp(),
            });

            // 3. Actualizar el perfil de Firebase Auth (opcional, pero bueno tenerlo)
            await updateProfile(user, {
                displayName: restaurantName
            });

            // 4. Crear el perfil de usuario en nuestra colección 'users'
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: restaurantName,
                photoURL: user.photoURL,
                businessId: businessRef.id, // ID del negocio creado
                role: 'owner', // El primer usuario es el dueño
                createdAt: serverTimestamp(),
            });

            toast.success('¡Registro completado! Redirigiendo al panel de control...');
            router.push('/dashboard');

        } catch (error: any) {
            console.error("Error en el registro:", error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('El email ya está en uso. Por favor, prueba con otro.');
            } else if (error.code === 'auth/weak-password') {
                toast.error('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
            } else {
                toast.error('Ha ocurrido un error durante el registro.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignInWithProvider = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
        try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            businessId: null,
            role: 'owner',
            createdAt: serverTimestamp(),
            });
            toast.info('¡Bienvenido/a! Ahora, completa los datos de tu negocio.');
            // En un flujo real, podríamos redirigir a una página de onboarding
        }

        toast.success('¡Sesión iniciada con éxito!');
        router.push('/dashboard');

        } catch (error: any) {
            console.error('Error con el proveedor de autenticación:', error);
            if (error.code === 'auth/account-exists-with-different-credential') {
                toast.error('Ya existe una cuenta con este email. Prueba a iniciar sesión con otro método.');
            } else {
                toast.error('No se pudo iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        }
    };

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50 to-white px-4 py-12">
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
                <Link href="/" className="inline-block">
                    <Image 
                      src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
                      alt="Logo Caña y Reseña"
                      width={64}
                      height={64}
                      className="mx-auto h-16 w-16"
                    />
                </Link>
                <h1 className="mt-4 text-3xl font-extrabold text-foreground">Crea tu cuenta</h1>
                <p className="mt-2 text-secondary">Empieza a transformar tu negocio hoy</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
                 <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleSignInWithProvider(googleProvider)}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background transition-colors hover:bg-accent"
                    >
                        <GoogleIcon />
                        <span className="text-sm font-medium text-foreground">Google</span>
                    </button>
                     <button
                        onClick={() => handleSignInWithProvider(facebookProvider)}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background transition-colors hover:bg-accent"
                    >
                        <FacebookIcon />
                        <span className="text-sm font-medium text-foreground">Facebook</span>
                    </button>
                </div>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="mx-4 flex-shrink text-sm text-secondary">O regístrate con tu email</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="tu@email.com" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" 
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="restaurant-name" className="mb-2 block text-sm font-medium text-foreground">Nombre del negocio</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input 
                                id="restaurant-name" 
                                type="text" 
                                placeholder="El nombre de tu negocio" 
                                required
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className="h-12 w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" 
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">Teléfono de contacto</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input 
                                id="phone" 
                                type="tel" 
                                placeholder="Tu número de teléfono" 
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-12 w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" 
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="Mínimo 6 caracteres" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" 
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-foreground">Confirmar Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input 
                                id="confirm-password" 
                                type="password" 
                                placeholder="Repite la contraseña" 
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-12 w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" 
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="h-[50px] w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>
            </div>

            <p className="mt-8 text-center text-sm text-secondary">
                ¿Ya tienes una cuenta? <Link href="/auth/login" className="font-semibold text-primary hover:underline">Inicia sesión</Link>
            </p>
        </div>
    </main>
  )
}
