# Construtor visual — Portal de Amargosa

Protótipo navegável de um construtor de portais municipais. O projeto inclui um
site institucional de teste com a identidade visual de Amargosa, componentes
inspirados exclusivamente em portais certificados pelo PNTP e controles
demonstrativos de conformidade.

> A estimativa PNTP apresentada na interface é demonstrativa e não representa
> certificação oficial.

## O que está incluído

- construtor visual com canvas do site público;
- troca independente de barra acessível, cabeçalho, menu, busca, carrossel,
  serviços, notícias, transparência e rodapé;
- contrato modular único inspirado na estrutura genérica do iPrefeituras;
- encaixes compartilhados de largura, espaçamento e responsividade entre todos
  os segmentos;
- edição de tipografia, cores, largura, espaçamento e cantos;
- mistura livre de segmentos de templates diferentes;
- visualização em desktop, tablet e celular;
- árvore de blocos protegidos, restritos e opcionais;
- biblioteca de templates referenciada em portais com medalha PNTP 2025;
- checklist PNTP lateral;
- bloqueio preventivo de mudanças com estimativa técnica inferior a 75%;
- documentação funcional, técnica, de design, segurança e infraestrutura na
  pasta [`documentacao`](./documentacao).

## Requisitos para instalação local

- Git;
- Node.js 22.13 ou superior;
- npm, instalado juntamente com o Node.js;
- Windows, macOS ou Linux.

Confira as versões instaladas:

```bash
git --version
node --version
npm --version
```

## Instalação do construtor com o site de teste

### 1. Clonar o repositório

```bash
git clone https://github.com/GustavoDevGTI/AmargosaSiteTeste.git
cd AmargosaSiteTeste
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o construtor

```bash
npm run preview:share
```

O terminal exibirá dois endereços:

- `Local`: abre o construtor no mesmo computador;
- `Network`: permite abrir o construtor em outro computador ou celular que
  esteja conectado à mesma rede local.

Normalmente o endereço local será:

```text
http://localhost:5173/
```

Mantenha o terminal aberto enquanto estiver usando o construtor. Para encerrar,
pressione `Ctrl + C`.

### 4. Testar o site dentro do construtor

Na interface é possível:

1. escolher um template medalhista na lateral esquerda;
2. misturar segmentos visuais de cidades diferentes na lateral direita;
3. alterar cores, fonte, largura, espaçamento e forma dos componentes;
4. trocar entre desktop, tablet e celular na barra superior;
5. abrir a página de Obras pelo card correspondente;
6. executar a validação PNTP demonstrativa.

As mudanças realizadas no navegador são apenas demonstrativas e não são
gravadas em banco de dados nesta versão do protótipo.

## Referências certificadas do catálogo

As notas abaixo vêm da base oficial do PNTP 2025, no recorte Executivo
Municipal. A identidade, os textos e as imagens do protótipo continuam sendo de
Amargosa; os portais servem apenas como referência estrutural e visual.

O modelo genérico do construtor usa como referência de arquitetura o
[demonstrador do iPrefeituras](https://demo.iprefeituras.com.br/). Ele define a
sequência e os pontos de encaixe; não é apresentado como template certificado.
Cada template municipal aplica suas características sobre essa mesma estrutura,
sem trocar o conteúdo ou criar marcações incompatíveis.

| Referência | Medalha | Índice PNTP 2025 |
| --- | --- | ---: |
| Campo Grande/MS | Diamante | 100,00% |
| Aracaju/SE | Diamante | 97,49% |
| Uberlândia/MG | Diamante | 97,10% |
| Belo Horizonte/MG | Diamante | 95,00% |
| Curitiba/PR | Ouro | 94,16% |
| Recife/PE | Ouro | 92,90% |
| Salvador/BA | Prata | 77,46% |
| Belém/PA | Prata | 76,91% |

Fonte: [Radar Nacional da Transparência Pública](https://radardatransparencia.atricon.org.br/),
base de dados de 2025 atualizada em 10/02/2026.

## Compartilhar na rede local

Execute:

```bash
npm run preview:share
```

Envie ao colega o endereço `Network` mostrado no terminal. Os dois computadores
precisam estar na mesma rede, e o computador que executa o projeto deve
permanecer ligado. No Windows, autorize o Node.js em redes privadas se o
Firewall solicitar permissão.

## Verificar a compilação

Antes de enviar alterações, execute:

```bash
npm run build
```

## Estrutura principal

```text
app/
  page.tsx          Interface e comportamento do construtor
  globals.css       Tema, layout e responsividade
public/
  amargosa-praca.jpeg
documentacao/
  04-CONSTRUTOR-VISUAL-E-CONFORMIDADE-PNTP.md
  revisada/
vite.local.config.ts
package.json
```

## Atualizar o projeto local

Quando houver mudanças no GitHub:

```bash
git pull
npm install
npm run preview:share
```
