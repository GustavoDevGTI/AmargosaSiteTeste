# 03 - Design, UX e modelo multiprefeitura

> Escopo: arquitetura de informacao, pagina inicial, paginas internas, componentes, design system, acessibilidade, responsividade, conteudo e personalizacao segura.

## Objetivo

O portal deve ser:

- orientado as tarefas reais do cidadao;
- compativel com transparencia e PNTP;
- acessivel desde a estrutura;
- rapido e legivel em celular;
- simples de alimentar por administradores nao tecnicos;
- visualmente adaptavel a diferentes cidades;
- reutilizavel sem compartilhar banco, arquivos, credenciais ou infraestrutura entre prefeituras;
- protegido contra configuracoes que quebrem seguranca, acessibilidade ou requisitos essenciais.

Na primeira arquitetura, cada prefeitura tera implantacao, banco, armazenamento, dominio, credenciais, auditoria e backups isolados. O mesmo codigo-base podera ser implantado com configuracoes diferentes. Nao sera criada agora uma plataforma SaaS multicliente com varios municipios no mesmo banco.

## Design e PNTP

O design ajuda quando:

- torna Transparencia visivel no primeiro nivel;
- reduz cliques e ambiguidades entre portal institucional, transparencia e sistemas externos;
- apresenta busca, filtros, datas, formatos, origem e responsaveis com clareza;
- protege URLs canonicas;
- evita que informacao essencial dependa de banner, carrossel, modal, chatbot ou menu escondido.

O design nao compensa:

- dado inexistente, incompleto ou desatualizado;
- serie historica insuficiente;
- filtro ausente;
- download indisponivel;
- link externo generico ou quebrado;
- conteudo atras de login, CAPTCHA inadequado ou sessao fragil;
- ausencia de declaracao formal de nao ocorrencia.

## Principios de experiencia

1. Servicos e transparencia antes de estrutura administrativa.
2. Busca como caminho principal, nao decorativo.
3. Comunicacao institucional como conteudo secundario em relacao a servicos essenciais.
4. Links externos com contexto, destino claro, recorte de Amargosa e monitoramento.
5. Conteudo real desde os testes de design, evitando layouts validados apenas com texto ideal.
6. Identidade municipal por marca, cores, tipografia, imagens locais e variantes homologadas, nao por layouts totalmente diferentes.
7. Personalizacao deve melhorar reconhecimento local sem reduzir clareza, consistencia ou velocidade.

## Pagina inicial

Ordem logica obrigatoria:

1. links de salto: conteudo, menu, busca e rodape;
2. barra de servico publico: Transparencia, e-SIC/Acesso a Informacao, Ouvidoria, Diario Oficial e acessibilidade;
3. cabecalho: brasao/logomarca, nome oficial, busca e menu;
4. alerta publico opcional com expiracao;
5. busca principal em linguagem simples;
6. servicos prioritarios por tarefa, assunto e publico;
7. atalhos protegidos: Transparencia, Carta de Servicos, e-SIC, Ouvidoria, Diario Oficial e licitacoes;
8. informacao atual: noticias, agenda, avisos e publicacoes oficiais;
9. modulos locais opcionais: turismo, cultura, economia, programas e identidade territorial;
10. estrutura municipal: secretarias, orgaos, prefeito, legislacao e contatos;
11. rodape: identidade legal, endereco, contatos, mapa do sitio, acessibilidade, privacidade, transparencia e canais.

Na primeira dobra de desktop e celular, o cidadao deve enxergar ou acessar imediatamente:

- identidade do municipio;
- busca;
- menu;
- Transparencia;
- Ouvidoria ou atendimento;
- servicos.

Noticias ou campanhas nao podem ocupar sozinhas toda a primeira dobra.

## Carrosseis, banners e alertas

Padrao recomendado: chamada estatica ou grade curta.

Se houver carrossel:

- nenhum requisito essencial ou alerta critico pode existir somente em um slide;
- deve haver pausar, anterior e proximo com nomes acessiveis;
- troca automatica deve poder ser interrompida;
- teclado, foco, leitor de tela e gesto simples devem funcionar;
- `prefers-reduced-motion` deve ser respeitado;
- primeiro slide deve ser compreensivel sem JavaScript;
- limite inicial de tres itens;
- cada item deve possuir data de expiracao quando aplicavel.

Banner inteligente:

- o painel pergunta se a imagem e arte com texto, fotografia ou mista;
- arte com texto usa imagem inteira como padrao e exige versao mobile propria;
- fotografia pode usar preenchimento com ponto focal;
- imagem mista usa area segura e bloqueia corte de texto/marca;
- cada slide exige arte desktop e arte mobile;
- tablet usa a fonte definida pelo breakpoint do tema;
- o painel mostra preview de desktop, notebook, tablet, celular 390 px, celular 320 px e zoom de 200% quando houver conteudo HTML;
- imagem escrita nao substitui texto acessivel;
- o sistema nao deve reescrever texto, mover brasoes/logomarcas por IA, gerar preenchimento sintetico ou prometer adaptacao perfeita de uma unica arte.

Pop-up promocional automatico na entrada e proibido. Alertas criticos devem usar faixa nao modal ou pagina especifica. Cookies, chat e botoes flutuantes nao podem cobrir conteudo, foco ou controles, especialmente em celular.

## Tipos de pagina

O design system deve oferecer templates para:

- pagina institucional;
- secretaria ou orgao;
- servico;
- noticia;
- evento;
- documento;
- publicacao oficial;
- galeria;
- contato;
- transparencia por categoria, conjunto de dados e criterio essencial;
- busca;
- acessibilidade, privacidade e mapa do sitio.

Estrutura comum:

- titulo claro;
- resumo ou descricao;
- data de publicacao e ultima atualizacao real;
- responsavel ou orgao vinculado;
- breadcrumbs;
- conteudo principal em HTML semantico;
- anexos e links com rotulos claros;
- estado, fonte e periodo quando houver dados;
- opcao de informar problema de conteudo ou acessibilidade.

Pagina de servico deve responder: o que e, quem pode usar, requisitos, etapas, prazo, custo, canais, documentos, orgao responsavel e link para solicitar/acessar.

Pagina de transparencia deve expor: criterio, periodo, fonte, atualizacao, responsavel, filtros, download, historico, estado da integracao, link permanente e declaracao de nao ocorrencia quando aplicavel.

## Design system

Separar:

- nucleo protegido: semantica, acessibilidade, navegacao essencial, rotas PNTP, seguranca, auditoria e comportamento dos componentes;
- tema municipal: marca, paleta, tipografia, icones, espacamentos e variantes;
- conteudo municipal: textos, imagens, noticias, servicos e documentos;
- dados de transparencia: integracoes e conjuntos protegidos.

Tokens obrigatorios:

- cores primarias, secundarias, neutras, sucesso, alerta, erro e informacao;
- contraste minimo;
- tipografia e escala;
- espacamentos;
- raio de borda;
- foco;
- movimento;
- densidade;
- largura maxima;
- breakpoints;
- tamanhos minimos de alvo de toque.

Presets iniciais:

- municipio essencial: busca, servicos, transparencia e atendimento com poucos modulos;
- municipio institucional: identidade, noticias, servicos e estrutura administrativa equilibrados;
- municipio turistico/cultural: modulos locais mais visiveis sem prejudicar transparencia;
- municipio grande: busca forte, catalogo robusto e maior densidade informacional.

Presets sao pontos de partida. Todos compartilham os mesmos componentes, testes e correcoes.

## Personalizacao administrativa

Nivel livre dentro de limites:

- textos editoriais;
- imagens;
- noticias;
- servicos;
- ordem de componentes opcionais;
- destaques locais;
- agenda e conteudos complementares.

Nivel configuravel com restricoes:

- cores dentro de contraste valido;
- tipografia homologada;
- densidade;
- variantes de cabecalho, rodape, cards e listas;
- composicao por regioes aprovadas;
- banners dentro das regras de acessibilidade e proporcao.

Nucleo bloqueado:

- rotas PNTP;
- navegacao essencial;
- semantica;
- foco e teclado;
- regras de transparencia;
- auditoria;
- seguranca;
- validacoes de publicacao;
- URLs canonicas.

O painel deve identificar blocos protegidos, restritos, opcionais e avisos editoriais. Mudancas geram versao, preview, evento de auditoria e possibilidade de restauracao.

## Acessibilidade

Meta tecnica: WCAG 2.2 nivel AA, usando eMAG 3.1 como referencia brasileira de governo eletronico.

Regras:

- HTML semantico;
- landmarks e hierarquia de titulos;
- foco visivel;
- navegacao por teclado;
- contraste adequado;
- texto redimensionavel;
- formularios com rotulos e erros claros;
- tabelas com cabecalhos;
- imagens com texto alternativo ou equivalencia textual;
- videos com legenda/transcricao quando aplicavel;
- conteudo sem depender apenas de cor, movimento ou imagem;
- nenhum widget pode ser usado como prova unica de acessibilidade.

Testes minimos:

- teclado;
- leitor de tela;
- zoom 200%;
- contraste;
- mobile;
- formulario;
- carrossel/banner;
- busca;
- paginas de transparencia;
- regressao automatizada com ferramenta de acessibilidade.

## Responsividade

Abordagem mobile-first.

Regras:

- servicos, busca, Transparencia e atendimento visiveis rapidamente em celular;
- menus e filtros operaveis por toque e teclado;
- tabelas com alternativa responsiva sem perder colunas essenciais;
- anexos, botoes e downloads com area de toque adequada;
- cookies, chat e acessibilidade sem sobreposicao;
- todo slide com arte desktop e arte mobile proprias, independentemente do tipo visual;
- conteudo sem deslocamentos bruscos.

## Operacao editorial para usuarios nao tecnicos

O editor de noticia, materia, evento ou pagina devera oferecer campos compreensiveis para titulo, resumo, corpo em blocos autorizados, categoria, orgao, data, capa, galeria, video, documentos relacionados, agendamento e expiracao. Nao exibira HTML, CSS, nomes de buckets, codecs ou detalhes de infraestrutura.

Fluxo obrigatorio:

1. toda alteracao e salva automaticamente como rascunho;
2. imagem ou video enviado aparece imediatamente no bloco do rascunho com progresso em linguagem simples;
3. validacao e processamento tecnico ocorrem em segundo plano, sem fila de moderacao editorial;
4. falha tecnica informa o que o administrador deve corrigir ou reenviar;
5. pre-visualizacao mostra desktop, tablet e celular com o conteudo real;
6. o proprio administrador revisa o conjunto completo;
7. uma confirmacao humana publica texto, layout e midias tecnicamente prontas de forma atomica;
8. a versao publica anterior permanece disponivel ate a confirmacao da nova versao.

Para imagens, o painel solicitara texto alternativo ou marcacao decorativa, mostrara corte e ponto focal e impedira uso de arquivo pequeno demais. Para videos, mostrara envio, processamento, miniatura e estado reproduzivel no proprio bloco, exigindo legenda ou transcricao quando aplicavel.

O comportamento tecnico de arquivos e tarefas seguira `02B-POSTGRES-MIDIAS-E-PROCESSAMENTO.md`. O editor nao apresentara quarentena, aprovacao isolada de midia ou termos tecnicos ao administrador.

## Busca e taxonomia

A busca deve pesquisar:

- paginas;
- servicos;
- noticias;
- documentos;
- secretarias;
- itens de transparencia;
- sinonimos comuns usados pelo cidadao.

O catalogo deve permitir organizar por tarefa, assunto, publico, orgao, prazo, canal, documento exigido e relacao com transparencia. Secretarias continuam disponiveis, mas nao sao o unico caminho de navegacao.

## Metricas e qualidade

Medir sem rastreamento invasivo:

- termos buscados sem resultado;
- servicos mais acessados;
- paginas de transparencia com erro;
- links externos indisponiveis;
- downloads de transparencia;
- erros de publicacao bloqueados pelo painel;
- desempenho, acessibilidade e responsividade;
- tempo ate encontrar servico ou documento.

Coleta deve respeitar LGPD, minimizacao e politica de cookies.

## Entregaveis de design

- arquitetura de informacao;
- fluxos prioritarios: transparencia, servico, busca, e-SIC, Ouvidoria e noticia;
- design tokens;
- componentes e variantes;
- especificacao do construtor;
- especificacao do banner inteligente;
- matriz de acessibilidade;
- prototipos desktop e mobile;
- testes responsivos e de acessibilidade;
- criterios de aceite por componente.

## Criterios de aceite

O design esta pronto quando:

- busca, servicos e transparencia sao mais proeminentes que campanhas;
- a home funciona em desktop e celular sem sobreposicao incoerente;
- nenhuma personalizacao remove protecoes PNTP ou acessibilidade;
- banner possui preview real, versao desktop, versao mobile, area segura e equivalencia textual;
- paginas internas exibem responsavel, data, fonte e contexto;
- paginas de transparencia exibem origem, atualizacao, filtros, download e evidencia;
- links externos possuem contexto, monitoramento e alternativa;
- testes de acessibilidade e regressao visual sao executaveis.
