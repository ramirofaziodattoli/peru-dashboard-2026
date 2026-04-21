-- ============================================================
-- Perú 2026 · Setup Supabase
-- Correr en el SQL Editor del proyecto de Supabase
-- ============================================================

-- 1. Tabla de estado compartido (checklists, flights, hotels, notas por día)
--    key = identificador único, value = JSON con los datos
create table if not exists trip_state (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_by  text,
  updated_at  timestamptz not null default now()
);

-- 2. Tabla de mural / chat familiar
create table if not exists trip_notes (
  id          uuid primary key default gen_random_uuid(),
  author      text not null,
  text        text not null,
  created_at  timestamptz not null default now()
);

-- 3. Trigger para auto-actualizar updated_at en trip_state
create or replace function touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trip_state_touch on trip_state;
create trigger trip_state_touch
  before update on trip_state
  for each row execute function touch_updated_at();

-- 4. RLS — el link es privado entre los 3, así que permitimos todo a anon
alter table trip_state enable row level security;
alter table trip_notes enable row level security;

-- Políticas trip_state
drop policy if exists "public read trip_state" on trip_state;
create policy "public read trip_state" on trip_state
  for select using (true);

drop policy if exists "public write trip_state" on trip_state;
create policy "public write trip_state" on trip_state
  for insert with check (true);

drop policy if exists "public update trip_state" on trip_state;
create policy "public update trip_state" on trip_state
  for update using (true);

drop policy if exists "public delete trip_state" on trip_state;
create policy "public delete trip_state" on trip_state
  for delete using (true);

-- Políticas trip_notes
drop policy if exists "public read trip_notes" on trip_notes;
create policy "public read trip_notes" on trip_notes
  for select using (true);

drop policy if exists "public write trip_notes" on trip_notes;
create policy "public write trip_notes" on trip_notes
  for insert with check (true);

drop policy if exists "public delete trip_notes" on trip_notes;
create policy "public delete trip_notes" on trip_notes
  for delete using (true);

-- 5. Habilitar Realtime en ambas tablas
alter publication supabase_realtime add table trip_state;
alter publication supabase_realtime add table trip_notes;
