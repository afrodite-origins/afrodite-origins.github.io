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

## GM observando e presente de boas-vindas (versão 0.13.1)

Cria o canal do GM para o jogo: quando você clica em **Observar** no relatório, o Zac aparece na lateral da luta daquele jogador; o botão **Presentear** arma o Gorrinho de Natal, que o jogador só recebe se vencer a luta sem o automático. Rode uma vez no **SQL Editor** (pode rodar de novo sem problema). Ele usa a função `afrodite_is_gm()` da parte 0.

```sql
-- Afrodite Origins · canal do GM (observar e presentear)
create table if not exists public.afrodite_gm (
  visitor_id text primary key,
  session_id text,
  observing boolean default false,
  observer text default 'Zac',
  gift boolean default false,
  gift_at timestamptz,
  gift_sent_at timestamptz,
  updated_at timestamptz default now()
);
alter table public.afrodite_gm enable row level security;
drop policy if exists "gm all" on public.afrodite_gm;
create policy "gm all" on public.afrodite_gm for all to authenticated
  using (public.afrodite_is_gm()) with check (public.afrodite_is_gm());
revoke all on public.afrodite_gm from anon;
grant select, insert, update on public.afrodite_gm to authenticated;

-- o jogo só consulta o próprio estado (precisa saber o próprio visitor_id)
create or replace function public.afrodite_gm_get(vid text)
returns table(observing boolean, observer text, gift boolean, gift_at timestamptz)
language sql stable security definer set search_path = public as $$
  select (g.observing and g.updated_at > now() - interval '2 minutes') as observing,
         g.observer, g.gift, g.gift_at
  from public.afrodite_gm g where g.visitor_id = vid
$$;
-- o jogo confirma a entrega (uma vez por presente armado)
create or replace function public.afrodite_gm_ack(vid text, at text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if at = 'local' then
    update public.afrodite_gm set gift = false, gift_sent_at = now() where visitor_id = vid and gift;
  else
    update public.afrodite_gm set gift = false, gift_sent_at = now()
    where visitor_id = vid and gift and gift_at = at::timestamptz;
  end if;
end $$;
revoke all on function public.afrodite_gm_get(text) from public;
revoke all on function public.afrodite_gm_ack(text, text) from public;
grant execute on function public.afrodite_gm_get(text) to anon, authenticated;
grant execute on function public.afrodite_gm_ack(text, text) to anon, authenticated;
notify pgrst, 'reload schema';
```

**Como fica a segurança:** só o GM logado grava na tabela. O jogo não consegue listar nada: ele só pergunta pelo próprio `visitor_id` e só consegue desligar um presente que já está armado para ele. Enquanto o SQL não for rodado, o jogo simplesmente não mostra o Zac nem entrega presentes.

## Raridade real dos itens (versão 0.13.4)

O jogo mostra na descrição de cada item quantos % dos jogadores já têm aquele item ("Só você tem até agora", "3% dos jogadores têm"…). Ele lê só contagens por esta função; nada pessoal sai do banco. Rode uma vez no **SQL Editor**:

```sql
-- Afrodite Origins · quantos jogadores têm cada item (só contagens)
create or replace function public.afrodite_item_stats()
returns table(item text, owners bigint, players bigint)
language sql stable security definer set search_path = public as $$
  with ev as (
    select s.visitor_id, e ->> 'id' as item
    from public.afrodite_sessions s,
         jsonb_array_elements(case when jsonb_typeof(coalesce(s.events, s.screens -> '_events')) = 'array'
                                   then coalesce(s.events, s.screens -> '_events') else '[]'::jsonb end) e
    where s.visitor_id is not null
      and e ->> 'e' in ('bau_abriu', 'loja_comprou', 'presente_gm', 'presente_comunidade')
      and e ->> 'id' is not null
  ), pl as (
    select count(distinct s.visitor_id) as n
    from public.afrodite_sessions s
    where s.visitor_id is not null
      and jsonb_typeof(coalesce(s.fights, s.screens -> '_fights')) = 'array'
      and jsonb_array_length(coalesce(s.fights, s.screens -> '_fights')) > 0
  )
  select ev.item, count(distinct ev.visitor_id) as owners, (select n from pl) as players
  from ev group by ev.item
$$;
revoke all on function public.afrodite_item_stats() from public;
grant execute on function public.afrodite_item_stats() to anon, authenticated;
notify pgrst, 'reload schema';
```

"Jogadores" = quem jogou pelo menos uma luta e aceitou compartilhar dados. Itens repetidos (o baú deu o que já tinha) também contam como "tem".

## Contas dos jogadores (versão 0.15.0)

Cria o login dos jogadores e o progresso na nuvem. Rode uma vez no **SQL Editor** (pode rodar de novo sem problema).

**Antes de rodar:** troque `SEU-EMAIL-AQUI` pelo e-mail do seu usuário GM (o mesmo que você usa no relatório). Para mais de um GM, separe por vírgula: `('voce@x.com','amigo@y.com')`. Se esquecer de trocar, o script para com um aviso e nada muda.

Por quê: com os jogadores criando contas, o GM passa a ser reconhecido pelo **id** do usuário, não só pelo e-mail. Assim ninguém vira GM criando uma conta com o e-mail de outra pessoa.

```sql
-- Afrodite Origins · contas dos jogadores (pode rodar quantas vezes quiser)

-- 1) GMs pelo id do usuário (troque o e-mail abaixo)
create table if not exists public.afrodite_gms (user_id uuid primary key);
alter table public.afrodite_gms enable row level security;
do $$ begin
  insert into public.afrodite_gms (user_id)
    select id from auth.users where lower(email) in (lower('SEU-EMAIL-AQUI'))
  on conflict do nothing;
  if (select count(*) from public.afrodite_gms) = 0 then
    raise exception 'Troque SEU-EMAIL-AQUI pelo e-mail do seu usuário GM antes de rodar.';
  end if;
end $$;
create or replace function public.afrodite_is_gm() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.afrodite_gms where user_id = auth.uid())
$$;

-- 2) progresso de cada conta
create table if not exists public.afrodite_contas (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.afrodite_contas
  add column if not exists email text,
  add column if not exists nick text,
  add column if not exists dados jsonb,
  add column if not exists vids text[] default '{}',
  add column if not exists versao text,
  add column if not exists score int default 0,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();
alter table public.afrodite_contas enable row level security;
drop policy if exists "dono ou gm le" on public.afrodite_contas;
create policy "dono ou gm le" on public.afrodite_contas for select to authenticated
  using (user_id = auth.uid() or public.afrodite_is_gm());
revoke all on public.afrodite_contas from anon, authenticated;
grant select on public.afrodite_contas to authenticated;

-- 3) ler o próprio progresso
create or replace function public.afrodite_conta_ler()
returns table(dados jsonb, updated_at timestamptz)
language sql stable security definer set search_path = public as $$
  select c.dados, c.updated_at from public.afrodite_contas c where c.user_id = auth.uid()
$$;

-- 4) salvar (recusa se outro aparelho salvou depois: o jogo junta os dois e tenta de novo)
create or replace function public.afrodite_conta_salvar(p_dados jsonb, p_nick text, p_vid text, p_versao text, p_score int, p_base timestamptz)
returns jsonb language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); cur public.afrodite_contas%rowtype; t timestamptz;
begin
  if uid is null then raise exception 'sem login'; end if;
  if octet_length(p_dados::text) > 500000 then raise exception 'progresso grande demais'; end if;
  select * into cur from public.afrodite_contas where user_id = uid for update;
  if found and cur.dados is not null and (p_base is null or cur.updated_at > p_base) then
    return jsonb_build_object('conflito', true, 'dados', cur.dados, 'updated_at', cur.updated_at);
  end if;
  insert into public.afrodite_contas as c (user_id, email, nick, dados, vids, versao, score, updated_at)
  values (uid, auth.jwt() ->> 'email', left(coalesce(p_nick, ''), 24), p_dados,
          case when p_vid is null then '{}'::text[] else array[left(p_vid, 40)] end, left(p_versao, 40), p_score, now())
  on conflict (user_id) do update set
    email = excluded.email, nick = excluded.nick, dados = excluded.dados,
    vids = case when p_vid is null or p_vid = any(c.vids) then c.vids else (c.vids || left(p_vid, 40))[greatest(1, cardinality(c.vids) - 18):] end,
    versao = excluded.versao, score = excluded.score, updated_at = now()
  returning c.updated_at into t;
  return jsonb_build_object('ok', true, 'updated_at', t);
end $$;
revoke all on function public.afrodite_conta_ler() from public;
revoke all on function public.afrodite_conta_salvar(jsonb, text, text, text, int, timestamptz) from public;
grant execute on function public.afrodite_conta_ler() to authenticated;
grant execute on function public.afrodite_conta_salvar(jsonb, text, text, text, int, timestamptz) to authenticated;
notify pgrst, 'reload schema';
```

### Configurações do login no painel do Supabase

**Etapa 1 (agora, sem e-mail):**
1. **Authentication → Sign In / Providers → Email**: deixe **ligado** e **desligue "Confirm email"**. Assim a conta funciona na hora, sem esperar e-mail.
2. **Authentication → URL Configuration**: em **Site URL** coloque `https://afrodite-origins.github.io` e, em **Redirect URLs**, adicione `https://afrodite-origins.github.io/**`.

**Etapa 2 (e-mails de verdade: "esqueci a senha"):**
3. Crie uma conta num serviço de envio (por exemplo Brevo ou Resend, ambos com plano grátis) e pegue os dados de SMTP (servidor, porta, usuário, senha e o e-mail remetente).
4. **Authentication → Emails → SMTP Settings**: ligue **Custom SMTP**, cole esses dados e salve. Sem isso, o Supabase só manda e-mail para os membros da equipe do projeto.
5. Em **Authentication → Rate Limits**, confira o limite de e-mails por hora (começa em 30).
6. Opcional: os textos dos e-mails ficam em **Authentication → Emails → Templates** (dá para traduzir "Reset Password" para português).

**Entrar com Google (opcional):**
7. No **Google Cloud Console** → APIs e serviços → Credenciais → Criar credenciais → **ID do cliente OAuth** → tipo **Aplicativo da Web**. Em **URIs de redirecionamento autorizados**, cole `https://hmbsiwpqxeketyamsbsq.supabase.co/auth/v1/callback`. Configure a tela de consentimento com o nome do jogo.
8. No Supabase, **Authentication → Sign In / Providers → Google**: ligue, cole o **Client ID** e o **Client Secret** e salve. O botão "Entrar com Google" aparece sozinho no jogo.
