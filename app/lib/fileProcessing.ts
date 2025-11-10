// @ts-nocheck
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import pdf from 'pdf-parse';

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
export const ALLOWED_FILE_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf',
  'text/plain',
  'application/json',
  'image/jpeg',
  'image/png',
];

export function validateFile(file) {
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'El archivo es demasiado grande (máx 20MB).' };
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'Tipo de archivo no permitido.' };
  }
  return { isValid: true, error: null };
}

export async function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export async function parseExcel(file) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet);
}

export async function parsePDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const data = await pdf(Buffer.from(arrayBuffer));
    return data.text;
}

export function detectDataType(columns) {
  const lowercasedColumns = columns.map(c => c.toLowerCase());

  const tpvKeywords = ['venta', 'producto', 'precio', 'cantidad', 'total', 'ticket', 'sale', 'product', 'price', 'quantity'];
  const reservasKeywords = ['reserva', 'cliente', 'fecha', 'hora', 'pax', 'comensales', 'booking', 'customer', 'date', 'time'];
  const resenasKeywords = ['reseña', 'valoracion', 'comentario', 'plataforma', 'review', 'rating', 'comment', 'platform'];

  const tpvScore = lowercasedColumns.filter(c => tpvKeywords.includes(c)).length;
  const reservasScore = lowercasedColumns.filter(c => reservasKeywords.includes(c)).length;
  const resenasScore = lowercasedColumns.filter(c => resenasKeywords.includes(c)).length;

  if (tpvScore > reservasScore && tpvScore > resenasScore) {
    return 'tpv';
  }
  if (reservasScore > tpvScore && reservasScore > resenasScore) {
    return 'reservas';
  }
  if (resenasScore > tpvScore && resenasScore > reservasScore) {
    return 'resenas';
  }

  return 'otros';
}
