'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Lock, Building, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { toast } from 'sonner'


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
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="mx-4 flex-shrink text-sm text-secondary">Regístrate con tu email</span>
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
