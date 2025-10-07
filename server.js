// server.js — compatible con "type": "module"
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Servir estáticos de la build
app.use(express.static(path.join(__dirname, "dist")));

// Healthcheck para Cloud Run / App Hosting
app.get("/_ah/health", (_req, res) => res.status(200).send("ok"));

// Fallback universal para SPA (evita el error de path-to-regexp)
app.use((_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`✅ Server listening on http://0.0.0.0:${port}`);
});

