# 02B - PostgreSQL, midias e processamento

> Escopo: contrato normativo de banco, arquivos, uploads, tarefas assincronas, busca e consistencia entre dados e objetos.

## PostgreSQL

- PostgreSQL sera executado localmente no servidor fisico, em contêiner privado e volume persistente exclusivo.
- O banco nao publicara porta no host.
- Cada prefeitura tera banco, usuario, segredos, volumes e backups proprios.
- Nao havera varias prefeituras no mesmo banco na primeira versao.
- O site e o admin acessarao dados somente pela API.
- Toda alteracao estrutural ocorrera por migracao versionada.
- A versao principal do PostgreSQL sera fixada e devera estar em suporte oficial.

## Papeis e privilegios

Separar, no minimo:

- `app_runtime`: operacoes normais da API, sem alterar schema;
- `app_migrator`: usado somente pela tarefa de migracao;
- `backup_operator`: somente privilegios necessarios ao backup;
- `audit_writer`, quando adotado: insercao controlada na auditoria, sem `UPDATE` ou `DELETE`.

O proprietario do banco nao sera a credencial cotidiana da aplicacao. Consultas serao parametrizadas. Credenciais terao rotacao e nao aparecerao em URLs, logs ou imagens.

## Operacao e desempenho

- Usar pool de conexoes com limite inferior ao `max_connections` reservado ao servidor.
- Nao adicionar PgBouncer inicialmente sem medicao que justifique outro servico.
- Armazenar instantes em UTC e exibir no fuso municipal.
- Usar identificadores nao previsiveis em URLs publicas quando necessario.
- Criar indices a partir dos filtros reais de receitas, despesas, empenhos, busca, publicacao e auditoria.
- Paginar consultas volumosas e limitar exportacoes sincronas.
- Monitorar espaco, conexoes, locks, duracao de consultas, falhas de backup e crescimento de tabelas.
- Executar manutencao e `VACUUM` conforme a configuracao do PostgreSQL e o comportamento observado.
- Definir politica de retencao para sessoes, tarefas, lixeira e eventos tecnicos sem eliminar documentos oficiais ou evidencias indevidamente.

## Modelo minimo

O esquema devera representar:

- identidades administrativas, sessoes, redes e dispositivos;
- configuracao municipal unica, tema, tokens e versoes;
- paginas, menus, regioes, componentes, conteudos e versoes;
- noticias, servicos, documentos, midias e banners;
- arquivos, objetos, derivados, hashes e vinculos com rascunhos/publicacoes;
- criterios PNTP, paginas canonicas, fontes, responsaveis, verificacoes e evidencias;
- integracoes, execucoes, importacoes, falhas e sincronizacoes;
- publicacoes, restauracoes, redirecionamentos e tarefas;
- auditoria administrativa.

Chaves estrangeiras, restricoes de unicidade, `CHECK`, estados permitidos e transacoes deverao proteger invariantes. O frontend nao sera responsavel pela integridade do modelo.

## Arquivos e armazenamento de objetos

- Os bytes de imagens, videos, PDFs e derivados nao serao gravados em colunas do PostgreSQL.
- O PostgreSQL armazenara metadados, chaves logicas, hashes, estados, dimensoes, duracao, versoes e vinculos.
- O armazenamento de objetos sera compativel com S3, executado localmente em rede privada e volume persistente.
- O software definitivo sera escolhido no esqueleto; a aplicacao usara interface de armazenamento substituivel.
- Originais e arquivos em processamento ficarao privados.
- Somente derivados tecnicamente prontos e vinculados a conteudo publicado poderao ser entregues publicamente.
- O nome fisico do objeto sera aleatorio e nunca sera usado como texto publico ou identificador de autorizacao.
- Banco e objetos participarao da mesma politica de backup e verificacao de consistencia.

## Fluxo editorial de upload

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

Nao existira aprovacao editorial isolada de foto ou video. O arquivo aparecera no rascunho assim que houver uma pre-visualizacao segura. A publicacao ocorrera junto com a confirmacao humana do conteudo completo.

Uploads grandes deverao usar streaming ou multipart, sem carregar o arquivo inteiro na memoria da API. O painel mostrara progresso, processamento, falha e possibilidade de reenvio em linguagem simples.

## Imagens

Na primeira versao:

- aceitar JPEG, PNG e WebP;
- rejeitar SVG enviado pelo painel;
- verificar assinatura real, MIME, extensao, bytes, largura, altura e total de pixels;
- recodificar a imagem e remover EXIF/metadados desnecessarios;
- corrigir orientacao;
- gerar tamanhos responsivos e formato otimizado;
- manter original privado quando necessario a recuperacao;
- nunca servir diretamente o arquivo bruto enviado;
- exigir texto alternativo ou marcacao decorativa;
- rejeitar imagem pequena demais para o componente selecionado.

## Videos

- Aceitar somente formatos homologados.
- Aplicar limites configurados de tamanho, duracao, resolucao, codec e taxa de bits.
- Extrair metadados tecnicos.
- Manter o original privado.
- Gerar miniatura e versao publica compativel com navegadores.
- Usar streaming adaptativo somente quando volume e medicao justificarem.
- Exigir legenda, transcricao e capa quando aplicavel.
- Permitir reprocessamento idempotente.
- Nao bloquear API ou painel durante transcodificacao.

## PDFs e documentos

- Verificar assinatura, MIME, extensao e tamanho.
- Usar nome interno aleatorio e area sem permissao de execucao.
- Executar antivirus antes da publicacao.
- Rejeitar macros ou conteudo executavel quando desnecessarios.
- Registrar hash, origem, autor, data e versao.
- Preservar documentos oficiais e seus anexos.
- Nao enviar documentos a servico externo de analise sem avaliacao de privacidade.

## Banners

- Cada slide exigira exatamente uma arte desktop e uma arte mobile.
- As duas origens serao vinculadas ao mesmo rascunho e publicadas atomicamente.
- A versao mobile nao sera gerada automaticamente da desktop.
- O backend validara preset, proporcao, dimensoes, area segura, equivalente textual, destino e expiracao.
- Tablet utilizara uma das duas fontes conforme breakpoint do tema.
- Falha em qualquer versao impedira a nova publicacao; a ultima versao valida permanecera publica.

## Worker e tarefas

O `worker` usara o mesmo repositorio e regras de dominio da API, mas sera executado como processo separado. A fila inicial podera ser uma tabela no PostgreSQL.

Cada tarefa tera tipo, payload validado, estado, prioridade, tentativas, proxima_execucao, bloqueio com expiracao, idempotency key, erro resumido, criado_em e concluido_em.

Regras:

- processamento idempotente;
- limite de tentativas e atraso progressivo;
- recuperacao de tarefas abandonadas;
- estado final de falha para intervencao;
- concorrencia limitada por tipo;
- nenhum segredo no payload;
- metricas e alertas para fila parada, falhas e duracao;
- tarefas de publicacao e integracao nao substituirao dados completos por resultado parcial.

## Backup e consistencia

- Backup do PostgreSQL e dos objetos devera permitir restaurar uma versao coerente.
- Verificacoes periodicas compararao metadados do banco com objetos existentes.
- Objetos orfaos e referencias quebradas serao relatados, nao apagados automaticamente.
- Restauracao sera testada em ambiente isolado.
- RPO e RTO serao definidos formalmente antes de producao.

## Criterios de aceite

Este anexo estara atendido quando migracoes, upload, processamento, publicacao, rollback, backup e restauracao conjunta forem demonstrados; quando reiniciar ou recriar contêineres nao causar perda; e quando nenhum binario permanecer no PostgreSQL ou for publicado antes das validacoes tecnicas.
