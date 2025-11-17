
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage().bucket();

const STORAGE_LIMIT_BYTES = 5368709120; // 5 GB

/**
 * Cloud Function para subir un archivo de un restaurante.
 * - Verifica el límite de almacenamiento.
 * - Sube el archivo a Firebase Storage.
 * - Guarda los metadatos en Firestore.
 * - Actualiza el almacenamiento total utilizado por el restaurante.
 */
exports.uploadRestaurantFile = functions.https.onCall(async (data, context) => {
  // 1. Validar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "La función debe ser llamada por un usuario autenticado."
    );
  }

  // 2. Validar parámetros de entrada
  const { file, restaurantId, fileName, fileSize } = data;
  if (!file || !restaurantId || !fileName || !fileSize) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Faltan parámetros requeridos (file, restaurantId, fileName, fileSize)."
    );
  }

  const restaurantRef = db.collection("restaurants").doc(restaurantId);

  try {
    const restaurantDoc = await restaurantRef.get();

    if (!restaurantDoc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        `El restaurante con ID ${restaurantId} no existe.`
      );
    }

    // 3. Verificar que el restaurante no haya superado 5GB de almacenamiento
    const currentStorageUsed = restaurantDoc.data().totalStorageUsed || 0;
    if (currentStorageUsed + fileSize > STORAGE_LIMIT_BYTES) {
      throw new functions.https.HttpsError(
        "resource-exhausted",
        "El límite de almacenamiento (5GB) para este restaurante ha sido superado."
      );
    }

    // 4. Subir el archivo a Storage
    const filePath = `restaurants/${restaurantId}/uploads/${fileName}`;
    const fileBuffer = Buffer.from(file, "base64");

    const fileUpload = storage.file(filePath);
    await fileUpload.save(fileBuffer, {
      metadata: {
        contentType: "application/octet-stream", // O un tipo MIME más específico si se proporciona
      },
    });
    
    const [downloadURL] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' // URL de larga duración
    });


    // 5. Iniciar una transacción de Firestore para garantizar la consistencia
    await db.runTransaction(async (transaction) => {
      // 5a. Guardar metadatos en la colección "uploads"
      const uploadRef = db.collection("uploads").doc();
      transaction.set(uploadRef, {
        restaurantId: restaurantId,
        fileName: fileName,
        fileSize: fileSize,
        downloadURL: downloadURL,
        uploadDate: admin.firestore.FieldValue.serverTimestamp(),
      });

      // 5b. Actualizar el campo totalStorageUsed en el documento del restaurante
      transaction.update(restaurantRef, {
        totalStorageUsed: admin.firestore.FieldValue.increment(fileSize),
      });
    });

    console.log(`Archivo ${fileName} subido correctamente para el restaurante ${restaurantId}.`);
    return {
      success: true,
      message: "Archivo subido y registrado correctamente.",
      downloadURL: downloadURL,
    };
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error; // Re-lanzar errores HttpsError
    }
    throw new functions.https.HttpsError(
      "internal",
      "Ha ocurrido un error interno al procesar el archivo.",
      error.message
    );
  }
});
