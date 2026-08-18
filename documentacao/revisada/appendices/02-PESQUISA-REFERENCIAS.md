# Apendice 02 - Pesquisa resumida de referencias

> Origem: condensado da pesquisa descrita na Etapa 3 original. Este apendice orienta decisoes de produto; nao substitui matriz PNTP, arquitetura ou testes.

Referencias visuais servem para extrair padroes e problemas. A IA nao devera copiar codigo, identidade, textos, componentes proprietarios ou afirmar conformidade PNTP de um portal somente por sua aparencia ou selo historico.

## Metodo

A pesquisa foi realizada em 11/08/2026, observando pagina inicial, estrutura exposta ao navegador, prioridades de navegacao e comportamento movel.

Portais analisados:

- Amargosa/BA;
- demonstracao iPrefeituras;
- Sao Paulo/SP;
- Salvador/BA;
- Curitiba/PR;
- Recife/PE;
- Belem/PA.

Os resultados PNTP citados vinham da avaliacao 2025 e servem como contexto historico, nao como certificado permanente nem avaliacao visual.

| Portal | PNTP 2025 | Papel na pesquisa |
|---|---:|---|
| Amargosa/BA | Basico, 48,23% | Diagnostico do problema atual |
| iPrefeituras Demo | Nao se aplica | Referencia de produto configuravel |
| Sao Paulo/SP | Intermediario, 70,10% | Contraste entre aparencia moderna e nota |
| Salvador/BA | Prata, 77,46% | Capital certificada Prata |
| Curitiba/PR | Ouro, 94,16% | Referencia orientada a busca |
| Recife/PE | Ouro, 92,90% | Referencia com servicos por publico |
| Belem/PA | Prata, 76,91% | Busca e servicos em destaque |

## Interpretacao

- Certificacao PNTP nao e premio de design.
- Portal visualmente moderno pode nao alcancar medalha.
- Portal certificado pode ter problemas de semantica, banners ou experiencia movel.
- Referencias Ouro e Prata devem orientar prioridades, mas nao substituir matriz oficial.
- Antes de afirmar conformidade, conferir matriz, cartilha e resultado vigentes.

## Licoes por referencia

### Amargosa

Aspectos uteis:

- presenca de Transparencia, Diario Oficial, noticias, servicos e acessibilidade;
- conteudo municipal real;
- base para entender os problemas concretos.

Problemas a nao repetir:

- excesso de banners e campanhas competindo com servicos;
- varios elementos flutuantes simultaneos;
- dependencia de sistemas externos sem contexto suficiente;
- risco de corte de texto em banners;
- transparencia fragil como coordenacao de multiplos fornecedores.

Resposta do novo modelo:

- pagina canonica local por criterio;
- busca e servicos antes de campanhas;
- banner com regras de desktop/mobile;
- transparencia protegida no primeiro nivel.

### iPrefeituras Demo

Aspectos uteis:

- ideia de produto configuravel;
- composicao por modulos;
- autonomia editorial;
- possibilidade de reutilizacao para municipios diferentes.

Riscos:

- visual ou padrao tecnico antigo;
- personalizacao sem protecoes pode fragmentar o produto;
- construtor livre demais pode quebrar acessibilidade, semantica e PNTP.

Resposta do novo modelo:

- reutilizar a ideia de nucleo configuravel;
- limitar escolhas a componentes, regioes, variantes e tokens testados;
- manter banco, arquivos, credenciais, auditoria e backups isolados por prefeitura.

### Sao Paulo

Aspectos uteis:

- escala de informacao;
- atalhos para Acesso a Informacao, Transparencia, Ouvidoria, 156 e Diario Oficial;
- organizacao por tarefas e publicos.

Alertas:

- aparencia moderna nao garante nota alta;
- semantica e transparencia precisam de teste independente;
- comunicacao promocional pode competir com servicos.

Licao:

Usar organizacao por tarefas e publicos, mas manter PNTP e acessibilidade como criterios verificaveis.

### Salvador

Aspectos uteis:

- Transparencia, dados, Acesso a Informacao e Ouvidoria visiveis;
- portal certificado Prata;
- forte presenca institucional.

Alertas:

- modais, banners e rotulos genericos podem prejudicar experiencia;
- certificacao nao elimina problemas de UX.

Licao:

Preservar acessos institucionais uteis sem repetir excesso de interrupcoes.

### Curitiba

Aspectos uteis:

- abordagem busca primeiro;
- Transparencia, Ouvidoria, 156 e Acesso a Informacao no cabecalho;
- alta nota PNTP em 2025;
- servicos com prioridade.

Alertas:

- barras de acessibilidade nao substituem conformidade estrutural;
- elementos fixos podem obstruir conteudo movel.

Licao:

Fazer da busca o centro da experiencia, com semantica e teste de acessibilidade.

### Recife

Aspectos uteis:

- servicos por publico;
- Transparencia e Ouvidoria no cabecalho;
- organizacao de informacao ampla.

Alertas:

- o cidadao nao deve ser obrigado a descobrir seu perfil administrativo antes de encontrar servico;
- segmentacao por publico deve complementar, nao substituir busca por tarefa.

Licao:

Combinar busca por tarefa, catalogo de servicos e segmentacao por publico.

### Belem

Aspectos uteis:

- Carta de Servicos, Ouvidoria e Transparencia no primeiro nivel;
- busca e servicos em destaque;
- equilibrio entre identidade local e acesso publico.

Alertas:

- banner nao deve virar protagonista;
- textos em imagens e semantica precisam de controle.

Licao:

E a referencia mais proxima do equilibrio desejado, desde que o novo modelo reduza o protagonismo do banner e corrija acessibilidade.

## Padroes aproveitaveis

- Transparencia no primeiro nivel.
- Busca visivel e orientada a linguagem do cidadao.
- Catalogo de servicos por tarefa.
- Atalhos protegidos para Ouvidoria, e-SIC, Diario Oficial, Carta de Servicos e licitacoes.
- Conteudo institucional atual sem empurrar servicos para baixo.
- Design system reutilizavel com identidade municipal controlada.
- Experiencia movel validada de verdade.

## Padroes a evitar

- Pop-up promocional automatico.
- Carrossel como unico acesso a informacao importante.
- Banner com texto sem equivalente HTML.
- Imagem horizontal recortada automaticamente em celular.
- Menus por orgao como unico caminho.
- Botao generico do tipo "clique aqui".
- Ferramenta de acessibilidade usada como atalho para nao cumprir semantica.
- Links externos sem contexto, monitoramento ou recorte municipal.
- Personalizacao visual que permita remover rotas essenciais.
