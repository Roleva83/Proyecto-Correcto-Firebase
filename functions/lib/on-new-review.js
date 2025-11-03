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
exports.onNewReview = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
exports.onNewReview = functions.firestore
    .document('reseñas/{reseñaId}')
    .onCreate(async (snap, context) => {
    const reseña = snap.data();
    const reseñaId = context.params.reseñaId;
    try {
        // Obtener info del restaurante
        const restauranteDoc = await admin.firestore()
            .collection('restaurantes')
            .doc(reseña.restaurante_id)
            .get();
        if (!restauranteDoc.exists) {
            console.error('Restaurante no encontrado');
            return { success: false };
        }
        const restaurante = restauranteDoc.data();
        // Crear notificación para el admin del restaurante
        await admin.firestore().collection('notificaciones').add({
            tipo: 'nueva_reseña',
            restaurante_id: reseña.restaurante_id,
            reseña_id: reseñaId,
            usuario_admin: restaurante === null || restaurante === void 0 ? void 0 : restaurante.usuario_admin,
            plataforma: reseña.plataforma,
            puntuacion: reseña.puntuacion,
            autor: reseña.autor,
            mensaje: `Nueva reseña de ${reseña.autor} (${reseña.puntuacion}⭐) en ${reseña.plataforma}`,
            leido: false,
            fecha_creacion: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Notificación creada para nueva reseña ${reseñaId}`);
        return { success: true };
    }
    catch (error) {
        console.error('Error en onNewReview:', error);
        return { success: false, error: String(error) };
    }
});
//# sourceMappingURL=on-new-review.js.map