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

-- 3) retratos da tela para o observador do GM (o jogo só consegue INSERIR; só o GM logado lê)
--    TROQUE 'SEU-EMAIL-AQUI' pelo e-mail do usuário GM que você criar em Authentication → Users
create table if not exists public.afrodite_obs (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  session_id text,
  frames jsonb
);
create index if not exists afrodite_obs_ses on public.afrodite_obs (session_id, created_at desc);
alter table public.afrodite_obs enable row level security;
drop policy if exists "anon insert" on public.afrodite_obs;
drop policy if exists "gm select" on public.afrodite_obs;
create policy "anon insert" on public.afrodite_obs for insert to anon with check (true);
create policy "gm select" on public.afrodite_obs for select to authenticated using ((auth.jwt() ->> 'email') = 'SEU-EMAIL-AQUI');
revoke all on public.afrodite_obs from anon;
grant insert on public.afrodite_obs to anon;
grant select on public.afrodite_obs to authenticated;

-- apaga retratos com mais de 15 minutos a cada novo envio
create or replace function public.afrodite_obs_trim() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  delete from public.afrodite_obs where created_at < now() - interval '15 minutes';
  return null;
end $$;
drop trigger if exists afrodite_obs_trim on public.afrodite_obs;
create trigger afrodite_obs_trim after insert on public.afrodite_obs
  for each statement execute function public.afrodite_obs_trim();

-- limpa os retratos que a versão 0.11.12 deixou dentro das sessões
update public.afrodite_sessions set screens = screens - '_obs' where screens ? '_obs';

-- 4) avisa a API que as tabelas mudaram
notify pgrst, 'reload schema';
```

### Usuário GM (para observar jogadores no relatório)

1. No Supabase: **Authentication → Users → Add user → Create new user**. Coloque seu e-mail e uma senha e marque **Auto Confirm User**.
2. No SQL acima, troque `SEU-EMAIL-AQUI` por esse mesmo e-mail e rode o script.
3. No `relatorio.html`, clique em **🔑 GM** e entre com esse e-mail e senha. O botão **📺 Observar** só aparece depois disso.

Os retratos da tela ficam numa tabela à parte (`afrodite_obs`). O jogo só consegue **gravar** nela; ninguém com a chave pública consegue ler. Só o usuário cujo e-mail está na política `gm select` lê, e os retratos somem sozinhos depois de 15 minutos.

Chaves em `analytics-config.js`: URL da API do projeto (`https://SEU-PROJETO.supabase.co`) e a *publishable key*. Nunca coloque a *secret key* nem a senha do banco no site. Sem as chaves, os dados ficam só no navegador de cada jogador.

Para conferir se deu certo, abra `relatorio.html`: no canto superior direito deve aparecer **Supabase · todos os jogadores**. Se aparecer *HTTP 404*, a tabela não existe (ou o nome está diferente); se aparecer *HTTP 401/403*, faltam as permissões (as `policy` acima).
