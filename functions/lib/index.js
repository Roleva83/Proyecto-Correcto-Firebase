"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUploadedFile = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const ExcelJS = require('exceljs');
const csvParser = require('csv-parser');
const stream = require('stream');
admin.initializeApp();
exports.processUploadedFile = functions.storage.object().onFinalize(async (object) => {
    var _a, _b;
    const filePath = object.name;
    if (!filePath || !filePath.startsWith('user_uploads/'))
        return;
    const userId = filePath.split('/')[1];
    const fileName = ((_a = object.name) === null || _a === void 0 ? void 0 : _a.split('/').pop()) || '';
    const fileType = (_b = fileName.split('.').pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    try {
        const bucket = admin.storage().bucket(object.bucket);
        const file = bucket.file(filePath);
        const [fileBuffer] = await file.download();
        let extractedData = {};
        if (fileType === 'csv') {
            extractedData = await processCSV(fileBuffer);
        }
        else if (fileType === 'xlsx' || fileType === 'xls') {
            extractedData = await processExcel(fileBuffer);
        }
        await admin.firestore().collection(`users/${userId}/processedData`).add({
            fileName,
            fileType,
            uploadDate: admin.firestore.FieldValue.serverTimestamp(),
            data: extractedData,
            status: 'completed'
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
});
async function processCSV(buffer) {
    return new Promise((resolve) => {
        const results = [];
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        bufferStream.pipe(csvParser()).on('data', (d) => results.push(d)).on('end', () => resolve({ rows: results }));
    });
}
async function processExcel(buffer) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const rows = [];
    workbook.worksheets[0].eachRow((r, n) => { if (n > 1)
        rows.push(r.values); });
    return { rows };
}
//# sourceMappingURL=index.js.map