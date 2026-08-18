# 02C - Seguranca administrativa e auditoria

> Escopo: identidades administrativas, rede, dispositivos, autenticacao, sessoes, recuperacao, privilegios e trilha de auditoria.

## Modelo administrativo

- A quantidade de administradores sera configuravel e podera mudar.
- Todos os administradores editoriais terao o mesmo conjunto de funcoes.
- Cada administrador operara independentemente.
- Nao havera aprovacao cruzada nem dependencia de outro administrador para publicar.
- Contas compartilhadas serao proibidas.
- Um administrador editorial nao podera criar, editar, suspender, excluir ou recuperar a conta de outro.
- Operadores de infraestrutura, banco, backup e Portainer ficarao fora do painel editorial.

Autonomia editorial sera compensada por validacao automatica, reautenticacao, versionamento, restauracao e auditoria.

## Cadastro funcional

O perfil local devera conter:

```text
administrador
- id
- subject_oidc
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

- documento completo criptografado com chave fora do banco;
- exibicao apenas mascarada;
- hash deterministico somente para impedir duplicidade;
- documento nunca usado como senha;
- documento completo ausente de logs, auditoria e URLs;
- nenhuma imagem digitalizada do documento sem obrigacao formal;
- coleta limitada a identificacao e responsabilizacao funcional;
- prazo de retencao apos desligamento definido com o encarregado de dados.

## Provisionamento e desligamento

Contas serao provisionadas no provedor OIDC por responsavel tecnico formalmente designado. Criacao, suspensao, desligamento, troca de rede, troca de dispositivo e recuperacao exigirao solicitacao formal e registro separado do painel editorial.

Nao havera conta generica de suporte. Acesso emergencial de infraestrutura, se existir, tera finalidade restrita, credencial protegida, monitoramento e procedimento formal.

## Rede e IP

O IP sera barreira anterior ao login, nunca identidade suficiente.

Modelos autorizados:

- rede da Prefeitura com IP publico fixo registrado em CIDR; ou
- acesso remoto por VPN/Zero Trust com saida por IP autorizado.

O sistema devera suportar IPv4 e IPv6. Enderecos privados como `192.168.0.0/16` ou `10.0.0.0/8` nao serao cadastrados como prova de origem publica.

Cada rede tera descricao, CIDR, tipo, vigencia, status, autor e auditoria. Alteracao de rede sera operacao tecnica, reautenticada e indisponivel no painel editorial comum.

## Dispositivos

- Cada administrador podera ter quantidade pequena e configuravel de dispositivos autorizados.
- Identificacao usara passkey, certificado, chave publica ou mecanismo criptografico equivalente.
- Fingerprint invasivo do navegador nao sera mecanismo principal.
- Cadastro, revogacao e ultimo uso serao registrados.
- Dispositivo perdido sera revogado junto com suas sessoes.

## Autenticacao

Fluxo minimo:

```text
rede autorizada, VPN ou Zero Trust
  -> dispositivo autorizado
  -> identidade OIDC individual
  -> MFA/passkey
  -> sessao administrativa
```

Requisitos:

- preferencia por passkey/WebAuthn ou chave fisica;
- MFA obrigatorio;
- protecao contra forca bruta, credential stuffing e enumeracao de contas;
- recuperacao de acesso por procedimento formal;
- duas formas de recuperacao protegidas quando o provedor permitir;
- alerta e bloqueio progressivo em tentativas anormais;
- revogacao imediata de sessoes e dispositivos.

## Sessoes

- cookies `HttpOnly`, `Secure` e `SameSite` adequado;
- tokens ausentes de `localStorage` e URLs;
- expiracao por inatividade e tempo absoluto;
- limite de sessoes simultaneas configuravel;
- revogacao remota;
- registro de inicio, renovacao, expiracao e revogacao;
- protecao CSRF em operacoes baseadas em cookie;
- respostas administrativas sem cache publico.

Reautenticacao sera exigida antes de publicar ou remover conteudo PNTP, alterar design global, menu principal, rede, dispositivo, seguranca, identidade, restauracao ampla ou configuracao protegida.

## Autorizacao

Todos os administradores editoriais compartilham a mesma funcao funcional. Isso nao autoriza acesso a:

- Portainer;
- shell ou SSH;
- banco;
- backup e restauracao;
- segredos;
- configuracao de Cloudflare;
- exclusao ou alteracao da auditoria;
- provisionamento de identidades.

Autorizacao sera validada pela API em toda operacao. Ocultar botao no frontend nao sera controle de seguranca.

## Auditoria

Eventos obrigatorios incluem login aceito/rejeitado, bloqueio de rede, dispositivo desconhecido, mudanca de conta/rede/dispositivo, criacao e edicao, publicacao, arquivamento, restauracao, upload/rejeicao, documento, importacao, exportacao administrativa, configuracao e consulta/exportacao da auditoria.

Cada evento tera:

```text
auditoria_evento
- id
- administrador_id
- acao
- entidade
- entidade_id
- dados_anteriores_filtrados
- dados_novos_filtrados
- ip_origem
- dispositivo_id
- sessao_id
- justificativa
- resultado
- correlacao_id
- criado_em
```

Protecoes:

- insercao somente de acrescimo pela aplicacao;
- usuario de auditoria sem `UPDATE` ou `DELETE`;
- nenhuma funcao de edicao ou exclusao no painel;
- falha ao registrar evento critico impedira a operacao correspondente;
- leitura e exportacao dos logs tambem serao auditadas;
- senhas, tokens, chaves, segredos, corpos sensiveis e documentos completos nunca serao registrados;
- estado anterior/posterior sera filtrado antes da gravacao;
- conteudo nao confiavel sera exibido como texto, nunca interpretado como HTML ou comando;
- copias periodicas protegidas serao mantidas fora do servidor principal;
- metricas publicas, auditoria administrativa e logs de seguranca permanecerao separados.

O termo `append-only` descreve a protecao da aplicacao e do papel de banco. Um administrador total do servidor ainda possui poder tecnico sobre o host; por isso copia externa, controle de acesso, backup e segregacao operacional sao obrigatorios para resistencia a adulteracao.

## Seguranca da aplicacao

- HTTPS e HSTS;
- Content Security Policy;
- protecao contra clickjacking;
- `X-Content-Type-Options: nosniff`;
- CORS restrito;
- CSRF mitigado;
- validacao e sanitizacao no backend;
- consultas parametrizadas;
- limites de payload e requisicoes;
- destinos de redirecionamento validados;
- mensagens publicas sem detalhes internos;
- dependencias, imagens e codigo analisados continuamente;
- OWASP ASVS usado como referencia de homologacao;
- teste de invasao antes de producao e apos mudancas significativas.

## Privacidade e incidentes

- Documentar finalidade e base do tratamento dos dados administrativos.
- Aplicar minimizacao, criptografia, mascaramento e retencao definida.
- Restringir acesso tecnico ao banco e aos backups.
- Registrar incidentes e acionar o responsavel municipal e o encarregado de dados.
- Nao publicar dados do cadastro administrativo.
- Manter runbook para conta comprometida, dispositivo perdido, vazamento de segredo e acesso indevido.

## Criterios de aceite

Este anexo estara atendido quando uma identidade individual conseguir operar de forma independente somente a partir de rede/dispositivo autorizados e MFA; quando outra identidade nao puder ser administrada pelo painel editorial; quando revogacao encerrar sessoes; e quando publicacao, restauracao e consulta de auditoria produzirem eventos protegidos e verificaveis.
