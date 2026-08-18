# 01 - Matriz PNTP dos criterios essenciais

> Escopo: requisitos minimos para que o portal de Amargosa remova o bloqueio metodologico dos criterios essenciais do PNTP 2026.

Fonte de referencia: Matriz de Criterios PNTP 2026 publicada pela Atricon em 31/03/2026 e Cartilha PNTP 2026 atualizada em 08/04/2026. Antes de cada ciclo de avaliacao, a Controladoria devera confirmar se essas fontes continuam vigentes.

Cumprir estes itens e condicao de elegibilidade para medalha, mas nao garante Prata, Ouro ou Diamante. A pontuacao total depende dos demais criterios obrigatorios e recomendados.

## Regras comuns

- A informacao deve ser publica, sem login, cadastro ou CAPTCHA para consulta simples.
- Cada criterio deve ter URL canonica no dominio oficial, mesmo quando exibir ou referenciar sistema externo.
- Atendimento e tudo ou nada: se disponibilidade for rejeitada, o criterio recebe nota zero nos demais itens associados.
- Receitas, despesas e empenhos devem oferecer dados pesquisaveis em HTML e exportacao em formato editavel quando exigido.
- PDF isolado nao substitui base editavel para consultas de dados.
- A data exibida deve representar atualizacao real do conteudo, nao a data da visita.
- Serie historica minima: tres anos anteriores a pesquisa, alem do exercicio atual quando houver dados.
- Mudanca de sistema deve preservar historico, redirecionamento e delimitacao clara de periodos.
- Declaracao de nao ocorrencia so pode ser usada quando o fato realmente nao tiver ocorrido e deve indicar periodo, data da verificacao e responsavel.

## Rotas canonicas minimas

```text
/
/transparencia
/transparencia/receitas/execucao
/transparencia/receitas/natureza
/transparencia/despesas/execucao
/transparencia/despesas/classificacao
/transparencia/despesas/empenhos
/transparencia/relatorios/rgf
/transparencia/relatorios/rreo
/transparencia/planejamento/ppa
/transparencia/planejamento/ldo
/transparencia/planejamento/loa
```

## Matriz dos 12 essenciais

| ID | Criterio | Rota canonica | Requisito minimo | Teste e evidencia |
|---|---|---|---|---|
| 1.1 | Sitio oficial proprio | `/` | Dominio oficial da Prefeitura, HTTPS valido, identificacao inequivoca do Municipio e Poder Executivo, funcionamento em computador e celular. | Acessar sem autenticacao em dias/redes diferentes e registrar URL, data, HTTPS e captura auxiliar. |
| 1.2 | Portal da Transparencia | `/transparencia` | Link ou atalho claro no sitio oficial; abertura direta no recorte de Amargosa; consulta sem login. | Partir da home, abrir Transparencia e confirmar que o conteudo e de Amargosa sem selecionar orgao em lista generica. |
| 3.1 | Receita prevista e realizada | `/transparencia/receitas/execucao` | Receita prevista e realizada na mesma consulta; exercicio, periodo, unidade, data real de atualizacao, historico, filtros por exercicio e mes/periodo, exportacao editavel. | Selecionar exercicio e periodo, comparar valores previsto/realizado, conferir atualizacao e exportar o mesmo resultado. |
| 3.2 | Receita por natureza | `/transparencia/receitas/natureza` | Categoria economica, origem, especie, desdobramento, codigo completo, descricoes, valor realizado, periodo, atualizacao, filtros por niveis e exportacao da base completa. | Buscar por codigo e descricao, navegar pelos niveis, validar valores e exportar todos os campos exigidos. |
| 4.1 | Totais empenhado, liquidado e pago | `/transparencia/despesas/execucao` | Tres estagios da despesa na mesma consulta; exercicio, periodo, unidade, data real, historico, filtros e exportacao editavel. | Selecionar periodo, visualizar os tres totais lado a lado, conferir coerencia e exportar resultado filtrado. |
| 4.2 | Classificacao orcamentaria da despesa | `/transparencia/despesas/classificacao` | Unidade orcamentaria, funcao, subfuncao, categoria economica, grupo, elemento, fonte, codigos, descricoes, valores, periodo e atualizacao. | Filtrar por ano/periodo/classificacao, verificar codigos e descricoes de todos os niveis e exportar relatorio completo. |
| 4.3 | Detalhe de empenhos | `/transparencia/despesas/empenhos` | Numero, data, credor, CPF/CNPJ conforme regra legal, valor, objeto, modalidade e numero da licitacao ou contratacao direta, periodo, atualizacao, filtros e exportacao. | Pesquisar empenho por numero e credor, abrir detalhe, identificar objeto e procedimento de contratacao, exportar resultado. |
| 11.5 | RGF | `/transparencia/relatorios/rgf` | Secao especifica com relatorio completo, anexos, exercicio, quadrimestre/semestre, data de publicacao, historico de tres anos e filtro por periodo. | Localizar ultimo RGF exigivel, confirmar anexos e acessar periodos historicos por filtro. |
| 11.6 | RREO | `/transparencia/relatorios/rreo` | Secao especifica com relatorio completo, anexos, exercicio, bimestre, data de publicacao, historico de tres anos e filtro por periodo. | Localizar ultimo RREO exigivel, confirmar anexos e acessar periodos historicos por filtro. |
| 11.8 | PPA | `/transparencia/planejamento/ppa` | Secao propria com lei vigente, anexos, alteracoes, periodo quadrienal e data de publicacao. | Acessar PPA diretamente e baixar lei vigente com anexos e alteracoes aplicaveis. |
| 11.9 | LDO | `/transparencia/planejamento/ldo` | Secao propria com LDO vigente, anexos, alteracoes, exercicio e data de publicacao. | Acessar LDO diretamente e baixar lei vigente com anexos e alteracoes aplicaveis. |
| 11.10 | LOA | `/transparencia/planejamento/loa` | Secao propria com LOA vigente, quadros, demonstrativos, anexos, alteracoes vinculadas quando aplicavel, exercicio e data de publicacao. | Acessar LOA diretamente e baixar lei vigente com quadros e anexos. |

## Teste contra falsa disponibilidade

Um criterio so pode ser marcado como validado depois que teste manual ou automatizado confirmar:

1. abertura em janela anonima e sem sessao anterior;
2. pertencimento da informacao a Prefeitura de Amargosa;
3. exercicio e periodo corretos;
4. filtros obrigatorios combinaveis;
5. codigos, descricoes, datas e valores coerentes;
6. detalhe individual quando aplicavel;
7. exportacao editavel aberta com sucesso;
8. campos minimos presentes no arquivo exportado;
9. serie historica exigida;
10. funcionamento em celular e por teclado;
11. ausencia de bloqueio por contrato, autenticacao, CAPTCHA, conteudo misto ou erro de `iframe`;
12. registro de URL, data, resultado e evidencia.

Uma pagina que abre, mas cujo detalhe, filtro, historico ou download obrigatorio falha, permanece **nao atendida**.

## Protecao administrativa dos essenciais

O painel administrativo nao pode permitir:

- excluir ou despublicar pagina essencial;
- remover Transparencia da navegacao protegida;
- remover filtros, campos obrigatorios, historico ou download;
- substituir URL canonica sem redirecionamento;
- publicar dado essencial sem data real de atualizacao;
- remover definitivamente documento vigente ou historico sem retencao, versao e justificativa;
- trocar fonte dos dados sem nova validacao da Controladoria;
- publicar pagina de teste, duplicada ou com URL invalida em producao;
- substituir conteudo essencial por link externo generico ou nao verificado;
- alterar ou excluir a propria trilha de auditoria.

## Governanca e rotina de verificacao

A Controladoria sera proprietaria institucional desta matriz. Cada criterio devera registrar setor titular, sistema produtor, responsavel pela integracao/publicacao, responsavel pela validacao, periodicidade, contrato relacionado e substituto formal.

Rotina minima:

- diariamente: verificar sincronizacoes de receitas, despesas e empenhos, incluindo abertura de registros individuais;
- semanalmente: testar URLs, HTTPS, links externos, filtros, detalhes e downloads dos essenciais;
- mensalmente: conferir atualizacao real, serie historica e schema dos arquivos exportados;
- bimestralmente: conferir RREO e anexos exigiveis;
- quadrimestral ou semestralmente: conferir RGF conforme o regime municipal;
- anualmente: conferir PPA, LDO, LOA, alteracoes e anexos vigentes;
- antes da autoavaliacao: repetir os testes em janela anonima, celular e navegacao por teclado;
- em troca ou renovacao de fornecedor: validar portabilidade, historico, URLs, contingencia e funcionamento antes de desligar o sistema anterior.

Cada execucao devera registrar URL exata, data/hora, responsavel, periodo, filtros, detalhe aberto, arquivo exportado, resultado, falha encontrada e evidencia auxiliar. Captura de tela sera auxiliar; a URL publica reproduzivel continuara sendo a evidencia principal.
