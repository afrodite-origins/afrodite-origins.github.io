# Afrodite Alpha — A Ascensão e o Triunfo de Afrodite

Protótipo de RPG tático por turnos no navegador, no estilo souls-like: Afrodite enfrenta Hefesto, o deus da forja, em duas fases.

- **Jogar:** `index.html` (ou a página do GitHub Pages deste repositório).
- **Relatório dos testes:** `relatorio.html` (ex.: `https://SEU-USUARIO.github.io/afrodite-alpha/relatorio.html`).

## Controles
- **Mouse:** clique nas casas para andar; botões AÇÕES e PASSAR TURNO na tela.
- **Teclado:** setas traçam o caminho, Espaço confirma, Q abre o menu, Enter passa o turno, F apara, Shift + seta desvia, P liga a luta automática.
- **Controle:** analógico/direcional traça o caminho, X confirma e apara, A pula, B + analógico desvia, Y passa o turno, LB abre o menu. O controle vibra ao receber dano.

## Celular
- Jogue **na horizontal** (o botão *Tela cheia* ajuda; no iPhone use *Compartilhar → Adicionar à Tela de Início*).
- Toque uma vez para ver (caminho, mira, ação do menu) e de novo no mesmo lugar para confirmar.
- No turno de Hefesto: botões **Aparar** e **Pular** na tela; toque numa casa vizinha para desviar.

## Telemetria e relatório
O jogo registra, sem pedir login: apelido (opcional, na tela inicial), sessão, data, dispositivo, tipo de entrada, tempo em cada tela, mortes, vitórias, dano causado e recebido, tentativas de fuga, habilidades e reações usadas e o uso do modo Automático.

- **Sem configurar nada:** os dados ficam só no navegador de quem jogou, e o `relatorio.html` mostra apenas as partidas daquele navegador.
- **Para juntar os dados de todos os amigos (Supabase, gratuito):**
  1. Crie uma conta e um projeto em https://supabase.com.
  2. No projeto, abra **SQL Editor** e rode:
     ```sql
     create table afrodite_sessions (
       session_id text primary key, visitor_id text, nick text,
       started_at timestamptz, updated_at timestamptz, device text, inputs text, classes text,
       screens jsonb, skills jsonb, reactions jsonb,
       total_ms bigint, deaths int, wins int, dmg_out int, dmg_in int,
       escapes int, escape_fails int, auto_clicks int, auto_ms bigint
     );
     alter table afrodite_sessions enable row level security;
     create policy "anon insert" on afrodite_sessions for insert to anon with check (true);
     create policy "anon update" on afrodite_sessions for update to anon using (true) with check (true);
     create policy "anon select" on afrodite_sessions for select to anon using (true);
     ```
  3. Em **Project Settings → API**, copie a **Project URL** e a chave **anon public** para o arquivo `analytics-config.js` e suba de novo.
  - Observação: a chave anon fica visível no site, então qualquer pessoa com o link consegue ler esses dados de teste. Não guarde nada sensível ali.

## Créditos
- Trilha da luta: **"Forging Flames"**, de Patrick Maney — [OpenGameArt](https://opengameart.org/content/forging-flames-cinematic-dark), licença CC-BY 3.0.
- Demais sons e músicas são gerados pelo próprio jogo (Web Audio).
