# Telemetria (notas de configuração)

Rode o script abaixo inteiro no **SQL Editor** do Supabase (menu lateral → SQL Editor → New query → colar → Run).
Ele cria o que faltar e corrige o que já existe; pode rodar de novo sem problema.

**Antes de rodar:** troque `SEU-EMAIL-AQUI` (aparece uma vez só, na parte 0) pelo e-mail do usuário GM. Para mais de um GM, separe por vírgula: `('voce@x.com','amigo@y.com')`.

```sql
-- Afrodite Alpha · telemetria (pode rodar quantas vezes quiser)

-- 0) quem é GM (só esses e-mails, logados, leem os dados)
create or replace function public.afrodite_is_gm() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') in ('SEU-EMAIL-AQUI')
$$;

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

-- o jogo salva por esta função (não precisa ler a tabela)
create or replace function public.afrodite_save(doc jsonb) returns void
language plpgsql security definer set search_path = public as $$
declare r public.afrodite_sessions;
begin
  r := jsonb_populate_record(null::public.afrodite_sessions, doc);
  if r.session_id is null then return; end if;
  insert into public.afrodite_sessions values (r.*)
  on conflict (session_id) do update set
    visitor_id = excluded.visitor_id, nick = excluded.nick, started_at = excluded.started_at,
    updated_at = excluded.updated_at, device = excluded.device, inputs = excluded.inputs,
    classes = excluded.classes, screens = excluded.screens, skills = excluded.skills,
    reactions = excluded.reactions, total_ms = excluded.total_ms, deaths = excluded.deaths,
    wins = excluded.wins, dmg_out = excluded.dmg_out, dmg_in = excluded.dmg_in,
    escapes = excluded.escapes, escape_fails = excluded.escape_fails,
    auto_clicks = excluded.auto_clicks, auto_ms = excluded.auto_ms,
    fights = excluded.fights, events = excluded.events;
end $$;
revoke all on function public.afrodite_save(jsonb) from public;
grant execute on function public.afrodite_save(jsonb) to anon, authenticated;

-- o ranking do jogo lê só o necessário por esta função
create or replace function public.afrodite_ranking()
returns table(session_id text, visitor_id text, nick text, total_ms bigint, auto_ms bigint, afk_ms bigint, fights jsonb)
language sql stable security definer set search_path = public as $$
  select s.session_id, s.visitor_id, s.nick, s.total_ms, s.auto_ms,
         coalesce((s.screens ->> '_afk')::numeric, 0)::bigint,
         coalesce(s.fights, s.screens -> '_fights')
  from public.afrodite_sessions s
  order by s.updated_at desc nulls last
  limit 5000
$$;
revoke all on function public.afrodite_ranking() from public;
grant execute on function public.afrodite_ranking() to anon, authenticated;

-- leitura das sessões: só GM
alter table public.afrodite_sessions enable row level security;
drop policy if exists "anon insert" on public.afrodite_sessions;
drop policy if exists "anon update" on public.afrodite_sessions;
drop policy if exists "anon select" on public.afrodite_sessions;
drop policy if exists "gm select" on public.afrodite_sessions;
create policy "gm select" on public.afrodite_sessions for select to authenticated using (public.afrodite_is_gm());
revoke all on public.afrodite_sessions from anon;
grant select on public.afrodite_sessions to authenticated;

-- 2) relatos de bug: o jogo envia, só GM lê
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
drop policy if exists "gm select" on public.afrodite_bugs;
create policy "anon insert" on public.afrodite_bugs for insert to anon with check (true);
create policy "gm select" on public.afrodite_bugs for select to authenticated using (public.afrodite_is_gm());
revoke all on public.afrodite_bugs from anon;
grant insert on public.afrodite_bugs to anon;
grant select on public.afrodite_bugs to authenticated;

-- 3) retratos da tela para o observador (o jogo só insere; só GM lê; somem em 15 min)
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
create policy "gm select" on public.afrodite_obs for select to authenticated using (public.afrodite_is_gm());
revoke all on public.afrodite_obs from anon;
grant insert on public.afrodite_obs to anon;
grant select on public.afrodite_obs to authenticated;

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

### Usuário GM

1. No Supabase: **Authentication → Users → Add user → Create new user**. Coloque o e-mail e uma senha e marque **Auto Confirm User**.
2. No SQL acima, troque `SEU-EMAIL-AQUI` por esse mesmo e-mail e rode o script.
3. Abra o `relatorio.html` e entre com esse e-mail e senha. Sem login, o relatório não mostra nada.

**Como fica a segurança:** com a chave pública (que está no site), dá para **gravar** sessões, bugs e retratos, mas **não dá para ler** nada. O ranking do jogo usa uma função que devolve só apelido, tempos e resultado das lutas. Só os e-mails da parte 0, logados, leem os dados.

Se o relatório mostrar o aviso amarelo *"o relatório ainda está aberto"*, o SQL novo ainda não foi rodado.

Chaves em `analytics-config.js`: URL da API do projeto (`https://SEU-PROJETO.supabase.co`) e a *publishable key*. Nunca coloque a *secret key* nem a senha do banco no site. Sem as chaves, os dados ficam só no navegador de cada jogador.

## Pomba dos itens lendários (versão 0.11.40)

A tela inicial mostra uma pomba anunciando quem conseguiu um item lendário. Ela lê só apelido, item, classe e horário por esta função (o resto das sessões continua só para GM):

```sql
-- Afrodite Origins: anúncio dos itens lendários na tela inicial (a pomba)
-- Rode no Supabase: SQL Editor → New query → cole tudo → Run.
-- Devolve só apelido, nome do item, classe e horário dos lendários novos (do baú ou comprados na loja) dos últimos 14 dias.
-- Versão 2 (0.11.41): também conta os lendários comprados na loja. Pode rodar por cima da anterior.
create or replace function public.afrodite_lendarios()
returns table(nick text, item text, cls text, at timestamptz)
language sql stable security definer set search_path = public as $$
  select coalesce(nullif(trim(s.nick), ''), 'Alguém') as nick,
         coalesce(e ->> 'n', e ->> 'id') as item,
         e ->> 'cls' as cls,
         s.started_at::timestamptz + coalesce((e ->> 't')::numeric, 0) * interval '1 second' as at
  from public.afrodite_sessions s,
       jsonb_array_elements(coalesce(s.events, s.screens -> '_events', '[]'::jsonb)) e
  where e ->> 'e' in ('bau_abriu', 'loja_comprou')
    and e ->> 'r' = 'lendario'
    and coalesce((e ->> 'dup')::boolean, false) = false
    and s.updated_at > now() - interval '14 days'
  order by at desc
  limit 10
$$;
revoke all on function public.afrodite_lendarios() from public;
grant execute on function public.afrodite_lendarios() to anon, authenticated;
```
