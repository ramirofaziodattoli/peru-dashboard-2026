# Perú 2026 · Hub familiar

Next.js 15 + Supabase Realtime. Checklist, vuelos, hoteles, días y mural de chat — sincronizado en vivo entre Rami, Tomi y Nati.

## Setup (una vez)

### 1. Supabase
1. Crear proyecto en [supabase.com](https://supabase.com)
2. SQL Editor → correr `supabase-setup.sql`
3. Settings → API → copiar `Project URL` y `anon public key`

### 2. Env vars
```bash
cp .env.local.example .env.local
# editar .env.local con los datos del paso 1.3
```

### 3. Instalar + correr
```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Deploy a Vercel

1. `git init && git add . && git commit -m "init"`
2. Push a GitHub
3. [vercel.com/new](https://vercel.com/new) → importar repo
4. Pegar las 2 env vars en el setup de Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

Compartir la URL con Tomi y Nati.

## Archivos

- `app/` — páginas Next
- `components/` — UI (TripHub, Mural, EditableField, etc.)
- `lib/` — Supabase client, hooks, tipos, data estática
- `supabase-setup.sql` — schema + RLS + realtime
- `_legacy/` — versión HTML anterior (ignorar)

## Notas

- RLS permite lectura/escritura pública a `anon`. El "auth" es el link privado — solo los 3 lo tienen. Si quieren algo más serio, agregar Supabase Auth con magic link.
- El nombre (Rami/Tomi/Nati) se guarda en localStorage por navegador — cada uno elige el suyo al entrar.
- El chat (`trip_notes`) guarda hasta 200 mensajes. Se puede borrar solo el autor.
