'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'sonner'


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('¡Sesión iniciada correctamente!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast.error('El email o la contraseña son incorrectos.');
      } else {
        toast.error('Ha ocurrido un error al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50 to-white px-4">
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
                <h1 className="mt-4 text-3xl font-extrabold text-foreground">Caña y Reseña</h1>
                <p className="mt-2 text-secondary">Inicia sesión para gestionar tu negocio</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
                
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">Contraseña</label>
                            <Link href="#" className="text-sm font-medium text-primary hover:underline">¿Olvidaste la contraseña?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="••••••••" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" 
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="h-[50px] w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

            </div>

            <p className="mt-8 text-center text-sm text-secondary">
                ¿No tienes una cuenta? <Link href="/auth/register" className="font-semibold text-primary hover:underline">Regístrate ahora</Link>
            </p>
        </div>
    </main>
  )
}
