# Construtor visual — Portal de Amargosa

Protótipo navegável de um construtor de portais municipais. O projeto inclui um
site institucional de teste com a identidade visual de Amargosa, uma composição
inspirada no portal da Prefeitura do Recife e controles demonstrativos de
conformidade PNTP.

> A estimativa PNTP apresentada na interface é demonstrativa e não representa
> certificação oficial.

## O que está incluído

- construtor visual com canvas do site público;
- edição de título e descrição em tempo real;
- variantes, alinhamento e densidade do destaque;
- visualização em desktop, tablet e celular;
- árvore de blocos protegidos, restritos e opcionais;
- biblioteca homologada de componentes;
- checklist PNTP lateral;
- simulação de validação e bloqueio de publicação;
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

1. editar o título e a descrição na lateral direita;
2. alternar a variante e o alinhamento do destaque;
3. trocar entre desktop, tablet e celular na barra superior;
4. abrir a biblioteca de blocos na lateral esquerda;
5. executar a validação PNTP demonstrativa;
6. tentar publicar para visualizar a simulação de bloqueio por critério
   essencial.

As mudanças realizadas no navegador são apenas demonstrativas e não são
gravadas em banco de dados nesta versão do protótipo.

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
