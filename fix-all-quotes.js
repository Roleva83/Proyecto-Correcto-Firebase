const fs = require('fs');

const fixes = [
  {
    file: 'app/components/team/EmployeeDetailModal.tsx',
    line: 163,
    old: '"{review.comment}"',
    new: '&quot;{review.comment}&quot;'
  },
  {
    file: 'app/legal/legal-notice/page.tsx',
    line: 66,
    old: '"los contenidos"',
    new: '&quot;los contenidos&quot;'
  },
  {
    file: 'app/legal/terms-and-conditions/page.tsx',
    line: 61,
    old: '"Contenido"',
    new: '&quot;Contenido&quot;'
  },
  {
    file: 'app/legal/terms-and-conditions/page.tsx',
    line: 65,
    old: '"Suscripción(es)"',
    new: '&quot;Suscripción(es)&quot;'
  },
  {
    file: 'app/legal/terms-and-conditions/page.tsx',
    line: 65,
    old: '"Ciclo de facturación"',
    new: '&quot;Ciclo de facturación&quot;'
  },
  {
    file: 'app/mis-metas-y-medallas/page.tsx',
    line: 203,
    old: '"Amigo de Lola"',
    new: '&quot;Amigo de Lola&quot;'
  },
  {
    file: 'app/page.tsx',
    line: 259,
    old: '"El servicio fue un poco lento, pero la comida excelente."',
    new: '&quot;El servicio fue un poco lento, pero la comida excelente.&quot;'
  },
  {
    file: 'app/page.tsx',
    line: 277,
    old: '"¡Una experiencia increíble! Volveremos seguro."',
    new: '&quot;¡Una experiencia increíble! Volveremos seguro.&quot;'
  },
  {
    file: 'app/page.tsx',
    line: 368,
    old: '"Desde que usamos Caña y Reseña, hemos ahorrado horas en la gestión de reseñas y nuestra puntuación en Google ha subido 0.7 puntos."',
    new: '&quot;Desde que usamos Caña y Reseña, hemos ahorrado horas en la gestión de reseñas y nuestra puntuación en Google ha subido 0.7 puntos.&quot;'
  },
  {
    file: 'app/page.tsx',
    line: 492,
    old: '"La automatización de respuestas a reseñas nos ha ahorrado horas y ha mejorado nuestra puntuación media increíblemente rápido."',
    new: '&quot;La automatización de respuestas a reseñas nos ha ahorrado horas y ha mejorado nuestra puntuación media increíblemente rápido.&quot;'
  },
  {
    file: 'app/page.tsx',
    line: 498,
    old: '"Gestionar 5 locales era un caos. Ahora tengo una visión centralizada del rendimiento de cada uno. Imprescindible."',
    new: '&quot;Gestionar 5 locales era un caos. Ahora tengo una visión centralizada del rendimiento de cada uno. Imprescindible.&quot;'
  },
  {
    file: 'app/page.tsx',
    line: 504,
    old: '"Gracias a Lola IA, por fin entiendo qué platos son rentables y cuáles no. He ajustado el menú y los beneficios han subido un 15%."',
    new: '&quot;Gracias a Lola IA, por fin entiendo qué platos son rentables y cuáles no. He ajustado el menú y los beneficios han subido un 15%.&quot;'
  }
];

fixes.forEach(fix => {
  try {
    let content = fs.readFileSync(fix.file, 'utf8');
    content = content.replace(fix.old, fix.new);
    fs.writeFileSync(fix.file, content, 'utf8');
    console.log(`✓ Fixed: ${fix.file}:${fix.line}`);
  } catch (err) {
    console.error(`✗ Error in ${fix.file}:`, err.message);
  }
});

console.log('\n✅ All quotes fixed!');
