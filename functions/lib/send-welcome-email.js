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
exports.sendWelcomeEmail = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
    const email = user.email;
    const displayName = user.displayName || 'Usuario';
    console.log(`Nuevo usuario registrado: ${email}`);
    // TODO: Integrar con servicio de email (SendGrid, Mailgun, etc.)
    // Por ahora, solo guardamos en Firestore como notificación
    try {
        await admin.firestore().collection('notificaciones').add({
            tipo: 'bienvenida',
            usuario_id: user.uid,
            email: email,
            nombre: displayName,
            asunto: '¡Bienvenido a Caña y Reseña!',
            mensaje: `Hola ${displayName}, gracias por unirte a Caña y Reseña. Estamos aquí para ayudarte a gestionar tu restaurante.`,
            enviado: false,
            fecha_creacion: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Notificación de bienvenida creada para ${email}`);
        return { success: true };
    }
    catch (error) {
        console.error('Error creando notificación de bienvenida:', error);
        return { success: false, error: String(error) };
    }
});
//# sourceMappingURL=send-welcome-email.js.map