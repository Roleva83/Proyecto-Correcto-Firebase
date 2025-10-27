
import React from 'react';

export default function PrivacyPolicy() {
  return (
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
  );
}
