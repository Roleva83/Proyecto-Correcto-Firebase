"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncExternalReviews = exports.generateMonthlyReport = exports.cleanupOldData = exports.processMenuImage = exports.calculateRestaurantScore = exports.onNewReview = exports.sendWelcomeEmail = exports.analyzeMenu = exports.analyzeReview = exports.sendLolaMessage = void 0;
const admin = __importStar(require("firebase-admin"));
const functions = __importStar(require("firebase-functions"));
const genkit_1 = require("./genkit");
admin.initializeApp();
// ========================================
// FUNCTION 1: Send Lola Message (CON IA REAL)
// ========================================
exports.sendLolaMessage = functions.https.onCall(async (data, context) => {
    var _a, _b;
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
    }
    const { message, restauranteId } = data;
    if (!message || !restauranteId) {
        throw new functions.https.HttpsError('invalid-argument', 'Faltan parámetros');
    }
    try {
        // Obtener info del restaurante
        let restauranteInfo;
        if (restauranteId) {
            const doc = await admin.firestore().collection('restaurantes').doc(restauranteId).get();
            restauranteInfo = doc.exists ? {
                nombre: (_a = doc.data()) === null || _a === void 0 ? void 0 : _a.nombre,
                tipo: (_b = doc.data()) === null || _b === void 0 ? void 0 : _b.tipo_negocio,
            } : undefined;
        }
        // Usar flow de Genkit para generar respuesta
        const result = await (0, genkit_1.lolaChatFlow)({
            message,
            restauranteInfo,
        });
        // Guardar conversación
        const conversacion = await admin.firestore().collection('conversaciones_lola').add({
            restaurante_id: restauranteId,
            usuario_id: context.auth.uid,
            pregunta: message,
            respuesta: result.response,
            tipo: 'consulta',
            contexto: 'chat',
            fecha_creacion: admin.firestore.FieldValue.serverTimestamp(),
            resuelto: true,
        });
        return {
            success: true,
            conversacionId: conversacion.id,
            response: result.response,
        };
    }
    catch (error) {
        console.error('Error:', error);
        throw new functions.https.HttpsError('internal', 'Error al procesar mensaje');
    }
});
// ========================================
// FUNCTION 2: Analyze Review (CON IA AVANZADA)
// ========================================
exports.analyzeReview = functions.firestore
    .document('reseñas/{reseñaId}')
    .onCreate(async (snap, context) => {
    const reseña = snap.data();
    try {
        // Usar IA para análisis avanzado
        const analysis = await (0, genkit_1.analyzeReviewFlow)({
            reviewText: reseña.texto,
            rating: reseña.puntuacion,
            platform: reseña.plataforma,
        });
        // Actualizar documento con análisis
        await snap.ref.update({
            sentimiento: analysis.sentiment,
            temas_principales: analysis.mainTopics,
            respuesta_sugerida: analysis.suggestedResponse,
            insights: analysis.actionableInsights,
            analizado: true,
            fecha_analisis: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true, sentiment: analysis.sentiment };
    }
    catch (error) {
        console.error('Error:', error);
        return { success: false };
    }
});
// ========================================
// FUNCTION 3: Analyze Menu (CON IA)
// ========================================
exports.analyzeMenu = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
    }
    const { restauranteId } = data;
    try {
        // Obtener menú del restaurante
        const menusSnapshot = await admin.firestore()
            .collection('menus')
            .where('restaurante_id', '==', restauranteId)
            .where('activo', '==', true)
            .get();
        const menuItems = menusSnapshot.docs.map(doc => ({
            nombre: doc.data().nombre,
            precio: doc.data().precio,
            categoria: doc.data().categoria,
        }));
        // Obtener tipo de restaurante
        const restauranteDoc = await admin.firestore()
            .collection('restaurantes')
            .doc(restauranteId)
            .get();
        const restaurantType = ((_a = restauranteDoc.data()) === null || _a === void 0 ? void 0 : _a.tipo_negocio) || 'restaurante';
        // Analizar con IA
        const analysis = await (0, genkit_1.analyzeMenuFlow)({
            menuItems,
            restaurantType,
        });
        return Object.assign({ success: true }, analysis);
    }
    catch (error) {
        console.error('Error:', error);
        throw new functions.https.HttpsError('internal', 'Error analizando menú');
    }
});
// ========================================
// RESTO DE FUNCTIONS (sin cambios)
// ========================================
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
    try {
        await admin.firestore().collection('notificaciones').add({
            tipo: 'bienvenida',
            usuario_id: user.uid,
            email: user.email,
            nombre: user.displayName || 'Usuario',
            mensaje: 'Bienvenido a Caña y Reseña',
            enviado: false,
            fecha_creacion: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true };
    }
    catch (error) {
        return { success: false };
    }
});
exports.onNewReview = functions.firestore
    .document('reseñas/{reseñaId}')
    .onCreate(async (snap, context) => {
    const reseña = snap.data();
    try {
        const restauranteDoc = await admin.firestore()
            .collection('restaurantes')
            .doc(reseña.restaurante_id)
            .get();
        if (!restauranteDoc.exists)
            return { success: false };
        const restaurante = restauranteDoc.data();
        await admin.firestore().collection('notificaciones').add({
            tipo: 'nueva_reseña',
            restaurante_id: reseña.restaurante_id,
            reseña_id: context.params.reseñaId,
            usuario_admin: restaurante === null || restaurante === void 0 ? void 0 : restaurante.usuario_admin,
            mensaje: `Nueva reseña de ${reseña.autor}`,
            leido: false,
            fecha_creacion: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true };
    }
    catch (error) {
        return { success: false };
    }
});
exports.calculateRestaurantScore = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
    }
    const { restauranteId } = data;
    try {
        const reseñas = await admin.firestore()
            .collection('reseñas')
            .where('restaurante_id', '==', restauranteId)
            .get();
        let suma = 0;
        let positivas = 0;
        reseñas.forEach(doc => {
            const r = doc.data();
            suma += r.puntuacion || 0;
            if (r.sentimiento === 'positivo')
                positivas++;
        });
        const promedio = reseñas.size > 0 ? suma / reseñas.size : 0;
        const porcentajePositivas = reseñas.size > 0 ? (positivas / reseñas.size) * 100 : 0;
        await admin.firestore().collection('restaurantes').doc(restauranteId).update({
            puntuacion_promedio: promedio,
            total_reseñas: reseñas.size,
            porcentaje_positivas: porcentajePositivas,
            ultima_actualizacion: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true, promedio, total: reseñas.size };
    }
    catch (error) {
        throw new functions.https.HttpsError('internal', 'Error');
    }
});
exports.processMenuImage = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
    }
    const { imageUrl, restauranteId } = data;
    try {
        await admin.firestore().collection('imagenes_pendientes').add({
            restaurante_id: restauranteId,
            imagen_url: imageUrl,
            procesado: false,
            fecha_subida: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true, message: 'Imagen recibida' };
    }
    catch (error) {
        throw new functions.https.HttpsError('internal', 'Error');
    }
});
exports.cleanupOldData = functions.pubsub
    .schedule('0 2 * * 0')
    .timeZone('Europe/Madrid')
    .onRun(async (context) => {
    try {
        const seisMesesAtras = new Date();
        seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
        const notificacionesAntiguas = await admin.firestore()
            .collection('notificaciones')
            .where('leido', '==', true)
            .where('fecha_creacion', '<', seisMesesAtras)
            .get();
        const batch = admin.firestore().batch();
        notificacionesAntiguas.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return { success: true, eliminadas: notificacionesAntiguas.size };
    }
    catch (error) {
        return { success: false };
    }
});
exports.generateMonthlyReport = functions.pubsub
    .schedule('0 0 1 * *')
    .timeZone('Europe/Madrid')
    .onRun(async (context) => {
    try {
        const restaurantes = await admin.firestore()
            .collection('restaurantes')
            .where('activo', '==', true)
            .get();
        const mesAnterior = new Date();
        mesAnterior.setMonth(mesAnterior.getMonth() - 1);
        for (const restauranteDoc of restaurantes.docs) {
            const restauranteId = restauranteDoc.id;
            const reseñasSnapshot = await admin.firestore()
                .collection('reseñas')
                .where('restaurante_id', '==', restauranteId)
                .where('fecha_resena', '>=', mesAnterior)
                .get();
            const totalReseñas = reseñasSnapshot.size;
            let suma = 0;
            let positivas = 0;
            reseñasSnapshot.forEach(doc => {
                const r = doc.data();
                suma += r.puntuacion || 0;
                if (r.sentimiento === 'positivo')
                    positivas++;
            });
            const promedio = totalReseñas > 0 ? suma / totalReseñas : 0;
            await admin.firestore().collection('reportes').add({
                restaurante_id: restauranteId,
                tipo: 'mensual',
                periodo: mesAnterior.toISOString().substring(0, 7),
                total_reseñas: totalReseñas,
                promedio_calificacion: promedio,
                reseñas_positivas: positivas,
                fecha_generacion: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
        return { success: true, restaurantes: restaurantes.size };
    }
    catch (error) {
        return { success: false };
    }
});
exports.syncExternalReviews = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'No autenticado');
    }
    const { restauranteId, plataforma } = data;
    try {
        await admin.firestore().collection('sincronizaciones').add({
            restaurante_id: restauranteId,
            plataforma: plataforma,
            estado: 'pendiente',
            fecha_solicitud: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true, message: `Sincronización iniciada` };
    }
    catch (error) {
        throw new functions.https.HttpsError('internal', 'Error');
    }
});
//# sourceMappingURL=index-with-genkit.js.map