# 00 - Regras gerais do projeto

> Escopo: regras transversais que valem para requisitos PNTP, arquitetura, backend, design, administracao, testes, implantacao e auditoria.

## Autoridade

Quando houver conflito, aplicar esta ordem:

1. legislacao vigente, matriz e cartilha oficial mais recente do PNTP;
2. decisoes formais da Prefeitura e da Controladoria que nao reduzam obrigacoes legais;
3. matriz PNTP essencial deste projeto;
4. arquitetura e controles tecnicos aprovados;
5. anexos tecnicos de infraestrutura, dados e seguranca;
6. regras de design, acessibilidade e personalizacao;
7. preferencias esteticas, referencias externas e sugestoes editoriais.

Antes de declarar conformidade, elegibilidade a medalha ou criterio validado, confirmar a versao vigente da matriz e da cartilha do PNTP. Se uma fonte oficial posterior alterar requisito, atualizar a matriz e registrar a divergencia.

## Linguagem normativa

- **Devera / obrigatorio / requisito minimo:** condicao indispensavel.
- **Nao podera / proibido:** comportamento que o sistema deve impedir.
- **Preferencialmente:** caminho recomendado, substituivel apenas por solucao equivalente ou superior.
- **Podera:** opcao permitida, desde que respeite as validacoes.
- **Pendente / a confirmar:** decisao que nao deve ser inventada.
- **Referencia / observado:** diagnostico ou inspiracao, nunca autorizacao para copiar codigo, layout, conteudo, credenciais ou fragilidades.

## Principios nao negociaveis

1. Informacao publica deve ser acessivel sem login, cadastro, CAPTCHA para consulta simples ou barreira tecnica indevida.
2. Cada criterio essencial deve possuir URL publica, direta, estavel e registravel como evidencia.
3. Pagina visivel nao prova atendimento. O fluxo completo deve funcionar: filtros, detalhe, historico, download, atualizacao e evidencia.
4. Dados ficticios, mocks, placeholders ou informacoes incompletas nao podem ser marcados como conformidade.
5. Quando o conteudo depender de fornecedor externo, o portal municipal continua responsavel por pagina canonica, contexto, monitoramento, contingencia e evidencia.
6. Alteracoes editoriais ou visuais nao podem ocultar Transparencia, e-SIC/Acesso a Informacao, Ouvidoria, Diario Oficial, Carta de Servicos ou paginas canonicas do PNTP.
7. Requisitos criticos devem ser protegidos no backend ou na infraestrutura, nao apenas no navegador.
8. Auditoria administrativa, metricas publicas e eventos tecnicos de seguranca devem ser separados.
9. Senhas, tokens, documentos pessoais, enderecos internos, segredos e credenciais nao devem aparecer em codigo, fixtures, logs ou documentacao versionada.
10. Acessibilidade deve ser estrutural. Barra de acessibilidade, VLibras, Hand Talk ou recurso semelhante nao substitui semantica, teclado, foco, contraste e alternativa textual.
11. A producao sera executada em servidor fisico administrado pela Prefeitura, com Docker e Portainer; o PostgreSQL e o armazenamento de objetos serao locais e privados.
12. Backup mantido somente no mesmo servidor fisico nao sera considerado copia de recuperacao.
13. Portainer, backup, restauracao, banco e operacao de infraestrutura nao farao parte do painel editorial do sitio.
14. Cada implantacao municipal usara banco, arquivos, credenciais, auditoria e volumes isolados; nao sera criado banco multicliente na primeira versao.

## Matriz de rastreabilidade

Antes da implementacao e durante sua evolucao, manter matriz com no minimo:

| Campo | Finalidade |
|---|---|
| ID do requisito | Relacionar implementacao ao PNTP ou a decisao tecnica |
| Pagina ou rota | Definir onde o cidadao encontra a informacao |
| Fonte oficial | Identificar sistema, documento, API ou setor produtor |
| Estrategia de integracao | API, importacao, sincronizacao, documento local ou link monitorado |
| Modulo responsavel | Backend, frontend, admin, dados, arquivos, auditoria ou infraestrutura |
| Regra administrativa | Proteger contra edicao que quebre o requisito |
| Teste de aceitacao | Demonstrar funcionamento de ponta a ponta |
| Evidencia | Registrar URL, data, resultado e arquivo quando houver |
| Estado | Nao iniciado, bloqueado, implementado, validado ou reprovado |

## Estados de entrega

### Esqueleto tecnico

Pode ser considerado esqueleto quando houver estrutura executavel, banco e migracao inicial, aplicacoes separadas, contrato inicial da API, autenticacao planejada, Dockerfiles, Stack inicial do Portainer, redes e volumes declarados, ambiente local reproduzivel e testes basicos.

### Homologacao

Pode ir para homologacao quando houver integracoes reais ou claramente simuladas como tal, uploads processados, auditoria protegida, regras de autorizacao no backend, stack implantavel, Nginx e Cloudflare documentados, testes de integracao, seguranca e acessibilidade executaveis.

### Producao

So pode ser chamado pronto para producao quando dados reais, integracoes, backup, restauracao, rollback, observabilidade, origem protegida, testes PNTP de ponta a ponta e evidencias publicas estiverem validados.

Se existir bloqueio, dado ficticio, integracao simulada, documento ausente ou teste nao executado, o item correspondente deve permanecer como **nao validado**.
