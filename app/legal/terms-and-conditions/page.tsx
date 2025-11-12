
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TermsAndConditions() {
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
        <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
        <div className="prose lg:prose-xl">
          <p>Bienvenido a Caña y Reseña. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Caña y Reseña, ubicado en www.canayresena.com.</p>
          <p>Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Caña y Reseña si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Cuentas de Usuario</h2>
          <p>Cuando creas una cuenta con nosotros, debes proporcionarnos información precisa, completa y actualizada en todo momento. El incumplimiento de esta obligación constituye una violación de los Términos, lo que puede resultar en la terminación inmediata de tu cuenta en nuestro Servicio.</p>
          <p>Eres responsable de salvaguardar la contraseña que utilizas para acceder al Servicio y de cualquier actividad o acción bajo tu contraseña, ya sea que tu contraseña esté con nuestro Servicio o un servicio de terceros.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Contenido</h2>
          <p>Nuestro Servicio te permite publicar, vincular, almacenar, compartir y poner a disposición cierta información, texto, gráficos, videos u otro material (&quot;Contenido&quot;). Eres responsable del Contenido que publicas en el Servicio, incluida su legalidad, fiabilidad y adecuación.</p>
          <p>Al publicar Contenido en el Servicio, nos otorgas el derecho y la licencia para usar, modificar, ejecutar públicamente, mostrar públicamente, reproducir y distribuir dicho Contenido en y a través del Servicio. Conservas todos tus derechos sobre cualquier Contenido que envíes, publiques o muestres en o a través del Servicio y eres responsable de proteger esos derechos.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Suscripciones</h2>
          <p>Algunas partes del Servicio se facturan por suscripción (&quot;Suscripción(es)&quot;). Se te facturará por adelantado de forma recurrente y periódica (&quot;Ciclo de facturación&quot;). Los ciclos de facturación se establecen mensualmente o anualmente, según el tipo de plan de suscripción que selecciones al comprar una Suscripción.</p>
          <p>Al final de cada Ciclo de facturación, tu Suscripción se renovará automáticamente bajo las mismas condiciones exactas, a menos que la canceles o que Caña y Reseña la cancele.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitación de Responsabilidad</h2>
          <p>En ningún caso Caña y Reseña, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluidos, entre otros, la pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de (i) tu acceso o uso o incapacidad para acceder o usar el Servicio; (ii) cualquier conducta o contenido de un tercero en el Servicio; (iii) cualquier contenido obtenido del Servicio; y (iv) el acceso no autorizado, uso o alteración de tus transmisiones o contenido, ya sea basado en garantía, contrato, agravio (incluida negligencia) o cualquier otra teoría legal, ya sea que hayamos sido informados o no de la posibilidad de dicho daño.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Cambios</h2>
          <p>Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que entren en vigor los nuevos términos. Lo que constituye un cambio material se determinará a nuestra entera discreción.</p>
        </div>
      </div>
    </>
  );
}
