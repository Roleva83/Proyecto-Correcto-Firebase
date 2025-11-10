
'use client';

import FileUploader from '../../components/uploads/FileUploader';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

export default function UploadsPage() {
  const user = { name: 'Restaurante Ejemplo' };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Subir Archivos</h1>
            <p className="text-muted-foreground">
              Sube tus archivos de TPV, reservas, reseñas o menús en cualquier formato. Lola IA los analizará por ti.
            </p>
          </div>

          <Card>
            <CardHeader>
                <CardTitle>Sube aquí tus documentos</CardTitle>
            </CardHeader>
            <CardContent>
                <FileUploader />
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
}
