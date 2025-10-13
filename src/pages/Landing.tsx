import React from 'react';

// Componente principal de la página de aterrizaje
const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header/Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍺</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Caña y Reseña</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-600 transition-colors">
                Precios
              </a>
              <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">
                Contacto
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <a
                href="/auth/login"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Iniciar Sesión
              </a>
              <a
                href="/auth/register"
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Gestión de Reputación{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              Inteligente
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Plataforma SaaS integral para la gestión de reputación y automatización de restaurantes 
            y negocios gastronómicos. Análisis de reseñas, automatización con IA y herramientas 
            de gestión empresarial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/register"
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Comenzar Gratis
            </a>
            <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-all duration-200">
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Todo lo que necesitas para tu negocio gastronómico
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas potentes impulsadas por IA para gestionar tu reputación, 
              automatizar procesos y hacer crecer tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dashboard Inteligente */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Dashboard Inteligente
              </h3>
              <p className="text-gray-600 mb-4">
                Widgets configurables con métricas de reputación, ventas y crecimiento. 
                KPIs principales, gráficos de tendencias y análisis en tiempo real.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Métricas de reputación online</li>
                <li>• Análisis de sentimiento</li>
                <li>• Comparación con competencia</li>
              </ul>
            </div>

            {/* Sistema de IA (Lola) */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Asistente IA (Lola)
              </h3>
              <p className="text-gray-600 mb-4">
                Chat interactivo con IA para análisis automático de reseñas, 
                respuestas inteligentes y recomendaciones personalizadas.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Chat interactivo con IA</li>
                <li>• Respuestas automáticas</li>
                <li>• Recomendaciones personalizadas</li>
              </ul>
            </div>

            {/* Gestión de Reseñas */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Gestión de Reseñas
              </h3>
              <p className="text-gray-600 mb-4">
                Integración multi-plataforma con Google, TripAdvisor, TheFork y más. 
                Análisis de sentimiento y respuestas automáticas.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Multi-plataforma</li>
                <li>• Análisis de sentimiento</li>
                <li>• Respuestas automáticas</li>
              </ul>
            </div>

            {/* Automatización de Marketing */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Marketing Automatizado
              </h3>
              <p className="text-gray-600 mb-4">
                Campañas de email, integración con WhatsApp, segmentación de clientes 
                y análisis de ROI.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Campañas de email</li>
                <li>• Integración WhatsApp</li>
                <li>• Segmentación de clientes</li>
              </ul>
            </div>

            {/* Gamificación */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Sistema de Gamificación
              </h3>
              <p className="text-gray-600 mb-4">
                Motiva a tus empleados con puntos, niveles y recompensas. 
                Rankings y badges para mejorar el servicio.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Puntos y niveles</li>
                <li>• Rankings y badges</li>
                <li>• Motivación de empleados</li>
              </ul>
            </div>

            {/* Integraciones */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Integraciones Externas
              </h3>
              <p className="text-gray-600 mb-4">
                Google My Business, TripAdvisor, TheFork, sistemas TPV y Make.com/Zapier 
                para automatización completa.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Google My Business</li>
                <li>• Sistemas TPV</li>
                <li>• Automatización completa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Analysis Module */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Análisis Inteligente con IA
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Nuestro sistema de IA analiza automáticamente tus reseñas, detecta patrones 
              y te proporciona insights accionables para mejorar tu negocio.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Detección de Patrones
                </h3>
                <p className="text-gray-600">
                  Identifica tendencias y patrones en las reseñas de tus clientes
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Insights Accionables
                </h3>
                <p className="text-gray-600">
                  Recomendaciones específicas para mejorar tu servicio y reputación
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Predicciones
                </h3>
                <p className="text-gray-600">
                  Análisis predictivo para anticipar tendencias y oportunidades
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Planes que se adaptan a tu negocio
            </h2>
            <p className="text-xl text-gray-600">
              Elige el plan que mejor se ajuste a las necesidades de tu restaurante
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan Básico */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-orange-300 transition-all duration-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Básico</h3>
              <div className="text-4xl font-bold text-gray-800 mb-6">
                €29<span className="text-lg text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Gestión básica de reseñas
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Dashboard básico
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Integración Google My Business
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Respuestas automáticas básicas
                </li>
              </ul>
              <a
                href="/auth/register"
                className="w-full bg-gray-800 text-white py-3 rounded-lg text-center block hover:bg-gray-700 transition-colors"
              >
                Comenzar
              </a>
            </div>

            {/* Plan Profesional */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-xl p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Profesional</h3>
              <div className="text-4xl font-bold mb-6">
                €79<span className="text-lg opacity-80">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Todo del plan Básico
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Asistente IA (Lola)
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Análisis avanzado de sentimiento
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Integraciones múltiples
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Sistema de gamificación
                </li>
              </ul>
              <a
                href="/auth/register"
                className="w-full bg-white text-orange-600 py-3 rounded-lg text-center block hover:bg-gray-100 transition-colors font-semibold"
              >
                Comenzar
              </a>
            </div>

            {/* Plan Enterprise */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-orange-300 transition-all duration-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-800 mb-6">
                €199<span className="text-lg text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Todo del plan Profesional
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Múltiples ubicaciones
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  API personalizada
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Soporte prioritario
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Análisis predictivo avanzado
                </li>
              </ul>
              <a
                href="/auth/register"
                className="w-full bg-gray-800 text-white py-3 rounded-lg text-center block hover:bg-gray-700 transition-colors"
              >
                Comenzar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-xl text-gray-600">
                Únete a cientos de restaurantes que ya confían en Caña y Reseña
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Contáctanos
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Mensaje</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Cuéntanos sobre tu negocio..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Información de Contacto
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📧</span>
                      <span className="text-gray-600">info@canayresena.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📞</span>
                      <span className="text-gray-600">+34 900 123 456</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📍</span>
                      <span className="text-gray-600">Madrid, España</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Horario de Atención
                  </h3>
                  <p className="text-gray-600">
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Sábados: 10:00 - 14:00
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Soporte Técnico
                  </h3>
                  <p className="text-gray-600">
                    Disponible 24/7 para clientes Enterprise<br />
                    Respuesta en menos de 2 horas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🍺</span>
                </div>
                <span className="text-xl font-bold">Caña y Reseña</span>
              </div>
              <p className="text-gray-300">
                Plataforma SaaS integral para la gestión de reputación y automatización 
                de restaurantes y negocios gastronómicos.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="/auth/register" className="hover:text-white transition-colors">Registro</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Login</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Caña y Reseña. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
