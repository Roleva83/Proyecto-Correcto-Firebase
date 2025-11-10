export interface TarotCard {
  name: string;
  description: string;
  image: string;
}

const tarotDeck: TarotCard[] = [
  {
    name: 'El Mago',
    description: 'Manifestación, poder, recursos. Tienes todo lo que necesitas para tener éxito. Es hora de actuar y hacer que tus deseos se hagan realidad.',
    image: 'https://picsum.photos/seed/magician/400/600',
  },
  {
    name: 'La Suma Sacerdotisa',
    description: 'Intuición, misterio, subconsciente. Escucha tu voz interior y presta atención a tus sueños. La verdad se revelará a su debido tiempo.',
    image: 'https://picsum.photos/seed/priestess/400/600',
  },
  {
    name: 'La Emperatriz',
    description: 'Fertilidad, abundancia, naturaleza. Un momento de creatividad y crecimiento. Nutre tus ideas y proyectos para que florezcan.',
    image: 'https://picsum.photos/seed/empress/400/600',
  },
  {
    name: 'El Emperador',
    description: 'Autoridad, estructura, control. Es momento de establecer orden y disciplina. Un enfoque estructurado te llevará al éxito.',
    image: 'https://picsum.photos/seed/emperor/400/600',
  },
  {
    name: 'El Hierofante',
    description: 'Tradición, conformidad, instituciones. Sigue las reglas y busca guía en mentores o sistemas establecidos. La sabiduría convencional es útil ahora.',
    image: 'https://picsum.photos/seed/hierophant/400/600',
  },
  {
    name: 'Los Amantes',
    description: 'Amor, uniones, decisiones. Una elección importante se presenta. Alinea tus decisiones con tus valores más profundos.',
    image: 'https://picsum.photos/seed/lovers/400/600',
  },
  {
    name: 'El Carro',
    description: 'Voluntad, acción, victoria. Avanza con determinación y confianza. Superarás los obstáculos si mantienes el control.',
    image: 'https://picsum.photos/seed/chariot/400/600',
  },
  {
    name: 'La Fuerza',
    description: 'Coraje, compasión, control interior. La verdadera fuerza no es la dominación, sino la paciencia y la gentileza. Domina tus impulsos.',
    image: 'https://picsum.photos/seed/strength/400/600',
  },
  {
    name: 'El Ermitaño',
    description: 'Introspección, soledad, guía interior. Tómate un tiempo para reflexionar y buscar respuestas dentro de ti. La soledad puede ser iluminadora.',
    image: 'https://picsum.photos/seed/hermit/400/600',
  },
  {
    name: 'La Rueda de la Fortuna',
    description: 'Cambio, ciclos, destino. La vida está en constante cambio. Acepta los altibajos, ya que son parte de un ciclo mayor.',
    image: 'https://picsum.photos/seed/fortune/400/600',
  },
  {
    name: 'La Justicia',
    description: 'Equilibrio, verdad, ley. Se revelará la verdad y se hará justicia. Asume la responsabilidad de tus acciones.',
    image: 'https://picsum.photos/seed/justice/400/600',
  },
  {
    name: 'El Colgado',
    description: 'Pausa, perspectiva, sacrificio. A veces, es necesario detenerse y ver las cosas desde un ángulo diferente. Un sacrificio puede ser necesario para avanzar.',
    image: 'https://picsum.photos/seed/hangedman/400/600',
  },
  {
    name: 'La Muerte',
    description: 'Finales, transformación, cambio. Un ciclo está terminando para dar paso a algo nuevo. No temas al cambio, es necesario para el crecimiento.',
    image: 'https://picsum.photos/seed/death/400/600',
  },
  {
    name: 'La Templanza',
    description: 'Equilibrio, paciencia, moderación. Encuentra el punto medio y combina diferentes aspectos de tu vida. La paciencia es clave.',
    image: 'https://picsum.photos/seed/temperance/400/600',
  },
  {
    name: 'El Diablo',
    description: 'Ataduras, adicción, materialismo. Te sientes atrapado por tus deseos o miedos. Reconoce tus cadenas para poder liberarte.',
    image: 'https://picsum.photos/seed/devil/400/600',
  },
  {
    name: 'La Torre',
    description: 'Caos, revelación, cambio súbito. Una estructura en tu vida se está derrumbando. Aunque sea doloroso, te liberará para construir algo más auténtico.',
    image: 'https://picsum.photos/seed/tower/400/600',
  },
  {
    name: 'La Estrella',
    description: 'Esperanza, fe, renovación. Después de la tormenta, llega la calma. Ten fe en el futuro y mantén una perspectiva positiva.',
    image: 'https://picsum.photos/seed/star/400/600',
  },
  {
    name: 'La Luna',
    description: 'Ilusión, miedo, subconsciente. Las cosas no son lo que parecen. Confía en tu intuición para navegar por la incertidumbre.',
    image: 'https://picsum.photos/seed/moon/400/600',
  },
  {
    name: 'El Sol',
    description: 'Éxito, vitalidad, alegría. Disfruta de un período de felicidad y claridad. Todo sale a la luz y el éxito está asegurado.',
    image: 'https://picsum.photos/seed/sun/400/600',
  },
  {
    name: 'El Juicio',
    description: 'Renacimiento, evaluación, llamado interior. Estás en un momento de reflexión y juicio sobre tu pasado. Es hora de un nuevo comienzo.',
    image: 'https://picsum.photos/seed/judgement/400/600',
  },
  {
    name: 'El Mundo',
    description: 'Realización, culminación, integración. Has completado un ciclo importante. Celebra tus logros y prepárate para el próximo capítulo.',
    image: 'https://picsum.photos/seed/world/400/600',
  },
  {
    name: 'El Loco',
    description: 'Nuevos comienzos, fe, espontaneidad. Estás al borde de una nueva aventura. Da un salto de fe y confía en el universo.',
    image: 'https://picsum.photos/seed/fool/400/600',
  },
];

export function drawThreeCards(): TarotCard[] {
  const shuffled = tarotDeck.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
