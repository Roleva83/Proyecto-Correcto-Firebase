# Caña y Reseña

Plataforma SaaS integral para la gestión de reputación y automatización de restaurantes y negocios gastronómicos.

## Stack Tecnológico

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **UI Framework:** Tailwind CSS + Shadcn/ui + Radix UI
- **Backend:** Firebase App Hosting + Supabase (Auth + Database)
- **Estado:** React Context + TanStack Query
- **IA:** Google Gemini (Genkit) + OpenAI GPT-4 + Anthropic Claude
- **Deployment:** Firebase App Hosting

## Instalación
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Las variables de entorno se gestionan en Firebase Secret Manager

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura del Proyecto
```
app/
├── components/         # Componentes reutilizables
│   ├── ui/            # Componentes UI base (Button, Dialog, etc.)
│   ├── layout/        # Header, Sidebar, AppLayout
│   ├── dashboard/     # Componentes del dashboard
│   ├── marketing/     # Componentes de marketing
│   └── lola/          # Componentes del asistente IA
├── ai/                # Configuración de Genkit
├── auth/              # Páginas de autenticación
│   ├── login/
│   └── register/
├── dashboard/         # Dashboard principal
├── marketing/         # Gestión de marketing
├── lola/              # Asistente IA Lola
├── contexts/          # Contextos de React
├── hooks/             # Custom hooks
├── lib/               # Utilidades y configuraciones
├── types/             # Definiciones de TypeScript
├── integrations/      # Integraciones (Supabase)
├── config/            # Configuraciones
├── layout.tsx         # Layout principal
└── page.tsx           # Página de inicio
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo (puerto 9002)
- `npm run build` - Build de producción
- `npm run start` - Iniciar servidor de producción
- `npm run lint` - Linting con ESLint
- `npm run type-check` - Verificación de tipos TypeScript

## Variables de Entorno

Las variables de entorno se gestionan mediante Firebase Secret Manager:

- `GOOGLE_AI_API_KEY` - API key de Google AI (Gemini)
- Firebase configura automáticamente `FIREBASE_CONFIG` y `FIREBASE_WEBAPP_CONFIG`

Para desarrollo local, crea `.env.local`:
```
GOOGLE_AI_API_KEY=tu_api_key
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_de_supabase
```

## Deployment

El proyecto se despliega automáticamente en Firebase App Hosting al hacer push a `main`:
```bash
git push origin main
```

Firebase App Hosting detecta cambios y redespliega automáticamente.

## Características Principales

- 🤖 **Lola AI** - Asistente virtual para gestión de restaurantes
- 📊 **Dashboard** - Analytics y métricas en tiempo real
- 🍽️ **Análisis de Menú** - Ingeniería de menús con IA
- 📱 **Marketing** - Gestión de campañas y programas de fidelización
- 💰 **Simulador Financiero** - Proyecciones de ingresos y gastos
- 👥 **Gestión de Equipo** - Administración de personal y roles
- ⚙️ **Configuración** - Personalización completa del sistema

## Tecnologías Clave

- **Next.js 14** - Framework React con App Router y SSR
- **Firebase Genkit** - Framework de IA generativa
- **Firebase App Hosting** - Hosting con soporte para backend
- **Supabase** - Backend as a Service (Auth + PostgreSQL)
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Componentes accesibles sin estilo
- **TypeScript** - Type safety completo
- **Google Gemini** - Modelo de IA principal

## Arquitectura

El proyecto usa Next.js 14 con App Router:
- **Server Components** para renderizado del lado del servidor
- **Client Components** para interactividad
- **API Routes** para endpoints backend
- **Genkit** para flujos de IA generativa
- **Firebase Secret Manager** para gestión segura de secrets

## Licencia

Propietario - Caña y Reseña © 2025
