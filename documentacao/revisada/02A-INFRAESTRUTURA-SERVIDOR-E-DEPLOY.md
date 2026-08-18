# 02A - Infraestrutura, servidor fisico e deploy

> Escopo: contrato normativo de execucao da plataforma em servidor fisico usando Docker, Portainer, Nginx e Cloudflare.

## Decisoes fixas

- A producao sera executada em servidor fisico administrado pela Prefeitura.
- Docker Engine executara todos os servicos implantaveis.
- Portainer Stacks sera o plano de gestao da implantacao, nao o caminho das requisicoes publicas.
- Nginx sera o unico proxy reverso da origem e o unico servico da Stack autorizado a publicar HTTP/HTTPS no host.
- Cloudflare sera a borda publica, com DNS, proxy, TLS, CDN, WAF, rate limiting e mitigacao de DDoS.
- PostgreSQL e armazenamento de objetos serao locais ao servidor, privados e persistentes.
- A primeira versao nao promete alta disponibilidade: um servidor unico e ponto unico de falha.
- Backup externo e reconstrucao documentada compensarao o risco, mas nao transformarao o host em arquitetura de alta disponibilidade.

## Topologia obrigatoria

```text
Cidadao
  -> Cloudflare
  -> Nginx
  -> site-publico
  -> API publica de leitura

Administrador
  -> Cloudflare Access, VPN ou rede autorizada
  -> Nginx
  -> admin
  -> API administrativa

API e worker
  -> PostgreSQL
  -> armazenamento de objetos
```

Redes Docker minimas:

```text
edge
  Nginx <-> site-publico, admin, api

aplicacao
  site-publico, admin <-> api

dados
  api, worker <-> postgres

midia
  api, worker <-> armazenamento de objetos
  Nginx <-> somente entrega publica controlada
```

Regras:

- site e admin nunca acessarao o banco diretamente;
- Nginx nunca acessara o PostgreSQL;
- PostgreSQL, worker e armazenamento nao publicarao portas no host;
- nenhum contêiner da aplicacao recebera o socket Docker;
- nenhum servico entrara em rede que nao seja necessaria;
- homologacao e producao usarao redes, volumes, dominios e segredos distintos;
- ambientes no mesmo host terao limites de recursos e homologacao nao podera comprometer producao.

## Servicos da Stack

A Stack devera declarar, no minimo:

- `nginx`;
- `site-publico`;
- `admin`;
- `api`;
- `worker`;
- `postgres`;
- `object-storage`;
- tarefa controlada de migracao;
- tarefa controlada de backup, quando a politica aprovada permitir sua execucao na Stack.

Cada servico devera possuir imagem fixada por versao ou digest, health check, politica de reinicio, limite de recursos, rotacao de logs e volumes explicitamente declarados. A tag `latest` nao sera referencia exclusiva de producao.

## Volumes e persistencia

Volumes persistentes minimos:

- dados do PostgreSQL;
- objetos originais privados;
- derivados publicos;
- dados internos do armazenamento de objetos;
- estado necessario do Portainer;
- certificados de origem quando aplicavel;
- area temporaria controlada para processamento;
- logs somente quando a estrategia exigir persistencia local.

Cada volume tera inventario com nome, servico, finalidade, caminho logico, proprietario, criticidade, crescimento esperado, backup, retencao e procedimento de restauracao. Dados permanentes nunca dependerao da camada gravavel do contêiner.

## Segredos

- Segredos reais nao entrarao no Git, Dockerfile, imagem, `stack.yml`, logs ou documentacao.
- O mecanismo definitivo para segredos devera ser escolhido conforme o modo real do Docker/Portainer.
- Em Docker standalone, variaveis sensiveis deverao ficar em arquivo protegido no host ou mecanismo seguro oferecido pela instalacao, fora do repositorio e com permissao minima.
- Em modo com suporte a Docker Secrets, os segredos deverao ser montados como arquivos e lidos pela aplicacao.
- Todo segredo tera proprietario, finalidade, escopo, data de criacao e procedimento de rotacao.
- A restauracao do ambiente devera prever recuperacao segura dos segredos sem inclui-los no backup comum do codigo.

## Endurecimento do host

Antes da producao, o responsavel tecnico devera confirmar:

- sistema operacional de servidor suportado e atualizado;
- Docker Engine, Compose e Portainer em versoes suportadas e inventariadas;
- firewall permitindo somente fluxos documentados;
- SSH por chave, sem login remoto direto de `root` e sem senha quando viavel;
- Portainer restrito a rede de gestao, VPN ou Zero Trust e protegido por MFA;
- portas do PostgreSQL e servicos internos fechadas no host;
- relogio sincronizado por NTP;
- rotacao dos logs do Docker;
- atualizacoes de seguranca e janela de manutencao definidas;
- nenhum contêiner privilegiado sem justificativa formal;
- execucao como usuario nao root quando suportada;
- `no-new-privileges`, reducao de capabilities e sistema de arquivos somente leitura quando compativel;
- monitoramento de CPU, memoria, disco, reinicios, temperatura e certificados;
- monitoramento SMART dos discos;
- estrategia de RAID quando adotada, reconhecendo que RAID nao substitui backup;
- nobreak/UPS e procedimento para desligamento seguro;
- espaco separado ou claramente monitorado para banco, objetos, imagens Docker, temporarios e logs;
- procedimento de reconstrucao integral do host.

## Nginx

O Nginx devera:

- rotear dominios separados para sitio, admin e API;
- encaminhar identificador de requisicao;
- aceitar IP real somente de conexoes confiaveis da Cloudflare;
- aplicar limites de corpo, tempo e conexoes por rota;
- permitir uploads grandes por streaming sem carregar o arquivo integralmente em memoria;
- usar limites mais restritivos em autenticacao e administracao;
- bloquear `.env`, backups, metadados Git, arquivos internos e listagem de diretorios;
- nao armazenar em cache respostas administrativas, autenticadas ou privadas;
- enviar cabecalhos de seguranca definidos pela aplicacao e pela politica aprovada;
- possuir pagina de erro segura e endpoints distintos de vida e prontidao.

## Cloudflare e protecao da origem

- Usar TLS `Full (strict)`; `Flexible` sera proibido.
- Redirecionar HTTP para HTTPS.
- Aplicar WAF e rate limiting nas rotas apropriadas.
- Ignorar cache para admin, autenticacao e respostas privadas.
- Restringir o dominio administrativo por Access, VPN ou rede autorizada.
- Impedir acesso direto a origem por firewall com faixas oficiais da Cloudflare ou por Cloudflare Tunnel.
- Confiar em cabecalho de IP real somente quando a conexao vier da Cloudflare.
- Tokens da Cloudflare terao privilegio minimo e nunca entrarao na Stack versionada.
- Configuracoes aplicadas no painel da Cloudflare deverao ser documentadas ou exportadas de forma recuperavel.

## Deploy e migracoes

Fluxo obrigatorio:

1. pipeline testa e constroi imagens multi-stage;
2. imagens recebem versao e commit e sao enviadas ao registro OCI;
3. homologacao usa exatamente as imagens candidatas;
4. migracao e executada por tarefa unica e controlada;
5. health checks e smoke tests sao aprovados;
6. as mesmas imagens sao promovidas para producao;
7. Portainer atualiza a Stack sem recriar volumes persistentes;
8. URLs essenciais, admin, API, Nginx e cache sao verificados;
9. falha interrompe a promocao e aciona o runbook de recuperacao.

Migracoes deverao ser versionadas, testadas com copia representativa, possuir `lock_timeout` e estrategia de compatibilidade com a versao anterior. Restaurar banco nao sera o primeiro mecanismo de rollback de aplicacao.

## Backup e continuidade

- O banco tera backup automatico e, quando aprovado, arquivamento de WAL para recuperacao ponto a ponto.
- Objetos e metadados terao backup coordenado.
- Existira ao menos uma copia criptografada fora do servidor fisico principal.
- Backup no mesmo disco, RAID ou host nao sera contado como copia externa.
- A restauracao sera testada periodicamente em ambiente isolado.
- RPO, RTO, retencao e responsaveis serao definidos antes da producao.
- A ultima publicacao valida devera permanecer disponivel durante falhas curtas da API, quando o cache permitir.
- Devera existir monitoramento externo ao host para detectar indisponibilidade total do servidor.

## Criterios de aceite

Este anexo estara atendido quando a Stack puder ser implantada em host limpo, todos os servicos privados permanecerem sem porta publica, os volumes sobreviverem a recriacao dos contêineres, o backup externo for restaurado com sucesso e o rollback de uma versao for demonstrado sem perda indevida de dados.
