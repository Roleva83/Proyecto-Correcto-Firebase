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
exports.generateMonthlyReport = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
// Se ejecuta el día 1 de cada mes a las 00:00
exports.generateMonthlyReport = functions.pubsub
    .schedule('0 0 1 * *')
    .timeZone('Europe/Madrid')
    .onRun(async (context) => {
    console.log('Generando reportes mensuales...');
    try {
        const restaurantes = await admin.firestore()
            .collection('restaurantes')
            .where('activo', '==', true)
            .get();
        const mesAnterior = new Date();
        mesAnterior.setMonth(mesAnterior.getMonth() - 1);
        for (const restauranteDoc of restaurantes.docs) {
            const restauranteId = restauranteDoc.id;
            // Obtener reseñas del mes anterior
            const reseñasSnapshot = await admin.firestore()
                .collection('reseñas')
                .where('restaurante_id', '==', restauranteId)
                .where('fecha_resena', '>=', mesAnterior)
                .get();
            const totalReseñas = reseñasSnapshot.size;
            let sumaCalificaciones = 0;
            let positivas = 0;
            let negativas = 0;
            reseñasSnapshot.forEach(doc => {
                const reseña = doc.data();
                sumaCalificaciones += reseña.puntuacion || 0;
                if (reseña.sentimiento === 'positivo')
                    positivas++;
                if (reseña.sentimiento === 'negativo')
                    negativas++;
            });
            const promedioCalificacion = totalReseñas > 0 ? sumaCalificaciones / totalReseñas : 0;
            // Guardar reporte
            await admin.firestore().collection('reportes').add({
                restaurante_id: restauranteId,
                tipo: 'mensual',
                periodo: mesAnterior.toISOString().substring(0, 7), // YYYY-MM
                total_reseñas: totalReseñas,
                promedio_calificacion: promedioCalificacion,
                reseñas_positivas: positivas,
                reseñas_negativas: negativas,
                fecha_generacion: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Reporte generado para restaurante ${restauranteId}`);
        }
        return { success: true, restaurantes: restaurantes.size };
    }
    catch (error) {
        console.error('Error generando reportes:', error);
        return { success: false, error: String(error) };
    }
});
//# sourceMappingURL=generate-monthly-report.js.map