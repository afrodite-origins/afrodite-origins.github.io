# Telemetria (notas de configuração)

Tabela no Supabase (SQL Editor):

```sql
create table afrodite_sessions (
  session_id text primary key, visitor_id text, nick text,
  started_at timestamptz, updated_at timestamptz, device text, inputs text, classes text,
  screens jsonb, skills jsonb, reactions jsonb,
  total_ms bigint, deaths int, wins int, dmg_out int, dmg_in int,
  escapes int, escape_fails int, auto_clicks int, auto_ms bigint,
  fights jsonb
);
alter table afrodite_sessions enable row level security;
create policy "anon insert" on afrodite_sessions for insert to anon with check (true);
create policy "anon update" on afrodite_sessions for update to anon using (true) with check (true);
create policy "anon select" on afrodite_sessions for select to anon using (true);
```

Chaves em `analytics-config.js`: URL da API do projeto e a publishable key. Sem elas, os dados ficam só no localStorage.

Se a tabela já existia antes da coluna `fights` (dados por luta, usados no ranking e nas métricas do relatório):

```sql
alter table afrodite_sessions add column if not exists fights jsonb;
```

Eventos da sessão (usados nas análises de Automático e de saída do jogo):

```sql
alter table afrodite_sessions add column if not exists events jsonb;
```

Relatos de bug enviados pelo botão do jogo:

```sql
create table afrodite_bugs (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  session_id text, visitor_id text, nick text, version text, device text, screen text,
  context jsonb, text text
);
alter table afrodite_bugs enable row level security;
create policy "anon insert" on afrodite_bugs for insert to anon with check (true);
create policy "anon select" on afrodite_bugs for select to anon using (true);
```
