# Apendice 01 - Auditoria resumida de Amargosa

> Origem: condensado da auditoria descrita na Etapa 1 original. Este apendice e diagnostico e contexto; os requisitos executaveis estao na matriz PNTP e nos documentos de arquitetura/design.

Este apendice nao autoriza copiar a arquitetura, o painel administrativo, as credenciais ou as fragilidades do sistema atual. Na implementacao, as conclusoes executaveis deverao ser rastreadas para `01-MATRIZ-PNTP-ESSENCIAIS.md`, `02-ARQUITETURA-E-BACKEND.md` e seus anexos tecnicos.

## Finalidade

Em 10/08/2026, o sitio oficial e os sistemas externos ligados ao Portal da Transparencia de Amargosa foram confrontados com os 12 criterios essenciais do PNTP tratados neste projeto.

A finalidade foi preventiva:

- identificar problemas que nao podem ser reproduzidos no novo portal;
- entender a fragmentacao de sistemas;
- separar o que e responsabilidade do sistema de origem e o que deve ser responsabilidade do novo portal;
- transformar falhas observadas em requisitos duradouros de governanca, evidencia e continuidade.

A area administrativa do sitio atual tambem foi examinada com acesso autorizado e somente em modo de leitura. Essa inspecao nao foi teste de invasao.

## Evidencias publicas consultadas

- Base PNTP 2025 da Atricon: <https://radardatransparencia.atricon.org.br/dados/dados_pntp_2025.zip>
- Sitio institucional: <https://amargosa.ba.gov.br/>
- Portal da Transparencia: <https://www.amargosa.ba.gov.br/portal-da-transparencia>
- Receitas: <https://www.amargosa.ba.gov.br/receitas>
- Consulta atual de receitas: <https://lc131.radarpublico.com/portal.php?modulo=receita&nomeentidade=amargosa>
- Despesas: <https://www.amargosa.ba.gov.br/despesas>
- Consulta atual de despesas: <https://lc131.radarpublico.com/portal.php?modulo=despesa&nomeentidade=amargosa>
- Instrumentos de planejamento: <https://www.amargosa.ba.gov.br/instrumentos-de-planejamento->
- Painel de RGF/RREO: <https://pmamargosaba.imprensaoficial.org/relatorios-rgf-rreo/>

## Resultado PNTP usado como contexto

No PNTP 2025, Amargosa registrou indice geral de 48,23%, nivel Basico. Naquele ciclo, os criterios essenciais 11.9 (LDO) e 11.10 (LOA) foram rejeitados.

A situacao observada em 2026 era diferente: PPA, LDO e LOA vigentes foram localizados em pagina de planejamento, com arquivos e anexos. Por isso, o resultado de 2025 deve ser tratado como diagnostico historico, nao como retrato automatico de 2026.

## Ecossistema atual de transparencia

O portal atual nao e um sistema unico. Ele coordena, de forma fragil, varias origens:

| Area | Origem identificada | Risco para o novo projeto |
|---|---|---|
| Sitio institucional, noticias e paginas locais | Dominio municipal e plataforma contratada | Conteudo local nao concentra todos os dados de transparencia |
| Receitas e despesas historicas | Municipio Online | Historico precisa continuar acessivel apos migracao |
| Receitas, despesas, empenhos, servidores e diarias atuais | Radar Publico / LC131 | Consulta e exportacao dependem de contrato, parametros e disponibilidade externa |
| Diario Oficial, licitacoes, contratos, RGF e RREO | Imprensa Oficial | Paineis e documentos dependem de fornecedor e links externos |
| PNCP | Portal Nacional de Contratacoes Publicas | Link precisa abrir recorte correto de Amargosa |
| PPA, LDO, LOA e documentos locais | Arquivos municipais e Diario Oficial | Precisam de classificacao, versao e paginas proprias |
| e-SIC e Ouvidoria | Paginas locais e 1Doc | Inicio local, protocolo externo |
| Legislacao | Leis Municipais e Diario Oficial | Links devem ser profundos e contextualizados |
| Tributos | SAATRI | Sistema especializado diferente da transparencia contabil |
| Processos | SEI Bahia | Ambiente estadual externo precisa de orientacao clara |

## Causas estruturais dos problemas

1. Fragmentacao de plataformas.
2. Dependencia contratual de funcoes essenciais.
3. Separacao historica entre sistemas antigos e atuais.
4. Responsabilidade distribuida entre setores, fornecedores, TI e Controladoria.
5. Ritmos diferentes de atualizacao por tipo de dado.
6. Formatos heterogeneos: tabelas, planilhas, PDFs, paineis e paginas externas.
7. URLs instaveis por sessoes, parametros, iframes e trocas de fornecedor.
8. Portabilidade incompleta ao fim de contratos.
9. Validacao superficial baseada apenas em link abrindo.
10. Ausencia de painel central de saude, evidencia e responsaveis.

## Diagnostico preventivo dos essenciais

| Criterio | Situacao observada | Licao |
|---|---|---|
| 1.1 | Sitio oficial em dominio proprio e HTTPS | Manter dominio, seguranca e acesso publico |
| 1.2 | Transparencia acessivel a partir do sitio | Preservar acesso destacado e URL canonica |
| 3.1 | Receita prevista/realizada aparecem juntas, mas filtro de mes/periodo nao ficou comprovado | A mesma consulta deve combinar periodo, previsto, realizado, atualizacao e exportacao |
| 3.2 | Codigo, descricao, valor, periodo e exportacao localizados; filtros por todos os niveis nao comprovados | Testar categoria, origem, especie e desdobramento |
| 4.1 | Totais empenhado, liquidado e pago localizados | Manter os tres estagios na mesma consulta e validar exportacao |
| 4.2 | Varios filtros localizados; exportacao completa nao comprovada | Validar schema do arquivo exportado |
| 4.3 | Lista visivel, mas detalhe retornou mensagem de periodo contratado encerrado | Nenhum essencial pode depender de funcao bloqueada por contrato |
| 11.5 | RGF localizado em painel externo | Criar secao local especifica e verificar anexos |
| 11.6 | RREO localizado no mesmo painel externo | Criar secao local separada de RGF |
| 11.8 | PPA 2026-2029 localizado | Manter pagina canonica exclusiva |
| 11.9 | LDO vigente localizada | Nao depender de busca no Diario Oficial |
| 11.10 | LOA vigente localizada | Manter quadros, anexos e alteracoes vinculadas |

Bloqueios de alto risco ate teste integral: **3.1, 3.2, 4.2 e 4.3**.

## Erros a nao repetir

- Colecao de links externos sem controle de disponibilidade.
- Criterio considerado atendido porque a primeira tabela abriu.
- Dependencia exclusiva de contrato de fornecedor para conteudo essencial.
- Mensagem de contrato encerrado, licenca expirada, sessao invalida ou conteudo indisponivel.
- Busca geral substituindo filtros especificos.
- Campos que deveriam ser comparados na mesma consulta separados em paginas diferentes.
- Exportacao que omite campos ou exporta apenas pagina visivel.
- URL generica como evidencia de varios criterios.
- RGF, RREO, PPA, LDO e LOA misturados em listagens gerais.
- `iframe` externo sem monitoramento.
- Conteudo misto HTTP em pagina HTTPS.
- Perda de serie historica na troca de sistema.
- Data de atualizacao falsa baseada na visita.
- Paginas essenciais tratadas como conteudo editorial comum.
- Auditoria alteravel pela propria interface auditada.
- Backup, infraestrutura e publicacao editorial concentrados no mesmo painel.

## Solucao institucional recomendada

O novo portal deve atuar como **camada municipal de coordenacao da transparencia**:

- pagina canonica local para cada criterio;
- integracao ou importacao quando houver API/exportacao;
- copia integra e versionada de documentos oficiais quando juridicamente adequado;
- link profundo monitorado quando integracao nao for possivel;
- preservacao de historico em sistemas antigos;
- contexto claro sobre fonte, periodo, responsavel, ultima verificacao e contingencia.

## Requisitos para contratos e migracao

Contratos relacionados a transparencia devem prever, quando juridicamente aplicavel:

- acesso publico continuo;
- portabilidade de dados;
- exportacao documentada;
- API ou mecanismo automatizavel;
- HTTPS e URLs estaveis;
- prazo de correcao de falhas criticas;
- aviso previo de mudanca de dominio ou estrutura;
- periodo de transicao;
- preservacao de historico.

A migracao ao novo sitio so deve ocorrer depois de inventario de sistemas, responsaveis, URLs, contratos, historico, redirecionamentos, integracoes, contingencias, operacao paralela e aprovacao formal da Controladoria.
