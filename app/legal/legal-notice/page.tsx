
import React from 'react';

export default function LegalNotice() {
  return (
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
  );
}
