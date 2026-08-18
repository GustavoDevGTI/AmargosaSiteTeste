"use client";

import { useState, type CSSProperties } from "react";

type Device = "desktop" | "tablet" | "mobile";
type PortalPage = "home" | "obras";
type HeaderStyle = "recife" | "belem" | "salvador" | "essential";
type MenuStyle = "recife" | "belem" | "salvador" | "minimal";
type HeroStyle = "recife" | "belem" | "salvador" | "search";
type ServicesStyle = "icons" | "cards" | "list";
type FooterStyle = "institutional" | "compact" | "portal";
type FontStyle = "inter" | "source" | "montserrat" | "merriweather";

type DesignConfig = {
  header: HeaderStyle;
  menu: MenuStyle;
  hero: HeroStyle;
  services: ServicesStyle;
  footer: FooterStyle;
  font: FontStyle;
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  width: "wide" | "contained";
  spacing: "compact" | "comfortable" | "airy";
  radius: "square" | "soft" | "round";
};

const serviceCards = [
  ["SA", "Saúde", "Agendamentos e unidades"],
  ["ED", "Educação", "Matrícula e calendário"],
  ["TR", "Tributos", "IPTU, taxas e certidões"],
  ["OB", "Obras", "Licenças e solicitações"],
];

const recifeServiceAccess = [
  ["R$", "Tributos"], ["✎", "Licitações"], ["♻", "Meio ambiente"], ["↔", "Planejamento"],
  ["✚", "Saúde"], ["⌂", "Assistência social"], ["▥", "Habitação"], ["◇", "Segurança"],
];

const essentialLinks = ["Transparência", "e-SIC", "Ouvidoria", "Diário Oficial", "Carta de Serviços"];
const heroTitle = "Serviços públicos de um jeito simples.";
const heroDescription = "Encontre informações, solicite atendimentos e acompanhe a Prefeitura em um só lugar.";

const layers = [
  ["Cabeçalho", "protected"],
  ["Destaque principal", "selected"],
  ["Busca de serviços", "protected"],
  ["Serviços prioritários", "restricted"],
  ["Acessos essenciais", "protected"],
  ["Notícias e agenda", "optional"],
  ["Rodapé", "protected"],
];

const worksLayers = [
  ["Cabeçalho", "protected"],
  ["Breadcrumb", "protected"],
  ["Título e metadados", "protected"],
  ["Serviços de Obras", "restricted"],
  ["Obras em andamento", "restricted"],
  ["Contato da Secretaria", "protected"],
  ["Rodapé", "protected"],
];

const defaultDesign: DesignConfig = {
  header: "recife",
  menu: "belem",
  hero: "salvador",
  services: "icons",
  footer: "institutional",
  font: "inter",
  primary: "#157c62",
  secondary: "#51b89e",
  accent: "#cf304c",
  surface: "#fff8f6",
  width: "wide",
  spacing: "comfortable",
  radius: "soft",
};

const templates: Array<{ id: string; name: string; reference: string; description: string; config: DesignConfig }> = [
  { id: "amargosa", name: "Essencial Amargosa", reference: "Base municipal", description: "Busca, serviços e transparência em primeiro plano.", config: defaultDesign },
  { id: "recife", name: "Serviços laterais", reference: "Inspirado em Recife", description: "Cabeçalho utilitário, públicos e grade lateral de serviços.", config: { ...defaultDesign, header: "recife", menu: "recife", hero: "recife", services: "icons", footer: "portal", radius: "square" } },
  { id: "belem", name: "Menu cívico", reference: "Inspirado em Belém", description: "Acessibilidade forte, menu compacto e grande área editorial.", config: { ...defaultDesign, header: "belem", menu: "belem", hero: "belem", services: "cards", footer: "compact", spacing: "airy", radius: "soft" } },
  { id: "salvador", name: "Impacto visual", reference: "Inspirado em Salvador", description: "Cabeçalho em camadas e carrossel fotográfico de alta presença.", config: { ...defaultDesign, header: "salvador", menu: "salvador", hero: "salvador", services: "cards", footer: "institutional", width: "wide", radius: "square" } },
];

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean.length === 3 ? clean.split("").map((part) => part + part).join("") : clean, 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function contrastRatio(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const values = [r, g, b].map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function technicalScore(config: DesignConfig) {
  let score = 94.2;
  if (contrastRatio(config.primary, "#ffffff") < 4.5) score -= 22;
  if (contrastRatio(config.accent, "#ffffff") < 4.5) score -= 18;
  if (contrastRatio("#293731", config.surface) < 4.5) score -= 20;
  if (config.hero === "salvador") score -= 2.4;
  if (config.menu === "belem") score -= 1.2;
  if (config.spacing === "compact") score -= 1.8;
  return Math.max(0, Math.round(score * 10) / 10);
}

const sizes: Record<Device, string> = { desktop: "1440 × 900", tablet: "768 × 1024", mobile: "390 × 844" };

export default function Home() {
  const [portalPage, setPortalPage] = useState<PortalPage>("home");
  const [device, setDevice] = useState<Device>("desktop");
  const [leftTab, setLeftTab] = useState<"structure" | "templates">("templates");
  const [rightTab, setRightTab] = useState<"properties" | "pntp">("properties");
  const [toast, setToast] = useState<string | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const [design, setDesign] = useState<DesignConfig>(defaultDesign);
  const [activeTemplate, setActiveTemplate] = useState("amargosa");
  const [blockedChange, setBlockedChange] = useState<{ label: string; score: number } | null>(null);
  const pntpScore = technicalScore(design);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }

  function applyDesign(next: DesignConfig, label: string) {
    const projectedScore = technicalScore(next);
    if (projectedScore < 75) {
      setBlockedChange({ label, score: projectedScore });
      return;
    }
    setDesign(next);
    setActiveTemplate("custom");
  }

  function applyTemplate(template: (typeof templates)[number]) {
    const projectedScore = technicalScore(template.config);
    if (projectedScore < 75) {
      setBlockedChange({ label: `Template ${template.name}`, score: projectedScore });
      return;
    }
    setDesign(template.config);
    setActiveTemplate(template.id);
    notify(`${template.name} aplicado. Os módulos continuam combináveis.`);
  }

  const themeStyle = {
    "--theme-primary": design.primary,
    "--theme-secondary": design.secondary,
    "--theme-accent": design.accent,
    "--theme-surface": design.surface,
  } as CSSProperties;

  return (
    <main className="builder-shell">
      <header className="builder-topbar">
        <div className="brand-lockup">
          <span className="brand-mark">A</span>
          <div><strong>{portalPage === "obras" ? "Obras" : "Início"}</strong><small>Portal de Amargosa · Rascunho</small></div>
        </div>
        <div className="draft-status"><span /> Estimativa PNTP <strong>{pntpScore.toFixed(1)}%</strong><b>mínimo 75%</b></div>
        <div className="top-actions">
          <button className="icon-button" aria-label="Desfazer" onClick={() => notify("Nada para desfazer nesta demonstração")}>↶</button>
          <button className="icon-button" aria-label="Refazer" onClick={() => notify("Nada para refazer nesta demonstração")}>↷</button>
          <div className="device-switch" aria-label="Dispositivo de pré-visualização">
            {(["desktop", "tablet", "mobile"] as Device[]).map((item) => <button key={item} className={device === item ? "active" : ""} onClick={() => setDevice(item)}>{item === "desktop" ? "Desktop" : item === "tablet" ? "Tablet" : "Mobile"}</button>)}
          </div>
          <button className="button secondary" onClick={() => { setRightTab("pntp"); notify(`Validação concluída: ${pntpScore.toFixed(1)}%, acima do mínimo de 75%`); }}>Validar</button>
          <button className="button primary" onClick={() => setPublishOpen(true)}>Publicar</button>
        </div>
      </header>

      <aside className="left-panel">
        <div className="panel-tabs">
          <button className={leftTab === "structure" ? "active" : ""} onClick={() => setLeftTab("structure")}>Estrutura</button>
          <button className={leftTab === "templates" ? "active" : ""} onClick={() => setLeftTab("templates")}>Templates</button>
        </div>
        {leftTab === "structure" ? <>
          <div className="panel-heading"><span>{portalPage === "obras" ? "Obras e Urbanismo" : "Página inicial"}</span><button aria-label="Mais opções">•••</button></div>
          <nav className="layer-tree" aria-label="Estrutura da página">
            {(portalPage === "obras" ? worksLayers : layers).map(([label, kind]) => <button className={`layer ${kind}`} key={label} onClick={() => label === "Destaque principal" || label === "Título e metadados" ? setRightTab("properties") : notify(kind === "protected" ? `${label} é um bloco protegido` : `${label} selecionado`)}><span>≡</span><strong>{label}</strong>{kind === "protected" && <em>Protegido</em>}</button>)}
          </nav>
          <button className="add-block" onClick={() => setLeftTab("templates")}>▦ Trocar ponto de partida</button>
          <div className="legend"><span><i className="dot protected-dot" /> Protegido</span><span><i className="dot restricted-dot" /> Restrito</span></div>
        </> : <>
          <div className="panel-heading"><span>Templates genéricos</span><button aria-label="Informações">i</button></div>
          <div className="template-library">{templates.map((template) => <button className={activeTemplate === template.id ? "active" : ""} key={template.id} onClick={() => applyTemplate(template)}><span className={`template-thumb template-${template.id}`}><i /><i /><i /></span><span><small>{template.reference}</small><strong>{template.name}</strong><em>{template.description}</em></span>{activeTemplate === template.id && <b>Em uso</b>}</button>)}</div>
          <p className="library-note">Os templates são pontos de partida. Cabeçalho, menu, destaque, serviços e rodapé podem ser misturados livremente.</p>
        </>}
      </aside>

      <section className={`workspace preview-${device}`}>
        <div className="canvas-toolbar"><span>Prévia com conteúdo real</span><strong>{sizes[device]} · 100%</strong></div>
        <div className="site-frame">
          <div className="site-browser"><i /><i /><i /><span>amargosa.ba.gov.br{portalPage === "obras" ? "/obras-e-urbanismo" : ""}</span></div>
          <article className={`municipal-site header-${design.header} menu-${design.menu} hero-${design.hero} services-${design.services} footer-${design.footer} font-${design.font} width-${design.width} spacing-${design.spacing} radius-${design.radius}`} style={themeStyle}>
            <div className="citizen-bar"><a href="#portal-menu">Ir para o menu</a><a href="#portal-search">Ir para a busca</a><a href="#portal-footer">Ir para o rodapé</a><button>Acessibilidade</button></div>
            <header className="portal-header">
              <a className="city-brand" href="#" onClick={(event) => { event.preventDefault(); setPortalPage("home"); }}><span>AM</span><div><strong>AMARGOSA</strong><small>PREFEITURA</small></div></a>
              <div className="portal-utilities"><div><a href="#">▣ Portal da Transparência</a><a href="#">? Ouvidoria Geral</a></div><form id="portal-search"><label className="sr-only" htmlFor="search">Pesquisa no site</label><input id="search" placeholder="Pesquisa no site" /><button>Buscar</button></form></div>
            </header>
            <nav className="audience-nav" id="portal-menu"><a href="#">CIDADÃO</a><a href="#">TURISTA</a><a href="#">SERVIDOR</a><a href="#">EMPRESAS</a><span>●　◉　●　◉</span></nav>
            {portalPage === "home" ? <><section className="portal-hero selected-block" onClick={() => setRightTab("properties")}>
              <span className="block-label">Destaque principal · selecionado</span>
              <div className="recife-news"><div className="news-photo" role="img" aria-label="Praça central de Amargosa"><span>CIDADE JARDIM</span><button className="carousel-arrow previous" aria-label="Destaque anterior">‹</button><button className="carousel-arrow next" aria-label="Próximo destaque">›</button></div><div className="hero-copy"><small>GESTÃO MUNICIPAL</small><h1>{heroTitle}</h1><p>{heroDescription}</p></div></div>
              <aside className="recife-services"><h2>ACESSO AOS SERVIÇOS</h2><div className="audience-tabs"><button className="active">Cidadão</button><button>Empresa</button><button>Turista</button><button>Servidor</button></div><div className="recife-service-grid">{recifeServiceAccess.map(([icon, title]) => <a href="#" key={title}><strong>{icon}</strong><span>{title}</span></a>)}</div><div className="slider-dots"><i /><i /></div></aside>
            </section>
            <section className="services"><div className="site-section-title"><div><small>ACESSO RÁPIDO</small><h2>Serviços mais procurados</h2></div><a href="#">Ver todos →</a></div><div className="service-grid">{serviceCards.map(([code, title, description]) => <a href="#" className="service-card" key={title} onClick={(event) => { event.preventDefault(); if (title === "Obras") { setPortalPage("obras"); setRightTab("properties"); } }}><span>{code}</span><div><strong>{title}</strong><small>{description}</small></div><b>→</b></a>)}</div></section></> : <section className="works-page">
              <nav className="portal-breadcrumb" aria-label="Navegação estrutural"><button onClick={() => setPortalPage("home")}>Início</button><span>›</span><a href="#">Secretarias</a><span>›</span><strong>Obras e Urbanismo</strong></nav>
              <header className="works-hero selected-block" onClick={() => setRightTab("properties")}><span className="block-label">Título e metadados · selecionado</span><div><small>SECRETARIA MUNICIPAL</small><h1>Obras e Urbanismo</h1><p>Serviços de manutenção urbana, infraestrutura, iluminação pública e acompanhamento das obras municipais.</p></div><strong className="works-monogram">OB</strong></header>
              <div className="works-content">
                <section className="works-services" aria-labelledby="works-services-title"><div className="works-section-heading"><small>SERVIÇOS AO CIDADÃO</small><h2 id="works-services-title">Como podemos ajudar?</h2></div><div className="works-card-grid"><a href="#"><span>01</span><strong>Solicitar manutenção urbana</strong><small>Buracos, calçadas e vias públicas</small><b>Solicitar →</b></a><a href="#"><span>02</span><strong>Iluminação pública</strong><small>Informar ponto apagado ou danificado</small><b>Solicitar →</b></a><a href="#"><span>03</span><strong>Licenças e alvarás</strong><small>Orientações para obras particulares</small><b>Consultar →</b></a><a href="#"><span>04</span><strong>Acompanhar solicitação</strong><small>Consulte o andamento do protocolo</small><b>Acompanhar →</b></a></div></section>
                <div className="works-columns"><section className="active-works"><div className="works-section-heading"><small>TRANSPARÊNCIA</small><h2>Obras em andamento</h2></div><article><span>62%</span><div><small>BAIRRO SANTA RITA</small><strong>Requalificação da Praça do Cruzeiro</strong><p>Urbanização, iluminação e acessibilidade.</p></div></article><article><span>38%</span><div><small>CENTRO</small><strong>Recuperação de pavimentação</strong><p>Melhoria da drenagem e do pavimento.</p></div></article><button>Ver todas as obras e contratos →</button></section><aside className="works-contact"><small>ÓRGÃO RESPONSÁVEL</small><h2>Secretaria de Infraestrutura, Obras e Serviços Públicos</h2><dl><div><dt>Atendimento</dt><dd>Segunda a sexta, 8h às 14h</dd></div><div><dt>Telefone</dt><dd>(75) 3634-3977</dd></div><div><dt>Endereço</dt><dd>Praça Lourival Monte, Centro</dd></div><div><dt>E-mail</dt><dd>obras@amargosa.ba.gov.br</dd></div></dl><button>Falar com a Secretaria</button></aside></div>
              </div>
              <footer className="page-metadata"><span><small>Responsável</small>Secretaria de Infraestrutura</span><span><small>Fonte</small>Prefeitura de Amargosa</span><span><small>Última atualização</small>18 de agosto de 2026</span></footer>
            </section>}
            <section className="essential-strip" id="portal-footer"><div><small>ACESSOS PROTEGIDOS</small><strong>Transparência e participação</strong></div>{essentialLinks.slice(0, 4).map((item) => <a key={item} href="#">{item}<span>↗</span></a>)}</section>
          </article>
        </div>
      </section>

      <aside className="right-panel">
        <div className="right-tabs">
          <button className={rightTab === "properties" ? "active" : ""} onClick={() => setRightTab("properties")}>Design</button>
          <button className={rightTab === "pntp" ? "active" : ""} onClick={() => setRightTab("pntp")}>PNTP <span>75</span></button>
        </div>
        {rightTab === "properties" ? <section className="properties">
          <div className="selection-title"><span>Editor visual</span><em>Design</em></div>
          <div className="content-lock"><i>◆</i><span><strong>Conteúdo protegido</strong><small>Textos, menus internos e abas são gerenciados fora do construtor. Aqui você altera somente design e estrutura visual.</small></span></div>
          <fieldset className="design-group"><legend>Identidade</legend><div className="color-grid"><label>Principal<div><input type="color" value={design.primary} onChange={(event) => applyDesign({ ...design, primary: event.target.value }, "Cor principal")} /><span>{design.primary}</span></div></label><label>Secundária<div><input type="color" value={design.secondary} onChange={(event) => applyDesign({ ...design, secondary: event.target.value }, "Cor secundária")} /><span>{design.secondary}</span></div></label><label>Destaque<div><input type="color" value={design.accent} onChange={(event) => applyDesign({ ...design, accent: event.target.value }, "Cor de destaque")} /><span>{design.accent}</span></div></label><label>Superfície<div><input type="color" value={design.surface} onChange={(event) => applyDesign({ ...design, surface: event.target.value }, "Cor de superfície")} /><span>{design.surface}</span></div></label></div><label>Família tipográfica<select value={design.font} onChange={(event) => applyDesign({ ...design, font: event.target.value as FontStyle }, "Tipografia")}><option value="inter">Inter — neutra e digital</option><option value="source">Source Sans — institucional</option><option value="montserrat">Montserrat — geométrica</option><option value="merriweather">Merriweather — editorial</option></select></label></fieldset>
          <fieldset className="design-group"><legend>Mistura de componentes</legend><label>Cabeçalho<select value={design.header} onChange={(event) => applyDesign({ ...design, header: event.target.value as HeaderStyle }, "Cabeçalho")}><option value="recife">Utilitário — inspirado em Recife</option><option value="belem">Cívico — inspirado em Belém</option><option value="salvador">Em camadas — inspirado em Salvador</option><option value="essential">Essencial — compacto</option></select></label><label>Menu principal<select value={design.menu} onChange={(event) => applyDesign({ ...design, menu: event.target.value as MenuStyle }, "Menu principal")}><option value="recife">Por públicos — Recife</option><option value="belem">Gaveta cívica — Belém</option><option value="salvador">Faixa institucional — Salvador</option><option value="minimal">Horizontal mínimo</option></select></label><label>Destaque da página inicial<select value={design.hero} onChange={(event) => applyDesign({ ...design, hero: event.target.value as HeroStyle }, "Destaque")}><option value="recife">Notícia + serviços — Recife</option><option value="belem">Editorial amplo — Belém</option><option value="salvador">Carrossel de impacto — Salvador</option><option value="search">Busca em primeiro plano</option></select></label><label>Serviços prioritários<select value={design.services} onChange={(event) => applyDesign({ ...design, services: event.target.value as ServicesStyle }, "Serviços prioritários")}><option value="icons">Ícones em grade</option><option value="cards">Cards descritivos</option><option value="list">Lista compacta</option></select></label><label>Rodapé<select value={design.footer} onChange={(event) => applyDesign({ ...design, footer: event.target.value as FooterStyle }, "Rodapé")}><option value="institutional">Institucional</option><option value="compact">Compacto</option><option value="portal">Portal de acessos</option></select></label></fieldset>
          <fieldset className="design-group"><legend>Disposição</legend><div className="field-row"><label>Largura<select value={design.width} onChange={(event) => applyDesign({ ...design, width: event.target.value as DesignConfig["width"] }, "Largura")}><option value="wide">Ampla</option><option value="contained">Contida</option></select></label><label>Espaçamento<select value={design.spacing} onChange={(event) => applyDesign({ ...design, spacing: event.target.value as DesignConfig["spacing"] }, "Espaçamento")}><option value="compact">Compacto</option><option value="comfortable">Confortável</option><option value="airy">Arejado</option></select></label></div><label>Forma dos componentes<select value={design.radius} onChange={(event) => applyDesign({ ...design, radius: event.target.value as DesignConfig["radius"] }, "Forma dos componentes")}><option value="square">Cantos retos</option><option value="soft">Cantos suaves</option><option value="round">Cantos arredondados</option></select></label></fieldset>
          <div className="score-guard"><div><small>PROJEÇÃO DESTA COMPOSIÇÃO</small><strong>{pntpScore.toFixed(1)}%</strong></div><span className={pntpScore >= 80 ? "safe" : "attention"}>Mínimo 75%</span><p>Mudanças que projetem resultado inferior a 75% são rejeitadas antes de alterar o rascunho.</p></div>
        </section> : <section className="pntp-panel">
          <div className="pntp-score"><div><small>ESTIMATIVA TÉCNICA PNTP</small><strong>{pntpScore.toFixed(1)}%</strong></div><span>mínimo protegido: 75%</span></div>
          <div className="progress"><i style={{width: `${pntpScore}%`}} /></div>
          <p className="score-disclaimer">A composição visual só é aplicada quando mantém a projeção em 75% ou mais. Estimativa baseada na matriz PNTP 2026; não representa certificação oficial.</p>
          <div className="filter-chips"><button>Todos 84</button><button className="active">Design 6</button><button>Essenciais 12</button></div>
          <div className="criteria-list">
            <article className="criterion passed"><header><span>✓</span><div><small>DESIGN · CONTRASTE</small><strong>Cores e legibilidade</strong></div><em>Atendido</em></header><p>As combinações atuais mantêm contraste mínimo para textos e ações.</p></article>
            <article className={design.hero === "salvador" ? "criterion pending" : "criterion passed"}><header><span>{design.hero === "salvador" ? "!" : "✓"}</span><div><small>DESIGN · MOVIMENTO</small><strong>Destaque e carrossel</strong></div><em>{design.hero === "salvador" ? "Atenção" : "Atendido"}</em></header><p>{design.hero === "salvador" ? "O carrossel exige pausa, controles acessíveis e respeito a movimento reduzido." : "O destaque atual não depende de rotação automática."}</p></article>
            <article className="criterion passed"><header><span>✓</span><div><small>NÚCLEO PROTEGIDO</small><strong>Busca e acessos essenciais</strong></div><em>Atendido</em></header><p>Transparência, e-SIC, Ouvidoria, Diário Oficial, Carta de Serviços e busca permanecem presentes em qualquer combinação.</p></article>
          </div>
        </section>}
        {rightTab === "properties" && <section className="compliance-card">
          <div className="compliance-heading"><div><small>ESTIMATIVA TÉCNICA PNTP</small><strong>{pntpScore.toFixed(1)}%</strong></div><span>limite 75%</span></div>
          <div className="progress"><i style={{width: `${pntpScore}%`}} /></div>
          <div className="criteria-summary"><span><i className="ok" /> contraste válido</span><span><i className="warn" /> {design.hero === "salvador" ? "carrossel em atenção" : "sem alerta visual"}</span></div>
          <div className="essential-warning"><strong>Proteção preventiva ativa</strong><p>O frontend rejeita mudanças abaixo de 75%; o backend deverá repetir a mesma validação antes de salvar ou publicar.</p></div>
          <button className="view-checklist" onClick={() => setRightTab("pntp")}>Abrir checklist completo <span>→</span></button>
        </section>}
      </aside>

      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
      {blockedChange && <div className="modal-backdrop" role="presentation" onMouseDown={() => setBlockedChange(null)}><section className="publish-modal guard-modal" role="alertdialog" aria-modal="true" aria-labelledby="guard-title" onMouseDown={(event) => event.stopPropagation()}><span className="modal-icon">!</span><small>ALTERAÇÃO REJEITADA</small><h2 id="guard-title">Esta mudança reduziria a projeção abaixo de 75%.</h2><p><strong>{blockedChange.label}</strong> produziria uma estimativa técnica de <strong>{blockedChange.score.toFixed(1)}%</strong>. O rascunho anterior foi preservado.</p><div className="guard-scale"><span>0</span><i><b style={{width: `${blockedChange.score}%`}} /></i><em>75% mínimo</em><strong>100</strong></div><div className="modal-actions"><button className="button primary" onClick={() => setBlockedChange(null)}>Entendi, manter composição</button></div></section></div>}
      {publishOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setPublishOpen(false)}><section className="publish-modal" role="dialog" aria-modal="true" aria-labelledby="publish-title" onMouseDown={(event) => event.stopPropagation()}><span className="modal-icon publish-ready">✓</span><small>VALIDAÇÃO DE DESIGN CONCLUÍDA</small><h2 id="publish-title">A composição mantém a projeção mínima.</h2><p>O design atual está em <strong>{pntpScore.toFixed(1)}%</strong>. Em produção, o backend repetirá as validações antes de criar uma versão publicável.</p><div className="impact"><span>Limite obrigatório<strong>75%</strong></span><b>≤</b><span>Este rascunho<strong>{pntpScore.toFixed(1)}%</strong></span></div><div className="modal-actions"><button className="button secondary" onClick={() => setPublishOpen(false)}>Voltar à edição</button><button className="button primary" onClick={() => { setPublishOpen(false); setRightTab("pntp"); }}>Ver checklist</button></div></section></div>}
    </main>
  );
}
