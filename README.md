# Afrodite Origins

Teste o potencial de Afrodite contra Hefesto em mais uma provação enviada por Atena. Divirta-se abrindo baús e ganhando skins raras.

**[Jogar](https://afrodite-origins.github.io/)** · funciona no PC e no celular (na horizontal). No celular, abra o link e use “Adicionar à tela inicial” para jogar como aplicativo.

## Últimas atualizações

**Alpha 0.13.4 (experimental) · 27/11/2026**

- Baús: as chances mudaram para Comum 56% · Incomum 24% (Raro 14%, Épico 5% e Lendário 1% seguem iguais). Antes, como só há 5 roupas Incomuns, cada uma (como a Gala Dourada) saía mais que qualquer item Comum: 6% contra 5%. Agora cada Incomum é 4,8% e cada Comum 5,6%.
- Na loja, na mochila e no baú, cada item mostra quantos % dos jogadores já têm (“Só você tem até agora”, “Ninguém tem ainda”, “3% dos jogadores têm”). Precisa do SQL novo do TELEMETRIA.md (raridade real dos itens).
- Relatório: auditoria dos baús, com observado × esperado por item, o primeiro baú de cada jogador e o z-score quando há amostra suficiente.

**Alpha 0.13.3 (experimental) · 27/11/2026**

- Amigo da Comunidade: quem atinge o critério estatístico da análise (≥ 3 lutas concluídas, ≥ 40 decisões e confiança ≥ 60%, o mesmo cálculo do relatório) ganha um convite no menu principal para uma pesquisa de 4 perguntas rápidas: o que fazer primeiro (PvP, Co-op ou História), o que mais prendeu, o que faria jogar mais e um recado opcional pro GM.
- Ao enviar, ganha na hora a Aura Sayajin do Amor (Exclusivo): “O GM te presenteou pessoalmente e te considera oficial co-fundador desse projeto.” Aura de energia rosa com chamas, faíscas e raios, em vaga própria (não mexe em arma, escudo, arco nem no Gorrinho), para todas as classes; equipe ou tire na mochila.
- Relatório: novo bloco Comunidade com quem atingiu o critério e quem respondeu, resumo PvP × Co-op × História, o que mais prendeu e o que mais falta, e as respostas individuais com os recados. A aura aparece na coleção Exclusivo com prévia. As respostas não entram na lista de bugs.

**Alpha 0.13.2 (experimental) · 27/11/2026**

- Faixa de turnos maior no topo (bem maior no celular), sem invadir o tabuleiro.
- “Novo” por item: na loja e na mochila, o aviso de novidade some do item assim que você toca nele, sem precisar fechar a aba.
- Malandra: a Flecha do Cupido agora funciona de 1 a 6 casas, com +15% de dano por casa de distância (até +75%). O Voo Rasante tem um minitutorial e, ao acertar, já abre a mira do Recuo em Voo (dá para cancelar). Novos arcos cosméticos (5 épicos, um por conjunto); as adagas continuam na vaga de arma.
- Ranking: Vitórias por classe e DPS por classe (só vitórias manuais), com a sua posição em cada classe. Intocável e Automático continuam. O Tempo e o Dano geral saíram.
- Relatório: confiança = 1 − e^(−N/5) e amostra mínima (5 lutas ou 40 decisões) nos perfis e no Big Five, que ganhou explicação e leitura de cada traço; gráficos de retenção pós-luta (com o motivo provável de continuar) e de uso de moedas; sessões que abrem e fecham uma a uma.

**Alpha 0.13.1 (experimental) · 27/11/2026**

- GM observando: quando o GM clica em Observar no relatório, o Zac (de terninho, óculos e cabelo cacheado) aparece na lateral da luta, fora do tabuleiro, com o selo “GM · Zac · observando”. Some quando o GM sai ou troca de jogador.
- Presente de boas-vindas: o GM pode armar o presente pelo botão Presentear. Se o jogador vencer aquela luta sem usar o automático, além da recompensa normal ganha o Gorrinho de Natal, com a mensagem “O GM observou pessoalmente a sua luta, e lhe deu um presente de boas-vindas.” Entrega uma vez só por presente, mesmo se a página recarregar.
- Nova raridade Exclusivo. O Gorrinho de Natal serve em todas as classes (é um chapéu, não mexe no escudo da Paladina) e não sai em baú nem na loja.
- Relatório: botão Presentear no ao vivo e no Observar; itens da coleção agrupados por raridade (as prévias só abrem ao clicar); CSV de retenção por jogador; aba separada Big Five, fechada ao abrir o relatório, com confiança da amostra e evidências por jogador.

**Alpha 0.13.0 (experimental) · 27/11/2026**

- Malandra: o Corte Duplo Envenenado saiu e entrou o Falcão Caçador. Ele voa só pelas bordas do tabuleiro e age sozinho, alternando Voo Cegante (arranha e testa DEX × SAB, cerca de 30% em Hefesto) e Beijo do Alcance (+1 de alcance em todos os ataques de Afrodite no turno seguinte).
- Cegueira: no próximo turno Hefesto anda tateando e não ataca de longe; só acerta quem estiver a até 2 casas. As casas dessa zona brilham em dourado, e ele fica com venda, penas e “?” na cabeça. A placa mostra o teste e se funcionou, como no Diabrete.
- Ninfa da Água redesenhada: cabelo de água corrente, saia de ondas com espuma, lótus na cabeça, olhos que piscam, peixinhos em órbita e falas em balão.
- Balanceamento (simulações no automático com 70% de acerto nas reações): Paladina 6/6 vitórias em 5,2 rodadas; Malandra com o Falcão 4/4 em 5,5 rodadas (antes 6,7); Maga 5/6 em 7; Sedutora 6/6 em 8.
- Relatório: coleção de itens adquiridos (baú e loja) ordenável por raridade, com o boneco do jogador vestindo o item; gráfico de maestria por classe; lista dos últimos que entraram e jogaram.

**Alpha 0.12.8 (experimental) · 27/11/2026**

- O HUD novo virou o padrão para todos: menu principal, carrossel de classes, painel de habilidades e combate mais limpo. O clássico continua em Opções › HUD ou pelo link com ?hud=velho.
- Paladina não troca mais de postura sozinha nas prévias: fica na defensiva, com o escudo na frente, e só gira a lança na postura ofensiva.
- Prévia da Aura Sádica refeita: círculo trevoso no chão, fumaça e demônios rodando em volta dela, rindo.
- Prévia do Masoquismo refeita: um demônio do amor em volta do inimigo por acúmulo; no 5º eles se juntam e explodem.
- Prévia dos glifos da Maga: Afrodite conjura, o glifo se desenha no chão e só explode no turno de Hefesto.

**Alpha 0.12.7 (experimental) · 27/11/2026**

- HUD novo (teste): o painel “Ver habilidades” foi refeito. À esquerda ficam só os ícones, encadeados na ordem da árvore; no meio, uma prévia animada da habilidade (Afrodite contra um boneco de treino); à direita, a descrição.
- Paladina: a Mudança de Postura fica no topo, com um aviso pulsando. Ao tocar, as três habilidades de baixo trocam entre a postura defensiva e a ofensiva. Sedutora: o Masoquismo aparece no topo como passiva.

**Alpha 0.12.6 (experimental) · 27/11/2026**

- HUD novo (teste): na escolha de classe, a descrição virou um resumo geral de cada classe, com um botão “Ver habilidades”.
- “Ver habilidades” abre um painel em tabuleiro: o brasão da classe no centro, as habilidades 1, 2 e 3 em volta, a arma embaixo e as extras (Masoquismo, Recuo em Voo, Mudança de Postura). A Paladina mostra as duas posturas lado a lado. Toque numa habilidade para ver custo, recarga, atributos e o que ela faz; troque de classe pelos retratos embaixo.

**Alpha 0.12.5 (experimental) · 27/11/2026**

- HUD novo (teste): a escolha de classe virou um carrossel. A heroína aparece grande diante de um vitral na cor da classe, com as vizinhas apagadas dos lados, setas e arrastar para trocar, brasões embaixo e o botão Selecionar.
- Menu principal: o botão agora diz “Loja e Mochila”, com os dois ícones, para deixar claro que as duas estão ali.

**Alpha 0.12.4 (experimental) · 27/11/2026**

- HUD novo (teste): novo menu principal simétrico com três locais. A Forja de Hefesto (disponível, com um “?” contando por que ela existe), Caminho para o Olimpo e Coliseu (em breve).
- Ranking, Perfil e Loja ficam numa barra embaixo do menu; o ranking abre direto da tela inicial.
- Loja e Mochila viraram abas da mesma janela. No HUD novo a loja só vende; equipar é na mochila.
- Botão “‹ Início” na escolha do caminho para voltar ao menu (Esc ou ○/B também voltam).

**Alpha 0.12.1 (experimental) · 27/11/2026**

- Escudos viraram itens próprios da Paladina (5 modelos, épicos), na loja e no baú, separados dos outros visuais.
- Só a Lança do Dragão é de dragão: as outras ofensivas agora são Cometa Escarlate e Meia-Lua Rasteira.
- Diabrete com animações exageradas: voa até a cara de Hefesto, faz a habilidade e volta. Hefesto passa por um teste (barra com a chance) e aparece FUNCIONOU! ou HEFESTO RESISTIU.
- Hefesto provocado mostra marcas de raiva e uma mira no Diabrete; distraído, fica tonto. Os dois estados aparecem nos ícones dele.
- Piloto automático: a cada 3 vitórias, um baú depois de derrotar Hefesto.
- Aviso do piloto automático mais curto e minimalista.

**Alpha 0.12.0 (experimental) · 27/11/2026**

- Celular: na tela de reação, toque direto na nota. Sem setas: aparar à esquerda, pular no meio e desviar à direita, em pistas largas e afastadas.
- Celular: ao conjurar, as 4 pistas ficam em dois blocos (um por polegar) e você toca na própria nota.
- Aparar no celular ganhou uma janela de tempo extra.
- Reações no estilo Expedition 33: anel que fecha no impacto, som próprio para cada golpe que vem, som de desvio e um choque de lâminas bem marcado ao aparar.
- Paladina: postura defensiva dá +defesa e −ataque; a ofensiva dá +ataque e −defesa. Um ícone acima da cabeça mostra a postura.
- Paladina ofensiva: Lança do Dragão (rugido, giro de 360° e fogo de dragão no chão), Presa do Dragão e Cauda do Dragão. Todas funcionam de perto.
- Paladina: a Muralha de Afeto virou Aura Sádica (2 turnos, área 2×2): quem está nela apara sozinho.
- Paladina: um escudo diferente para cada set da loja.
- Sedutora: Masoquismo virou passivo, com no máximo 5 acúmulos; no 5º explode em % da vida do inimigo.
- Sedutora: nova invocação Diabrete Travesso, que voa pelo mapa, provoca e faz careta para distrair Hefesto.
- Personalizada: o cabelo da prévia segue a característica principal, e ao confirmar os atributos um coração se enche em cada um.

**Alpha 0.11.44 (experimental) · 27/11/2026**

- Celular: na tela de reação, APARAR e PULAR ficaram maiores e bem afastados no polegar direito; as setas de desviar foram todas para o polegar esquerdo.
- Celular: ao conjurar, as notas viram 4 botões grandes, 2 de cada lado da tela.
- Paladina no celular: nas primeiras lutas os golpes avisam um pouco antes e a janela de reação é mais folgada.
- Loja: a cada hora sorteia visuais de todas as classes, com o sigilo discreto da classe em cada item. Achar um lendário da sua classe favorita ficou raro.
- Pontinho de aviso na Loja quando há rotação nova e na Mochila quando chega visual novo; some ao abrir a tela.
- Novo Perfil (ícone ao lado da engrenagem): apelido, Afrodite com os visuais da classe favorita, maestria que evolui com lutas, vitórias e tempo, conquistas e estatísticas (vitórias, lutas, tempo jogado, melhor tempo e últimas partidas).

## Controles
| | PC | Controle |
|---|---|---|
| Andar | clique / setas + Espaço | analógico + X |
| Ações | Q | LB |
| Passar turno | Enter | Y |
| Aparar | F | X |
| Pular | Espaço | A |
| Desviar | Shift + direção | B + direção |

No celular: um toque mostra, o segundo confirma. Na reação, toque direto na nota: aparar à esquerda, pular no meio, desviar à direita.

## Créditos
Trilha: "Forging Flames", de Patrick Maney ([OpenGameArt](https://opengameart.org/content/forging-flames-cinematic-dark), CC-BY 3.0).

O jogo registra dados anônimos de partida (tempo, mortes, habilidades usadas) para ajudar nos testes.

## Privacidade

O jogo está em teste. Se você aceitar na primeira tela, ele registra como você joga (apelido escolhido, modelo do aparelho e navegador, tempo nas telas, escolhas, acertos e erros, onde você toca ou clica na tela, FPS) para ajustar o jogo. O desenvolvedor pode rever uma versão simplificada da partida, com atraso, para entender onde o jogo confunde. Tempo parado por mais de 2 minutos não conta como tempo jogado. Os dados só podem ser lidos pelo desenvolvedor. Não pedimos nome real, e-mail, telefone nem localização, e nada é vendido ou compartilhado. Dá para jogar sem enviar dados e mudar a escolha na engrenagem. Para pedir que seus dados sejam apagados, use **Reportar bug** e informe o código mostrado no aviso.
