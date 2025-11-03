'use client';

import FileUploader from '../../components/FileUploader';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

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
              Sube tus archivos de TPV, reservas, reseñas o menús en cualquier formato.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FileUploader categoria="tpv" />
            <FileUploader categoria="reservas" />
            <FileUploader categoria="reseñas" />
            <FileUploader categoria="menus" />
          </div>
        </main>
      </div>
    </div>
  );
}