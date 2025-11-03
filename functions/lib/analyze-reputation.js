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
exports.analyzeReview = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
exports.analyzeReview = functions.firestore
    .document('reseñas/{reseñaId}')
    .onCreate(async (snap, context) => {
    const reseña = snap.data();
    try {
        // Análisis simple de sentimiento
        const sentimiento = analizarSentimiento(reseña.texto);
        // Actualizar documento con análisis
        await snap.ref.update({
            sentimiento: sentimiento,
            analizado: true,
            fecha_analisis: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Reseña ${context.params.reseñaId} analizada: ${sentimiento}`);
        return { success: true, sentimiento };
    }
    catch (error) {
        console.error('Error analizando reseña:', error);
        return { success: false, error: String(error) };
    }
});
function analizarSentimiento(texto) {
    // Análisis simple por palabras clave
    // TODO: Integrar con Gemini para análisis más avanzado
    const palabrasPositivas = ['excelente', 'bueno', 'delicioso', 'genial', 'increíble', 'perfecto', 'maravilloso'];
    const palabrasNegativas = ['malo', 'terrible', 'pésimo', 'horrible', 'sucio', 'lento', 'frío'];
    const textoLower = texto.toLowerCase();
    let scorePositivo = 0;
    let scoreNegativo = 0;
    palabrasPositivas.forEach(palabra => {
        if (textoLower.includes(palabra))
            scorePositivo++;
    });
    palabrasNegativas.forEach(palabra => {
        if (textoLower.includes(palabra))
            scoreNegativo++;
    });
    if (scorePositivo > scoreNegativo)
        return 'positivo';
    if (scoreNegativo > scorePositivo)
        return 'negativo';
    return 'neutral';
}
//# sourceMappingURL=analyze-reputation.js.map