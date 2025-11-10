import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface FileValidation {
  isValid: boolean;
  error?: string;
}

export interface ParsedData {
  type: 'tpv' | 'reservas' | 'resenas' | 'otros';
  data: any[];
  summary: {
    rows: number;
    columns: string[];
  };
}

const ALLOWED_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf',
  'text/plain',
  'application/json',
  'image/jpeg',
  'image/png'
];

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function validateFile(file: File): FileValidation {
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'El archivo es demasiado grande. Máximo 20MB.'
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Tipo de archivo no permitido.'
    };
  }

  return { isValid: true };
}

export function parseCSV(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        const columns = results.meta.fields || [];
        const type = detectDataType(columns);
        
        resolve({
          type,
          data,
          summary: {
            rows: data.length,
            columns
          }
        });
      },
      error: (error) => {
        reject(new Error(`Error al parsear CSV: ${error.message}`));
      }
    });
  });
}

export async function parseExcel(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        const columns = Object.keys(jsonData[0] || {});
        const type = detectDataType(columns);
        
        resolve({
          type,
          data: jsonData,
          summary: {
            rows: jsonData.length,
            columns
          }
        });
      } catch (error) {
        reject(new Error(`Error al parsear Excel: ${error}`));
      }
    };
    
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsArrayBuffer(file);
  });
}

function detectDataType(columns: string[]): 'tpv' | 'reservas' | 'resenas' | 'otros' {
  const columnsLower = columns.map(c => c.toLowerCase());
  
  const tpvKeywords = ['venta', 'ticket', 'importe', 'producto', 'precio', 'cantidad'];
  if (tpvKeywords.some(keyword => columnsLower.some(col => col.includes(keyword)))) {
    return 'tpv';
  }
  
  const reservasKeywords = ['reserva', 'mesa', 'comensales', 'hora', 'cliente', 'telefono'];
  if (reservasKeywords.some(keyword => columnsLower.some(col => col.includes(keyword)))) {
    return 'reservas';
  }
  
  const resenasKeywords = ['reseña', 'comentario', 'opinion', 'valoracion', 'estrellas', 'puntuacion'];
  if (resenasKeywords.some(keyword => columnsLower.some(col => col.includes(keyword)))) {
    return 'resenas';
  }
  
  return 'otros';
}

export function generateUniqueFilename(originalName: string, userId: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  
  return `${userId}_${timestamp}_${randomString}_${nameWithoutExt}.${extension}`;
}
