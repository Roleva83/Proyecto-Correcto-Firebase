// Supabase client
// Comentado temporalmente hasta configurar las variables de entorno

export const supabase = {
  auth: {
    signIn: async () => ({}),
    signOut: async () => ({}),
    getSession: async () => ({ data: { session: null }, error: null }),
  },
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
}
