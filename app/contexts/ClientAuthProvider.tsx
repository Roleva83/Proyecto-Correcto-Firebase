
'use client';

import { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <AuthProvider>{children}</AuthProvider> : <>{children}</>;
}
