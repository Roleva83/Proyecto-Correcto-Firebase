import {onRequest} from 'firebase-functions/v2/https';

// Simple test function so Firebase can detect Node runtime and deploy.
export const helloWorld = onRequest((req, res) => {
  res.status(200).send('Hello from Firebase Functions!');
});
