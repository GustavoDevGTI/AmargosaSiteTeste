# Etapa 2 - Arquitetura, linguagens e backend do portal de Amargosa

> **Tipo de documento:** especificação técnica normativa e contexto de implementação  
> **Leitor principal:** IA ou equipe responsável por criar, revisar, testar, implantar e manter o sistema  
> **Pré-requisito:** leitura integral da Etapa 1 antes de qualquer decisão ou alteração de código  
> **Escopo:** arquitetura, linguagens, backend, administração, segurança, dados, implantação e continuidade  
> **Regra principal:** toda proteção crítica deverá ser aplicada no backend ou na infraestrutura, nunca apenas na interface

## Como a IA deverá usar este documento

Este arquivo deverá orientar diretamente a construção do esqueleto técnico e da implementação do novo portal. Ele não é uma lista de possibilidades: as decisões marcadas como obrigatórias formam o contrato arquitetural do projeto até que uma decisão posterior, expressa e registrada, determine sua alteração.

Ao receber este documento como contexto, a IA deverá:

1. ler primeiro a [Etapa 1](./ETAPA-1-REQUISITOS-ESSENCIAIS-PNTP-2026.md) e transformar seus requisitos em regras técnicas rastreáveis;
2. ler integralmente esta Etapa 2 antes de criar pastas, dependências, banco, endpoints, componentes administrativos ou infraestrutura;
3. preservar as decisões arquiteturais fixadas neste documento, sem trocar tecnologias ou simplificar controles silenciosamente;
4. distinguir decisões confirmadas, parâmetros configuráveis e escolhas ainda pendentes;
5. aplicar regras de autorização, integridade, PNTP, arquivos e auditoria no backend, mesmo quando a interface também faça validação;
6. produzir código e contratos tipados, migrações versionadas, testes, documentação operacional e estratégia de recuperação;
7. não usar produção para experimentos, treinamento, conteúdo fictício ou validação destrutiva;
8. não inserir credenciais, documentos pessoais, endereços de rede reais ou segredos em código, fixtures, logs ou documentação versionada;
9. verificar nas fontes oficiais as versões suportadas e recomendações de segurança antes de iniciar a implementação;
10. registrar bloqueios e decisões ainda não fornecidas, sem inventar integrações, dados municipais ou configurações de infraestrutura.

### Ordem de autoridade e tratamento de conflitos

A IA deverá observar a seguinte ordem:

1. legislação vigente, matriz e cartilha oficial mais recente do PNTP;
2. decisões expressas posteriores da Prefeitura que não reduzam obrigações legais;
3. requisitos funcionais e de transparência definidos na Etapa 1;
4. decisões técnicas obrigatórias desta Etapa 2;
5. referências visuais e funcionais da Etapa 3;
6. checklist de maximização da nota da Etapa 4.

Uma decisão visual, uma limitação de fornecedor ou uma preferência de biblioteca não poderá enfraquecer requisito da Etapa 1. Se uma mudança técnica for necessária, a IA deverá explicar o motivo, registrar uma decisão arquitetural e demonstrar que a alternativa mantém ou aumenta segurança, auditabilidade, desempenho, acessibilidade e conformidade.

### Significado normativo das expressões

- **deverá / obrigatório / será adotado:** requisito vinculante;
- **não poderá / proibido:** comportamento que deverá ser tecnicamente impedido;
- **preferência / preferencialmente:** padrão recomendado, substituível somente com justificativa e resultado equivalente ou superior;
- **poderá:** capacidade permitida, não necessariamente obrigatória;
- **será confirmado / permanece em aberto:** parâmetro que não deverá ser inventado pela IA;
- **exemplo:** referência ilustrativa que não limita outras implementações compatíveis.

### Decisões fixadas e parâmetros configuráveis

Salvo decisão posterior expressa, são decisões arquiteturais fixadas:

- monólito modular;
- TypeScript como linguagem principal;
- Next.js para o sítio público e o painel administrativo;
- NestJS para a API;
- PostgreSQL como banco operacional principal;
- REST documentado com OpenAPI;
- aplicações separadas para público, administração e API;
- armazenamento de objetos compatível com S3, executado na infraestrutura própria da prefeitura e integrado à Stack Docker, para imagens, vídeos, documentos e derivados;
- autenticação administrativa por OIDC com MFA ou passkeys;
- contêineres Docker para todas as aplicações implantáveis;
- Portainer como plano de gestão e implantação da stack no servidor;
- Nginx como proxy reverso da origem;
- Cloudflare como camada pública de DNS, proxy, TLS de borda, CDN, WAF e mitigação de DDoS;
- auditoria somente de acréscimo;
- conteúdo e arquivos versionados e restauráveis;
- proibição de edição livre de código e de plugins no painel;
- proteção estrutural dos critérios essenciais do PNTP;
- backups e administração da infraestrutura fora do painel editorial.

São parâmetros configuráveis, a serem definidos por ambiente ou decisão municipal:

- quantidade de administradores;
- provedor OIDC, software de armazenamento de objetos, VPN ou acesso Zero Trust;
- registro OCI utilizado para armazenar as imagens Docker;
- faixas de rede autorizadas;
- quantidade de dispositivos por identidade;
- duração de sessão e janelas de reautenticação;
- limites de arquivo, resolução, paginação e requisições;
- prazos de retenção, rotinas de backup e objetivos de recuperação;
- formato e frequência das integrações com sistemas municipais.

Parâmetro configurável não significa ausência de controle. A aplicação deverá validar valores, fornecer padrões seguros e impedir configuração incompatível com este documento.

### Entregáveis técnicos exigidos da IA

Antes ou junto do esqueleto inicial, a IA deverá produzir e manter:

| Entregável | Conteúdo mínimo |
|---|---|
| Matriz de rastreabilidade | Requisito da Etapa 1, módulo, rota, entidade, teste e evidência |
| Diagrama de contexto e fluxo de dados | Público, admin, API, banco, arquivos, identidade e integrações |
| Limites de confiança | Elementos públicos, administrativos, privados e externos |
| Modelo de ameaças | Ativos, agentes, superfícies, riscos e controles correspondentes |
| Contrato da API | OpenAPI, autenticação, autorização, erros, paginação e idempotência |
| Modelo de dados | Entidades, relações, restrições, índices, retenção e migrações |
| Plano de arquivos | Tipos aceitos, validação, armazenamento, publicação e recuperação |
| Plano de auditoria | Eventos, esquema, proteção, consulta, retenção e cópia externa |
| Plano de testes | Unidade, integração, autorização, segurança, acessibilidade e PNTP |
| Plano operacional | Implantação, observabilidade, backup, restauração, rollback e incidentes |

Durante a implementação, a IA deverá manter esses artefatos coerentes com o código. Divergência entre documentação, migração, contrato OpenAPI e comportamento real deverá ser tratada como defeito.

## 1. Finalidade deste documento

Este documento registra as decisões técnicas que orientarão a construção do novo sítio institucional e do Portal da Transparência da Prefeitura Municipal de Amargosa.

O objetivo é obter uma arquitetura que seja, simultaneamente:

- segura;
- auditável;
- ágil para desenvolver;
- simples para operar;
- rápida para o cidadão;
- responsiva em celulares;
- acessível;
- preparada para os requisitos do PNTP/Atricon;
- fácil de evoluir sem depender de plugins ou edição livre de código.

Os requisitos essenciais de transparência que esta arquitetura deverá preservar estão definidos em [ETAPA-1-REQUISITOS-ESSENCIAIS-PNTP-2026.md](./ETAPA-1-REQUISITOS-ESSENCIAIS-PNTP-2026.md).

Esta etapa ainda não define a identidade visual final. A pesquisa de sítios institucionais de referência será realizada na Etapa 3.

## 2. Decisão arquitetural principal

Será adotado um **monólito modular**, e não uma arquitetura de microsserviços.

O projeto terá três aplicações independentes dentro do mesmo repositório:

1. sítio público;
2. painel administrativo;
3. API/backend.

As aplicações poderão ser implantadas separadamente, mas compartilharão contratos, tipos e regras de negócio mantidos no mesmo projeto.

Essa abordagem permite isolamento de segurança sem introduzir a complexidade operacional de dezenas de serviços.

## 3. Pilha tecnológica escolhida

| Camada | Tecnologia | Finalidade |
|---|---|---|
| Linguagem principal | TypeScript | Tipagem compartilhada entre frontend e backend |
| Runtime | Node.js em versão LTS suportada | Execução do frontend e da API |
| Sítio público | Next.js e React | Páginas institucionais, serviços e transparência |
| Painel administrativo | Next.js e React | Gestão de conteúdo, design e dados |
| Backend | NestJS | API modular, validação, permissões e regras de negócio |
| API | REST com OpenAPI | Integração simples, documentada e testável |
| Banco de dados | PostgreSQL | Conteúdo, histórico, auditoria e transparência |
| Arquivos e mídia | Armazenamento de objetos compatível com S3, auto-hospedado na Stack | Imagens, vídeos, PDFs, anexos, derivados e exportações, em volumes persistentes próprios |
| Identidade | Provedor OIDC com MFA/passkeys | Autenticação individual dos administradores autorizados |
| Cache e borda pública | Cloudflare | DNS, proxy, CDN, TLS, WAF, rate limiting e mitigação de DDoS |
| Proxy reverso da origem | Nginx | Roteamento por domínio, limites, cabeçalhos e conexão com as aplicações |
| Empacotamento | Contêineres Docker | Ambientes reproduzíveis e implantação previsível |
| Gestão da implantação | Portainer Stacks | Aplicação do Compose, atualização, acompanhamento e rollback operacional |
| Registro de imagens | Registro OCI a definir | Armazenamento de imagens imutáveis produzidas pelo pipeline |

### 3.1 Orientação sobre versões

- Utilizar somente uma versão LTS ativa ou em manutenção do Node.js.
- Fixar as versões no repositório e no contêiner.
- Manter arquivo de dependências bloqueado por hash.
- Atualizar correções de segurança de forma contínua.
- Não atualizar versões principais diretamente em produção.
- Testar atualizações em homologação antes da implantação.

### 3.2 Tecnologias que não serão introduzidas inicialmente

Não serão utilizadas na primeira versão:

- Kubernetes;
- Kafka;
- arquitetura de microsserviços;
- Elasticsearch;
- múltiplos bancos de dados operacionais;
- event sourcing;
- blockchain para auditoria;
- editor livre de código;
- sistema de plugins;
- Redis, salvo se medições futuras demonstrarem necessidade real.

A pesquisa textual inicial poderá utilizar os recursos do PostgreSQL. Processamentos assíncronos simples poderão usar uma tabela de tarefas no próprio banco.

## 4. Organização prevista do repositório

```text
AmargosaSite/
  apps/
    site-publico/
    admin/
    api/

  packages/
    ui/
    contratos/
    regras-pntp/
    configuracao/

  infra/
    docker/
      site-publico.Dockerfile
      admin.Dockerfile
      api.Dockerfile
    portainer/
      stack.yml
      env.example
    nginx/
      nginx.conf
      conf.d/
    cloudflare/
      README.md
      regras-recomendadas.md
    scripts/

  docs/
    arquitetura/
    operacao/
      implantar-com-portainer.md
      rollback.md
      backup-e-restauracao.md
    seguranca/

  tests/
    unidade/
    integracao/
    seguranca/
    acessibilidade/
```

### 4.1 Responsabilidade de cada aplicação

#### `site-publico`

- páginas institucionais;
- notícias;
- serviços;
- agenda;
- documentos públicos;
- Portal da Transparência;
- consultas de receitas, despesas e empenhos;
- acessibilidade;
- busca pública;
- páginas protegidas pelas regras PNTP.

O sítio público não terá acesso administrativo nem credenciais com permissão de escrita no banco.

#### `admin`

- gestão de conteúdo;
- composição de páginas;
- configuração visual autorizada;
- publicação de documentos;
- gestão de dados de transparência;
- visualização das auditorias;
- restauração de versões;
- consulta da própria conta e dos dispositivos vinculados;
- solicitação de alteração de rede, dispositivo ou recuperação pelo procedimento de segurança definido.

O painel será publicado em endereço administrativo separado do sítio público e protegido antes mesmo da tela de login.

#### `api`

- validação de todas as requisições;
- autenticação e autorização;
- acesso ao PostgreSQL;
- aplicação das regras PNTP;
- processamento de arquivos;
- publicação;
- versionamento;
- auditoria;
- integrações com sistemas municipais.

Nenhuma regra crítica ficará exclusivamente no navegador.

## 5. Visão simplificada da infraestrutura

```text
Cidadão
  -> Cloudflare (DNS/CDN/WAF/DDoS/TLS)
  -> Nginx no servidor de origem
  -> contêiner do sítio público
  -> API pública somente para leitura

Administrador
  -> Cloudflare e controle de rede, VPN ou Zero Trust
  -> dispositivo cadastrado
  -> passkey/MFA
  -> Nginx no servidor de origem
  -> contêiner do painel administrativo
  -> API administrativa

API
  -> PostgreSQL privado
  -> armazenamento de objetos auto-hospedado para imagens, vídeos e documentos
  -> auditoria
  -> tarefas de publicação e importação

Entrega pública de mídia
  -> Cloudflare
  -> Nginx
  -> somente derivados tecnicamente prontos vinculados a conteúdo publicado

Portainer
  -> Docker Engine do servidor
  -> Stack versionada do projeto
  -> imagens imutáveis do registro OCI
  -> redes, volumes, health checks e atualização dos contêineres
```

### 5.1 Separação de exposição

- O banco não possuirá acesso público pela internet.
- O painel administrativo não compartilhará a mesma origem do sítio público.
- A API distinguirá rotas públicas de leitura e rotas administrativas.
- As rotas administrativas deverão passar por autenticação, rede autorizada, dispositivo cadastrado e controle de sessão.
- O sítio público nunca utilizará uma credencial administrativa.
- O armazenamento não permitirá execução de arquivos enviados por usuários.
- Somente o Nginx publicará portas HTTP/HTTPS das aplicações no servidor.
- PostgreSQL, tarefas internas e serviços auxiliares não publicarão portas no host.
- O IP de origem não poderá aceitar tráfego público que contorne a Cloudflare, salvo canal administrativo explicitamente protegido.
- O Portainer não fará parte do caminho das requisições do cidadão e não será exposto como serviço público do portal.

### 5.2 Redes Docker previstas

A stack deverá separar, no mínimo, as seguintes redes lógicas:

```text
edge
  Nginx <-> site público, admin e API

aplicacao
  site público e admin <-> API

dados
  API e tarefas autorizadas <-> PostgreSQL

midia
  API e tarefas autorizadas <-> armazenamento de objetos
  Nginx <-> somente área pública de derivados vinculados a conteúdo publicado
```

Regras:

- o Nginx não acessará diretamente o PostgreSQL;
- o sítio público e o painel não acessarão diretamente o banco;
- o PostgreSQL permanecerá somente na rede de dados;
- o armazenamento de objetos permanecerá somente na rede de mídia e não publicará console ou API diretamente na internet;
- o Nginx terá acesso de leitura somente ao caminho ou bucket público necessário à entrega de derivados vinculados a conteúdo publicado;
- serviços entrarão apenas nas redes estritamente necessárias;
- nomes internos e portas de contêiner não serão tratados como controles de autenticação;
- nenhum contêiner da aplicação receberá acesso ao socket Docker;
- redes e volumes possuirão nomes estáveis por ambiente para evitar colisão entre homologação e produção.

### 5.3 Plano de gestão

O Portainer será considerado plano de gestão da infraestrutura, separado do painel administrativo do portal.

- Seu acesso ocorrerá por domínio ou rede de gestão restrita, com MFA e política própria.
- Administradores editoriais do portal não receberão automaticamente acesso ao Portainer.
- Credenciais do Portainer não serão armazenadas no banco do portal.
- Toda atualização de stack utilizará arquivo versionado no repositório e imagem identificada por versão ou digest.
- Preferencialmente, a Stack será vinculada ao repositório Git e ao caminho `infra/portainer/stack.yml`, mantendo o Git como fonte de verdade.
- Alterações manuais realizadas somente pela interface deverão ser reproduzidas posteriormente no repositório; não poderá existir configuração crítica conhecida apenas pelo Portainer.
- A instalação e atualização do próprio Portainer serão administradas separadamente da stack da aplicação.

## 6. Estrutura do backend

O NestJS será organizado em seis módulos de negócio principais.

### 6.1 Módulo de identidade e acesso

Responsabilidades:

- integração com o provedor OIDC;
- cadastro local do perfil funcional;
- sessões administrativas;
- redes autorizadas;
- dispositivos cadastrados;
- passkeys e fatores adicionais mantidos pelo provedor de identidade;
- suspensão e revogação de acesso;
- reautenticação para operações críticas.

### 6.2 Módulo de conteúdo e design

Responsabilidades:

- páginas;
- notícias;
- serviços;
- agenda;
- menus;
- blocos de conteúdo;
- banners inteligentes, versões responsivas e configurações por breakpoint;
- temas;
- tokens visuais;
- presets municipais;
- regiões de layout;
- instâncias e ordem de componentes;
- esquemas de configuração permitidos por componente;
- versões;
- pré-visualização.

### 6.3 Módulo de transparência

Responsabilidades:

- critérios PNTP;
- receitas;
- despesas;
- empenhos;
- RGF;
- RREO;
- PPA;
- LDO;
- LOA;
- filtros;
- exportações;
- evidências;
- monitoramento de atualização e histórico.

### 6.4 Módulo de arquivos

Responsabilidades:

- imagens;
- vídeos;
- PDFs;
- anexos;
- documentos oficiais;
- validação de tipo e tamanho;
- recodificação de imagens;
- extração de metadados técnicos e geração de derivados de vídeo;
- miniaturas, versões responsivas e arquivos preparados para entrega pública;
- antivírus para documentos;
- metadados;
- versões;
- publicação no armazenamento público.

### 6.5 Módulo de publicação

Responsabilidades:

- rascunhos;
- validações automáticas;
- pré-visualização;
- publicação;
- geração de versão;
- invalidação de cache;
- restauração;
- lixeira;
- tarefas de importação.

### 6.6 Módulo de auditoria

Responsabilidades:

- eventos administrativos;
- eventos de autenticação;
- alterações de segurança;
- versões anteriores e posteriores;
- consultas e exportações dos logs;
- retenção;
- cópia para backup externo.

### 6.7 Regras invariantes de implementação

Independentemente da biblioteca escolhida para acesso ao banco, a IA deverá implementar o backend conforme estas regras:

- controladores receberão e devolverão dados, mas regras de negócio permanecerão em serviços ou casos de uso testáveis;
- cada módulo será responsável por suas próprias regras e não acessará tabelas de outro módulo de forma informal;
- toda entrada será validada no limite da API por esquema explícito;
- autorização será verificada no servidor em toda operação administrativa;
- operações que alterem estado utilizarão `POST`, `PUT`, `PATCH` ou `DELETE`, nunca `GET`;
- nenhuma credencial, token, caminho interno ou dado pessoal será enviado em parâmetros de URL;
- alteração principal, criação de versão e evento de auditoria deverão ser atômicos quando fizerem parte da mesma operação;
- operações repetíveis, como importações e publicação após reenvio, deverão possuir idempotência;
- erros públicos utilizarão formato consistente e não revelarão pilha, consulta SQL, segredo ou estrutura interna;
- cada requisição administrativa e tarefa assíncrona possuirá identificador de correlação;
- datas serão armazenadas de forma inequívoca e convertidas para o fuso oficial apenas na apresentação;
- regras críticas possuirão testes unitários e testes de integração da persistência real;
- nenhum estado essencial dependerá apenas do cache, do navegador ou de validação visual.

## 7. Modelo dos administradores

A quantidade de administradores será definida pela necessidade operacional da Prefeitura e poderá mudar sem alteração da arquitetura. O sistema não fixará esse número no código, no esquema do banco ou nas regras de negócio.

### 7.1 Princípios

- Todos os administradores operacionais terão o mesmo conjunto de funções.
- Cada administrador trabalhará de forma independente.
- Não haverá aprovação cruzada.
- Um administrador não dependerá da interação com outro administrador.
- Contas compartilhadas serão proibidas.
- Cada ação deverá ser atribuída a uma identidade individual.
- A autonomia será compensada por controles automáticos, versionamento e auditoria.
- Um administrador não poderá cadastrar, editar, suspender, excluir, redefinir credenciais ou alterar as condições de acesso de outro.
- A quantidade de contas ativas será inventariada e revisada, mas não será usada como mecanismo de segurança ou critério do PNTP.

### 7.2 Funções disponíveis para os administradores operacionais

Todos poderão:

- criar e editar conteúdo;
- publicar conteúdo;
- alterar menus;
- organizar páginas;
- alterar o design dentro das opções permitidas;
- publicar documentos;
- administrar informações de transparência;
- consultar auditoria;
- restaurar versões;
- gerenciar arquivos;
- visualizar alertas PNTP;
- consultar os próprios dispositivos e condições de acesso;
- solicitar alterações de acesso pelo procedimento administrativo externo ao painel editorial.

### 7.3 Cadastro funcional

O perfil local do administrador deverá conter:

```text
administrador
- id
- nome_completo
- matricula_funcional
- documento_criptografado
- documento_hash
- email_institucional
- cargo
- secretaria
- telefone_institucional
- status
- criado_em
- ativado_em
- desativado_em
- ultimo_acesso_em
```

Regras:

- O documento completo ficará criptografado.
- O painel exibirá somente uma versão mascarada.
- Um hash determinístico será usado apenas para impedir duplicidade.
- O documento não será utilizado como senha.
- O documento completo não será gravado nos logs.
- Não será armazenada imagem digitalizada do documento, salvo obrigação formal posterior.
- A coleta deverá ser limitada ao necessário para identificação e responsabilização funcional.

### 7.4 Criação e substituição das contas

Como os administradores não interagem entre si, o painel não permitirá que um administrador cadastre outro.

As contas iniciais e novas contas autorizadas serão provisionadas no provedor de identidade por responsável técnico formalmente designado. Substituições, suspensões e desligamentos ocorrerão por procedimento administrativo externo ao painel editorial, com conferência da identidade, autorização formal e registro da solicitação.

Não haverá conta administrativa genérica, compartilhada ou de uso cotidiano para suporte técnico. Eventual acesso emergencial de infraestrutura deverá permanecer fora do painel editorial, protegido, monitorado, com finalidade restrita e procedimento formal de uso.

## 8. Controle de rede, IP e dispositivo

### 8.1 IP como camada adicional

O endereço IP não será usado como identidade única. Ele funcionará como barreira anterior ao login.

Serão aceitos dois modelos:

#### Rede da Prefeitura

- IP público fixo fornecido pelo provedor;
- painel acessível somente pela rede cadastrada;
- suporte a IPv4 e IPv6;
- regras registradas em formato CIDR.

#### Acesso remoto

- conexão obrigatória por VPN;
- saída da VPN por IP fixo autorizado;
- dispositivo previamente cadastrado;
- MFA mantido mesmo após a conexão à VPN.

Não serão cadastrados endereços locais como `192.168.x.x` ou `10.x.x.x` como prova de origem externa.

### 8.2 Modelo de redes autorizadas

```text
rede_autorizada
- id
- descricao
- endereco_cidr
- tipo
- ativa
- valida_de
- valida_ate
- criada_em
- alterada_em
```

### 8.3 Dispositivos autorizados

Cada administrador poderá utilizar um conjunto pequeno de dispositivos cadastrados.

```text
dispositivo
- id
- administrador_id
- nome
- identificador
- chave_publica_ou_certificado
- status
- cadastrado_em
- ultimo_acesso_em
- revogado_em
```

O sistema não deverá depender de fingerprint invasivo do navegador. A identificação será feita por certificado, credencial criptográfica ou mecanismo equivalente administrado.

## 9. Autenticação e sessões

### 9.1 Camadas de entrada

O fluxo administrativo será:

```text
rede autorizada ou VPN
  -> dispositivo cadastrado
  -> identidade individual
  -> passkey/MFA
  -> sessão administrativa
```

### 9.2 Requisitos

- MFA obrigatório para todos os administradores;
- preferência por passkey/WebAuthn ou chave física;
- duas credenciais de recuperação por administrador;
- proibição de compartilhamento de credenciais;
- bloqueio e alerta após tentativas anormais;
- proteção contra força bruta e credential stuffing;
- revogação imediata de sessão e dispositivos;
- recuperação de acesso por procedimento formal;
- reautenticação para ações sensíveis.

### 9.3 Sessões

- Cookie de sessão `HttpOnly`.
- Cookie com `Secure`.
- Política `SameSite` adequada ao fluxo de identidade.
- Tokens administrativos não serão salvos no armazenamento local do navegador.
- Encerramento após aproximadamente 20 minutos de inatividade.
- Limite máximo compatível com uma jornada de trabalho.
- Possibilidade de encerramento remoto.
- Registro do início, renovação, revogação e término da sessão.
- Restrição de sessões simultâneas conforme política municipal.

### 9.4 Reautenticação obrigatória

Será exigida nova autenticação para:

- alteração do design global;
- alteração do menu principal;
- restauração ampla do sítio;
- remoção de documentos oficiais;
- alteração de rede autorizada;
- troca de dispositivo;
- alteração de identidade ou recuperação de acesso;
- publicação ou remoção de conteúdo essencial PNTP;
- mudança de configurações de segurança.

Depois da reautenticação, o administrador poderá concluir a operação sozinho.

## 10. Gestão visual sem edição livre de código

O painel deverá oferecer um **construtor visual limitado**, capaz de dar autonomia real a cada prefeitura sem permitir execução de código arbitrário, quebra da identidade municipal, violação de acessibilidade ou remoção de obrigações do PNTP.

O construtor não será um editor de posicionamento livre por pixels. Ele trabalhará com páginas, regiões, linhas, colunas homologadas, componentes, variantes e tokens definidos pelo design system da Etapa 3. O administrador poderá compor o sítio por escolhas pré-selecionadas e reordenar blocos somente dentro das regiões permitidas.

### 10.1 Componentes autorizados

Exemplos:

- cabeçalho;
- banner;
- chamada de serviço;
- card de notícia;
- agenda;
- lista de documentos;
- galeria;
- contatos;
- perguntas frequentes;
- tabela de dados;
- destaque de transparência;
- rodapé.

Cada componente terá campos e opções previamente validados.

Cada tipo de componente deverá possuir um esquema versionado contendo:

- campos permitidos e obrigatórios;
- tipos e limites de valores;
- variantes visuais disponíveis;
- regiões em que poderá ser utilizado;
- quantidade máxima por página ou região;
- regras de conteúdo, mídia e acessibilidade;
- comportamento responsivo;
- dependências e incompatibilidades com outros componentes;
- indicação de ser opcional, restrito ou protegido.

### 10.2 Componente de banner inteligente

O catálogo do construtor deverá possuir um componente de banner responsivo. Seu objetivo será receber artes prontas do setor de comunicação e apresentar cada uma sem distorcer, cortar texto ou prejudicar a leitura em telas menores.

#### Classificação do conteúdo visual

Cada banner deverá ser classificado no painel como:

- `arte_com_texto`: campanha com título, datas, telefones, logomarcas ou chamadas incorporadas à imagem;
- `fotografia`: imagem sem texto relevante, adequada a recorte por ponto focal;
- `misto`: fotografia com elementos gráficos ou textos cuja preservação seja necessária.

O administrador fará a escolha em linguagem comum. Uma análise automática poderá sugerir a categoria e alertar sobre texto próximo das bordas, mas não alterará a classificação ou a arte silenciosamente.

#### Modos de encaixe permitidos

O componente deverá oferecer, por breakpoint:

- `inteiro`: equivalente a `contain` ou imagem fluida com altura automática, sem qualquer corte;
- `preencher`: equivalente a `cover`, com recorte controlado por ponto focal;
- `versao_especifica`: utilização de arquivo preparado para desktop, tablet ou celular.

Regras do backend:

- `arte_com_texto` usará `inteiro` como padrão e não poderá receber `preencher` sem pré-visualização e confirmação explícita;
- `fotografia` poderá usar `preencher` e exigirá ponto focal;
- `misto` usará `inteiro` por padrão;
- nenhuma opção poderá esticar a imagem alterando sua proporção;
- cada slide terá obrigatoriamente duas artes de origem: uma para desktop e outra para mobile;
- a versão mobile será uma composição própria e nunca um recorte gerado automaticamente da arte desktop;
- o modo escolhido para uma versão não será presumido para a outra;
- tablet utilizará uma das duas fontes conforme o breakpoint definido pelo tema, sem exigir um terceiro upload;
- a API não permitirá publicar, agendar ou reativar um banner se qualquer uma das duas artes estiver ausente ou inválida.

#### Configuração estruturada

O esquema do componente deverá possuir, no mínimo:

```text
banner
- id
- versao
- status
- classificacao
- imagem_desktop_id
- imagem_mobile_id
- modo_desktop
- modo_mobile
- ponto_focal_desktop_x
- ponto_focal_desktop_y
- ponto_focal_mobile_x
- ponto_focal_mobile_y
- area_segura_x
- area_segura_y
- area_segura_largura
- area_segura_altura
- cor_fundo
- titulo_acessivel
- texto_alternativo
- imagem_decorativa
- resumo_textual
- rotulo_acao
- url_acao
- abre_nova_aba
- inicio_exibicao
- fim_exibicao
- criado_por
- criado_em
- atualizado_em
```

Pontos focais e áreas seguras serão armazenados como valores normalizados entre 0 e 1, independentes da resolução original. A cor de fundo deverá ser token ou valor validado, nunca CSS livre.

#### Fluxo de upload e pré-visualização

Após o upload, a API deverá:

1. apresentar duas áreas de envio claramente identificadas: “Arte para desktop” e “Arte para celular”;
2. registrar os dois arquivos e vinculá-los ao mesmo slide em rascunho;
3. detectar, em cada arquivo, largura, altura, proporção, orientação, tipo e tamanho;
4. gerar derivados responsivos de cada origem sem alterar a composição da arte;
5. apresentar prévias de desktop, tablet e celular, indicando qual fonte será usada em cada caso;
6. permitir ajuste independente de ponto focal e área segura nas duas versões;
7. alertar sobre corte de área marcada como importante;
8. exigir equivalente textual e ação acessível quando houver texto incorporado;
9. salvar arquivos e configuração como uma única versão atômica do rascunho;
10. publicar as duas artes simultaneamente junto com a página após confirmação humana.

Não haverá aprovação individual da imagem. As prévias fazem parte da revisão humana do rascunho completo já definida neste documento.

#### Validações de publicação

A API deverá bloquear publicação quando:

- a imagem desktop ou a imagem mobile estiver ausente;
- qualquer uma das versões não corresponder ao preset de proporção e resolução ativo;
- uma arte com texto estiver configurada de forma que a área segura seja cortada;
- a imagem for deformada;
- um banner clicável não possuir rótulo ou destino válido;
- texto relevante da imagem não possuir equivalente textual;
- campanha com prazo conhecido não possuir data de encerramento;
- nenhuma configuração produzir resultado legível no celular;
- banner essencial depender somente da imagem ou do carrossel;
- arquivo ou derivado ainda estiver em falha técnica.

O sistema não deverá gerar a versão móvel a partir da versão desktop, nem reescrever automaticamente textos, brasões ou logomarcas por inteligência artificial. O setor de comunicação deverá fornecer as duas composições. Compressão e geração de derivados técnicos serão permitidas, desde que não alterem conteúdo, enquadramento aprovado ou proporção.

### 10.3 Tokens de design

O administrador poderá alterar:

- cores dentro de faixas acessíveis;
- tipografia autorizada;
- tamanhos de texto;
- espaçamento;
- bordas;
- variações de cabeçalho e rodapé;
- densidade dos componentes;
- imagens e destaques.

As escolhas serão convertidas em variáveis CSS controladas pelo sistema.

### 10.4 Estrutura técnica do construtor

O backend deverá representar o layout como dados estruturados, nunca como HTML ou CSS gravado pelo administrador. O modelo deverá separar:

- identidade global da prefeitura;
- tema e tokens globais;
- preset adotado;
- páginas e suas versões;
- regiões homologadas de cada template;
- instâncias de componentes;
- ordem dos componentes dentro de cada região;
- configuração validada de cada instância;
- vínculos com conteúdos e arquivos;
- estado de rascunho, pré-visualização, publicação e arquivamento.

A API deverá validar a composição completa no servidor. Validação apenas no navegador não será suficiente. A publicação deverá ser atômica: ou toda a nova composição válida entra em vigor, ou a última versão pública permanece disponível.

O arrastar e soltar poderá existir como facilidade de interface, mas produzirá apenas uma nova ordem estruturada entre posições autorizadas. Não haverá coordenadas livres, sobreposição arbitrária, largura informada pelo usuário, estilos em linha ou propriedades CSS não previstas.

### 10.5 Identidade municipal e reutilização

Cada implantação possuirá configuração própria de marca, conteúdo, integrações e mídia. O mesmo código-base e o mesmo catálogo de componentes serão reutilizados, mas bancos, objetos, credenciais, domínios, auditoria e backups permanecerão isolados por prefeitura.

A identidade será preservada por um perfil global composto de logomarca, brasão, paleta validada, tipografia homologada, iconografia, escala de espaços e variantes de cabeçalho e rodapé. Páginas individuais não poderão criar temas incompatíveis com esse perfil. Alterações globais deverão ser pré-visualizadas em uma amostra de páginas antes da publicação.

### 10.6 Ações proibidas no painel

Os administradores não poderão:

- inserir JavaScript;
- inserir HTML não sanitizado;
- escrever CSS livre;
- instalar plugins;
- enviar templates executáveis;
- alterar código do backend;
- alterar o esquema do banco;
- modificar variáveis de ambiente;
- desativar auditoria;
- desativar controles PNTP;
- publicar arquivos executáveis;
- excluir, renomear ou ocultar rotas canônicas essenciais;
- remover a entrada protegida do Portal da Transparência da navegação;
- apontar item essencial para URL externa não validada;
- publicar componente identificado como teste, demonstração ou placeholder no ambiente de produção;
- criar componente novo pelo painel fora do catálogo homologado;
- posicionar elementos livremente por coordenadas ou sobrepor conteúdo;
- salvar propriedades visuais fora dos tokens e variantes permitidos;
- alterar o núcleo protegido de navegação, semântica e acessibilidade;
- aplicar tema independente por página que fragmente a identidade municipal.

## 11. Conteúdo, versões e publicação

### 11.1 Estados do conteúdo

```text
rascunho
  -> validações automáticas concluídas
  -> confirmação humana
  -> publicado
  -> arquivado
```

Toda criação ou alteração será salva primeiro como rascunho e aparecerá imediatamente na pré-visualização administrativa. A revisão humana ocorrerá sobre o conteúdo completo — texto, fotos, vídeos, documentos e composição — e não como aprovação separada de cada arquivo.

Não haverá aprovação obrigatória por outro administrador. O próprio administrador poderá revisar o rascunho, confirmar que o resultado está correto e publicar. Se o conteúdo já possuir uma versão pública, ela permanecerá no sítio até a confirmação da nova versão.

Após a confirmação humana, a publicação será atômica e deverá aparecer no sítio público imediatamente após a invalidação do cache, sem nova fila editorial. Se alguma validação técnica bloqueante ainda estiver em andamento ou tiver falhado, o painel deverá explicar o impedimento sem criar uma etapa de triagem humana de mídia.

### 11.2 Validações automáticas

Antes de publicar, a API deverá verificar:

- campos obrigatórios;
- links inválidos;
- contraste mínimo quando houver alteração visual;
- texto alternativo de imagens;
- estrutura válida de componentes;
- anexos obrigatórios;
- regras PNTP aplicáveis;
- URLs protegidas;
- tipos de arquivo;
- presença de título e período de referência;
- data real de atualização quando exigida;
- unicidade e formato seguro da URL;
- ausência de slug reservado ou duplicado;
- destino, protocolo HTTPS e disponibilidade inicial de links externos;
- identificação explícita de rascunhos, demonstrações e placeholders;
- vínculo entre arquivo, versão do conteúdo e finalidade da publicação.

### 11.3 Versionamento

Toda publicação deverá produzir:

- identificador de versão;
- conteúdo completo da versão;
- autor;
- data e hora;
- motivo ou descrição;
- hash do conteúdo;
- vínculo com os arquivos utilizados;
- evento de auditoria.

### 11.4 Restauração

- Restaurações criam uma nova versão.
- A versão anterior não é apagada.
- A restauração exige reautenticação.
- A restauração é auditada.
- O cache público é atualizado após a restauração.

### 11.5 Ausência de exclusão definitiva

- Conteúdo será arquivado, não apagado.
- Arquivos removidos irão para lixeira lógica.
- A lixeira deverá manter dados por período inicial de 90 dias.
- Documentos oficiais e evidências PNTP poderão possuir retenção superior.
- Exclusão física ocorrerá apenas por procedimento técnico e política de retenção.
- Backups não poderão ser excluídos pelo painel.

## 12. Upload de imagens, vídeos e documentos

### 12.1 Objetivo

O processamento de arquivos deverá ser seguro, mas simples para o administrador. Fotos e vídeos não passarão por triagem, moderação ou aprovação humana individual. Assim que o upload terminar, o arquivo será cadastrado no PostgreSQL, vinculado ao rascunho e exibido na pré-visualização.

Verificações de segurança, integridade e geração de derivados ocorrerão automaticamente em segundo plano. Elas não formarão uma fila editorial e não exigirão uma tela de quarentena. Um arquivo tecnicamente inseguro, corrompido ou incompatível poderá ser rejeitado pelo sistema; essa rejeição técnica não será tratada como avaliação do conteúdo da foto ou do vídeo.

### 12.2 Estados

```text
enviando
  -> registrado_no_rascunho
  -> processando_tecnicamente
  -> pronto_para_previsualizacao

ou

enviando
  -> registrado_no_rascunho
  -> falha_tecnica
```

Não existirá estado editorial `aprovado` para uma foto ou vídeo isolado. O estado público da mídia será consequência do estado do conteúdo ao qual ela pertence:

```text
midia_pronta + conteudo_em_rascunho
  -> visível somente na pré-visualização autenticada

midia_pronta + conteudo_confirmado
  -> publicada junto com a página ou reportagem
```

### 12.3 Imagens

Na primeira versão:

- aceitar JPEG, PNG e WebP;
- rejeitar SVG enviado pelo painel;
- limitar tamanho em bytes;
- limitar largura, altura e quantidade total de pixels;
- conferir a assinatura real do arquivo;
- não confiar apenas no nome ou `Content-Type` informado pelo navegador;
- recodificar a imagem;
- remover EXIF e outros metadados desnecessários;
- gerar tamanhos responsivos;
- gerar formato otimizado para publicação;
- registrar e vincular imediatamente a imagem ao rascunho;
- exibir a prévia assim que houver uma versão segura disponível;
- não servir diretamente o arquivo original enviado;
- usar nome interno aleatório.

### 12.4 Vídeos

O painel deverá aceitar upload direto de vídeos dentro de limites configurados, exibindo progresso e estado de processamento sem expor detalhes técnicos ao administrador.

O backend deverá:

- aceitar somente formatos de entrada homologados;
- conferir assinatura e tipo real do arquivo;
- aplicar limites de tamanho, duração, resolução e taxa de bits;
- transmitir o upload ao armazenamento sem carregar o arquivo inteiro na memória da API;
- manter o original em área privada enquanto o processamento estiver em andamento;
- extrair duração, resolução, codecs e demais metadados técnicos necessários;
- gerar miniatura e versão de entrega compatível com navegadores;
- produzir streaming adaptativo somente quando o volume e os requisitos justificarem;
- exigir legenda, transcrição e demais recursos de acessibilidade previstos na Etapa 3;
- registrar e vincular o vídeo ao rascunho assim que o upload terminar;
- exibir no rascunho o progresso até que a versão reproduzível esteja pronta;
- publicar os derivados tecnicamente prontos junto com o conteúdo confirmado;
- registrar falhas e permitir reprocessamento idempotente;
- impedir execução, listagem pública do armazenamento e acesso ao original privado.

O processamento poderá ser executado por um processo de tarefas separado usando o mesmo código-base do backend e a tabela de tarefas no PostgreSQL. Isso não transformará a aplicação em microserviços independentes. O trabalho pesado não deverá bloquear requisições do painel ou do sítio público.

### 12.5 PDFs e documentos

- aceitar somente extensões necessárias ao Município;
- conferir assinatura e tipo real;
- aplicar limite de tamanho;
- usar nome interno aleatório;
- manter o arquivo fora da área executável;
- executar verificação antivírus antes da publicação;
- registrar hash, autor e data;
- preservar a versão oficial;
- impedir macros e conteúdo executável quando não forem necessários;
- não enviar documentos públicos a serviços externos de análise sem avaliação de privacidade.

### 12.6 Armazenamento próprio da Stack

Imagens, vídeos, documentos e derivados serão armazenados na infraestrutura do projeto, em serviço de objetos compatível com S3 executado na rede privada da Stack Docker e com volumes persistentes administrados pelo Portainer.

Do ponto de vista funcional, toda mídia **entrará no banco de dados** no momento do upload: a API criará o registro no PostgreSQL e o vínculo com a versão de rascunho dentro da mesma operação controlada. Tecnicamente, o registro e os relacionamentos ficarão no PostgreSQL, enquanto os bytes da foto ou do vídeo ficarão no armazenamento de objetos. Essa separação deverá ser transparente para o administrador e para o sítio.

Regras obrigatórias:

- arquivos binários não serão gravados em colunas do PostgreSQL;
- o PostgreSQL armazenará metadados, vínculos, estados, hashes, versões, auditoria e chaves lógicas dos objetos;
- o serviço de objetos não publicará porta diretamente no host;
- uploads administrativos passarão pela API e pelo Nginx, com streaming, limites e autenticação;
- originais e arquivos em processamento ficarão em área privada;
- somente derivados tecnicamente prontos e vinculados a conteúdo confirmado serão expostos em área pública;
- a entrega pública ocorrerá por rota controlada pelo Nginx e poderá utilizar cache da Cloudflare;
- volumes não poderão depender da camada gravável de contêiner;
- capacidade, uso de disco e falhas de processamento gerarão métricas e alertas;
- banco e armazenamento serão incluídos em uma estratégia coordenada de backup e restauração;
- a troca futura do software S3 não deverá exigir mudança nos módulos de conteúdo e design.

### 12.7 Modelo mínimo

```text
arquivo
- id
- nome_original
- nome_interno
- extensao
- mime_detectado
- tamanho
- hash
- status
- armazenamento_privado
- armazenamento_publico
- enviado_por
- enviado_em
- processado_em
- publicado_em
- motivo_rejeicao
- categoria_midia
- duracao
- largura
- altura
- objeto_original_privado
- objeto_publico
- derivados
```

## 13. Banco de dados

### 13.1 Princípios

- PostgreSQL será o banco principal.
- Todas as alterações de estrutura serão realizadas por migrações versionadas.
- O painel não poderá executar alterações de esquema.
- A API utilizará consultas parametrizadas.
- Contas de banco seguirão privilégio mínimo.
- O sítio público não terá credencial de escrita.
- Datas administrativas serão armazenadas com fuso e referência inequívoca.
- Identificadores internos não dependerão de sequências previsíveis quando forem expostos externamente.

### 13.2 Entidades principais

```text
administradores
redes_autorizadas
dispositivos
sessoes

paginas
paginas_versoes
blocos
menus
menus_versoes
temas
temas_versoes
presets
templates_layout
regioes_layout
componentes_catalogo
componentes_instancias
composicoes
composicoes_versoes
banners
banners_versoes
banners_midias

arquivos
arquivos_derivados
arquivos_vinculos_conteudo
documentos
documentos_versoes

criterios_pntp
evidencias_pntp
conjuntos_de_dados
importacoes
exportacoes

publicacoes
tarefas
auditoria_eventos
```

### 13.3 Busca

A primeira versão utilizará pesquisa textual do PostgreSQL para:

- páginas;
- notícias;
- serviços;
- documentos;
- critérios e evidências.

Uma ferramenta externa de busca somente será considerada se o volume ou a qualidade dos resultados justificar a nova complexidade.

## 14. Auditoria

### 14.1 Eventos obrigatórios

Registrar:

- login aceito e rejeitado;
- bloqueio por rede;
- tentativa com dispositivo desconhecido;
- criação, suspensão e revogação de conta;
- alteração de rede ou dispositivo;
- criação e alteração de conteúdo;
- publicação;
- arquivamento;
- restauração;
- upload e rejeição de arquivo;
- publicação de documento;
- importação de dados;
- exportação administrativa;
- alteração de configuração;
- acesso e exportação dos próprios logs.

### 14.2 Estrutura

```text
auditoria_evento
- id
- administrador_id
- acao
- entidade
- entidade_id
- dados_anteriores
- dados_novos
- ip_origem
- dispositivo_id
- sessao_id
- justificativa
- resultado
- correlacao_id
- criado_em
```

### 14.3 Proteções

- O painel não terá função para editar auditoria.
- O painel não terá função para apagar auditoria.
- A escrita ocorrerá de forma append-only.
- Falha ao registrar evento crítico deverá impedir a operação correspondente.
- Cópias serão enviadas periodicamente ao backup.
- O acesso aos logs também será auditado.
- Senhas, tokens, segredos, chaves privadas e documentos completos não serão registrados.
- Os dados anteriores e posteriores deverão ser filtrados para evitar gravação acidental de segredos.
- Conteúdo proveniente de usuário, cabeçalho, parâmetro ou tentativa de ataque será tratado como dado não confiável e neutralizado na consulta dos logs.
- O visualizador não interpretará HTML, scripts, links ativos ou sequências de controle presentes nos eventos.
- Métricas de visitação pública, auditoria administrativa e eventos técnicos de segurança utilizarão categorias e políticas separadas.
- Dados legados importados serão identificados com origem, período e sistema, sem serem apresentados como eventos nativos da nova aplicação.
- A visualização ou exportação não fornecerá ao usuário comum endereços, documentos ou dados de segurança além do necessário para auditoria autorizada.

## 15. Regras PNTP protegidas pela aplicação

Os administradores terão acesso funcional completo, mas o sistema não permitirá violações estruturais dos critérios essenciais.

### 15.1 Recursos que não poderão ser excluídos

- sítio oficial;
- Portal da Transparência;
- receita prevista e realizada;
- classificação da receita;
- totais de despesas;
- classificação das despesas;
- empenhos;
- RGF;
- RREO;
- PPA;
- LDO;
- LOA.

### 15.2 Regras automáticas

- URLs essenciais serão permanentes.
- Alterações manterão redirecionamentos quando necessário.
- Conteúdo essencial nunca poderá ser privado.
- O acesso ao Portal da Transparência permanecerá visível.
- Campos obrigatórios de dados não poderão ser removidos.
- Filtros e exportações obrigatórios não poderão ser desativados.
- PPA, LDO e LOA exigirão documentos e anexos aplicáveis.
- RGF e RREO exigirão período, exercício, relatório e anexos.
- Datas de atualização deverão representar a atualização real do conteúdo.
- O sistema emitirá alertas de desatualização.
- Alterações de design não poderão esconder ou tornar inacessível conteúdo obrigatório.
- A aplicação deverá preservar três anos de histórico quando a matriz exigir.

### 15.3 Alertas previstos

- URL essencial indisponível;
- arquivo quebrado;
- integração interrompida;
- dado próximo do limite de atualização;
- ausência de exercício histórico;
- documento vigente ausente;
- filtro sem funcionamento;
- exportação inconsistente com a tela;
- página essencial removida da navegação;
- contraste ou estrutura de acessibilidade inválida.

## 16. Integrações e dados de transparência

### 16.1 Estratégia

O sítio não deverá exigir digitação manual de grandes volumes contábeis. A API deverá importar ou consultar dados dos sistemas oficiais.

Integrações prioritárias:

- Siafic/sistema contábil;
- sistema de licitações;
- sistema de contratos;
- sistema de pessoal, em etapa posterior;
- armazenamento de documentos oficiais.

### 16.2 Importação

Cada importação deverá registrar:

- sistema de origem;
- período;
- horário de início e término;
- quantidade de registros;
- hash ou identificador do arquivo de origem;
- resultado;
- erros encontrados;
- responsável técnico;
- data de referência dos dados.

### 16.3 Falhas

- A última versão válida continuará pública.
- O painel exibirá alerta claro.
- A falha será registrada.
- Reprocessamento deverá ser idempotente.
- Dados parciais não substituirão silenciosamente uma base completa.
- A data de atualização pública não será alterada se nenhum dado novo tiver sido processado.

## 17. Desempenho, responsividade e acessibilidade

### 17.1 Sítio público

- Utilizar CDN para páginas, imagens e arquivos públicos.
- Gerar estaticamente páginas institucionais quando possível.
- Utilizar cache HTTP com invalidação após publicação.
- Paginar receitas, despesas e empenhos.
- Não enviar grandes bases completas ao navegador sem necessidade.
- Gerar imagens em tamanhos adequados ao dispositivo.
- Carregar componentes pesados somente quando necessários.
- Manter o conteúdo essencial disponível mesmo se o painel estiver temporariamente fora do ar.

### 17.2 API

- Paginação obrigatória em consultas volumosas.
- Limites máximos por requisição.
- Índices de banco definidos a partir dos filtros reais.
- Compressão de respostas quando apropriada.
- Cache somente para dados públicos que possam ser invalidados com segurança.
- Tempos limite nas integrações externas.
- Controle de concorrência nas importações.

### 17.3 Acessibilidade

O objetivo técnico será conformidade com WCAG 2.2 nível AA, incluindo:

- navegação por teclado;
- foco visível;
- contraste;
- redimensionamento de texto;
- semântica HTML;
- rótulos de formulários;
- mensagens de erro compreensíveis;
- texto alternativo;
- tabelas acessíveis;
- responsividade;
- ausência de dependência exclusiva de cor ou movimento.

O painel administrativo também deverá ser acessível.

## 18. Segurança da aplicação

### 18.1 Controles mínimos

- HTTPS obrigatório.
- HSTS.
- Content Security Policy.
- proteção contra clickjacking;
- `X-Content-Type-Options: nosniff`;
- política de origem e CORS restrita;
- proteção CSRF nas rotas administrativas;
- validação de entrada no backend;
- sanitização de conteúdo permitido;
- consultas parametrizadas;
- limitação de requisições;
- limites de payload;
- segredos fora do código;
- rotação de credenciais;
- dependências atualizadas;
- monitoramento de vulnerabilidades;
- registro centralizado de erros e eventos de segurança;
- mensagens de erro públicas sem detalhes internos.
- métodos HTTP coerentes, com proibição de alteração de estado por `GET`;
- token antifalsificação ou proteção equivalente em toda operação administrativa baseada em sessão;
- confirmação e reautenticação para operações críticas;
- validação de destino para redirecionamentos e links configuráveis;
- cabeçalhos, cookies e políticas de cache diferentes para público e administração;
- proibição de armazenar tokens administrativos em `localStorage` ou em URLs;
- proteção contra enumeração de contas e recuperação de credenciais abusiva.

### 18.2 Padrão de verificação

O OWASP ASVS deverá ser utilizado como referência de requisitos e testes de segurança. Os controles aplicáveis deverão ser transformados em critérios de homologação antes da entrada em produção.

### 18.3 Testes

- testes unitários das regras;
- testes de integração da API;
- testes de autorização;
- testes de isolamento entre público e admin;
- testes de restauração;
- testes de upload malicioso;
- testes de rate limiting;
- análise de dependências;
- análise estática;
- teste de acessibilidade;
- teste de invasão antes da entrada em produção e após mudanças significativas.

## 19. Ambientes e implantação

### 19.1 Ambientes

Serão mantidos:

- desenvolvimento;
- homologação;
- produção.

Produção não deverá ser utilizada para testes ou treinamento.

### 19.2 Pipeline

O pipeline deverá executar:

1. instalação reproduzível;
2. verificação de formatação;
3. lint;
4. verificação de tipos;
5. testes unitários;
6. testes de integração;
7. verificação de dependências;
8. construção das aplicações;
9. validação de migrações;
10. construção das imagens Docker em múltiplos estágios;
11. análise de vulnerabilidades das imagens;
12. identificação das imagens por versão e commit, sem depender da tag `latest`;
13. envio das imagens ao registro OCI;
14. atualização controlada da Stack de homologação pelo Portainer;
15. execução de migrações e testes de fumaça em homologação;
16. promoção das mesmas imagens imutáveis para produção;
17. atualização controlada da Stack de produção pelo Portainer;
18. verificação pós-implantação e acionamento de rollback quando necessário.

### 19.3 Migrações

- Migrações serão versionadas no repositório.
- Toda migração deverá possuir estratégia de recuperação.
- Backups serão confirmados antes de mudanças destrutivas.
- Migrações não serão executadas pelo painel administrativo.
- A aplicação deverá permanecer compatível durante implantações graduais quando necessário.

### 19.4 Imagens Docker

Cada aplicação implantável possuirá Dockerfile próprio, seguindo estas instruções:

- utilizar build em múltiplos estágios;
- instalar dependências de forma reproduzível usando o arquivo de lock;
- copiar para a imagem final somente os artefatos necessários à execução;
- executar com usuário sem privilégios de `root`;
- utilizar imagem-base mínima, suportada e fixada por versão, preferencialmente também por digest;
- não incluir `.env`, chaves, credenciais, cache de desenvolvimento ou arquivos desnecessários;
- possuir `.dockerignore` adequado;
- expor somente a porta interna necessária;
- implementar `HEALTHCHECK` ou health check equivalente definido na Stack;
- registrar logs em `stdout` e `stderr`;
- permitir sistema de arquivos somente leitura quando compatível, usando volume ou `tmpfs` apenas nos caminhos necessários;
- remover capacidades Linux desnecessárias e aplicar limites de recursos;
- nunca montar o socket Docker nos contêineres da aplicação.

### 19.5 Stack compatível com Portainer

O repositório deverá fornecer `infra/portainer/stack.yml`, compatível com implantação como Stack do Portainer e adequado ao Docker Compose suportado no servidor.

A Stack deverá declarar explicitamente:

- imagens do sítio público, painel, API e Nginx;
- PostgreSQL, caso não seja utilizado serviço gerenciado externo;
- serviço de armazenamento de objetos compatível com S3 e seus volumes persistentes;
- processo de tarefas de mídia, quando habilitado, construído a partir do mesmo código-base do backend;
- conector `cloudflared`, em Stack própria ou na Stack da aplicação, caso Cloudflare Tunnel seja a opção aprovada;
- redes privadas e rede de entrada;
- volumes persistentes;
- health checks;
- políticas de reinício;
- limites de CPU e memória compatíveis com o modo de implantação utilizado;
- ordem e condições necessárias para inicialização;
- configuração por variáveis de ambiente;
- nomes e tags de imagem substituíveis por ambiente;
- política de logs e rotação compatível com o servidor.

Regras de segurança e operação:

- o arquivo da Stack não conterá segredos reais;
- valores sensíveis serão fornecidos pelo mecanismo seguro disponível no Portainer ou por arquivos de segredo montados no servidor;
- `env.example` conterá somente nomes, formatos esperados e valores não sensíveis;
- o banco não publicará porta no host;
- o serviço de armazenamento de objetos não publicará porta no host e será acessível somente pelas redes privadas necessárias;
- somente Nginx publicará as portas necessárias da aplicação;
- volumes persistentes não serão removidos durante atualização normal;
- a Stack não construirá código-fonte em produção; utilizará imagens previamente testadas no registro;
- a versão anterior das imagens permanecerá identificável para rollback;
- a atualização não utilizará tag mutável como única referência de versão.
- token de Tunnel, quando aplicável, será fornecido como segredo e nunca ficará no arquivo da Stack.

### 19.6 Nginx na origem

O Nginx será implantado como proxy reverso controlado pela Stack ou como serviço de origem formalmente administrado. A escolha será documentada, mas a configuração versionada deverá permanecer no repositório.

O Nginx deverá:

- rotear domínios distintos para sítio público, painel administrativo e API;
- aceitar somente os cabeçalhos de IP real provenientes de endereços confiáveis da Cloudflare;
- encaminhar corretamente protocolo, host, IP e identificador de requisição;
- aplicar limites de corpo, tempo e conexão compatíveis com cada rota;
- possuir limites mais restritivos para login e operações administrativas;
- impedir acesso a `.env`, arquivos de backup, diretórios internos, metadados de repositório e configurações;
- desabilitar exposição desnecessária da versão;
- não armazenar em cache respostas administrativas, autenticadas ou contendo dados sensíveis;
- permitir cache público somente onde houver política explícita e invalidação segura;
- manter configuração de TLS da origem compatível com o modo `Full (strict)` da Cloudflare;
- fornecer página de erro segura e health endpoint apropriado;
- enviar logs para a coleta definida sem registrar segredos ou corpos sensíveis.

### 19.7 Cloudflare

A configuração de produção deverá utilizar a Cloudflare como borda pública. A documentação em `infra/cloudflare/` deverá permitir reproduzir, revisar e auditar as configurações, mesmo quando elas forem aplicadas pelo painel da Cloudflare.

Configuração mínima:

- registros DNS públicos com proxy habilitado quando aplicável;
- modo SSL/TLS `Full (strict)`; o modo `Flexible` será proibido;
- redirecionamento de HTTP para HTTPS;
- versões e cifras TLS compatíveis com navegadores suportados e política vigente;
- regras WAF gerenciadas e proteção contra DDoS;
- rate limiting para autenticação, API e rotas sujeitas a abuso;
- cache de conteúdo público estático e bypass para admin, autenticação e respostas privadas;
- preservação controlada do IP real, confiando no cabeçalho da Cloudflare somente quando a conexão vier da rede da própria Cloudflare;
- alerta para mudança de DNS, certificado, regra WAF ou configuração de cache;
- separação do domínio público e do domínio administrativo;
- proteção adicional do domínio administrativo por Cloudflare Access, VPN, lista de rede ou solução Zero Trust compatível com a política municipal.

O servidor de origem deverá impedir acesso direto que contorne a Cloudflare. Isso poderá ser realizado por firewall permitindo apenas as faixas oficiais da Cloudflare nas portas públicas ou por Cloudflare Tunnel. A escolha deverá considerar o ambiente real, ser registrada e possuir procedimento de atualização das faixas ou do conector.

Credenciais e tokens da Cloudflare terão privilégio mínimo, escopo restrito à zona e rotação definida. Nenhum token será incluído no repositório, imagem Docker, Stack ou painel editorial.

### 19.8 Implantação e rollback pelo Portainer

O procedimento operacional deverá ser reproduzível:

1. pipeline cria e publica imagens imutáveis;
2. homologação recebe a nova versão da Stack;
3. migração compatível é executada por tarefa controlada;
4. health checks e testes de fumaça são aprovados;
5. as mesmas imagens são promovidas para produção;
6. Portainer atualiza a Stack sem remover volumes persistentes;
7. Nginx e Cloudflare são verificados após a atualização;
8. falha de health check, migração ou teste pós-implantação interrompe a promoção e inicia o procedimento de recuperação.

O rollback deverá prever:

- retorno às imagens anteriores por tag imutável ou digest;
- compatibilidade do código anterior com a migração aplicada ou estratégia explícita de reversão;
- restauração do banco somente quando tecnicamente necessária e formalmente autorizada;
- preservação de arquivos e volumes;
- registro do incidente, decisão, horários e versão afetada;
- validação do sítio público, painel, API e páginas essenciais depois da recuperação.

### 19.9 Artefatos obrigatórios para deixar o servidor preparado

A implementação não estará pronta para implantação enquanto o repositório não contiver:

- Dockerfiles de produção para as aplicações;
- Stack do Portainer sem segredos;
- arquivo de exemplo das variáveis obrigatórias;
- configuração versionada do Nginx;
- documentação das regras necessárias na Cloudflare;
- endpoints de vida e prontidão;
- procedimento de primeira implantação;
- procedimento de atualização e rollback;
- procedimento de migração do banco;
- procedimento de backup e restauração;
- inventário dos volumes persistentes;
- requisitos mínimos do servidor, Docker Engine, Portainer e registro OCI;
- checklist de validação após implantação.

### 19.10 Pré-requisitos e endurecimento do servidor

Antes da primeira implantação, a IA deverá produzir um checklist do host e o responsável técnico deverá confirmar:

- sistema operacional de servidor suportado e atualizado;
- versões suportadas do Docker Engine, integração Compose e Portainer, fixadas no inventário;
- CPU, memória, armazenamento e largura de banda dimensionados a partir de carga esperada e medições;
- espaço separado ou claramente monitorado para banco, arquivos, imagens e logs;
- relógio sincronizado por NTP para preservar auditoria e validade de certificados;
- firewall permitindo somente os fluxos documentados;
- acesso SSH por chave, restrito à administração técnica, sem login remoto direto de `root` e sem senha quando tecnicamente viável;
- interface do Portainer inacessível ao público geral e protegida por rede de gestão, VPN ou Zero Trust;
- portas do PostgreSQL e serviços internos fechadas no host;
- portas 80/443 limitadas à Cloudflare quando utilizado proxy por DNS, ou fechadas ao público quando utilizado Tunnel;
- política de atualização de segurança do sistema, Docker, Portainer, Nginx e imagens-base;
- rotação e limite dos logs do Docker para impedir esgotamento de disco;
- monitoramento de CPU, memória, disco, certificados, health checks, reinícios e falhas de backup;
- destino externo ao servidor para backups;
- procedimento documentado de reconstrução completa do host a partir do repositório, imagens e backups.

O checklist deverá registrar valores confirmados e responsáveis. A IA não deverá inventar capacidade do servidor, endereço IP, portas de gestão, credenciais ou janelas de manutenção.

## 20. Backup, recuperação e continuidade

### 20.1 Banco

- backup automático;
- recuperação ponto a ponto quando disponível;
- cópia fora do ambiente principal;
- criptografia;
- teste periódico de restauração;
- retenção definida formalmente;
- política de RPO e RTO definida antes da produção;
- consistência verificada entre backup do banco e referências de arquivos quando necessário;
- geração, download e restauração indisponíveis no painel editorial;
- acesso aos backups restrito à operação de infraestrutura e registrado separadamente.

### 20.2 Arquivos

- versionamento no armazenamento;
- backup dos volumes e objetos de imagens, vídeos, documentos e derivados;
- cópia dos documentos oficiais;
- retenção compatível com arquivo público e regras administrativas;
- restauração independente do banco quando possível.
- verificação de consistência entre metadados do PostgreSQL e objetos armazenados;
- teste de restauração que comprove a recuperação conjunta de banco, originais privados e derivados públicos;

### 20.3 Volumes, Portainer e configurações

- Todo volume persistente da Stack deverá constar em inventário com conteúdo, caminho lógico, criticidade, retenção e método de restauração.
- Banco e arquivos não dependerão exclusivamente da camada gravável de um contêiner.
- A configuração da aplicação, Nginx e Stack será recuperável a partir do repositório.
- Os dados internos necessários à recuperação do Portainer serão protegidos conforme a documentação da versão utilizada.
- Configurações aplicadas somente na Cloudflare serão documentadas ou exportadas por mecanismo seguro quando disponível.
- Um backup mantido apenas no mesmo disco ou no mesmo servidor não será considerado cópia de recuperação.
- A restauração será testada em ambiente isolado e não diretamente sobre produção.

### 20.4 Continuidade

- O sítio público deverá continuar servindo conteúdo em cache durante falhas curtas da API.
- A última publicação válida deverá permanecer disponível.
- O painel poderá ficar temporariamente indisponível sem retirar o conteúdo público do ar.
- Procedimentos de incidente e recuperação deverão possuir responsáveis e contatos.

## 21. Privacidade e LGPD

- Coletar somente dados administrativos necessários.
- Documentar finalidade e base do tratamento.
- Criptografar documento funcional e dados de recuperação.
- Mascarar dados pessoais na interface.
- Não publicar dados do cadastro administrativo.
- Não registrar dados pessoais completos em auditoria.
- Definir prazo de retenção após desligamento.
- Restringir acesso técnico ao banco.
- Registrar incidentes envolvendo dados pessoais.
- Envolver o encarregado de dados nas decisões de cadastro, retenção e resposta a incidentes.

## 22. Decisões que permanecem para o esqueleto técnico

As seguintes escolhas serão confirmadas quando o esqueleto for criado:

- biblioteca de acesso ao PostgreSQL;
- provedor OIDC existente no Município ou implantação de Keycloak;
- software auto-hospedado de armazenamento compatível com S3 e seu dimensionamento inicial;
- registro OCI das imagens Docker;
- dimensionamento inicial do servidor e limites de recursos dos contêineres;
- execução do PostgreSQL na Stack ou utilização de serviço gerenciado;
- execução do Nginx na Stack ou como serviço administrado da origem;
- proteção direta da origem por faixas oficiais da Cloudflare ou Cloudflare Tunnel;
- regras, limites e recursos da Cloudflare compatíveis com o plano contratado;
- mecanismo de VPN ou acesso Zero Trust;
- ferramenta antivírus;
- limites iniciais de tamanho e resolução dos uploads;
- limites iniciais de duração, resolução, codecs e processamento de vídeos;
- política exata de retenção de logs e lixeira;
- duração final de sessões;
- quantidade de dispositivos por administrador;
- formato das integrações com os sistemas já utilizados pela Prefeitura.

Essas decisões não alteram a arquitetura principal registrada neste documento.

Enquanto essas escolhas estiverem abertas, a IA deverá criar limites claros de integração, configuração validada e interfaces substituíveis. Valores provisórios poderão existir somente em desenvolvimento ou homologação, identificados como tais. Nenhum fornecedor, endereço, credencial, prazo de retenção ou limite operacional será inventado e tratado como decisão definitiva.

## 23. Critérios para aprovação desta arquitetura

A arquitetura estará pronta para virar esqueleto quando estiver confirmado que:

- TypeScript será a linguagem principal;
- Next.js será utilizado no sítio público e no painel;
- NestJS será utilizado na API;
- PostgreSQL será o banco principal;
- a API será um monólito modular;
- sítio, admin e API serão aplicações separadas;
- a quantidade de administradores será configurável e não ficará fixada no código;
- os administradores operacionais serão independentes e terão as mesmas funções;
- não haverá aprovação cruzada;
- acesso administrativo exigirá rede, dispositivo e MFA;
- o painel não permitirá cadastro direto de outros administradores;
- alterações visuais ocorrerão por componentes e tokens;
- o painel oferecerá construtor visual limitado a regiões, componentes, variantes e tokens homologados;
- o componente de banner distinguirá arte com texto, fotografia e imagem mista;
- banners com texto usarão exibição inteira como padrão e não poderão ser deformados;
- o painel exibirá prévias de desktop, tablet e celular, ponto focal, área segura e regiões de corte;
- o backend impedirá publicação de banner cujo recorte elimine informação marcada como importante;
- cada slide exigirá duas artes, desktop e mobile, publicadas e versionadas atomicamente;
- cada prefeitura terá identidade configurável sem permitir temas arbitrários por página;
- não haverá edição livre de código ou plugins;
- auditoria será append-only;
- todo conteúdo será versionado e restaurável;
- não haverá exclusão definitiva pelo painel;
- uploads serão validados e processados automaticamente;
- fotos e vídeos serão cadastrados e vinculados ao rascunho imediatamente após o upload, sem triagem ou aprovação editorial individual;
- a confirmação humana do rascunho publicará conteúdo e mídias tecnicamente prontas de forma atômica;
- imagens, vídeos, documentos e derivados serão armazenados em serviço de objetos próprio da Stack, e não no PostgreSQL;
- regras essenciais PNTP não poderão ser desativadas;
- operações que alterem estado não utilizarão requisições `GET`;
- auditoria administrativa, métricas públicas e eventos de segurança serão separados;
- backup, restauração e administração de infraestrutura ficarão fora do painel editorial;
- Docker será utilizado para empacotar as aplicações;
- a implantação no servidor será entregue como Stack versionada compatível com Portainer;
- Nginx será o proxy reverso da origem;
- Cloudflare será a camada de DNS, proxy, TLS, CDN, WAF e mitigação de DDoS;
- o banco e os serviços internos não publicarão portas no servidor;
- o armazenamento de objetos utilizará volume persistente, rede privada, backup e restauração testados;
- a origem será protegida contra acesso público que contorne a Cloudflare;
- imagens de contêiner serão imutáveis, versionadas e publicadas em registro OCI;
- o repositório conterá procedimentos de implantação, atualização, rollback, backup e restauração;
- a primeira implantação evitará infraestrutura desnecessária.

## 24. Preparação para a Etapa 3

Com a arquitetura definida, a próxima etapa pesquisará sítios institucionais de referência nacional.

Os modelos deverão ser avaliados, entre outros aspectos, por:

- organização da página inicial;
- acesso a serviços;
- arquitetura de informação;
- integração com transparência;
- navegação móvel;
- busca;
- acessibilidade;
- tratamento de notícias e agenda;
- identidade municipal;
- uso de componentes reutilizáveis;
- desempenho;
- clareza das páginas internas;
- facilidade de manutenção pelo painel administrativo.

O objetivo da pesquisa visual será escolher padrões de funcionamento e organização compatíveis com esta arquitetura, sem copiar integralmente outro sítio.

## 25. Referências técnicas

- Cartilha PNTP 2026: <https://radardatransparencia.atricon.org.br/pdf/Cartilha-PNTP-2026.pdf>
- Matriz PNTP 2026: <https://radardatransparencia.atricon.org.br/downloads.html>
- Node.js - política de versões: <https://nodejs.org/en/about/previous-releases>
- Next.js - segurança de dados: <https://nextjs.org/docs/app/guides/data-security>
- Next.js - produção: <https://nextjs.org/docs/pages/guides/production-checklist>
- NestJS - autenticação: <https://docs.nestjs.com/security/authentication>
- NestJS - autorização: <https://docs.nestjs.com/security/authorization>
- PostgreSQL - política de versões: <https://www.postgresql.org/support/versioning/>
- OWASP ASVS: <https://owasp.org/www-project-application-security-verification-standard/>
- OWASP - autenticação multifator: <https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html>
- OWASP - logging: <https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html>
- OWASP - upload de arquivos: <https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html>
- NIST - autenticadores e WebAuthn: <https://pages.nist.gov/800-63-4/sp800-63b/authenticators/>
- Lei Geral de Proteção de Dados: <https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm>
- Docker - uso do Compose em produção: <https://docs.docker.com/compose/how-tos/production/>
- Portainer - criação e implantação de Stacks: <https://docs.portainer.io/user/docker/stacks/add>
- Nginx - configuração como proxy reverso: <https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy>
- Cloudflare - modo SSL/TLS Full (strict): <https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/>

## 26. Definição de pronto para a IA implementadora

A IA deverá distinguir três níveis de conclusão:

| Nível | Condições mínimas |
|---|---|
| Esqueleto técnico | Estrutura do monorepo, aplicações executáveis, configuração validada, banco e migração inicial, módulos delimitados, OpenAPI inicial, testes básicos, Dockerfiles de produção, Stack inicial do Portainer, Nginx versionado e ambiente local reproduzível |
| Pronto para homologação | Integrações de identidade, banco e arquivos funcionais; imagens de contêiner publicadas no registro OCI; armazenamento próprio de mídia funcional; Stack implantável pelo Portainer; Nginx e Cloudflare documentados; regras de autorização e PNTP no backend; uploads processados; auditoria protegida; pipeline completo; testes de integração, segurança e acessibilidade executáveis |
| Pronto para produção | Dados e integrações reais validados; Cloudflare, Nginx, Docker e Portainer configurados e protegidos; origem sem acesso direto indevido; backup e restauração testados; rollback comprovado; observabilidade e alertas ativos; teste de invasão tratado; runbooks aprovados; testes PNTP de ponta a ponta e evidências reais concluídos |

Antes de declarar qualquer um desses níveis, a IA deverá apresentar:

- comandos reproduzíveis de instalação, execução, teste, migração e build;
- resultado dos testes correspondentes ao nível declarado;
- matriz de rastreabilidade atualizada;
- decisões arquiteturais registradas para qualquer desvio deste documento;
- relação de dependências externas e configurações ainda ausentes;
- riscos conhecidos, limitações e bloqueios não resolvidos;
- confirmação de que segredos e dados pessoais não foram versionados;
- confirmação de que documentação, OpenAPI, banco e comportamento real permanecem coerentes.

Um projeto com mocks, placeholders, autenticação simulada, upload sem validação, auditoria mutável, backup não testado ou integração PNTP incompleta poderá ser classificado apenas no nível realmente alcançado. A IA não deverá chamar o esqueleto de sistema pronto para produção nem declarar conformidade com base apenas em telas ou código não executado.
