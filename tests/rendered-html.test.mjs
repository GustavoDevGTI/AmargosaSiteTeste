import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the current municipal builder", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Construtor Municipal · Protótipo PNTP<\/title>/i);
  assert.match(html, />Selecione a estrutura</);
  assert.match(html, />Estrutura<\/button><button class="">Modelos<\/button>/);
  assert.match(html, />Design<\/button><button class="">PNTP<\/button>/);
  assert.match(html, /Acessibilidade/);
  assert.match(html, /Rodapé e contato/);
  assert.match(html, /ACESSOS PÚBLICOS/);
  assert.doesNotMatch(html, />PROTEGIDO</);
  assert.doesNotMatch(html, />VISUAL</);
  assert.doesNotMatch(html, /PROJEÇÃO PREVENTIVA/);
  assert.doesNotMatch(html, /PNTP <span>80/);
});

test("keeps seven design options and local media controls for every segment", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  const segmentNames = [
    "utility",
    "header",
    "menu",
    "search",
    "hero",
    "services",
    "news",
    "transparency",
    "footer",
  ];

  for (const name of segmentNames) {
    const line = page.split("\n").find((entry) => entry.trimStart().startsWith(`${name}:{label:`));
    assert.ok(line, `missing options for ${name}`);
    assert.equal((line.match(/\[\[|\],\[/g) ?? []).length, 7, `${name} should expose seven options`);
  }

  assert.match(page, /type="file"/);
  assert.match(page, /image\/png,image\/jpeg,image\/webp,image\/gif/);
  assert.match(page, /5\*1024\*1024/);
  assert.match(page, /Cor deste segmento/);
  assert.match(css, /Sete variações por segmento/);
  assert.match(css, /has-image-hero/);
  assert.match(css, /has-color-transparency/);
});

test("keeps Recife, Belem and Belo Horizonte headers structurally distinct", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /id:"recife"[^\n]+header:"service"/);
  assert.match(page, /id:"belem"[^\n]+header:"institutional"/);
  assert.match(page, /id:"belo-horizonte"[^\n]+header:"controlled"/);
  assert.match(page, /itemAttrs\("header","search","header-search"\)/);
  assert.match(page, /itemAttrs\("header","cta","header-cta"\)/);

  assert.match(css, /Recife: marca à esquerda, links e busca à direita/);
  assert.match(css, /header-service \.header-search[^}]+display:flex/);
  assert.match(css, /Belém: menu à esquerda, busca central e marca à direita/);
  assert.match(css, /header-institutional \.city-brand\{grid-column:3/);
  assert.match(css, /Belo Horizonte: marca, navegação central e CTA lateral/);
  assert.match(css, /header-controlled \.header-cta[^}]+display:inline-flex/);
});

test("supports selecting and styling individual items inside every segment", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const segmentItems: Record<SectionId,SegmentItem\[]>/);
  assert.match(page, /Itens desta estrutura/);
  assert.match(page, /Ícone ou símbolo/);
  assert.match(page, /Fonte deste item/);
  assert.match(page, /Cor deste item/);
  assert.match(page, /Formato deste item/);
  assert.match(page, /Restaurar somente este item/);
  assert.match(page, /data-builder-item/);
  assert.match(page, /builder-item-selected/);
  assert.match(page, /onClickCapture/);

  assert.match(css, /Edição em dois níveis: segmento e item interno/);
  assert.match(css, /\.segment-item-list/);
  assert.match(css, /\.item-custom-font/);
  assert.match(css, /\.item-custom-color/);
  assert.match(css, /\.item-format-pill/);
  assert.match(css, /\.builder-item-selected/);
});
