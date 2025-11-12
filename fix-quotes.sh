#!/bin/bash

echo "🔧 Arreglando comillas sin escapar en JSX..."

# EmployeeDetailModal.tsx - línea 163
sed -i '163s/"Caña y Reseña"/"Caña y Reseña"/g' app/components/team/EmployeeDetailModal.tsx

# legal-notice/page.tsx - línea 66
sed -i '66s/"Caña y Reseña"/"Caña y Reseña"/g' app/legal/legal-notice/page.tsx

# terms-and-conditions/page.tsx - líneas 61 y 65
sed -i '61s/"Caña y Reseña"/"Caña y Reseña"/g' app/legal/terms-and-conditions/page.tsx
sed -i '65s/"software"/"software"/g; 65s/"tal cual"/"tal cual"/g; 65s/"Caña y Reseña"/"Caña y Reseña"/g' app/legal/terms-and-conditions/page.tsx

# mis-metas-y-medallas/page.tsx - línea 203
sed -i '203s/"bronce"/"bronce"/g; 203s/"oro"/"oro"/g' app/mis-metas-y-medallas/page.tsx

# page.tsx (landing) - múltiples líneas
sed -i 's/"Caña y Reseña"/"Caña y Reseña"/g' app/page.tsx
sed -i '259s/"Transforma/"Transforma/g; 259s/reseñas"/reseñas"/g' app/page.tsx
sed -i '277s/"Convierte/"Convierte/g; 277s/oportunidades"/oportunidades"/g' app/page.tsx
sed -i '368s/"Desde/"Desde/g; 368s/decisiones"/decisiones"/g' app/page.tsx
sed -i '492s/"Ahorra/"Ahorra/g; 492s/perdida"/perdida"/g' app/page.tsx
sed -i '498s/"Optimiza/"Optimiza/g; 498s/clientes"/clientes"/g' app/page.tsx
sed -i '504s/"Reduce/"Reduce/g; 504s/experiencia"/experiencia"/g' app/page.tsx

echo "✅ Comillas arregladas"
