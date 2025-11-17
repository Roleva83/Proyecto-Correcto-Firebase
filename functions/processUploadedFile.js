const {onObjectFinalized} = require("firebase-functions/v2/storage");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getStorage} = require("firebase-admin/storage");
const {GoogleGenerativeAI} = require("@google/generative-ai");

initializeApp();
const db = getFirestore();
const storage = getStorage();

exports.processUploadedFile = onObjectFinalized({
  region: "us-central1",
  memory: "512MiB",
  timeoutSeconds: 540
}, async (event) => {
  const filePath = event.data.name; // uploads/{userId}/tpv/archivo.csv
  const contentType = event.data.contentType;
  
  // Extraer userId y categoría
  const pathParts = filePath.split('/');
  if (pathParts[0] !== 'uploads') return;
  
  const userId = pathParts[1];
  const categoria = pathParts[2]; // tpv, reservas, resenas, menus, otros
  
  console.log(`Procesando archivo: ${filePath} para usuario: ${userId}`);
  
  try {
    // Descargar archivo
    const bucket = storage.bucket();
    const file = bucket.file(filePath);
    const [fileBuffer] = await file.download();
    
    // Procesar según tipo
    let datos = null;
    
    if (contentType.includes('text/csv') || contentType.includes('excel') || contentType.includes('spreadsheet')) {
      datos = await procesarArchivoTabular(fileBuffer, categoria, contentType);
    } else if (contentType.includes('pdf')) {
      datos = await procesarPDF(fileBuffer, categoria);
    } else if (contentType.includes('text')) {
      datos = await procesarTexto(fileBuffer.toString(), categoria);
    }
    
    if (datos) {
      // Guardar datos procesados
      await guardarDatosProcesados(userId, filePath, categoria, datos);
      
      // Actualizar estado del archivo
      await db.collection('archivos_subidos')
        .where('ruta_storage', '==', filePath)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.update({
              estado: 'procesado',
              fecha_procesado: new Date(),
              datos_extraidos: true
            });
          });
        });
      
      console.log(`✅ Archivo procesado: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error);
    
    // Marcar como error
    await db.collection('archivos_subidos')
      .where('ruta_storage', '==', filePath)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.update({
            estado: 'error',
            error_mensaje: error.message
          });
        });
      });
  }
});

// Procesar archivos tabulares (CSV, Excel)
async function procesarArchivoTabular(buffer, categoria, contentType) {
  let texto = '';
  
  if (contentType.includes('csv')) {
    texto = buffer.toString();
  } else {
    // Para Excel usar exceljs
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];
    
    worksheet.eachRow((row) => {
      texto += row.values.join(',') + '\n';
    });
  }
  
  return await extraerDatosConIA(texto, categoria);
}

// Procesar PDFs
async function procesarPDF(buffer, categoria) {
  // Aquí usarías una librería PDF o la API de Gemini para PDFs
  const texto = buffer.toString(); // Simplificado
  return await extraerDatosConIA(texto, categoria);
}

// Procesar texto plano
async function procesarTexto(texto, categoria) {
  return await extraerDatosConIA(texto, categoria);
}

// Extraer datos con IA
async function extraerDatosConIA(texto, categoria) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  
  const prompts = {
    tpv: `Extrae datos de ventas de este archivo. Devuelve JSON con:
    {
      "ventas": [
        {
          "producto": "nombre",
          "categoria": "categoría",
          "cantidad": número,
          "precio_unitario": número,
          "total": número,
          "fecha": "YYYY-MM-DD"
        }
      ],
      "resumen": {
        "total_ventas": número,
        "num_transacciones": número
      }
    }`,
    
    reservas: `Extrae datos de reservas. Devuelve JSON con:
    {
      "reservas": [
        {
          "fecha": "YYYY-MM-DD",
          "hora": "HH:MM",
          "nombre_cliente": "nombre",
          "personas": número,
          "mesa": "número/nombre",
          "estado": "confirmada/cancelada/completada"
        }
      ]
    }`,
    
    resenas: `Extrae reseñas. Devuelve JSON con:
    {
      "resenas": [
        {
          "plataforma": "Google/TripAdvisor/etc",
          "puntuacion": número,
          "comentario": "texto",
          "fecha": "YYYY-MM-DD",
          "sentimiento": "positivo/negativo/neutral"
        }
      ]
    }`,
    
    menus: `Extrae platos del menú. Devuelve JSON con:
    {
      "platos": [
        {
          "nombre": "nombre del plato",
          "categoria": "entrante/principal/postre",
          "precio": número,
          "descripcion": "texto",
          "ingredientes": ["ingrediente1", "ingrediente2"]
        }
      ]
    }`
  };
  
  const prompt = prompts[categoria] || prompts.tpv;
  const result = await model.generateContent(`${prompt}\n\nDatos:\n${texto.substring(0, 10000)}`);
  const response = await result.response;
  const textoRespuesta = response.text();
  
  // Limpiar markdown
  const jsonLimpio = textoRespuesta.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(jsonLimpio);
}

// Guardar en Firestore
async function guardarDatosProcesados(userId, archivoPath, categoria, datos) {
  const timestamp = new Date();
  
  if (categoria === 'tpv' && datos.ventas) {
    for (const venta of datos.ventas) {
      await db.collection('datos_ventas').add({
        usuario_id: userId,
        archivo_origen: archivoPath,
        ...venta,
        fecha_procesado: timestamp
      });
    }
  }
  
  if (categoria === 'reservas' && datos.reservas) {
    for (const reserva of datos.reservas) {
      await db.collection('datos_reservas').add({
        usuario_id: userId,
        archivo_origen: archivoPath,
        ...reserva,
        fecha_procesado: timestamp
      });
    }
  }
  
  if (categoria === 'resenas' && datos.resenas) {
    for (const resena of datos.resenas) {
      await db.collection('datos_resenas').add({
        usuario_id: userId,
        archivo_origen: archivoPath,
        ...resena,
        fecha_procesado: timestamp
      });
    }
  }
  
  if (categoria === 'menus' && datos.platos) {
    for (const plato of datos.platos) {
      await db.collection('datos_menu').add({
        usuario_id: userId,
        archivo_origen: archivoPath,
        ...plato,
        fecha_procesado: timestamp
      });
    }
  }
}
