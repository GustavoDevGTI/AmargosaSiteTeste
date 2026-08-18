# 02 - Arquitetura e backend

> Escopo: decisoes tecnicas, backend, dados, administracao, seguranca, publicacao, arquivos, infraestrutura, implantacao e continuidade.

## Decisao arquitetural

O projeto adotara **monolito modular** em vez de microsservicos. A separacao sera feita por aplicacoes e modulos internos, mantendo desenvolvimento, testes, deploy e operacao mais simples.

Decisoes fixadas ate deliberacao posterior:

- TypeScript como linguagem principal;
- Next.js para sitio publico;
- Next.js para painel administrativo;
- NestJS para API;
- PostgreSQL local no servidor fisico como banco operacional principal;
- REST documentado com OpenAPI;
- repositorio unico com aplicacoes separadas;
- armazenamento de objetos compativel com S3, auto-hospedado no mesmo servidor fisico, para midias, documentos e derivados;
- autenticacao administrativa por OIDC com MFA ou passkeys;
- Docker para todas as aplicacoes implantaveis;
- Portainer como plano de gestao da stack;
- Nginx como proxy reverso de origem;
- Cloudflare como DNS, proxy, TLS de borda, CDN, WAF e mitigacao de DDoS;
- auditoria somente de acrescimo;
- conteudo, arquivos e configuracoes publicadas com versionamento e restauracao;
- proibicao de codigo livre, plugins e templates executaveis no painel;
- protecao estrutural dos criterios essenciais do PNTP.
- uma implantacao municipal por banco, conjunto de volumes, credenciais e Stack; nao havera multitenancy no mesmo banco na primeira versao;
- servidor fisico unico como topologia inicial, reconhecido como ponto unico de falha e compensado por backup externo e procedimento de reconstrucao.

Parametros configuraveis por ambiente ou decisao municipal:

- provedor OIDC;
- software de armazenamento de objetos;
- registro OCI;
- faixas de rede autorizadas;
- quantidade de administradores e dispositivos por identidade;
- duracao de sessao e reautenticacao;
- limites de arquivo, resolucao, paginacao e requisicoes;
- prazos de retencao, backup, RPO e RTO;
- formato e frequencia das integracoes municipais.

Parametro configuravel nao significa ausencia de controle. A aplicacao deve validar valores, oferecer padroes seguros e impedir configuracao incompativel com PNTP, seguranca, acessibilidade ou auditoria.

Os detalhes normativos desta arquitetura estao divididos em:

- `02A-INFRAESTRUTURA-SERVIDOR-E-DEPLOY.md`;
- `02B-POSTGRES-MIDIAS-E-PROCESSAMENTO.md`;
- `02C-SEGURANCA-ADMIN-E-AUDITORIA.md`.

A IA implementadora devera ler os tres anexos antes de criar banco, Stack, autenticacao, uploads, processamento, auditoria ou procedimentos de producao.

## Organizacao do repositorio

Estrutura prevista:

```text
apps/
  site-publico/
  admin/
  api/
packages/
  ui/
  config/
  contracts/
  domain/
infra/
  docker/
  portainer/
  nginx/
  cloudflare/
  backup/
  monitoramento/
docs/
  adr/
  openapi/
  operacao/
  seguranca/
  runbooks/
```

Responsabilidades:

- `site-publico`: renderizacao publica, rotas canonicas, busca, paginas institucionais, transparencia, noticias, servicos e acessibilidade.
- `admin`: operacao editorial, configuracao segura, preview, publicacao, revisoes, alertas e consulta de auditoria autorizada.
- `api`: autenticacao, autorizacao, validacao, dados, arquivos, integracoes, publicacao atomica, auditoria e regras PNTP.
- `packages/ui`: componentes compartilhados validados.
- `packages/contracts`: tipos, schemas e contratos usados por frontend e backend.
- `infra`: artefatos reproduziveis de implantacao, rede, proxy, Cloudflare, backup e recuperacao.

## Limites de confianca

- Publico: sitio, arquivos publicados, APIs publicas de consulta e cache.
- Administrativo: painel, API autenticada, rascunhos, revisoes, uploads e configuracoes.
- Privado: banco, objetos originais, filas/tarefas, backups, segredos e integracoes internas.
- Externo: OIDC, fornecedores de transparencia, Diario Oficial, PNCP, sistemas setoriais, Cloudflare e registro OCI.

Toda entrada vinda de usuario, fornecedor externo, upload, querystring, webhook ou painel deve ser tratada como nao confiavel ate validacao.

## Modulos do backend

### Identidade e acesso

- identidades individuais, sem contas compartilhadas;
- uma funcao editorial administrativa com o mesmo conjunto de recursos para todos os administradores operacionais;
- operacao independente, sem aprovacao cruzada e sem dependencia entre administradores;
- administracao tecnica de infraestrutura separada do painel editorial;
- vinculo com OIDC;
- MFA ou passkeys;
- controle de sessoes;
- reautenticacao para operacoes sensiveis;
- registro de login, falha, troca de permissao, dispositivo e recuperacao.

### Conteudo e design

- paginas, regioes e componentes como dados estruturados;
- rascunho, revisao, pre-visualizacao, publicacao, arquivamento e restauracao;
- validacao de campos, variantes, tokens, regioes e limites;
- bloqueio de HTML, CSS e JavaScript livres;
- protecao de rotas e componentes essenciais.

### Transparencia

- paginas canonicas dos criterios essenciais;
- catalogo de fontes, periodos, responsaveis e estados;
- integracao, importacao ou link monitorado por conjunto de dados;
- teste de disponibilidade, atualidade, historico, detalhe, filtros e download;
- registro de evidencias.

### Arquivos

- uploads por fluxo controlado e autenticado;
- validacao de tipo, tamanho, extensao, MIME, dimensoes e conteudo;
- verificacao antivirus para documentos antes de publicacao;
- armazenamento de bytes em objetos e metadados no PostgreSQL;
- derivados tecnicos para imagens e videos;
- vinculo de arquivo a rascunho, versao e finalidade;
- remocao logica e restauracao quando aplicavel.

### Publicacao

- publicacao atomica: a nova versao entra inteira ou a ultima versao valida permanece;
- invalidacao de cache apos publicacao;
- bloqueio de publicacao quando houver falha legal, PNTP, seguranca ou acessibilidade;
- historico e rollback por conteudo, tema e arquivos vinculados.

### Auditoria

- trilha append-only;
- evento com autor, data/hora, acao, objeto, resultado, origem e valores anteriores/posteriores quando aplicavel;
- separacao entre auditoria administrativa, metricas publicas e eventos tecnicos;
- neutralizacao de conteudo nao confiavel em visualizacao de logs;
- proibicao de editar ou apagar auditoria pelo painel.

## Autenticacao, sessoes e administradores

O IP e o dispositivo sao camadas adicionais, nao substitutos de identidade forte.

Regras minimas:

- painel administrativo em dominio separado ou caminho isolado com protecao propria;
- OIDC com MFA ou passkeys;
- cookies seguros, `HttpOnly`, `SameSite` e HTTPS;
- tokens administrativos fora de `localStorage` e URLs;
- expiracao por inatividade e por tempo absoluto;
- revogacao de sessao;
- reautenticacao antes de publicar conteudo essencial, alterar permissoes, trocar dispositivo, mudar seguranca ou recuperar acesso;
- operacao administrativa sempre atribuivel a pessoa individual.
- o painel editorial nao permitira que um administrador crie, edite, suspenda ou recupere a conta de outro;
- provisionamento, desligamento e recuperacao de contas ocorrerao por procedimento tecnico-administrativo externo ao painel;
- rede municipal autorizada ou VPN com saida por IP/CIDR permitido sera exigida antes da autenticacao;
- dispositivo sera identificado por credencial criptografica, certificado ou passkey, nunca somente por fingerprint invasivo;
- nome completo, matricula, documento, email institucional, cargo e lotacao seguirao o modelo e as protecoes definidos em `02C-SEGURANCA-ADMIN-E-AUDITORIA.md`.

## Construtor visual no backend

O construtor sera representado como dados estruturados:

- identidade global da prefeitura;
- tema e tokens globais;
- preset adotado;
- paginas e versoes;
- regioes homologadas;
- instancias de componentes;
- ordem permitida dentro de regioes;
- configuracao validada de cada instancia;
- vinculos com conteudos e arquivos.

A API deve validar a composicao completa no servidor. Drag-and-drop pode existir na interface, mas gera apenas nova ordem estruturada entre posicoes autorizadas. Nao havera coordenadas livres, sobreposicao arbitraria, largura manual, CSS em linha ou propriedades fora dos schemas.

## Midias, documentos e banner

Fotos e videos entram no sistema sem triagem humana individual: ao terminar o upload, sao registrados no PostgreSQL, vinculados ao rascunho e exibidos na pre-visualizacao. Isso nao dispensa validacoes tecnicas, acessibilidade e revisao humana do rascunho completo.

O processamento pesado sera executado por contêiner `worker` do mesmo codigo-base da API, usando tarefas persistidas no PostgreSQL. Upload, importacao ou conversao nao podera bloquear o processo web nem depender de memoria local do contêiner.

Para banners:

- cada slide possui arte desktop e arte mobile obrigatorias;
- a versao mobile nao e gerada automaticamente a partir da desktop;
- `arte_com_texto`, `fotografia` e `misto` possuem regras de encaixe distintas;
- ponto focal e area segura sao armazenados como valores normalizados;
- o backend bloqueia publicacao se houver corte de area segura, deformacao, falta de equivalente textual, destino invalido, campanha sem expirar quando necessario ou falha de processamento;
- derivados tecnicos podem ser gerados, desde que nao alterem composicao aprovada.

## Modelo de dados minimo

Entidades iniciais:

- usuarios, identidades externas, permissoes e sessoes;
- configuracao_municipal da implantacao unica, tema, tokens e configuracoes;
- paginas, versoes, regioes, componentes e instancias;
- conteudos, noticias, servicos, documentos e midias;
- arquivos, objetos, derivados, hashes e estados de processamento;
- criterios PNTP, paginas canonicas, fontes, responsaveis, verificacoes e evidencias;
- integracoes, execucoes, falhas e sincronizacoes;
- publicacoes, restauracoes e redirecionamentos;
- auditoria_eventos;
- jobs/tarefas de processamento.

Indices devem priorizar busca publica, filtros PNTP, ordenacao por data, chaves canonicas, estado de publicacao e integridade referencial.

O banco nao usara `tenant_id` para misturar municipios. A reutilizacao para outra prefeitura ocorrera pela criacao de outra Stack, outro banco, outros volumes, outros segredos e outro dominio.

## Integracoes de transparencia

Estrategia por fonte:

- API disponivel: integrar, validar e publicar em pagina canonica local.
- Exportacao disponivel: importar em rotina agendada, validar schema e preservar arquivo de evidencia.
- Sem API/exportacao: usar link profundo monitorado, pagina local explicativa e contingencia contratual.
- Sistema historico: preservar acesso, delimitar periodos e unificar indice no portal novo.

Receitas, despesas e empenhos devem ser importados do Siafic sempre que tecnicamente e contratualmente possivel. Fornecedor externo pode permanecer como fonte adicional, mas nao deve ser o unico meio de atender criterio essencial.

## Seguranca

Controles minimos:

- validacao e autorizacao no backend;
- CSRF mitigado onde aplicavel;
- CORS restrito;
- rate limit em login, API e rotas abusaveis;
- sanitizacao de HTML quando houver entrada rica autorizada;
- headers de seguranca;
- protecao contra upload malicioso;
- dependencia auditada e atualizada;
- logs sem segredos ou corpos sensiveis;
- backups criptografados;
- menor privilegio para banco, objetos, Cloudflare, registro OCI e tarefas.

Testes minimos:

- autorizacao administrativa e separacao entre operacao editorial e infraestrutura;
- tentativas de acesso cruzado;
- upload malicioso;
- CSRF e sessao;
- validacao de schema;
- publicacao atomica;
- auditoria append-only;
- acessibilidade;
- smoke test das paginas PNTP.

## Infraestrutura e deploy

Ambientes:

- desenvolvimento;
- homologacao;
- producao.

Producao nao deve ser usada para testes, treinamento ou validacao destrutiva.

Pipeline minimo:

1. instalacao reproduzivel;
2. formatacao, lint e tipos;
3. testes unitarios e de integracao;
4. verificacao de dependencias;
5. build das aplicacoes;
6. validacao de migracoes;
7. build de imagens Docker multi-stage;
8. analise de vulnerabilidades;
9. identificacao por versao e commit, sem depender de `latest`;
10. envio ao registro OCI;
11. deploy em homologacao;
12. migracoes e smoke tests;
13. promocao das mesmas imagens para producao;
14. verificacao pos-implantacao e rollback quando necessario.

Stack Portainer:

- declara site publico, admin, API, worker, Nginx, PostgreSQL local, armazenamento de objetos local, redes privadas, volumes, health checks, reinicio, limites e variaveis;
- nao contem segredos reais;
- usa imagens previamente testadas;
- nao publica banco nem objetos diretamente no host;
- preserva volumes persistentes;
- permite rollback por tag imutavel ou digest.

Nginx:

- roteia publico, admin e API;
- aceita IP real apenas de origem confiavel da Cloudflare;
- aplica limites por rota;
- bloqueia `.env`, backups, diretorios internos e metadados de repositorio;
- nao faz cache de respostas administrativas ou sensiveis;
- mantem TLS de origem compativel com `Full (strict)`.

Cloudflare:

- DNS com proxy quando aplicavel;
- SSL/TLS `Full (strict)`;
- HTTP redirecionado para HTTPS;
- WAF, DDoS, rate limiting e cache publico controlado;
- bypass para admin, autenticacao e respostas privadas;
- dominio administrativo separado e protegido por Access, VPN, lista de rede ou Zero Trust;
- origem protegida contra acesso direto por firewall com faixas oficiais ou Tunnel.

## Backup e continuidade

Obrigatorio antes de producao:

- backup automatico do banco;
- copia criptografada fora do servidor fisico principal;
- criptografia;
- teste periodico de restauracao;
- backup de arquivos e metadados;
- inventario de volumes;
- RPO e RTO definidos;
- procedimento de restauracao completa;
- rollback testado;
- ultima publicacao valida sempre disponivel.
- teste de reconstrucao do host usando repositorio, imagens imutaveis, segredos recuperados e backups;

## Decisoes pendentes

Devem ser confirmadas formalmente:

- provedor OIDC;
- software de armazenamento S3;
- registro OCI;
- uso de Cloudflare Tunnel ou firewall por faixas;
- limites iniciais de upload;
- politicas de retencao e backup;
- dimensionamento do servidor;
- integrações reais disponiveis para Siafic, Diario Oficial, PNCP e demais sistemas.

Nao estao pendentes: o uso de servidor fisico, Docker, Portainer, Nginx, Cloudflare, PostgreSQL local, armazenamento local de objetos e isolamento completo por prefeitura. Essas decisoes sao obrigatorias nesta versao.
