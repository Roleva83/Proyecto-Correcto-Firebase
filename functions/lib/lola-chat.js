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
exports.sendLolaMessage = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
exports.sendLolaMessage = functions.https.onCall(async (data, context) => {
    // Verificar autenticación
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
    }
    const { message, restauranteId } = data;
    if (!message || !restauranteId) {
        throw new functions.https.HttpsError('invalid-argument', 'Faltan parámetros requeridos');
    }
    try {
        // Guardar conversación en Firestore
        const conversacion = await admin.firestore().collection('conversaciones_lola').add({
            restaurante_id: restauranteId,
            usuario_id: context.auth.uid,
            pregunta: message,
            respuesta: 'Hola, soy Lola. Estoy aquí para ayudarte con tu restaurante. Por ahora estoy en modo de prueba.',
            tipo: 'consulta',
            contexto: 'chat',
            fecha_creacion: admin.firestore.FieldValue.serverTimestamp(),
            resuelto: false
        });
        return {
            success: true,
            conversacionId: conversacion.id,
            response: 'Hola, soy Lola. Estoy aquí para ayudarte con tu restaurante. Por ahora estoy en modo de prueba.'
        };
    }
    catch (error) {
        console.error('Error en sendLolaMessage:', error);
        throw new functions.https.HttpsError('internal', 'Error al procesar el mensaje');
    }
});
//# sourceMappingURL=lola-chat.js.map