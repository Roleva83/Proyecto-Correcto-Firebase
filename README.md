# Caña y Reseña

Plataforma SaaS integral para la gestión de reputación y automatización de restaurantes y negocios gastronómicos.

## Stack Tecnológico

- **Frontend:** React 18 + TypeScript + Vite
- **UI Framework:** Tailwind CSS + Shadcn/ui + Radix UI
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **Estado:** React Context + TanStack Query
- **Routing:** React Router DOM (HashRouter)
- **IA:** OpenAI GPT-4 + Anthropic Claude
- **Deployment:** Lovable.app (Static Hosting)

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas principales
├── contexts/           # Contextos de React
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── types/              # Definiciones de TypeScript
├── integrations/       # Integraciones externas
├── config/             # Configuraciones
├── utils/              # Utilidades adicionales
├── test/               # Tests
├── assets/             # Assets estáticos
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada

supabase/
├── functions/          # Edge Functions
└── migrations/         # Migraciones de BD

docs/                   # Documentación
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting
- `npm run test` - Tests
- `npm run db:generate` - Generar tipos de Supabase
- `npm run db:push` - Push de migraciones
- `npm run functions:deploy` - Deploy de Edge Functions
