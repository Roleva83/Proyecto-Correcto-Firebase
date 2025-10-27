#!/bin/bash
echo "🔥 Matando todos los procesos..."
pkill -9 node 2>/dev/null || true
pkill -9 next 2>/dev/null || true
lsof -ti:9002 | xargs kill -9 2>/dev/null || true

echo "🧹 Limpiando caché..."
cd ~/Proyecto-Correcto-Firebase
rm -rf .next
rm -rf node_modules/.cache

echo "⏳ Esperando..."
sleep 3

echo "🚀 Iniciando servidor limpio..."
npm run dev
