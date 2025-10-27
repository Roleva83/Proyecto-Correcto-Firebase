
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LegalNotice() {
  return (
    <>
      <header className="sticky top-0 z-50 h-[72px] bg-white shadow-soft">
        <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            
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
        <h1 className="text-4xl font-bold mb-8">Aviso Legal</h1>
        <div className="prose lg:prose-xl">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Datos Identificativos</h2>
          <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:</p>
          <ul>
            <li><strong>Empresa titular del sitio web:</strong> Caña y Reseña S.L.</li>
            <li><strong>Domicilio social:</strong> Calle Ficticia 123, 28080 Madrid, España</li>
            <li><strong>C.I.F.:</strong> B-12345678</li>
            <li><strong>Correo electrónico de contacto:</strong> contacto@canayresena.com</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Usuarios</h2>
          <p>El acceso y/o uso de este portal de Caña y Reseña atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Uso del Portal</h2>
          <p>www.canayresena.com proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Caña y Reseña o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Propiedad Intelectual e Industrial</h2>
          <p>Caña y Reseña por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de Caña y Reseña o bien de sus licenciantes.</p>
          <p>Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Caña y Reseña.</p>
        </div>
      </div>
    </>
  );
}
