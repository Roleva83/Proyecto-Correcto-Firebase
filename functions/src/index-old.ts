import * as admin from 'firebase-admin';

// Inicializar Firebase Admin
admin.initializeApp();

// Exportar todas las functions
export * from './lola-chat';
export * from './analyze-reputation';
