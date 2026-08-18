# Etapa 3 - Design, experiência e modelo adaptável para portais municipais

> **Tipo de documento:** especificação normativa de design e contexto para implementação por IA  
> **Leitor principal:** IA ou equipe responsável por projetar, implementar, testar e manter o sítio público e a personalização administrativa  
> **Pré-requisitos:** leitura integral das Etapas 1 e 2 antes de desenhar telas ou componentes  
> **Escopo:** arquitetura de informação, página inicial, páginas internas, design system, acessibilidade, responsividade e personalização segura  
> **Regra principal:** a aparência poderá variar por prefeitura, mas transparência, acessibilidade, semântica, segurança e rotas essenciais não poderão ser enfraquecidas pela personalização

## Como a IA deverá usar este documento

Este arquivo não é apenas uma análise visual. Ele deverá ser usado como instrução de projeto quando o novo portal for desenhado e implementado.

Ao receber este documento como contexto, a IA deverá:

1. ler primeiro a [Etapa 1](./ETAPA-1-REQUISITOS-ESSENCIAIS-PNTP-2026.md), que define os requisitos PNTP e os problemas reais do ecossistema atual de Amargosa;
2. ler depois a [Etapa 2](./ETAPA-2-ARQUITETURA-E-BACKEND.md), que fixa arquitetura, linguagens, segurança, auditoria, publicação e infraestrutura;
3. usar esta Etapa 3 para decidir arquitetura de informação, componentes, layouts, comportamento responsivo, acessibilidade e limites de personalização;
4. tratar as referências pesquisadas como fontes de padrões e alertas, nunca como autorização para copiar código, identidade visual, textos, imagens ou estrutura integral;
5. transformar cada requisito visual em componente, regra de validação, teste e critério de aceite rastreável;
6. projetar primeiro os fluxos do cidadão e somente depois a composição estética da página;
7. manter serviços e transparência mais fáceis de encontrar do que notícias, campanhas e conteúdo promocional;
8. validar todas as variações de tema e layout em desktop e celular antes de permitir sua publicação;
9. não declarar acessibilidade com base apenas em barra de ferramentas, VLibras, Hand Talk ou outro recurso adicional;
10. não declarar elegibilidade a medalha com base na aparência do sítio: a nota depende do atendimento material e verificável aos critérios da matriz vigente.

### Ordem de autoridade

A IA deverá respeitar a seguinte ordem:

1. legislação vigente, matriz e cartilha oficial mais recente do PNTP;
2. requisitos funcionais e de transparência da Etapa 1;
3. arquitetura, segurança e backend da Etapa 2;
4. regras de design, acessibilidade e personalização desta Etapa 3;
5. checklist de maximização da nota que será produzido na Etapa 4;
6. preferências estéticas e referências externas.

Nenhuma opção visual poderá ocultar, remover, renomear de forma ambígua ou tornar inacessível um caminho protegido pelas Etapas 1 e 2.

### Significado normativo

- **deverá / obrigatório:** requisito que deverá ser implementado e testado;
- **não poderá / proibido:** comportamento que deverá ser impedido pelo sistema;
- **preferencialmente:** padrão recomendado, alterável somente com justificativa e resultado equivalente ou superior;
- **poderá:** opção permitida dentro das validações;
- **referência:** padrão observado que deverá ser reinterpretado, não copiado.

## 1. Objetivo da Etapa 3

O projeto deverá produzir um portal municipal que seja:

- orientado às tarefas reais do cidadão;
- compatível com os requisitos de transparência;
- acessível desde a estrutura, e não somente por complementos;
- rápido e legível em celulares;
- simples de alimentar por administradores não técnicos;
- visualmente adaptável a cidades com perfis diferentes;
- limpo e claro o suficiente para funcionar com identidades municipais distintas sem exigir redesenho do produto;
- protegido contra alterações administrativas que quebrem acessibilidade, segurança ou PNTP;
- reutilizável sem obrigar várias prefeituras a compartilhar banco, arquivos ou infraestrutura.

O resultado esperado é um **núcleo municipal reutilizável**, com componentes protegidos e configuração visual por prefeitura. Na primeira arquitetura, cada município deverá possuir implantação, banco, armazenamento, domínio, credenciais, auditoria e backups isolados. O mesmo código-base poderá ser implantado diversas vezes com configurações diferentes.

Não deverá ser criada agora uma plataforma SaaS multicliente com dados de várias prefeituras no mesmo banco. Essa mudança exigiria uma decisão arquitetural posterior, modelo de ameaças específico e isolamento comprovado.

## 2. Relação entre design e medalha do PNTP

### 2.1 O que o design pode fazer

O design deverá:

- tornar o Portal da Transparência identificável no primeiro nível de navegação;
- oferecer caminhos diretos, estáveis e compreensíveis para cada informação essencial;
- apresentar busca, filtros, datas, formatos e origem dos dados com clareza;
- impedir que conteúdo essencial dependa de carrossel, modal, banner, chatbot ou menu oculto;
- reduzir o número de cliques e a ambiguidade entre sítio institucional, transparência e sistemas externos;
- deixar visíveis estado, última atualização, período coberto e responsável por cada conjunto de dados;
- preservar as URLs canônicas exigidas na Etapa 1;
- permitir que o avaliador registre evidência sem depender da sessão administrativa ou de navegação frágil.

### 2.2 O que o design não resolve sozinho

Uma interface moderna não compensa:

- dado inexistente, incompleto ou desatualizado;
- série histórica insuficiente;
- filtro obrigatório ausente;
- arquivo que não pode ser baixado em formato exigido;
- link externo quebrado ou que leva apenas à página inicial de outro sistema;
- informação disponível somente após login, CAPTCHA inadequado ou barreira técnica;
- URL instável ou sem página canônica;
- ausência de declaração formal de não ocorrência.

Por isso, o design deverá trabalhar junto às regras de conteúdo, integração, evidência e monitoramento das Etapas 1 e 2.

## 3. Metodologia e limites da pesquisa

A pesquisa foi realizada em 11 de agosto de 2026, observando a página inicial, estrutura exposta ao navegador, prioridades de navegação e comportamento em viewport móvel. Foram analisados:

- sítio oficial de Amargosa;
- demonstração do iPrefeituras;
- Prefeitura de São Paulo;
- Prefeitura de Salvador;
- Prefeitura de Curitiba;
- Prefeitura do Recife;
- Prefeitura de Belém do Pará.

Os níveis e índices abaixo foram consultados na base oficial de avaliações do PNTP 2025 disponibilizada pelo Radar da Transparência Pública. Eles representam aquela avaliação, não um certificado permanente nem uma avaliação visual.

| Portal analisado | Resultado PNTP 2025 | Essenciais em 2025 | Papel na pesquisa |
|---|---:|---:|---|
| Amargosa/BA | Básico, 48,23% | 93,94% | diagnóstico do problema atual |
| iPrefeituras Demo | não se aplica | não se aplica | referência de produto configurável |
| São Paulo/SP | Intermediário, 70,10% | 100% | contraste entre aparência moderna e nota |
| Salvador/BA | Prata, 77,46% | 100% | capital certificada Prata |
| Curitiba/PR | Ouro, 94,16% | 100% | referência Ouro orientada à busca |
| Recife/PE | Ouro, 92,90% | 100% | referência Ouro com serviços por público |
| Belém/PA | Prata, 76,91% | 100% | referência Prata com busca e serviços em destaque |

### 3.1 Interpretação obrigatória dos resultados

- Certificação PNTP não é prêmio de design.
- Um portal certificado pode possuir problemas de semântica, excesso de banners ou experiência móvel ruim.
- Um portal visualmente sofisticado pode não alcançar medalha.
- Os exemplos Ouro e Prata deverão orientar prioridades e padrões úteis, mas não substituir a matriz oficial.
- A futura IA deverá conferir novamente matriz, cartilha e resultados vigentes antes de afirmar conformidade ou usar os níveis acima como informação atual.

## 4. Lições de cada referência

### 4.1 Amargosa

#### Aspectos úteis

- identidade municipal reconhecível;
- busca disponível;
- atalhos para públicos como cidadão, empresa, servidor e turista;
- presença de Transparência, Diário Oficial, notícias, serviços e acessibilidade;
- tentativa de concentrar sistemas municipais dispersos.

#### Problemas que não poderão ser repetidos

- carrossel promocional muito grande antes das tarefas principais;
- excesso de links de acesso rápido sem hierarquia clara;
- dependência de muitos sistemas externos com linguagens visuais e comportamentos diferentes;
- notícias e campanhas competindo com serviços e transparência;
- muitos elementos flutuantes simultâneos, como cookies, chatbot e acessibilidade;
- banner de cookies ocupando parte relevante da tela móvel;
- textos incorporados às imagens do carrossel, com leitura e recorte imprevisíveis;
- links ou ícones com nomes acessíveis insuficientes;
- hierarquia semântica e landmarks inconsistentes;
- risco de a página funcionar como catálogo de destinos, sem explicar o que existe em cada sistema e quem o mantém.

#### Resposta do novo modelo

O novo sítio poderá agregar sistemas, porque essa é uma necessidade real, mas cada integração deverá usar uma página intermediária canônica com:

- nome claro do serviço ou conjunto de dados;
- resumo do que o cidadão encontrará;
- órgão e sistema responsáveis;
- período e data da última verificação;
- botão explícito para abrir o sistema externo;
- indicação de que o usuário sairá do portal;
- caminho alternativo ou contato em caso de indisponibilidade;
- monitoramento do destino;
- link profundo para a informação, quando tecnicamente possível.

### 4.2 iPrefeituras Demo

#### Aspectos úteis

- organização modular que contempla notícias, publicações, serviços, secretarias, multimídia e contatos;
- destaque inicial para Transparência, e-SIC, Acesso à Informação e Ouvidoria;
- demonstração explícita de troca de cor e nome da prefeitura;
- possibilidade conceitual de reaproveitar componentes para municípios diferentes;
- segmentação de conteúdo e grande cobertura funcional.

#### Problemas que não deverão ser copiados

- aparência densa e datada;
- carrossel muito dominante;
- excesso de módulos na mesma página;
- conteúdo de demonstração e elementos técnicos expostos;
- ícones ou símbolos sem nomes compreensíveis por tecnologia assistiva;
- links dependentes de JavaScript em vez de URLs reais;
- modal de cookies obstruindo a experiência móvel;
- erro de texto no link de salto observado na demonstração;
- personalização tratada principalmente como troca de cor e nome.

#### Resposta do novo modelo

Deverá ser reaproveitada a ideia de **produto configurável**, mas não o aspecto visual ou padrões técnicos antigos. A personalização deverá abranger identidade, composição segura de módulos, densidade e conteúdo, sempre dentro do design system e das proteções deste documento.

### 4.3 São Paulo

#### Aspectos úteis

- identidade forte e navegação principal reduzida;
- atalhos superiores para Acesso à Informação, Transparência, Ouvidoria, 156 e Diário Oficial;
- catálogo extenso de serviços por cidadão, empresa, turista e servidor;
- busca orientada pela pergunta “O que você procura?”;
- boa adaptação visual do cabeçalho para celular;
- imagens observadas com textos alternativos presentes.

#### Problemas e alertas

- carrossel ainda aparece antes da busca;
- banner de cookies toma grande parte da tela móvel;
- recursos flutuantes de acessibilidade competem por espaço;
- ausência de elemento `main` observada na página inicial durante a pesquisa;
- aparência moderna não resultou em certificação PNTP na base 2025.

#### Lição

O modelo deverá aproveitar a organização por tarefas e públicos, mas colocar busca e serviços prioritários antes de comunicação promocional. Semântica e PNTP deverão ser testados independentemente do acabamento visual.

### 4.4 Salvador

#### Aspectos úteis

- Transparência, Salvador Dados, Acesso à Informação e Ouvidoria visíveis;
- integração com o portal de serviços Salvador Digital;
- acesso a órgãos, notícias, Diário Oficial e canais de contato;
- variedade de destinos para cidadão, servidor e empresa.

#### Problemas e alertas

- modal promocional bloqueia a página na primeira visita e ocupa quase toda a tela móvel;
- carrossel e publicidade disputam a área principal;
- repetição genérica de textos alternativos como “Logo Prefeitura de Salvador” em imagens e links diferentes;
- várias ocorrências de `h1` e hierarquia de títulos inadequada;
- excesso de links de órgãos sem mecanismo suficientemente claro de priorização;
- widgets flutuantes sobrepostos ao conteúdo;
- fragmentação acentuada entre domínios e sistemas.

#### Lição

O resultado Prata demonstra que o conteúdo de transparência pode estar atendido mesmo com experiência visual problemática. O novo modelo deverá preservar os acessos institucionais úteis sem repetir modais obrigatórios, excesso de banners, rótulos genéricos ou hierarquia semântica incorreta.

### 4.5 Curitiba

#### Aspectos úteis

- busca é a principal ação da primeira tela;
- exemplos de buscas e serviços populares reduzem a necessidade de conhecer a estrutura administrativa;
- Portal da Transparência, Ouvidoria, 156 e Acesso à Informação aparecem no cabeçalho;
- Carta de Serviços possui destaque claro;
- conteúdo organizado em notícias, eventos e assuntos em alta;
- identidade visual limpa e consistente.

#### Problemas e alertas

- imagem decorativa de grande porte ainda pesa na primeira dobra;
- muitos recursos da barra de acessibilidade não substituem o atendimento estrutural;
- imagens sem atributo alternativo foram observadas;
- ausência de `main`, `nav` semântico e `h1` na página inicial durante a pesquisa;
- cookies e ferramenta de acessibilidade podem obstruir o conteúdo móvel.

#### Lição

A abordagem **busca primeiro** deverá ser uma referência central do novo modelo. A implementação, porém, deverá acrescentar semântica, alternativas textuais e controle rigoroso de elementos fixos.

### 4.6 Recife

#### Aspectos úteis

- links de salto para menu, busca e rodapé;
- Portal da Transparência e Ouvidoria no cabeçalho;
- busca visível;
- segmentação clara entre cidadão, turista, servidor e empresas;
- serviços prioritários apresentados ao lado da comunicação institucional;
- todas as imagens observadas possuíam atributo alternativo.

#### Problemas e alertas

- aparência antiga e muito densa;
- carrossel de notícia ocupa grande área;
- muitos menus e listas institucionais competem com as tarefas;
- ausência de `main`, `nav` semântico e `h1` observada na página inicial;
- alguns links dependem de `javascript:void(0)`.

#### Lição

A segmentação por público é útil, mas deverá complementar uma busca por tarefa. O cidadão não poderá ser obrigado a descobrir em qual perfil administrativo se encaixa antes de encontrar um serviço.

### 4.7 Belém do Pará

#### Aspectos úteis

- Carta de Serviços, Ouvidoria e Transparência ocupam o primeiro nível;
- busca rápida ampla e visível;
- pergunta “Como podemos ajudar?” direciona para cidadão, empreendedor, servidor, turista e imprensa;
- serviços mais buscados aparecem antes de notícias;
- estrutura móvel clara e sem rolagem horizontal observada;
- uso de `header`, `nav`, `main` e `footer` na página inicial.

#### Problemas e alertas

- carrossel promocional ainda antecede a área de públicos;
- página inicial observada sem `h1`;
- imagem com muito texto perde legibilidade e escala no celular;
- barra superior fica visualmente apertada em telas pequenas;
- recursos flutuantes podem cobrir parte do banner.

#### Lição

É a referência mais próxima do equilíbrio desejado entre serviços, busca, identidade e responsividade, mas o novo modelo deverá reduzir o protagonismo do banner e corrigir semântica e uso de texto dentro de imagens.

## 5. Princípios obrigatórios de design

### 5.1 Serviços antes de estrutura administrativa

O cidadão deverá poder procurar “IPTU”, “marcar consulta”, “licitação”, “transporte escolar” ou “segunda via” sem conhecer o nome da secretaria responsável.

Secretarias e órgãos continuarão disponíveis, mas não serão o único modelo de navegação.

### 5.2 Transparência no primeiro nível

O cabeçalho deverá manter links textuais e identificáveis para, no mínimo:

- Transparência;
- Acesso à Informação/e-SIC;
- Ouvidoria;
- Diário Oficial;
- Carta de Serviços ou Serviços.

Em telas pequenas, esses destinos poderão ocupar uma barra compacta, menu de tarefas prioritárias ou primeira seção do menu. Não poderão desaparecer em submenus profundos.

### 5.3 Busca como caminho principal, não decorativo

A busca deverá:

- estar presente no cabeçalho ou primeira dobra;
- possuir rótulo visível, e não depender apenas de placeholder;
- pesquisar páginas, serviços, notícias, documentos, secretarias e itens da transparência;
- aceitar termos populares e sinônimos administráveis;
- indicar o tipo, órgão, data e destino de cada resultado;
- permitir filtrar resultados;
- registrar consultas sem resultado de forma compatível com privacidade;
- oferecer sugestões e serviços populares sem impedir a digitação livre;
- funcionar por teclado e leitor de tela.

### 5.4 Comunicação institucional como conteúdo secundário

Notícias, agenda, campanhas, turismo e programas são importantes, mas não poderão empurrar serviços e transparência para fora da primeira experiência.

O modelo deverá limitar destaques promocionais e priorizar uma chamada principal curta ou grade de destaques. Carrossel não será o padrão inicial.

### 5.5 Clareza sobre destinos externos

Links externos continuarão sendo necessários. O portal deverá reduzir seus problemas por meio de:

- página canônica interna para cada serviço ou conjunto de dados relevante;
- ícone e texto indicando abertura de sistema externo;
- mesma aba por padrão, salvo documento ou fluxo que justifique nova aba;
- aviso acessível quando uma nova aba for aberta;
- monitoramento de disponibilidade;
- validação de HTTPS e domínio permitido;
- nome do responsável e alternativa de atendimento;
- preservação do contexto para retorno ao portal.

### 5.6 Design com conteúdo real

Os componentes deverão ser testados com:

- títulos longos e curtos;
- nomes reais de secretarias;
- documentos e tabelas volumosas;
- datas e períodos;
- imagens horizontais e verticais;
- ausência legítima de imagem;
- falha de sistema externo;
- conexão lenta;
- aumento de texto e tradução por tecnologia assistiva.

Não será aceita aprovação baseada somente em textos fictícios curtos ou telas ideais.

### 5.7 Linguagem visual limpa, clara e reutilizável

O padrão visual deverá ser deliberadamente simples. A identidade de cada prefeitura surgirá da marca, das cores, da tipografia homologada, das imagens locais e da escolha entre variantes, não de layouts completamente diferentes ou excesso de ornamentação.

O design deverá:

- usar hierarquia tipográfica previsível e legível;
- manter espaços em branco suficientes entre grupos de informação;
- limitar cores simultâneas e reservar cores de estado para significados consistentes;
- evitar excesso de bordas, sombras, gradientes, ícones e animações;
- privilegiar listas e cards simples em vez de banners para tarefas públicas;
- usar uma grade responsiva comum a todas as prefeituras;
- manter rótulos claros junto aos ícones;
- limitar a quantidade de destaques concorrentes na primeira tela;
- preservar padrões de interação iguais entre instâncias;
- permitir que uma troca de identidade municipal não exija alterar a estrutura dos componentes.

Uma tela não será considerada personalizada por possuir mais elementos. A personalização deverá melhorar reconhecimento local sem reduzir clareza, consistência ou velocidade.

## 6. Arquitetura obrigatória da página inicial

A página inicial deverá adotar a seguinte ordem lógica. Variações visuais serão permitidas, mas a prioridade não poderá ser invertida sem teste e justificativa.

1. **Links de salto:** conteúdo, menu, busca e rodapé.
2. **Barra de serviço público:** Transparência, e-SIC/Acesso à Informação, Ouvidoria, Diário Oficial e acessibilidade.
3. **Cabeçalho:** brasão/logomarca, nome oficial da prefeitura, busca e menu.
4. **Alerta público opcional:** emergência, prazo ou interrupção, com expiração automática.
5. **Busca principal:** pergunta em linguagem simples e atalhos para tarefas mais procuradas.
6. **Serviços prioritários:** catálogo por tarefa, assunto e, secundariamente, público.
7. **Atalhos protegidos:** Transparência, Carta de Serviços, e-SIC, Ouvidoria, Diário Oficial e licitações.
8. **Informação atual:** notícias, agenda, avisos e publicações oficiais.
9. **Módulos locais opcionais:** turismo, cultura, economia, programas e identidade territorial.
10. **Estrutura municipal:** secretarias, órgãos, prefeito, legislação e contatos.
11. **Rodapé:** identidade legal, endereço, contatos, mapa do sítio, acessibilidade, privacidade, transparência e canais de atendimento.

### 6.1 Primeira dobra

Na primeira dobra de desktop e celular, o cidadão deverá enxergar ou alcançar imediatamente:

- identidade do município;
- busca;
- menu;
- Transparência;
- Ouvidoria ou atendimento;
- acesso a serviços.

Notícias ou campanhas não poderão ocupar sozinhas toda a primeira dobra.

### 6.2 Carrosséis e banners

O padrão recomendado será uma chamada estática ou grade curta. Se um município habilitar carrossel:

- nenhum requisito essencial ou alerta crítico poderá existir somente em um slide;
- deverá haver botão de pausar, anterior e próximo com nomes acessíveis;
- troca automática deverá poder ser interrompida;
- foco, teclado, leitor de tela e gesto simples deverão funcionar;
- o conteúdo não poderá piscar nem provocar deslocamentos bruscos;
- `prefers-reduced-motion` deverá ser respeitado;
- o primeiro slide deverá permanecer compreensível sem JavaScript;
- uma versão própria deverá ser fornecida para celular quando o modo de preenchimento cortar ou alterar o significado; sem essa versão, deverá ser aplicado o fallback de imagem inteira;
- textos relevantes deverão ser preferencialmente HTML; quando já vierem incorporados à arte, deverão possuir equivalente textual em HTML e nome acessível;
- a quantidade inicial será limitada a três itens;
- deverá existir data de expiração por item.

### 6.3 Banner inteligente e adaptação de artes prontas

#### Problema que o componente deverá resolver

Uma arte horizontal com textos incorporados não pode preencher simultaneamente telas largas e estreitas sem que ocorra pelo menos um destes efeitos: corte, distorção, espaço complementar ou redução da legibilidade. A IA implementadora não deverá prometer adaptação perfeita de uma única imagem por recorte automático.

O componente deverá preservar a arte e oferecer decisões seguras ao administrador. O objetivo será adaptar o **espaço do sítio ao conteúdo**, quando a imagem precisar permanecer inteira, ou adaptar o **recorte ao ponto focal**, quando se tratar de fotografia.

#### Tipos apresentados no painel

O painel deverá perguntar “Que tipo de imagem é esta?” e oferecer:

1. **Arte com texto:** banner produzido pela comunicação com título, data, telefone, chamada ou logomarcas dentro da imagem;
2. **Fotografia:** imagem que poderá perder partes das bordas sem alterar a mensagem;
3. **Imagem mista:** fotografia com texto ou elementos gráficos importantes.

O administrador não precisará conhecer `contain`, `cover`, proporções ou breakpoints. A interface traduzirá as decisões para:

- **Mostrar imagem inteira:** não corta nem deforma;
- **Preencher o espaço:** pode cortar bordas e permite escolher o ponto principal;
- **Usar uma imagem própria para este tamanho de tela:** substitui a composição por uma versão adequada.

#### Regras por tipo

Para **arte com texto**:

- “Mostrar imagem inteira” será o padrão;
- a altura acompanhará a proporção da imagem;
- o espaço complementar usará cor sólida escolhida ou sugerida a partir da arte;
- o sistema não poderá esticar a imagem;
- o painel alertará quando texto, data, telefone ou logomarca estiver próximo da borda;
- a versão mobile própria será obrigatória;
- preenchimento com corte somente será permitido depois de pré-visualização e confirmação explícita de que nenhuma área importante foi perdida.

Para **fotografia**:

- “Preencher o espaço” poderá ser o padrão;
- o administrador marcará o ponto focal tocando ou clicando na imagem;
- o recorte será calculado ao redor desse ponto para desktop, tablet e celular;
- o painel mostrará cada resultado antes de salvar.

Para **imagem mista**:

- “Mostrar imagem inteira” será o padrão;
- a área contendo texto ou marca deverá ser marcada como área segura;
- o sistema impedirá recorte que atravesse a área segura;
- a composição mobile deverá reorganizar o conteúdo e não poderá ser apenas um recorte automático da versão desktop.

#### Fluxo administrativo

O fluxo do banner deverá ser:

1. enviar a arte desktop;
2. enviar a arte mobile;
3. visualizar as duas imediatamente no mesmo rascunho;
4. escolher o tipo de imagem;
5. receber sugestão automática de modo de encaixe para cada versão;
6. conferir prévias de desktop, tablet e celular lado a lado;
7. marcar ponto focal ou área segura separadamente quando necessário;
8. escolher cor de fundo complementar;
9. informar título acessível, resumo, ação, link e período de exibição;
10. revisar o rascunho completo;
11. confirmar e publicar as duas versões de maneira atômica junto com a página.

Não haverá moderação separada do banner. Alertas de corte, resolução e acessibilidade serão verificações do próprio rascunho.

#### Previsões obrigatórias

O painel deverá simular pelo menos:

- desktop largo;
- notebook;
- tablet em retrato e paisagem;
- celular com 390 pixels de largura;
- celular com 320 pixels de largura;
- zoom de 200% quando houver conteúdo HTML associado.

A prévia deverá desenhar sobre a imagem:

- limite visível do componente;
- parte que será cortada;
- ponto focal;
- área segura;
- posição de setas, indicadores ou ações do carrossel;
- avisos de texto ou logomarca em região de risco.

#### Duas versões obrigatórias por slide

Cada slide deverá possuir exatamente duas artes de origem:

- imagem desktop obrigatória;
- imagem mobile obrigatória.

Não haverá terceiro upload obrigatório para tablet. O layout utilizará desktop ou mobile conforme o breakpoint definido no tema e mostrará essa escolha na prévia administrativa.

Como orientação inicial para o setor de comunicação, serão fornecidos modelos em:

- desktop: `1920 × 500`, proporção `96:25`, inspirada no comportamento responsivo observado no portal de Augusto Pestana;
- celular: `1080 × 1350`, proporção `4:5`.

O preset de proporções será definido no tema da prefeitura e aplicado igualmente a todos os slides para evitar mudança de altura durante a rotação. O construtor poderá oferecer outros pares previamente aprovados, mas o administrador não poderá informar dimensões ou CSS livremente. Depois que um par for escolhido para o sítio, o painel validará as duas artes contra esse padrão.

O arquivo desktop não será simplesmente reduzido para formar o mobile. A equipe de comunicação deverá reorganizar textos, marcas e elementos gráficos para a composição vertical. O painel disponibilizará templates exportáveis correspondentes às duas versões.

Na versão desktop, os 70% centrais serão tratados como área segura inicial. Os 15% de cada lateral deverão conter apenas decoração que possa ser perdida. Datas, chamadas, telefones, marcas e botões não deverão ocupar essas margens. Cada versão móvel reorganizará os elementos; não será apenas um recorte da arte desktop.

#### Ausência ou falha de uma das versões

Um rascunho com apenas uma arte poderá ser salvo, mas não poderá ser publicado nem agendado. Se o processamento de qualquer versão falhar, a publicação continuará usando a última revisão válida e registrará o erro para correção. O sistema não substituirá silenciosamente a arte mobile pela desktop para contornar uma pendência editorial.

#### Renderização no sítio

A implementação deverá:

- utilizar `picture`, `source`, `srcset` e `sizes` quando houver versões diferentes;
- usar a arte mobile até o breakpoint aprovado e a arte desktop acima dele;
- informar largura e altura ou `aspect-ratio` para evitar deslocamento de layout;
- gerar derivados no tamanho adequado ao dispositivo;
- usar `object-fit: contain` para “Mostrar imagem inteira”;
- usar `object-fit: cover` e `object-position` derivado do ponto focal para “Preencher o espaço”;
- nunca definir simultaneamente largura e altura de forma que deforme a proporção;
- carregar primeiro apenas o banner visível;
- não carregar todas as imagens do carrossel em alta resolução na primeira resposta;
- manter conteúdo e link utilizáveis se o JavaScript falhar;
- posicionar controles fora da área segura sempre que o layout permitir.

#### Acessibilidade e equivalência textual

Uma imagem escrita não será considerada texto acessível. Todo banner deverá possuir:

- título acessível;
- descrição ou equivalente textual quando a arte comunicar informação relevante;
- rótulo claro para a ação;
- destino válido;
- indicação de nova aba quando aplicável;
- ordem de foco e controles de carrossel operáveis por teclado.

Se título, resumo e ação já estiverem visíveis em HTML junto da imagem, o `alt` poderá evitar repetição desnecessária. Se a imagem for o único elemento visual do link, seu nome acessível deverá comunicar a finalidade da ação, e não usar expressões genéricas como “banner” ou “clique aqui”.

#### O que não deverá ser automatizado

O sistema não deverá:

- reescrever automaticamente texto contido na arte;
- mover brasões, logomarcas ou assinaturas por inteligência artificial;
- gerar preenchimento sintético que possa alterar símbolos oficiais;
- afirmar que OCR garante preservação do conteúdo;
- recortar uma arte com texto sem mostrar o resultado;
- usar fundo desfocado como única solução para toda arte;
- aumentar artificialmente arquivo de baixa resolução para simular qualidade inexistente.

#### Aplicação ao problema observado em Amargosa

Para banners panorâmicos semelhantes ao cadastro de agentes culturais observado no portal atual, o padrão deverá ser:

- desktop em modo “Mostrar imagem inteira”;
- altura fluida, sem contêiner fixo que corte a base;
- fundo complementar semelhante à cor dominante da arte;
- logomarcas e textos dentro da área segura;
- controles do carrossel fora das regiões escritas;
- versão mobile própria obrigatória, reorganizada para leitura em tela estreita;
- bloqueio de publicação quando qualquer uma das duas versões estiver ausente ou inválida.

### 6.4 Pop-ups, cookies, chat e recursos flutuantes

- Pop-up promocional automático na entrada será proibido.
- Alertas críticos deverão usar faixa não modal ou página específica.
- O aviso de cookies deverá ser compacto, acessível e proporcional à necessidade real de consentimento.
- O portal deverá evitar cookies não essenciais por padrão.
- Chatbot não poderá abrir automaticamente nem cobrir conteúdo.
- No celular, a interface deverá limitar a presença simultânea de elementos flutuantes.
- Botões flutuantes deverão manter distância dos controles, foco e conteúdo principal.
- Nenhum elemento fixo poderá ocultar o foco do teclado.

## 7. Páginas e componentes fundamentais

### 7.1 Tipos de página

O design system deverá oferecer templates validados para:

- página institucional;
- página de secretaria ou órgão;
- catálogo e detalhe de serviço;
- notícia;
- agenda ou evento;
- publicação oficial;
- lista e detalhe de documento;
- transparência: categoria, conjunto de dados e critério essencial;
- busca e resultados;
- contato e unidade de atendimento;
- perguntas frequentes;
- galeria;
- erro, indisponibilidade e manutenção;
- acessibilidade, privacidade e mapa do sítio.

### 7.2 Estrutura comum das páginas internas

Cada página interna deverá conter, quando aplicável:

- breadcrumb;
- um único `h1` descritivo;
- resumo em linguagem simples;
- responsável pelo conteúdo;
- data de publicação e última atualização real;
- conteúdo com hierarquia correta de títulos;
- documentos e links com nomes explicativos;
- canais de contato;
- conteúdos relacionados úteis;
- URL canônica, estável e compartilhável;
- indicador claro de destino externo;
- opção de informar problema de conteúdo ou acessibilidade.

### 7.3 Página de serviço

Deverá responder, sem exigir conhecimento administrativo:

- o que é;
- quem pode solicitar;
- requisitos e documentos;
- custo ou declaração de gratuidade;
- prazo;
- etapas;
- canal on-line e presencial;
- unidade responsável;
- legislação relacionada;
- como acompanhar;
- o que fazer se o sistema externo estiver indisponível.

### 7.4 Página de transparência

Além da Etapa 1, deverá expor visualmente:

- título e descrição do conjunto;
- período coberto;
- data e hora da última atualização real;
- origem e órgão responsável;
- filtros aplicáveis;
- tabela responsiva e acessível;
- download nos formatos disponíveis;
- série histórica;
- metodologia ou dicionário de dados;
- estado de atualização e eventuais indisponibilidades;
- contato para correção;
- link permanente para evidência.

## 8. Design system para múltiplas prefeituras

### 8.1 Modelo de reutilização

O código-base deverá separar:

- **núcleo protegido:** semântica, acessibilidade, navegação essencial, rotas PNTP, segurança, auditoria e comportamento dos componentes;
- **tema municipal:** marca, cores, tipografia permitida, formas, densidade e variantes homologadas;
- **configuração da instância:** nome, domínio, contatos, redes, órgãos, módulos habilitados e integrações;
- **conteúdo editorial:** serviços, notícias, páginas, documentos e agenda;
- **dados de transparência:** integrações e conjuntos protegidos pelas Etapas 1 e 2.

Uma nova prefeitura deverá ser criada por configuração e dados próprios, não por cópia manual e alteração dispersa de componentes.

### 8.2 Tokens obrigatórios

O tema deverá usar tokens validados, por exemplo:

- cores de marca, superfície, texto, borda, foco, sucesso, alerta e erro;
- famílias tipográficas de uma lista homologada;
- escala de texto;
- espaçamento;
- raios e sombras;
- largura máxima de conteúdo;
- tamanhos de alvos interativos;
- alturas de cabeçalho;
- duração de movimento;
- densidade de cards e listas.

O administrador não editará CSS. O backend converterá escolhas permitidas em configuração validada e variáveis CSS controladas.

### 8.3 Presets iniciais

O sistema poderá oferecer presets, sempre compatíveis com o mesmo núcleo:

- **município essencial:** busca, serviços, transparência e atendimento com poucos módulos;
- **cidade de serviços densos:** catálogo amplo, filtros, públicos e integrações;
- **cidade turística e cultural:** serviços preservados na primeira dobra e módulos locais posteriores;
- **gestão com agenda intensa:** notícias, eventos e publicações, sem retirar prioridades públicas;
- **situação de emergência:** faixa de alerta temporária e central de informações.

Presets são pontos de partida, não templates independentes. Todos deverão compartilhar testes, atualizações e correções.

### 8.4 Variantes de componentes

Poderão existir variantes homologadas para:

- cabeçalho compacto ou amplo;
- busca incorporada ao cabeçalho ou em bloco principal;
- serviços em cards, lista ou grade de ícones com texto;
- notícias em lista, grade ou um destaque com lista;
- rodapé compacto ou institucional;
- densidade confortável ou compacta;
- tema claro e tema de alto contraste.

Cada combinação disponível no painel deverá ter sido testada. O sistema não deverá permitir combinações arbitrárias que nunca passaram por validação.

### 8.5 Construtor visual limitado

O painel deverá apresentar um construtor por blocos para páginas e para a página inicial. Ele dará liberdade editorial dentro de um conjunto pré-selecionado de decisões seguras.

O construtor deverá permitir:

- escolher um template homologado;
- adicionar componentes do catálogo permitido;
- reordenar componentes por arrastar e soltar ou controles de mover;
- escolher uma das variantes aprovadas de cada componente;
- configurar conteúdo, imagem, alinhamento, densidade e quantidade de itens dentro dos limites do bloco;
- reutilizar conteúdo já cadastrado sem duplicação;
- ocultar ou remover apenas módulos opcionais;
- visualizar desktop, tablet e celular em tempo real;
- salvar rascunho, publicar e restaurar versões;
- iniciar a partir de presets adaptados a perfis municipais diferentes.

O construtor trabalhará com regiões estruturais, como cabeçalho, busca, serviços, conteúdo principal, conteúdo complementar e rodapé. O administrador não poderá mover um bloco para região incompatível nem posicioná-lo livremente por coordenadas.

O painel deverá identificar visualmente:

- **bloco protegido:** obrigatório e não removível;
- **bloco restrito:** configurável dentro de limites adicionais;
- **bloco opcional:** adicionável, removível e reordenável;
- **bloqueio de publicação:** falha de PNTP, acessibilidade, segurança ou identidade;
- **aviso editorial:** recomendação de clareza ou desempenho que não comprometa requisito obrigatório.

Liberdade administrativa significa poder escolher entre boas opções previamente testadas. Não significa reconstruir o HTML, escrever CSS ou alterar as regras do portal.

## 9. Personalização administrativa segura

### 9.1 Nível livre dentro de limites

O administrador poderá configurar sem aprovação de outro administrador:

- brasão, logomarca e assinatura institucional;
- nome oficial, slogan e contatos;
- paleta aprovada automaticamente por contraste;
- tipografia da lista homologada;
- variante de cabeçalho e rodapé;
- densidade visual;
- imagem principal e suas versões responsivas;
- ordem dos módulos editoriais opcionais;
- serviços e assuntos em destaque;
- redes sociais;
- módulos locais como turismo, cultura e agenda;
- conteúdo de notícias e campanhas;
- data de início e expiração de destaques.

### 9.2 Nível configurável com restrições

O administrador poderá alterar, com validação adicional e aviso de impacto:

- ordem de itens não essenciais do menu;
- nome público de seções, desde que permaneça compreensível;
- destino de integrações externas em domínios permitidos;
- habilitação de carrossel;
- composição da página inicial;
- ícones e imagens de cards;
- páginas de secretaria e serviço.

Essas mudanças deverão gerar versão, pré-visualização, evento de auditoria e possibilidade de restauração.

### 9.3 Núcleo bloqueado

O painel não poderá permitir:

- ocultar Transparência, e-SIC, Ouvidoria, Diário Oficial ou Carta de Serviços;
- excluir ou alterar slugs canônicos essenciais;
- remover links de salto, landmarks ou foco visível;
- publicar paleta que falhe contraste mínimo;
- editar HTML, JavaScript ou CSS livre;
- instalar plugins ou widgets arbitrários;
- alterar ordem semântica de títulos livremente;
- remover rótulos de formulário ou nomes acessíveis;
- publicar imagem informativa sem alternativa textual;
- usar somente cor ou ícone para comunicar estado;
- desativar pausa de carrossel, redução de movimento ou navegação por teclado;
- cobrir conteúdo com pop-up obrigatório;
- remover data, origem ou responsável de páginas de transparência;
- publicar layout com rolagem horizontal indevida;
- desligar validações, auditoria, versionamento ou rollback.

### 9.4 Fluxo administrativo de design

O painel deverá oferecer um fluxo simples:

1. escolher preset ou tema atual;
2. editar a identidade global por opções pré-selecionadas;
3. abrir o construtor e compor páginas com regiões, blocos e variantes homologados;
4. reorganizar somente componentes opcionais ou restritos nas posições permitidas;
5. visualizar desktop, tablet e celular com conteúdo real;
6. receber alertas automáticos de acessibilidade, PNTP, identidade, links e responsividade;
7. corrigir bloqueios;
8. revisar humanamente o rascunho completo e confirmar o resultado;
9. publicar imediatamente a versão confirmada;
10. acompanhar a versão e restaurar se necessário.

Não haverá dependência de aprovação entre administradores. Operações serão individuais, identificadas e auditadas conforme a Etapa 2.

### 9.5 Verificações automáticas antes da publicação

O backend deverá bloquear a publicação quando houver:

- contraste insuficiente;
- campo ou rótulo obrigatório ausente;
- imagem informativa sem texto alternativo;
- mais de um `h1` ou ausência de `h1` no template;
- link essencial removido ou ocultado;
- URL externa inválida, insegura ou fora da política;
- módulo sem título acessível;
- componente fora da largura ou ordem prevista;
- rolagem horizontal indevida em viewport de 320 pixels CSS;
- foco encoberto por elemento fixo;
- conteúdo essencial somente em carrossel ou modal;
- ausência de versões responsivas de imagem quando necessárias;
- banner deformado ou com área segura cortada;
- arte com texto sem equivalente textual acessível;
- banner clicável sem ação ou destino compreensível;
- campanha com período encerrado ainda programada para exibição;
- modo de preenchimento aplicado a uma arte com texto sem confirmação visual explícita;
- componente ainda marcado como demonstração, teste ou placeholder.

Avisos não bloqueantes poderão tratar qualidade editorial, como título excessivamente longo ou imagem pesada, mas falhas legais, PNTP, segurança e acessibilidade serão bloqueantes.

## 10. Acessibilidade obrigatória

### 10.1 Referenciais

O objetivo técnico será conformidade com **WCAG 2.2 nível AA**, usando o **eMAG 3.1** como referência brasileira para governo eletrônico. A Lei Brasileira de Inclusão determina acessibilidade nos sítios mantidos por órgãos de governo.

A conformidade deverá abranger páginas completas e processos completos, incluindo busca, formulários, downloads, autenticação quando aplicável e integrações sob controle do projeto.

### 10.2 Estrutura e navegação

- documento com `lang="pt-BR"`;
- links de salto funcionais para conteúdo, menu, busca e rodapé;
- landmarks `header`, `nav`, `main` e `footer` usados corretamente;
- um `h1` descritivo por página e hierarquia sem saltos arbitrários;
- ordem do DOM correspondente à ordem visual e de leitura;
- breadcrumb nas páginas internas;
- títulos de página únicos;
- links compreensíveis fora de contexto quando necessário;
- navegação consistente entre páginas;
- teclado completo, sem armadilhas;
- foco visível e nunca encoberto;
- menu móvel com foco contido enquanto aberto e retorno ao acionador ao fechar.

### 10.3 Conteúdo e visual

- contraste mínimo de 4,5:1 para texto comum e 3:1 para texto grande;
- contraste não textual de componentes e estados conforme WCAG;
- texto redimensionável a 200% sem perda;
- conteúdo com reflow a 320 pixels CSS sem rolagem em duas dimensões, exceto componentes que justificadamente a exijam;
- informação não depender somente de cor, posição, forma ou som;
- texto real em HTML no lugar de imagem de texto, salvo marca;
- linguagem simples e explicação de siglas;
- suporte a espaçamento de texto sem corte;
- respeito a preferências de redução de movimento e contraste do sistema quando aplicável.

### 10.4 Interação

- controles com nome, função e estado acessíveis;
- alvos com pelo menos 24 por 24 pixels CSS conforme WCAG 2.2 AA, adotando preferencialmente 44 por 44 no produto;
- alternativa a gestos de arrastar;
- mensagens de estado anunciadas sem mover foco indevidamente;
- formulários com rótulos persistentes, instruções, erros associados e resumo de erros;
- autenticação acessível e compatível com gerenciadores de senha;
- limites de tempo ajustáveis quando existirem;
- nenhum bloqueio baseado apenas em CAPTCHA visual ou auditivo.

### 10.5 Imagens, áudio e vídeo

- imagem informativa deverá exigir texto alternativo no envio;
- imagem decorativa deverá ser marcada como decorativa, com alternativa vazia;
- o painel deverá explicar a diferença em linguagem simples;
- vídeos gravados deverão ter legendas sincronizadas e transcrição;
- áudio essencial deverá possuir alternativa textual;
- audiodescrição será exigida quando a informação visual não estiver presente no áudio;
- reprodução automática com som será proibida;
- controles do player deverão funcionar por teclado;
- miniaturas e imagens não poderão ser o único lugar em que título, data ou ação aparecem.

### 10.6 Widgets não são conformidade

VLibras, Hand Talk, barra de contraste, aumento de fonte e outros recursos poderão complementar a experiência. Eles não corrigem automaticamente:

- HTML semântico incorreto;
- falta de teclado e foco;
- imagem sem alternativa;
- contraste ruim no tema original;
- formulário sem rótulo;
- vídeo sem legenda;
- ordem de leitura incorreta;
- modal que bloqueia conteúdo.

O portal deverá continuar acessível se o widget externo falhar, for bloqueado ou carregar lentamente.

### 10.7 Testes de acessibilidade

Antes da produção, a IA deverá combinar:

- análise automatizada em rotas e variantes;
- navegação somente por teclado;
- leitor de tela em fluxos principais;
- zoom de 200% e 400%;
- viewport de 320 pixels CSS;
- modo de alto contraste e preferências de movimento;
- avaliação manual de texto alternativo, títulos e propósito de links;
- teste com usuários, sempre que houver disponibilidade institucional.

Ferramenta automatizada sozinha não será evidência suficiente de conformidade.

## 11. Responsividade e experiência móvel

### 11.1 Abordagem

O projeto será mobile first. A IA deverá testar, no mínimo, larguras de 320, 360, 390, 768, 1024 e 1440 pixels, além de zoom e reflow.

### 11.2 Regras

- sem rolagem horizontal indevida;
- busca e serviços prioritários antes de notícias;
- cabeçalho compacto sem ocultar destinos essenciais;
- menus com grupos claros, botão de fechar e foco gerenciado;
- cards convertidos em lista quando a grade prejudicar leitura;
- tabelas com solução acessível, cabeçalhos preservados e rolagem localizada quando necessária;
- imagens recortadas por ponto focal configurável ou versão móvel própria;
- nenhuma informação essencial incorporada à arte do banner;
- texto nunca comprimido para caber;
- áreas clicáveis amplas e espaçadas;
- cookies, chat e acessibilidade sem sobreposição;
- telefones, endereços e rotas com ações adequadas ao dispositivo;
- conteúdo essencial disponível em conexão lenta e sem depender de scripts de terceiros.

### 11.3 Lições dos testes móveis das referências

Os testes mostraram que modais de campanha, avisos de cookies e vários botões flutuantes podem consumir a maior parte de uma tela de 390 por 844 pixels. Portanto:

- o modelo não permitirá modal promocional automático;
- avisos legais deverão ser compactos;
- apenas recursos realmente necessários poderão ficar fixos;
- o foco não poderá ficar atrás de banners ou widgets;
- a primeira ação útil não poderá exigir fechar várias camadas.

## 12. Conteúdo, imagens e facilidade editorial

### 12.1 Editor de conteúdo

O administrador deverá criar notícia ou matéria por um fluxo intuitivo com:

- título;
- resumo;
- corpo em blocos autorizados;
- categoria e órgão;
- data;
- imagem de capa opcional;
- galeria opcional;
- vídeo opcional;
- documentos relacionados;
- conteúdo relacionado;
- agendamento e expiração;
- pré-visualização responsiva.

O editor deverá salvar automaticamente a alteração como rascunho e oferecer formatação suficiente sem expor HTML. Colagem de editores externos deverá ser sanitizada e normalizada.

Fotos e vídeos enviados durante a edição deverão aparecer imediatamente no rascunho e na pré-visualização. Não haverá caixa de entrada, quarentena editorial, fila de moderação ou tela de aprovação individual de mídia. A confirmação humana ocorrerá uma única vez sobre a página ou reportagem completa.

Quando o administrador confirmar o rascunho, texto, composição e mídias tecnicamente prontas deverão ser publicados juntos. Uma alteração em conteúdo já publicado não substituirá a versão pública antes dessa confirmação.

### 12.2 Upload de imagens

Em coerência com a Etapa 2, o upload será direto e simples. O processamento automático deverá:

- validar tipo e conteúdo real;
- remover metadados desnecessários;
- corrigir orientação;
- gerar tamanhos responsivos e formato otimizado;
- permitir corte com ponto focal;
- mostrar progresso e resultado em linguagem simples;
- mostrar uma prévia local imediatamente durante o envio e substituí-la pela versão processada sem alterar o bloco do rascunho;
- cadastrar a mídia e vinculá-la ao rascunho assim que o upload terminar;
- mostrar a imagem no rascunho sem exigir aprovação separada;
- solicitar texto alternativo ou marcação decorativa;
- impedir imagem excessivamente pequena para o componente escolhido;
- manter original protegido quando necessário à recuperação;
- rejeitar somente por falha técnica ou de segurança, sem avaliar editorialmente a imagem e sem exigir que o administrador compreenda quarentena técnica.

### 12.3 Vídeos

Fotos e vídeos do portal serão armazenados na infraestrutura própria definida na Etapa 2, em armazenamento de objetos persistente dentro da Stack Docker administrada pelo Portainer. O PostgreSQL manterá somente metadados, vínculos, versões e auditoria, nunca o conteúdo binário dos arquivos.

Para preservar desempenho e operação simples:

- o administrador poderá enviar vídeo diretamente pelo editor, com progresso e mensagem clara de processamento;
- o vídeo será cadastrado no rascunho assim que o upload terminar, sem triagem ou aprovação individual;
- enquanto a versão reproduzível estiver sendo preparada, o rascunho mostrará o estado de processamento no próprio bloco;
- limites de tamanho, duração, resolução e formatos serão configurados pela infraestrutura;
- o original permanecerá privado e a versão pública será gerada automaticamente;
- o sistema produzirá miniatura e formato adequado aos navegadores;
- o componente exigirá título, resumo, legenda/transcrição e imagem de capa quando aplicável;
- o carregamento público será adiado até interação ou proximidade da viewport;
- a entrega pública passará por Nginx e poderá usar cache da Cloudflare;
- incorporação por provedor externo homologado poderá existir como alternativa, mas não será requisito para publicar vídeos próprios;
- falhas de processamento deverão permitir correção ou reenvio sem exigir conhecimento técnico.

## 13. Busca, catálogo e taxonomia

O portal não deverá crescer como uma lista desordenada de links. A IA deverá criar uma taxonomia comum com:

- tipo: serviço, página, notícia, documento, transparência, órgão ou evento;
- assunto: saúde, educação, fazenda, mobilidade, assistência e outros;
- público: cidadão, empreendedor, servidor, turista, imprensa, fornecedor;
- órgão responsável;
- modalidade: on-line, presencial, telefone ou híbrida;
- localização;
- período e estado de atualização.

Uma mesma página poderá pertencer a vários assuntos e públicos sem ser duplicada.

Sinônimos e termos locais deverão ser administráveis. A busca deverá aprender com consultas sem resultado por meio de relatórios agregados, sem registrar dados pessoais desnecessários.

## 14. Identidade municipal sem fragmentar o produto

Cada prefeitura poderá expressar sua identidade por:

- cores e tipografia homologadas;
- brasão, logomarca e fotografia local;
- linguagem editorial;
- módulos locais;
- iconografia e formas dentro do sistema;
- campanhas e serviços prioritários;
- vocabulário regional e sinônimos de busca.

Não deverá haver liberdade para reconstruir cada tela do zero. A consistência é necessária para:

- atualizar segurança e acessibilidade em todas as instâncias;
- reduzir treinamento;
- manter testes reutilizáveis;
- impedir divergência entre páginas;
- facilitar implantação por Docker, Portainer, Nginx e Cloudflare conforme a Etapa 2.

## 15. Métricas e validação de qualidade

O sucesso não será medido somente por aprovação estética. A futura implementação deverá acompanhar:

- taxa de sucesso nas tarefas prioritárias;
- tempo e número de passos para encontrar serviço;
- buscas sem resultado;
- links externos indisponíveis;
- páginas desatualizadas;
- falhas de contraste, semântica e teclado;
- desempenho por dispositivo e conexão;
- downloads e acessos a itens de transparência;
- erros de publicação bloqueados pelo painel;
- uso dos módulos da página inicial;
- conformidade das rotas essenciais da Etapa 1.

Métricas não poderão depender de rastreamento invasivo. A coleta deverá respeitar LGPD, minimização e política de cookies.

## 16. Entregáveis exigidos na fase de design e implementação

Antes de implementar a interface final, a IA deverá produzir:

| Entregável | Conteúdo mínimo |
|---|---|
| Arquitetura de informação | árvore do sítio, taxonomia, menu, busca e caminhos essenciais |
| Inventário de páginas | templates e campos obrigatórios por tipo |
| Fluxos prioritários | transparência, serviço, busca, e-SIC, Ouvidoria e notícia |
| Wireframes responsivos | página inicial e páginas fundamentais em desktop e celular |
| Design tokens | cores, tipografia, espaços, foco, alvos e movimento |
| Catálogo de componentes | estados, variantes, conteúdo permitido e restrições |
| Especificação do construtor | regiões, blocos protegidos/restritos/opcionais, schemas, fluxo de edição, pré-visualização, publicação e rollback |
| Especificação do banner inteligente | classificação, modos de encaixe, versões, área segura, ponto focal, fallback, acessibilidade, agendamento e testes responsivos |
| Matriz de proteção | itens livres, restritos e bloqueados no painel |
| Matriz de acessibilidade | requisito WCAG/eMAG, componente, teste e evidência |
| Presets municipais | configurações reutilizáveis sem duplicação de código |
| Plano de conteúdo | migração, taxonomia, responsáveis, datas e expiração |
| Plano de testes | visual, responsivo, acessível, PNTP e regressão |

Protótipos deverão usar conteúdo representativo de Amargosa e dados anonimizados ou públicos. Não deverão usar credenciais, documentos pessoais ou dados administrativos reais.

## 17. Critérios de aceite

O design estará pronto para implementação somente quando:

- serviços, busca e transparência forem mais proeminentes do que campanhas;
- todos os doze essenciais da Etapa 1 possuírem caminho canônico no projeto de navegação;
- página inicial e páginas internas funcionarem em 320 pixels CSS sem perda indevida;
- todas as variantes publicáveis passarem nos critérios automáticos;
- nenhuma personalização puder remover proteções PNTP ou acessibilidade;
- o construtor permitir composição por blocos sem oferecer posicionamento livre, HTML, CSS ou JavaScript;
- identidade global, regiões protegidas e componentes obrigatórios permanecerem consistentes em todas as páginas;
- banners com texto puderem ser exibidos inteiros sem deformação e com equivalente textual;
- fotografias puderem usar recorte controlado por ponto focal;
- prévias demonstrarem o resultado do banner em desktop, tablet, 390 e 320 pixels antes da publicação;
- cada slide possuir as duas artes obrigatórias e usar a fonte correta em cada breakpoint sem deformação;
- área segura, links, datas, expiração e acessibilidade do banner forem validados pelo backend;
- o fluxo de notícia, imagem e vídeo puder ser executado por usuário não técnico;
- fotos e vídeos enviados aparecerem no rascunho sem triagem ou aprovação individual;
- a confirmação humana do rascunho publicar texto, layout e mídias tecnicamente prontas em uma única operação;
- o mesmo núcleo puder receber ao menos três identidades municipais distintas sem alteração do código de componentes;
- a instância de cada prefeitura permanecer isolada;
- componentes funcionarem por teclado e com leitor de tela;
- modais promocionais automáticos, HTML/CSS/JS livre e plugins arbitrários estiverem tecnicamente impedidos;
- páginas de transparência exibirem contexto, atualização, origem, filtros, download e evidência;
- links externos possuírem contexto, monitoramento e alternativa;
- não existirem placeholders, conteúdo fictício ou marcas de demonstração na configuração de produção.

## 18. Definição de pronto para a IA implementadora

A IA não deverá declarar a Etapa 3 implementada apenas porque criou uma página visualmente agradável. Deverá apresentar:

- mapa de componentes e rotas;
- design tokens e temas de demonstração;
- telas desktop e móveis;
- painel de personalização e construtor por blocos com limites aplicados no backend;
- demonstração de adição, reordenação, configuração, publicação e restauração de componentes;
- demonstração do mesmo slide com suas artes desktop e mobile nos modos permitidos, incluindo a troca correta no breakpoint;
- pré-visualização e versionamento;
- testes automatizados de acessibilidade e regressão visual;
- resultados de testes manuais de teclado, foco, zoom, reflow e leitor de tela;
- rastreabilidade entre Etapas 1, 2 e 3;
- demonstração de que o portal permanece utilizável sem widgets externos;
- demonstração de que o conteúdo essencial não depende de carrossel, modal ou sistema externo sem contexto;
- lista explícita de pendências e integrações ainda não confirmadas.

## 19. Fontes e referências

### PNTP e pesquisa de portais

- Radar da Transparência Pública: <https://radardatransparencia.atricon.org.br/>
- Downloads e base oficial do PNTP: <https://radardatransparencia.atricon.org.br/downloads.html>
- Cartilha PNTP 2026: <https://radardatransparencia.atricon.org.br/pdf/Cartilha-PNTP-2026.pdf>
- Prefeitura de Amargosa: <https://amargosa.ba.gov.br/>
- iPrefeituras Demo: <https://demo.iprefeituras.com.br/>
- Prefeitura de São Paulo: <https://prefeitura.sp.gov.br/>
- Prefeitura de Salvador: <https://salvador.ba.gov.br/>
- Prefeitura de Curitiba: <https://www.curitiba.pr.gov.br/>
- Prefeitura do Recife: <https://www2.recife.pe.gov.br/>
- Prefeitura de Belém: <https://prefeitura.belem.pa.gov.br/>

### Acessibilidade

- WCAG 2.2, W3C: <https://www.w3.org/TR/WCAG22/>
- eMAG 3.1, Governo Digital: <https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/modelo-de-acessibilidade>
- eMAG em HTML: <https://emag.governoeletronico.gov.br/>
- Lei Brasileira de Inclusão, especialmente artigo 63: <https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm>

---

**Resultado esperado:** um portal que combine a orientação por busca e serviços observada nas melhores referências, a flexibilidade modular do conceito iPrefeituras e proteções estruturais próprias. A prefeitura poderá personalizar sua identidade e prioridades sem transformar o sítio em um amontoado de links, quebrar acessibilidade ou comprometer os requisitos de transparência.
