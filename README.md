# Afrodite Origins

Teste o potencial de Afrodite contra Hefesto em mais uma provação enviada por Atena. Divirta-se abrindo baús e ganhando skins raras.

**[Jogar](https://afrodite-origins.github.io/)** · funciona no PC e no celular (na horizontal). No celular, abra o link e use “Adicionar à tela inicial” para jogar como aplicativo.

## Últimas atualizações

**Alpha 0.17.1 (experimental) · 28/11/2026**

- Cartaz de Novidades: depois de cada atualização, o menu principal mostra sozinho (uma vez) um cartaz com a grande novidade e um botão para ir direto até ela. Embaixo vem o resumo do que mudou e as atualizações anteriores. O cartaz fica sempre no botão Novidades, no topo do menu (com ponto verde enquanto há novidade não vista), no aviso "Última atualização há…" e em Configurações › Últimas atualizações. A lista de atualizações do jogo foi posta em dia até esta versão.
- Relatório · Observar: agora dá para acompanhar o jogador dentro do Cassino de Pandora. Na visão Animada, a roleta girando, os rolos do Tigrinho e as cartas do Flap Jack aparecem com os desenhos do jogo, junto com o jogo, a aposta, o saldo e as falas da Afrodite. Nas Decisões aparece cada aposta (jogo, valor, onde apostou e se ganhou ou perdeu).
- Relatório · Big Five: nova matriz que correlaciona o comportamento no cassino (apetite ao risco, perseguir perdas, busca de prêmio alto, impulsividade, ousadia no 21 e volume de apostas) com os traços OCEAN. Só entram jogadores que passaram no critério estatístico da análise e fizeram pelo menos 10 apostas.
- O jogo passa a registrar o tempo entre as apostas e as cartas pedidas no Flap Jack, para essa análise.

**Alpha 0.17.0 (experimental) · 28/11/2026**

- Cassino de Pandora: nova área sem lutas, com entrada própria no menu principal. É um alívio cômico com a Caixa de Pandora ao centro: aposte moedinhas para ganhar mais moedinhas ou baús, com Afrodite debochando a cada rodada.
- Cena de entrada curta (Afrodite apresenta o cassino), com Avançar, Pular cena e "não mostrar de novo".
- Roleta de Pandora: 24 números (Rosa e Ônix) e a casa verde da Caixa de Pandora. Apostas em cor, par/ímpar, faixa (1 a 8, 9 a 16, 17 a 24) ou na própria Caixa (paga 20× e pode soltar baú). O giro desacelera até parar.
- Tigrinho da Afrodite: caça-níquel de 3 rolos com Moeda, Rosa, Cinto, Baú, Caixa de Pandora e o Tigrinho, que é curinga (dobra o prêmio) e paga 100× quando vem triplo. Os rolos param um de cada vez.
- Flap Jack: 21 rápido com Pedir, Parar e Dobrar. A banca compra até 17, vitória paga 2×, Flap Jack (21 com 2 cartas) paga 2,5× e empate devolve.
- Economia controlada: aposta de 1 a 50 moedinhas por rodada (nunca mais que o saldo), a casa tem uma leve vantagem e o cassino dá no máximo 2 baús por dia (o contador aparece no topo; depois disso o baú vira 5 moedinhas). Quem chega zerada ganha 5 moedinhas de consolo uma vez por dia.
- Ranking do Cassino, separado do Ranking Afrodisíaco: lucro acumulado, saldo máximo, maior aposta vencida, maior prêmio, maior sequência de vitórias e placar geral (depois do SQL novo do TELEMETRIA.md).
- Tudo fica salvo junto com o progresso (e vai com a conta). Funciona no toque, no mouse e no controle; o botão Sair e o voltar do celular fecham o cassino.

**Alpha 0.16.1 (experimental) · 28/11/2026**

- Relatório · Observar: nova visão Animada (padrão), que remonta a luta com os desenhos do próprio jogo: a classe e o visual equipado do jogador, o Hefesto do elo dele, o aliado (ninfa, diabrete ou falcão), fogo, bigornas, área do golpe e acertos. Fica uns 10 a 15 segundos atrasada, como uma novelinha. A visão Esquema antiga continua num botão ao lado.
- Ficha do jogador ao lado da tela: boneco com o visual dele, apelido, classe, elo no Ranking Afrodisíaco, aparelho (sistema, navegador, modelo do celular quando disponível, tamanho da tela e modo de controle), vitórias no total e com a classe, posição no ranking (geral e da classe), habilidades em uso, atributos, itens equipados, moedas e o Hefesto que está enfrentando.
- O jogo passa a mandar essa ficha junto com os retratos da tela (a cada 2 segundos), então a ficha aparece para quem estiver na 0.16.1 ou mais nova.

**Alpha 0.16.0 (experimental) · 27/11/2026**

- Tutorial guiado no celular (primeira luta): a tela escurece e só a área destacada aceita toque, com um dedinho mostrando onde tocar. Passo a passo: andar até perto de Hefesto, atacar com a arma quando ele estiver no alcance e passar o turno quando não der para atacar. Nada de combos de habilidade: só o ciclo básico de aproximar, bater e reagir. O relógio do turno fica parado enquanto o tutorial guia, e o botão Pular tutorial fica sempre visível.
- Primeiro ataque de Hefesto (celular): o golpe vem em câmera lenta e um aviso pede para esperar a nota descer até o anel. Toques adiantados não gastam a reação: o jogo só avisa "Calma! Espere a nota chegar".
- Botão Voltar grande, no canto de baixo à esquerda (alcance do polegar), na escolha de classe e em todas as janelas (loja, mochila, correio, perfil, ranking, Ranking Afrodisíaco, conta, painel de habilidades). O botão voltar do celular também funciona: fecha a janela aberta, volta ao menu principal e, na luta, pausa.
- Tela cheia e minimizar: ao voltar para o jogo (depois de minimizar, sair da tela cheia ou girar o celular), a tela, o zoom e o botão de tela cheia se realinham sozinhos.
- Cenas: botão Pausar / Continuar no canto de cima, para ler a história com calma (no teclado, a tecla P). Com a cena pausada, tocar na tela não pula a cena.
- Classe Personalizada: no celular, Características e Habilidades ficam em telas separadas, com botões maiores e a barra de ações sempre à mão. As habilidades não têm mais pré-requisito: escolha quaisquer 3, de qualquer árvore e em qualquer ordem (remover uma não leva as outras junto).

**Alpha 0.15.1 (experimental) · 27/11/2026**

- Correio: nova aba ao lado de Loja e Mochila, com cartas do GM e presentes para resgatar. Quando chega carta nova, aparece um aviso no menu principal e um ponto no botão Loja e Mochila.
- Primeiras cartas: quem relatou os bugs corrigidos na 0.14.1 recebe um aviso do GM. jefferson12 e veela Selvagem ganham as Asas do Caçador de Bugs (Exclusivo), 300 moedas e 2 baús. Encanto Doce e Romance Sem Volta, que tiveram erros automáticos corrigidos, ganham 200 moedas e 1 baú.
- Novo item exclusivo: Asas do Caçador de Bugs, para quem tiver um bug relatado e corrigido pelo GM.
- Apelido: ao digitar, o jogo confere se o apelido está livre. Apelido de outra conta não pode ser usado; se outro jogador já usou, o jogo avisa, sugere opções e pede para tocar em JOGAR de novo se quiser usar mesmo assim.
- Relatório: bloco Correio do GM para mandar cartas com moedas, baús e itens exclusivos, com a lista de cartas enviadas (lida, resgatada). Nos Bugs reportados, o botão Carta já preenche a carta de bug corrigido para aquele jogador.

**Alpha 0.15.0 (experimental) · 27/11/2026**

- Conta do jogador: dá para criar conta com e-mail e senha (ou entrar com Google, quando estiver ligado no Supabase) e continuar o progresso em qualquer celular ou PC. Moedas, itens, visuais equipados, maestria, conquistas, Ranking Afrodisíaco e apelido ficam salvos na nuvem.
- Nada se perde: ao criar a conta, o que o jogador já tinha no aparelho sobe junto. Se entrar num aparelho que também tem progresso, o jogo junta os dois (fica o mais avançado e soma os itens).
- O progresso é salvo sozinho a cada 20 segundos (quando algo mudou) e ao fechar o jogo. Se dois aparelhos salvarem ao mesmo tempo, o jogo junta os dois em vez de apagar um.
- Onde fica: botão de conta no topo, ao lado da engrenagem (ponto verde = conectado), convite “Salve seu progresso” no menu principal depois de 3 lutas ou do primeiro item (dá para adiar) e a linha da conta no Perfil.
- Esqueci a senha, trocar senha e sair da conta. Ao sair, o aparelho volta a jogar sem conta e o progresso continua guardado nela.
- Segurança: o GM passa a ser reconhecido pelo id do usuário, não só pelo e-mail (SQL novo no TELEMETRIA.md).
- Relatório: bloco Contas dos jogadores, com aparelhos por conta, lutas, itens, moedas, melhor classe no Afrodisíaco e quando salvou.

**Alpha 0.14.1 (experimental) · 27/11/2026**

- Correção (relato do jefferson12): quando a prótese quebrava no meio de um ataque do Hefesto, a cena da fase 2 entrava e, ao terminar, o evento de botão (F, Shift, Espaço) continuava de onde parou. Agora a cena espera o ataque terminar e só depois começa.
- Correção (relato automático da Encanto Doce): retomar uma luta salva com uma Personalizada que tinha o antigo Corte Duplo travava o jogo. O Corte Duplo salvo vira o Falcão, e habilidades que não existem mais são ignoradas.
- Controle (relato da veela Selvagem): apertar um botão do controle troca o jogo para o modo controle sozinho, e apertar uma tecla volta para o teclado. No menu principal, Start ou Select abrem as Configurações, onde dá para trocar o modo de jogo. O botão Afrodisíaco e a tela do Ranking Afrodisíaco também funcionam no controle.
- Segurança extra: ataques do Hefesto nunca marcam casas fora do tabuleiro.

**Alpha 0.14.0 (experimental) · 27/11/2026**

- Ranking Afrodisíaco (1ª Temporada): um passe de temporada infinito, separado por classe, que só sobe com vitórias. Vitória manual vale 1; no automático, 4 vitórias valem 1. Libera com 2 vitórias manuais ou 4 lutas no automático, com um minitutorial que abre sozinho e pode ser revisto a qualquer momento.
- Escada: Madeira, Ferro, Bronze, Prata, Ouro, Platina, Diamante, Esmeralda, Cristal, Celestial e Imortal, cada um com as divisões 4, 3, 2 e 1. Começa na Madeira 4 com 2 vitórias na classe e chega à Lenda com 230. Os primeiros degraus custam 2 a 3 vitórias; os do topo, 6 a 8. Depois da Lenda, o passe continua sem fim: um degrau a cada 12 vitórias, com baú e moedas (e prêmio dobrado a cada 5).
- Tela nova no menu principal (botão Afrodisíaco): escolha da classe, elo atual, vitórias, barra até o próximo degrau, o próximo salto e o Hefesto que espera por você, e a trilha de degraus (Concluído, Atual, Próximo, Bloqueado, Ciclo infinito) com as recompensas e o botão Resgatar. Tocar numa recompensa mostra o que é, a origem e o botão Equipar/Desequipar.
- Prêmios da 1ª Temporada: cor do nome e moldura do nome a cada elo (aparecem no ranking, no perfil e em combate), moldura do perfil (também na borda do botão Perfil), 6 animações rápidas de início de round, moedas e baús. Tudo se equipa e se tira no passe ou no Perfil, sem mexer em arma, escudo, arco, Gorrinho ou aura.
- Promoção: a cada divisão ou elo novo, inclusive nos ciclos da Lenda, aparece um aviso curto no topo com o elo, o prêmio e o próximo Hefesto, sem travar o jogo.
- Hefesto evolutivo: ele muda de material a cada elo (Madeira, Ferro, Bronze… até Lenda), com o nome no chão. Fica até 33% mais resistente, até 28% mais forte e reage mais rápido, e ganha ataques novos: Jato de Fole em Cruz (Bronze), Tenaz Dupla (Ouro), Martelo do Fim já na fase 1 (Diamante), sequências da fase 2 desde o começo (Cristal) e passo extra na fase 2 (Imortal). Na divisão 1 de cada elo você já enfrenta o Hefesto do próximo.

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
