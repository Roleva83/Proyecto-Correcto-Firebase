"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const https_1 = require("firebase-functions/v2/https");
// Simple test function so Firebase can detect Node runtime and deploy.
exports.helloWorld = (0, https_1.onRequest)((req, res) => {
    res.status(200).send('Hello from Firebase Functions!');
});
