# Telemetria (notas de configuração)

Rode o script abaixo inteiro no **SQL Editor** do Supabase (menu lateral → SQL Editor → New query → colar → Run).
Ele cria o que faltar e corrige o que já existe; pode rodar de novo sem problema.

```sql
-- Afrodite Alpha · telemetria (pode rodar quantas vezes quiser)

-- 1) sessões
create table if not exists public.afrodite_sessions (
  session_id text primary key
);
alter table public.afrodite_sessions
  add column if not exists visitor_id text,
  add column if not exists nick text,
  add column if not exists started_at timestamptz,
  add column if not exists updated_at timestamptz,
  add column if not exists device text,
  add column if not exists inputs text,
  add column if not exists classes text,
  add column if not exists screens jsonb,
  add column if not exists skills jsonb,
  add column if not exists reactions jsonb,
  add column if not exists total_ms bigint,
  add column if not exists deaths int,
  add column if not exists wins int,
  add column if not exists dmg_out int,
  add column if not exists dmg_in int,
  add column if not exists escapes int,
  add column if not exists escape_fails int,
  add column if not exists auto_clicks int,
  add column if not exists auto_ms bigint,
  add column if not exists fights jsonb,
  add column if not exists events jsonb;

alter table public.afrodite_sessions enable row level security;
drop policy if exists "anon insert" on public.afrodite_sessions;
drop policy if exists "anon update" on public.afrodite_sessions;
drop policy if exists "anon select" on public.afrodite_sessions;
create policy "anon insert" on public.afrodite_sessions for insert to anon with check (true);
create policy "anon update" on public.afrodite_sessions for update to anon using (true) with check (true);
create policy "anon select" on public.afrodite_sessions for select to anon using (true);
grant select, insert, update on public.afrodite_sessions to anon;

-- 2) relatos de bug
create table if not exists public.afrodite_bugs (
  id bigint generated always as identity primary key,
  created_at timestamptz default now()
);
alter table public.afrodite_bugs
  add column if not exists session_id text,
  add column if not exists visitor_id text,
  add column if not exists nick text,
  add column if not exists version text,
  add column if not exists device text,
  add column if not exists screen text,
  add column if not exists context jsonb,
  add column if not exists text text;

alter table public.afrodite_bugs enable row level security;
drop policy if exists "anon insert" on public.afrodite_bugs;
drop policy if exists "anon select" on public.afrodite_bugs;
create policy "anon insert" on public.afrodite_bugs for insert to anon with check (true);
create policy "anon select" on public.afrodite_bugs for select to anon using (true);
grant select, insert on public.afrodite_bugs to anon;

-- 3) avisa a API que as tabelas mudaram
notify pgrst, 'reload schema';
```

Chaves em `analytics-config.js`: URL da API do projeto (`https://SEU-PROJETO.supabase.co`) e a *publishable key*. Nunca coloque a *secret key* nem a senha do banco no site. Sem as chaves, os dados ficam só no navegador de cada jogador.

Para conferir se deu certo, abra `relatorio.html`: no canto superior direito deve aparecer **Supabase · todos os jogadores**. Se aparecer *HTTP 404*, a tabela não existe (ou o nome está diferente); se aparecer *HTTP 401/403*, faltam as permissões (as `policy` acima).
