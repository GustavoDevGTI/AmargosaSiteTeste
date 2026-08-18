# Construtor visual com conformidade PNTP

> **Tipo de documento:** contexto autônomo e instrução para outra IA ou equipe de desenvolvimento  
> **Escopo:** construtor visual, design system, personalização municipal, validação PNTP em tempo real, responsividade, banners, publicação e auditoria  
> **Objetivo:** permitir liberdade visual suficiente para diferentes prefeituras sem permitir que o designer quebre acessibilidade, identidade, segurança ou requisitos do PNTP

## 1. Como usar este documento

Ao receber este arquivo como contexto, a IA deverá tratá-lo como uma especificação funcional e técnica. Ela não deverá transformar o painel em um editor irrestrito semelhante a Elementor, Webflow ou edição livre de HTML.

A implementação deverá:

1. usar blocos, regiões, variantes e tokens previamente homologados;
2. validar regras no frontend para resposta imediata e novamente no backend antes de salvar ou publicar;
3. manter um checklist lateral do PNTP atualizado em tempo real;
4. distinguir estimativa técnica de certificação oficial;
5. impedir a publicação de alterações que quebrem requisitos essenciais, acessibilidade, segurança ou identidade mínima;
6. salvar toda mudança como rascunho versionado e auditável;
7. oferecer restauração da última versão pública válida;
8. permitir reutilização do mesmo código-base em diferentes prefeituras, mantendo cada implantação isolada.

Este documento não substitui a matriz oficial vigente do PNTP. O motor de conformidade deverá importar critérios e pesos por ciclo, evitando regras fixas apenas para 2026.

## 2. Contexto do produto

O projeto é um portal institucional municipal reutilizável. O código-base poderá atender outras prefeituras, mas cada município deverá possuir sua própria implantação, banco PostgreSQL, arquivos, domínio, credenciais, auditoria e backups.

Infraestrutura prevista:

- servidor físico;
- Docker;
- Portainer;
- Nginx;
- Cloudflare;
- PostgreSQL;
- armazenamento local de objetos e mídias dentro da infraestrutura do município;
- contêineres separados para site público, painel administrativo, API e processamento assíncrono.

O portal poderá direcionar o cidadão a sistemas especializados ou subsites por links profundos e contextualizados. Não usar iframe como estratégia principal. A página local deverá explicar o destino, a fonte, o período, o responsável e a última verificação do link.

## 3. Princípio do construtor

O construtor deverá oferecer **liberdade orientada**, não liberdade irrestrita.

O designer poderá decidir a aparência e a composição dentro de alternativas seguras. Não poderá alterar as regras fundamentais do produto.

### 3.1 O que poderá ser personalizado livremente

- textos editoriais;
- notícias, eventos, serviços e páginas institucionais;
- imagens, galerias e vídeos;
- ordem de blocos opcionais dentro da mesma região;
- destaques e campanhas;
- agenda e conteúdos locais;
- ícones e imagens de cards dentro da biblioteca permitida;
- ativação e remoção de módulos opcionais.

### 3.2 O que poderá ser personalizado com limites

- paleta municipal, desde que todos os contrastes sejam válidos;
- tipografias pertencentes à lista homologada;
- escala tipográfica dentro de intervalos seguros;
- densidade, espaçamentos e raios dentro dos tokens disponíveis;
- variantes aprovadas de cabeçalho, rodapé, cards, listas e botões;
- quantidade de colunas permitida para cada região e breakpoint;
- alinhamento e proporção previstos pelo componente;
- composição da página inicial por regiões compatíveis;
- banners com as versões desktop e mobile obrigatórias;
- ponto focal de fotografias e modo de encaixe permitido.

### 3.3 Núcleo bloqueado

O painel não poderá permitir:

- remover ou ocultar Transparência, e-SIC, Ouvidoria, Diário Oficial, Carta de Serviços ou busca;
- alterar ou apagar rotas canônicas protegidas;
- inserir HTML, CSS ou JavaScript livre;
- instalar plugins, widgets ou scripts externos arbitrários;
- modificar a semântica interna dos componentes;
- criar posicionamento absoluto, sobreposição ou coordenadas livres;
- reduzir contraste abaixo do limite;
- remover foco visível ou suporte a teclado;
- alterar a ordem de leitura semântica de forma incompatível com a ordem visual;
- remover título, responsável, fonte, período ou atualização de páginas protegidas;
- fazer informação essencial depender exclusivamente de banner, carrossel, modal ou chatbot;
- publicar componente essencial apenas em desktop ou apenas em celular;
- desativar auditoria, versionamento, validação ou restauração;
- editar diretamente a pontuação ou marcar critério como cumprido sem evidência.

## 4. Estrutura visual do painel

O construtor deverá ser organizado em quatro áreas.

### 4.1 Barra superior

Deverá mostrar:

- nome da página e estado do rascunho;
- versão atual;
- salvamento automático;
- desfazer e refazer operações estruturadas;
- seleção de dispositivo para pré-visualização;
- abrir preview completo;
- comparar com a versão publicada;
- validar;
- publicar;
- restaurar versão.

### 4.2 Lateral esquerda: árvore e biblioteca

Deverá conter:

- estrutura hierárquica da página;
- regiões disponíveis;
- blocos já utilizados;
- biblioteca de componentes permitidos;
- busca de componentes;
- identificação visual de bloco protegido, restrito ou opcional.

### 4.3 Área central: canvas responsivo

O canvas deverá:

- usar o mesmo renderizador e os mesmos componentes do site público;
- exibir conteúdo real, não uma representação aproximada;
- aceitar arrastar e soltar somente entre posições compatíveis;
- impedir coordenadas livres e sobreposições;
- mostrar estados de vazio, carregamento e erro;
- permitir selecionar o bloco para edição;
- indicar área segura, limites e problemas diretamente sobre o componente;
- trocar entre desktop, notebook, tablet, celular de 390 px e celular de 320 px;
- permitir teste de zoom de 200% para conteúdo HTML.

### 4.4 Lateral direita: propriedades e checklist PNTP

A lateral direita deverá permanecer disponível durante a edição e conter duas áreas claramente visíveis:

1. propriedades permitidas do bloco selecionado;
2. checklist de conformidade do portal.

O checklist não poderá ficar escondido em uma página distante. O designer deverá perceber imediatamente quando uma decisão visual afetar um critério.

## 5. Checklist PNTP em tempo real

### 5.1 Objetivo

O checklist deverá traduzir a matriz vigente para linguagem operacional. Ele ajudará um designer sem conhecimento jurídico ou contábil a entender o impacto das mudanças.

Deverá mostrar:

- percentual técnico estimado do portal;
- percentual antes e depois da alteração ainda não publicada;
- quantidade total de critérios aplicáveis;
- quantidade atendida, parcial, pendente, não atendida e não aplicável;
- situação dos critérios essenciais;
- critérios afetados pela página ou componente selecionado;
- explicação objetiva do problema;
- ação necessária e setor responsável;
- link para a evidência pública quando existente;
- data da última validação;
- versão da matriz PNTP usada pelo cálculo.

### 5.2 Estados de critério

Cada critério deverá possuir um dos seguintes estados:

- **atendido:** regra e evidência válidas;
- **parcial:** parte dos requisitos foi comprovada;
- **não atendido:** requisito aplicável ausente ou inválido;
- **pendente de evidência:** estrutura existe, mas falta validação ou documento;
- **verificação externa pendente:** depende de sistema, link ou subsite externo;
- **não aplicável:** decisão justificada e registrada segundo a matriz;
- **desatualizado:** já atendeu, mas validade, período ou atualização expirou.

### 5.3 Destaque dos essenciais

Os essenciais deverão aparecer antes dos demais e nunca poderão ser ocultados por filtro.

O painel deverá mostrar uma mensagem inequívoca:

> A porcentagem estimada não torna o portal elegível se algum critério essencial estiver pendente ou reprovado.

Se um essencial for afetado, o painel deverá mostrar:

- identificação e nome do critério;
- causa da perda;
- página, rota ou componente relacionado;
- valor estimado antes e depois;
- bloqueio de publicação quando a alteração causar regressão comprovável.

### 5.4 O que pode ser validado automaticamente

- presença de rotas e atalhos protegidos;
- busca visível e funcional;
- existência de título, breadcrumb, responsável, fonte e atualização;
- contraste;
- hierarquia de títulos;
- texto alternativo ou marcação decorativa;
- ordem de foco e navegação por teclado;
- existência das versões desktop e mobile do banner;
- presença de controles acessíveis no carrossel;
- links quebrados ou redirecionamentos inesperados;
- existência de arquivos, downloads e formatos declarados;
- comportamento responsivo;
- rolagem horizontal indevida;
- componentes obrigatórios ausentes;
- tentativa de remover bloco protegido;
- validade e expiração de conteúdo;
- disponibilidade de páginas e sistemas externos monitorados.

### 5.5 O que não pode ser validado apenas pelo construtor

- veracidade do dado contábil;
- completude de documentos oficiais;
- autenticidade de declaração de não ocorrência;
- correção jurídica de uma norma;
- correspondência entre empenho, contrato e licitação;
- atualidade real de uma base quando o sistema de origem não informa atualização;
- atendimento integral de filtros e exportações de sistema externo sem teste funcional;
- decisão oficial da Atricon ou Tribunal de Contas.

Esses itens deverão aparecer como pendentes de evidência ou validação setorial, nunca como atendidos automaticamente.

### 5.6 Cálculo da porcentagem

O motor deverá:

- usar a classificação, aplicabilidade e pesos da matriz oficial vigente;
- calcular componentes como disponibilidade, atualidade, série histórica, gravação de relatórios e filtros quando aplicáveis;
- armazenar o resultado por critério, não somente uma porcentagem global;
- distinguir valor confirmado de projeção;
- recalcular apenas os critérios afetados pela alteração e depois atualizar o total;
- manter histórico de cálculo por versão publicada;
- impedir edição manual direta do resultado.

A interface deverá usar o rótulo **“estimativa técnica PNTP”**. Nunca mostrar “medalha garantida”, “portal aprovado” ou equivalentes.

## 6. Regiões estruturais do site

A página deverá ser formada por regiões compatíveis, por exemplo:

1. atalhos de salto;
2. barra de serviços públicos;
3. cabeçalho;
4. alerta público;
5. busca principal;
6. serviços prioritários;
7. atalhos protegidos;
8. conteúdo principal;
9. notícias, agenda e campanhas;
10. conteúdo complementar;
11. estrutura municipal;
12. rodapé.

Cada componente deverá declarar em quais regiões pode ser usado. Um bloco de notícia não poderá substituir a busca. Um banner não poderá ocupar a região de transparência. Um card promocional não poderá ser movido para a barra de serviços essenciais.

## 7. Catálogo mínimo de componentes

### 7.1 Componentes protegidos

- cabeçalho institucional;
- busca;
- acesso à Transparência;
- acesso ao e-SIC;
- acesso à Ouvidoria;
- acesso ao Diário Oficial;
- Carta de Serviços;
- breadcrumb;
- título e metadados de página;
- rodapé institucional;
- avisos de indisponibilidade de sistemas;
- bloco de fonte, período, responsável e atualização da transparência.

### 7.2 Componentes restritos

- carrossel;
- banner;
- alerta público;
- grade de serviços;
- card de sistema externo ou subsite;
- tabela responsiva;
- lista de documentos;
- galeria;
- vídeo;
- mapa;
- agenda;
- lista de notícias;
- formulário público.

### 7.3 Componentes opcionais

- turismo;
- cultura;
- economia local;
- programas municipais;
- indicadores locais;
- redes sociais;
- conteúdos editoriais complementares.

Cada componente deverá possuir schema, variantes, limites de conteúdo, regiões compatíveis, regras responsivas, testes de acessibilidade e critérios PNTP relacionados.

## 8. Design system e identidade municipal

### 8.1 Camadas

Separar obrigatoriamente:

- **núcleo protegido:** semântica, acessibilidade, segurança, rotas, regras PNTP e comportamento;
- **tema municipal:** marca, cores, tipografia, densidade, formas e variantes;
- **configuração da instância:** domínio, contatos, órgãos, módulos e integrações;
- **conteúdo:** páginas, notícias, serviços, documentos e mídias;
- **dados de transparência:** evidências, conjuntos de dados, links e integrações protegidas.

### 8.2 Tokens permitidos

- cores primária e secundária;
- cores neutras;
- sucesso, informação, alerta e erro;
- escala tipográfica;
- famílias tipográficas homologadas;
- espaçamentos;
- raio de borda;
- sombras discretas;
- largura máxima;
- densidade;
- foco;
- movimento;
- breakpoints;
- tamanhos mínimos de toque.

O painel poderá sugerir combinações de cores, mas deverá recalcular contraste de todas as variantes antes da publicação.

### 8.3 Presets municipais

O produto deverá oferecer pontos de partida:

- município essencial: busca, serviços e transparência em primeiro plano;
- município institucional: equilíbrio entre serviços, notícias e estrutura administrativa;
- município turístico e cultural: identidade local mais visível sem esconder serviços;
- município de maior porte: busca forte, catálogo de serviços e maior densidade informacional.

Todos os presets usarão os mesmos componentes protegidos e testes.

## 9. Banners e carrossel

### 9.1 Duas artes obrigatórias

Cada banner deverá possuir:

- uma arte para desktop;
- uma arte para mobile.

Não tentar adaptar uma única arte escrita para todas as resoluções. O navegador deverá selecionar a mídia correta pelo breakpoint, sem deformação.

### 9.2 Tipos de imagem

O painel deverá perguntar se a mídia é:

- arte com texto;
- fotografia;
- imagem mista.

Regras:

- arte com texto deverá ser mostrada inteira, usando a versão própria de cada dispositivo;
- fotografia poderá usar `cover` com ponto focal configurável;
- imagem mista deverá usar área segura e bloquear cortes sobre texto, brasão ou logomarca;
- nunca esticar a imagem para preencher o contêiner;
- imagem com texto não substitui título ou descrição acessível em HTML;
- o painel deverá rejeitar arquivo pequeno demais para a variante escolhida.

### 9.3 Preview obrigatório

Antes da publicação, mostrar:

- desktop largo;
- notebook;
- tablet;
- celular de 390 px;
- celular de 320 px.

O administrador deverá visualizar cada arte já aplicada ao componente real.

### 9.4 Regras do carrossel

- limite inicial de três slides;
- pausar, anterior e próximo acessíveis;
- pausa automática ao receber foco ou interação;
- respeito a `prefers-reduced-motion`;
- navegação por teclado;
- data de início e expiração;
- nenhuma informação essencial disponível somente em slide;
- primeiro item compreensível sem depender de JavaScript;
- pop-up promocional automático na entrada é proibido.

## 10. Responsividade e acessibilidade

Meta técnica: WCAG 2.2 AA, usando eMAG como referência nacional aplicável.

O construtor deverá preservar:

- HTML semântico;
- landmarks;
- um `h1` descritivo por página;
- foco visível;
- navegação por teclado;
- contraste;
- redimensionamento de texto;
- reflow em zoom de 200%;
- rótulos e mensagens de erro em formulários;
- cabeçalhos em tabelas;
- equivalência textual de imagens;
- legenda ou transcrição de vídeos quando aplicável;
- conteúdo compreensível sem depender apenas de cor ou movimento.

Um widget de acessibilidade não poderá ser usado como prova única de conformidade.

## 11. Conteúdo, imagens e vídeos

O editor deverá ser compreensível para usuários não técnicos e não deverá expor HTML, CSS, buckets, codecs ou detalhes de infraestrutura.

Fluxo:

1. alteração salva automaticamente como rascunho;
2. upload mostra progresso em linguagem simples;
3. imagem ou vídeo aparece imediatamente no bloco do rascunho;
4. validações e processamento técnico ocorrem em segundo plano;
5. não existe triagem editorial ou aprovação individual da mídia;
6. o administrador revisa a página completa;
7. uma confirmação humana publica texto, composição e mídias tecnicamente prontas em uma única operação;
8. a versão pública anterior permanece ativa até a confirmação.

Para imagens:

- validar tipo, MIME, tamanho e dimensões;
- corrigir orientação;
- gerar versões responsivas;
- permitir ponto focal;
- exigir texto alternativo ou marcação decorativa;
- manter original privado quando necessário.

Para vídeos:

- registrar no rascunho após o upload;
- processar em segundo plano;
- gerar versão reproduzível e miniatura;
- mostrar estado de processamento no próprio bloco;
- exigir título e recursos de acessibilidade aplicáveis;
- impedir publicação enquanto o arquivo não estiver tecnicamente pronto.

## 12. Fluxo de edição e publicação

O fluxo deverá ser individual e não depender de aprovação entre administradores:

1. escolher preset ou página existente;
2. criar automaticamente nova revisão em rascunho;
3. alterar tema e componentes dentro dos limites;
4. reordenar blocos somente em regiões permitidas;
5. conferir previews responsivos;
6. acompanhar o checklist PNTP e acessibilidade;
7. corrigir bloqueios;
8. revisar humanamente o resultado completo;
9. publicar imediatamente após confirmação;
10. monitorar a versão e restaurar quando necessário.

### 12.1 Publicação atômica

A nova versão deverá entrar integralmente ou a versão pública anterior deverá permanecer. Nunca publicar metade de uma alteração.

### 12.2 Bloqueios obrigatórios

Bloquear publicação quando houver:

- regressão de critério essencial causada pela alteração;
- remoção de rota ou componente protegido;
- contraste inválido;
- mídia informativa sem equivalência textual;
- vídeo obrigatório sem recurso de acessibilidade aplicável;
- erro de semântica grave;
- navegação por teclado quebrada;
- sobreposição ou rolagem horizontal indevida;
- banner sem uma das duas artes;
- link essencial quebrado;
- falha técnica ou de segurança;
- tentativa de usar código ou script não autorizado.

### 12.3 Avisos não bloqueantes

Usar aviso quando houver:

- texto excessivamente longo;
- quantidade alta de notícias ou campanhas;
- imagem grande que prejudique desempenho;
- recomendação PNTP ainda dependente de evidência humana;
- melhoria editorial que não configure descumprimento comprovado.

## 13. Auditoria e versionamento

Cada operação relevante deverá registrar:

- identidade do administrador;
- data e hora;
- página e componente;
- valores anteriores e posteriores estruturados;
- critérios PNTP afetados;
- resultado das validações;
- versão criada;
- publicação, restauração ou arquivamento;
- endereço de origem e contexto de sessão conforme política de segurança.

A auditoria deverá ser append-only e não poderá ser alterada pelo mesmo editor que produziu a mudança.

## 14. Modelo de dados conceitual

Entidades mínimas:

- `MunicipalityConfig`;
- `Theme` e `ThemeVersion`;
- `DesignTokenSet`;
- `Page`;
- `PageRevision`;
- `PageRegion`;
- `BlockDefinition`;
- `BlockInstance`;
- `MediaAsset`;
- `PublicationRelease`;
- `ComplianceMatrixVersion`;
- `ComplianceCriterion`;
- `ComplianceRequirement`;
- `ComplianceEvidence`;
- `ValidationResult`;
- `ExternalLinkMonitor`;
- `AuditEvent`.

Páginas, regiões e componentes deverão ser armazenados como dados estruturados validados por schemas. Não armazenar página como HTML livre.

Um `BlockDefinition` deverá declarar:

- identificador e versão;
- categoria;
- regiões compatíveis;
- propriedades editáveis;
- variantes permitidas;
- limites de quantidade e conteúdo;
- comportamento responsivo;
- regras de acessibilidade;
- critérios PNTP relacionados;
- testes necessários.

## 15. Motor de validação

O mesmo pacote de regras deverá ser compartilhado por admin e API, mas o backend será a autoridade final.

Camadas:

1. **schema:** tipos, campos, limites e variantes;
2. **estrutura:** regiões, componentes obrigatórios e rotas;
3. **design:** tokens, contraste, dimensões e responsividade;
4. **acessibilidade:** semântica, teclado, foco, alternativas e movimento;
5. **PNTP:** critérios, aplicabilidade, pesos, evidências e essenciais;
6. **segurança:** sanitização, origens, arquivos e scripts;
7. **operação:** links, atualidade, expiração e disponibilidade;
8. **publicação:** regressão entre rascunho e versão pública.

Cada erro deverá retornar código estável, severidade, mensagem simples, campo ou componente, critério afetado e sugestão de correção.

## 16. Links externos e subsites

O construtor deverá oferecer um componente próprio para sistemas externos e subsites. Ele deverá exigir:

- título compreensível;
- descrição do conteúdo;
- URL profunda no contexto correto da prefeitura;
- identificação da fonte;
- órgão responsável;
- períodos cobertos;
- indicação de abertura em ambiente externo;
- data da última verificação;
- fallback ou orientação quando indisponível.

O monitoramento deverá detectar indisponibilidade, mudança de destino, erro TLS e redirecionamento para página genérica. Um link existente não significa que o critério PNTP foi atendido; o conteúdo de destino precisa ser validado.

## 17. Segurança do construtor

- autenticação forte e MFA;
- domínio administrativo separado e protegido;
- autorização validada na API;
- sessões seguras e revogáveis;
- CSRF, CSP e cabeçalhos apropriados;
- sanitização de todo texto colado;
- uploads validados tecnicamente;
- nenhuma execução de código enviado pelo administrador;
- limites de tamanho, quantidade e frequência;
- logs e alertas para ações sensíveis;
- backups e restauração testados;
- Cloudflare sem cache de páginas administrativas ou respostas privadas;
- PostgreSQL e armazenamento sem exposição direta à internet.

## 18. Entregas esperadas antes da implementação completa

1. wireframe do construtor;
2. mapa de regiões e componentes;
3. catálogo de blocos e variantes;
4. design tokens;
5. três temas municipais demonstrativos;
6. protótipo do checklist PNTP lateral;
7. esquema de cálculo e evidência;
8. matriz de bloqueios e avisos;
9. fluxo de rascunho, preview, publicação e restauração;
10. protótipo do banner desktop/mobile;
11. modelo de dados;
12. contratos de API;
13. plano de testes;
14. prova de que o backend rejeita configuração inválida mesmo quando o frontend é burlado.

## 19. Critérios de aceite

O construtor estará pronto quando:

- um designer conseguir montar identidades diferentes sem alterar código;
- componentes protegidos não puderem ser removidos;
- HTML, CSS e JavaScript livres estiverem tecnicamente impedidos;
- a lateral PNTP atualizar estado e porcentagem estimada após mudanças relevantes;
- essenciais permanecerem sempre destacados;
- o sistema explicar por que uma alteração afeta um critério;
- o cálculo distinguir confirmação, projeção e pendência de evidência;
- desktop, tablet, 390 px e 320 px puderem ser testados com conteúdo real;
- todos os banners possuírem arte desktop e mobile sem deformação;
- imagens e vídeos entrarem diretamente no rascunho sem aprovação isolada;
- a publicação for atômica, auditada e reversível;
- links externos e subsites forem contextualizados e monitorados;
- regressões de PNTP, segurança e acessibilidade forem bloqueadas no backend;
- o mesmo código-base puder usar ao menos três temas municipais distintos;
- cada prefeitura permanecer isolada em infraestrutura, dados, arquivos e credenciais;
- testes automatizados e manuais produzirem evidências reproduzíveis.

## 20. Regra final para a IA

Ao implementar este construtor, não confundir liberdade visual com liberdade técnica. O objetivo não é permitir que cada prefeitura reconstrua o portal, mas permitir que cada uma expresse sua identidade usando um sistema seguro, acessível, auditável e compatível com o PNTP.

O checklist em tempo real é um instrumento de prevenção e orientação. A certificação continuará dependendo da matriz vigente, da existência material dos dados, da validade dos documentos, do funcionamento dos sistemas externos e da avaliação oficial.
