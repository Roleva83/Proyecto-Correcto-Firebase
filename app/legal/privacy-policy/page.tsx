
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <header className="sticky top-0 z-50 h-[72px] bg-white shadow-soft">
        <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
              alt="Logo Caña y Reseña"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-semibold text-foreground">Caña y Reseña</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/#features" className="font-medium text-foreground transition-colors hover:text-primary">
              Funcionalidades
            </Link>
            <Link href="/#pricing" className="font-medium text-foreground transition-colors hover:text-primary">
              Precios
            </Link>
            <Link href="/#contact" className="font-medium text-foreground transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        <div className="prose lg:prose-xl">
          <p>Tu privacidad es importante para nosotros. En esta política de privacidad te explicamos qué datos personales recopilamos de nuestros usuarios y cómo los utilizamos. Te animamos a leer detenidamente estos términos antes de facilitar tus datos personales en esta web.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Responsable del tratamiento de tus datos personales</h2>
          <ul>
            <li><strong>Identidad del Responsable:</strong> Caña y Reseña S.L.</li>
            <li><strong>Nombre comercial:</strong> Caña y Reseña</li>
            <li><strong>C.I.F/N.I.F.:</strong> B-12345678</li>
            <li><strong>Dirección:</strong> Calle Ficticia 123, 28080 Madrid, España</li>
            <li><strong>Correo electrónico:</strong> contacto@canayresena.com</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Principios que aplicaremos en tu información personal</h2>
          <p>En el tratamiento de tus datos personales, aplicaremos los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos:</p>
          <ul>
            <li><strong>Principio de licitud, lealtad y transparencia:</strong> Siempre vamos a requerir tu consentimiento para el tratamiento de tus datos personales para uno o varios fines específicos que te informaremos previamente con absoluta transparencia.</li>
            <li><strong>Principio de minimización de datos:</strong> Solo vamos a solicitar datos estrictamente necesarios en relación con los fines para los que los requerimos.</li>
            <li><strong>Principio de limitación del plazo de conservación:</strong> los datos serán mantenidos durante no más tiempo del necesario para los fines del tratamiento.</li>
            <li><strong>Principio de integridad y confidencialidad:</strong> Tus datos serán tratados de tal manera que se garantice una seguridad adecuada de los datos personales y se garantice confidencialidad.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">¿Cómo hemos obtenido tus datos?</h2>
          <p>Los datos personales que tratamos en Caña y Reseña proceden de:</p>
          <ul>
            <li>Formularios de contacto y registro.</li>
            <li>Formulario de solicitud de demo.</li>
            <li>Comentarios en el blog (si aplica).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">¿Cuáles son tus derechos cuando nos facilitas tus datos?</h2>
          <p>Cualquier persona tiene derecho a obtener confirmación sobre si en Caña y Reseña estamos tratando datos personales que les conciernan, o no.</p>
          <p>Las personas interesadas tienen derecho a:</p>
          <ul>
            <li>Solicitar el acceso a los datos personales relativos al interesado.</li>
            <li>Solicitar su rectificación o supresión.</li>
            <li>Solicitar la limitación de su tratamiento.</li>
            <li>Oponerse al tratamiento.</li>
            <li>Solicitar la portabilidad de los datos.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
