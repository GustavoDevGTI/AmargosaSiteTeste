# PNTP Amargosa - especificacao reorganizada e revisada

Esta pasta contem uma versao enxuta, revisada e sem repeticoes desnecessarias dos tres documentos originais:

- `ETAPA-1-REQUISITOS-ESSENCIAIS-PNTP-2026.md`
- `ETAPA-2-ARQUITETURA-E-BACKEND.md`
- `ETAPA-3-DESIGN-E-MODELO-MULTIPREFEITURA.md`

Os originais foram preservados. Esta copia reorganiza o conteudo para ser mais facil de usar por uma equipe de desenvolvimento, por uma IA implementadora e pela Prefeitura. As decisoes de servidor fisico, Docker, Portainer e PostgreSQL local foram consolidadas nesta revisao.

## Ordem de leitura

1. `00-REGRAS-GERAIS.md`
2. `01-MATRIZ-PNTP-ESSENCIAIS.md`
3. `02-ARQUITETURA-E-BACKEND.md`
4. `02A-INFRAESTRUTURA-SERVIDOR-E-DEPLOY.md`
5. `02B-POSTGRES-MIDIAS-E-PROCESSAMENTO.md`
6. `02C-SEGURANCA-ADMIN-E-AUDITORIA.md`
7. `03-DESIGN-E-UX.md`
8. `appendices/01-AUDITORIA-AMARGOSA.md`
9. `appendices/02-PESQUISA-REFERENCIAS.md`

Os arquivos `02A`, `02B` e `02C` sao normativos. Eles detalham a arquitetura sem transformar novamente o arquivo principal em um documento excessivamente grande.

## O que mudou

- As instrucoes repetidas de autoridade, linguagem normativa e uso por IA foram consolidadas em `00-REGRAS-GERAIS.md`.
- Os 12 criterios essenciais do PNTP foram transformados em matriz objetiva, com rota, requisito minimo, teste e evidencia.
- As decisoes tecnicas ficaram concentradas em `02-ARQUITETURA-E-BACKEND.md`.
- A operacao no servidor fisico ficou detalhada em `02A-INFRAESTRUTURA-SERVIDOR-E-DEPLOY.md`.
- PostgreSQL, armazenamento de arquivos e tarefas assincronas ficaram detalhados em `02B-POSTGRES-MIDIAS-E-PROCESSAMENTO.md`.
- Administradores, controle de acesso e auditoria ficaram detalhados em `02C-SEGURANCA-ADMIN-E-AUDITORIA.md`.
- As regras de experiencia, componentes, design system, acessibilidade e personalizacao ficaram em `03-DESIGN-E-UX.md`.
- A auditoria de Amargosa e a pesquisa de portais foram movidas para apendices. Elas continuam importantes, mas deixam de interromper a especificacao principal.

## Como usar na implementacao

Use a matriz de rastreabilidade como artefato vivo. Cada requisito deve apontar para:

- pagina ou rota;
- modulo responsavel;
- fonte oficial dos dados;
- regra administrativa que protege o requisito;
- teste de aceitacao;
- evidencia publica.

Nenhuma tela, componente, importacao, integracao ou melhoria visual deve ser tratada como pronta sem teste verificavel e URL publica reproduzivel.

Quando houver conflito entre um resumo e um anexo tecnico, aplicar a ordem de autoridade definida em `00-REGRAS-GERAIS.md`. Valores ainda nao confirmados deverao permanecer marcados como pendentes, nunca inventados pela IA.
