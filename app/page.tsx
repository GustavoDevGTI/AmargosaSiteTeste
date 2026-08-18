"use client";

import { useState } from "react";

type Device = "desktop" | "tablet" | "mobile";
type Variant = "cultural" | "institutional" | "services";

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

const layers = [
  ["Cabeçalho", "protected"],
  ["Destaque principal", "selected"],
  ["Busca de serviços", "protected"],
  ["Serviços prioritários", "restricted"],
  ["Acessos essenciais", "protected"],
  ["Notícias e agenda", "optional"],
  ["Rodapé", "protected"],
];

const library = [
  ["Alerta público", "Restrito", "Avisos urgentes e temporários"],
  ["Lista de notícias", "Restrito", "Até 6 notícias por bloco"],
  ["Agenda municipal", "Opcional", "Eventos e prazos públicos"],
  ["Galeria", "Restrito", "Imagens com texto alternativo"],
  ["Turismo e cultura", "Opcional", "Conteúdo editorial local"],
];

const sizes: Record<Device, string> = { desktop: "1440 × 900", tablet: "768 × 1024", mobile: "390 × 844" };

export default function Home() {
  const [device, setDevice] = useState<Device>("desktop");
  const [leftTab, setLeftTab] = useState<"structure" | "blocks">("structure");
  const [rightTab, setRightTab] = useState<"properties" | "pntp">("properties");
  const [heroTitle, setHeroTitle] = useState("Serviços públicos de um jeito simples.");
  const [heroDescription, setHeroDescription] = useState("Encontre informações, solicite atendimentos e acompanhe a Prefeitura em um só lugar.");
  const [variant, setVariant] = useState<Variant>("cultural");
  const [alignment, setAlignment] = useState("left");
  const [density, setDensity] = useState("comfortable");
  const [toast, setToast] = useState<string | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }

  return (
    <main className="builder-shell">
      <header className="builder-topbar">
        <div className="brand-lockup">
          <span className="brand-mark">A</span>
          <div><strong>Início</strong><small>Portal de Amargosa · Rascunho</small></div>
        </div>
        <div className="draft-status"><span /> Salvo agora <b>v. 0.8</b></div>
        <div className="top-actions">
          <button className="icon-button" aria-label="Desfazer" onClick={() => notify("Nada para desfazer nesta demonstração")}>↶</button>
          <button className="icon-button" aria-label="Refazer" onClick={() => notify("Nada para refazer nesta demonstração")}>↷</button>
          <div className="device-switch" aria-label="Dispositivo de pré-visualização">
            {(["desktop", "tablet", "mobile"] as Device[]).map((item) => <button key={item} className={device === item ? "active" : ""} onClick={() => setDevice(item)}>{item === "desktop" ? "Desktop" : item === "tablet" ? "Tablet" : "Mobile"}</button>)}
          </div>
          <button className="button secondary" onClick={() => { setRightTab("pntp"); notify("Validação concluída: 1 bloqueio essencial encontrado"); }}>Validar</button>
          <button className="button primary" onClick={() => setPublishOpen(true)}>Publicar</button>
        </div>
      </header>

      <aside className="left-panel">
        <div className="panel-tabs">
          <button className={leftTab === "structure" ? "active" : ""} onClick={() => setLeftTab("structure")}>Estrutura</button>
          <button className={leftTab === "blocks" ? "active" : ""} onClick={() => setLeftTab("blocks")}>Blocos</button>
        </div>
        {leftTab === "structure" ? <>
          <div className="panel-heading"><span>Página inicial</span><button aria-label="Mais opções">•••</button></div>
          <nav className="layer-tree" aria-label="Estrutura da página">
            {layers.map(([label, kind]) => <button className={`layer ${kind}`} key={label} onClick={() => label === "Destaque principal" ? setRightTab("properties") : notify(kind === "protected" ? `${label} é um bloco protegido` : `${label} selecionado`)}><span>≡</span><strong>{label}</strong>{kind === "protected" && <em>Protegido</em>}</button>)}
          </nav>
          <button className="add-block" onClick={() => setLeftTab("blocks")}>＋ Adicionar bloco</button>
          <div className="legend"><span><i className="dot protected-dot" /> Protegido</span><span><i className="dot restricted-dot" /> Restrito</span></div>
        </> : <>
          <div className="panel-heading"><span>Biblioteca homologada</span><button aria-label="Filtrar blocos">⌕</button></div>
          <label className="block-search"><span className="sr-only">Buscar componente</span><input placeholder="Buscar componente..." /></label>
          <div className="block-library">{library.map(([title, kind, description]) => <button key={title} onClick={() => notify(`${title} adicionado ao fim da região compatível`)}><i>{title.slice(0, 2).toUpperCase()}</i><span><strong>{title}</strong><small>{description}</small></span><em>{kind}</em></button>)}</div>
          <p className="library-note">A biblioteca mostra somente componentes compatíveis com esta região.</p>
        </>}
      </aside>

      <section className={`workspace preview-${device}`}>
        <div className="canvas-toolbar"><span>Prévia com conteúdo real</span><strong>{sizes[device]} · 100%</strong></div>
        <div className="site-frame">
          <div className="site-browser"><i /><i /><i /><span>amargosa.ba.gov.br</span></div>
          <article className="municipal-site">
            <div className="citizen-bar"><a href="#portal-menu">Ir para o menu</a><a href="#portal-search">Ir para a busca</a><a href="#portal-footer">Ir para o rodapé</a><button>Acessibilidade</button></div>
            <header className="portal-header">
              <a className="city-brand" href="#"><span>AM</span><div><strong>AMARGOSA</strong><small>PREFEITURA</small></div></a>
              <div className="portal-utilities"><div><a href="#">▣ Portal da Transparência</a><a href="#">? Ouvidoria Geral</a></div><form id="portal-search"><label className="sr-only" htmlFor="search">Pesquisa no site</label><input id="search" placeholder="Pesquisa no site" /><button>Buscar</button></form></div>
            </header>
            <nav className="audience-nav" id="portal-menu"><a href="#">CIDADÃO</a><a href="#">TURISTA</a><a href="#">SERVIDOR</a><a href="#">EMPRESAS</a><span>●　◉　●　◉</span></nav>
            <section className={`portal-hero selected-block variant-${variant} align-${alignment} density-${density}`} onClick={() => setRightTab("properties")}>
              <span className="block-label">Destaque principal · selecionado</span>
              <div className="recife-news"><div className="news-photo" role="img" aria-label="Praça central de Amargosa"><span>CIDADE JARDIM</span></div><div className="hero-copy"><small>GESTÃO MUNICIPAL</small><h1>{heroTitle || "Digite um título"}</h1><p>{heroDescription || "Digite uma descrição para o destaque."}</p>{variant === "services" && <button className="hero-cta">Explorar serviços</button>}</div></div>
              <aside className="recife-services"><h2>ACESSO AOS SERVIÇOS</h2><div className="audience-tabs"><button className="active">Cidadão</button><button>Empresa</button><button>Turista</button><button>Servidor</button></div><div className="recife-service-grid">{recifeServiceAccess.map(([icon, title]) => <a href="#" key={title}><strong>{icon}</strong><span>{title}</span></a>)}</div><div className="slider-dots"><i /><i /></div></aside>
            </section>
            <section className="services"><div className="site-section-title"><div><small>ACESSO RÁPIDO</small><h2>Serviços mais procurados</h2></div><a href="#">Ver todos →</a></div><div className="service-grid">{serviceCards.map(([code, title, description]) => <a href="#" className="service-card" key={title}><span>{code}</span><div><strong>{title}</strong><small>{description}</small></div><b>→</b></a>)}</div></section>
            <section className="essential-strip" id="portal-footer"><div><small>ACESSOS PROTEGIDOS</small><strong>Transparência e participação</strong></div>{essentialLinks.slice(0, 4).map((item) => <a key={item} href="#">{item}<span>↗</span></a>)}</section>
          </article>
        </div>
      </section>

      <aside className="right-panel">
        <div className="right-tabs">
          <button className={rightTab === "properties" ? "active" : ""} onClick={() => setRightTab("properties")}>Propriedades</button>
          <button className={rightTab === "pntp" ? "active" : ""} onClick={() => setRightTab("pntp")}>PNTP <span>3</span></button>
        </div>
        {rightTab === "properties" ? <section className="properties">
          <div className="selection-title"><span>Destaque principal</span><em>Restrito</em></div>
          <label>Variante<select value={variant} onChange={(event) => setVariant(event.target.value as Variant)}><option value="cultural">Cultural — texto + grafismo</option><option value="institutional">Institucional — texto central</option><option value="services">Serviços — ação em destaque</option></select></label>
          <label>Título <small>{heroTitle.length}/70</small><textarea maxLength={70} value={heroTitle} onChange={(event) => setHeroTitle(event.target.value)} /></label>
          <label>Descrição <small>{heroDescription.length}/160</small><textarea maxLength={160} value={heroDescription} onChange={(event) => setHeroDescription(event.target.value)} /></label>
          <div className="field-row"><label>Alinhamento<select value={alignment} onChange={(event) => setAlignment(event.target.value)}><option value="left">À esquerda</option><option value="center">Centralizado</option></select></label><label>Densidade<select value={density} onChange={(event) => setDensity(event.target.value)}><option value="comfortable">Confortável</option><option value="compact">Compacta</option></select></label></div>
          <div className="property-hint"><i>✓</i><span><strong>Contraste aprovado</strong><small>7,8:1 · WCAG AA</small></span></div>
        </section> : <section className="pntp-panel">
          <div className="pntp-score"><div><small>ESTIMATIVA TÉCNICA PNTP</small><strong>91,4%</strong></div><span>+0,6% no rascunho</span></div>
          <div className="progress"><i style={{width: "91.4%"}} /></div>
          <p className="score-disclaimer">Estimativa baseada na matriz PNTP 2026. Não representa certificação oficial.</p>
          <div className="filter-chips"><button>Todos 84</button><button className="active">Essenciais 12</button><button>Afetados 3</button></div>
          <div className="criteria-list">
            <article className="criterion blocked"><header><span>E</span><div><small>ESSENCIAL · 1.2</small><strong>Informações institucionais</strong></div><em>Bloqueio</em></header><p>O telefone do órgão responsável ainda não foi informado.</p><button onClick={() => notify("Abrindo o campo responsável pelo critério 1.2")}>Corrigir no bloco →</button></article>
            <article className="criterion pending"><header><span>!</span><div><small>ESSENCIAL · 4.1</small><strong>Receitas municipais</strong></div><em>Pendente</em></header><p>A estrutura existe, mas depende de evidência do setor contábil.</p></article>
            <article className="criterion passed"><header><span>✓</span><div><small>ESSENCIAL · 8.1</small><strong>Serviço de Informação</strong></div><em>Atendido</em></header><p>Rota, atalho protegido e contato estão disponíveis.</p></article>
          </div>
        </section>}
        {rightTab === "properties" && <section className="compliance-card">
          <div className="compliance-heading"><div><small>ESTIMATIVA TÉCNICA PNTP</small><strong>91,4%</strong></div><span>+0,6%</span></div>
          <div className="progress"><i style={{width: "91.4%"}} /></div>
          <div className="criteria-summary"><span><i className="ok" /> 74 atendidos</span><span><i className="warn" /> 9 pendentes</span><span><i className="bad" /> 1 bloqueio</span></div>
          <div className="essential-warning"><strong>1 essencial exige atenção</strong><p>A porcentagem estimada não torna o portal elegível se algum critério essencial estiver pendente.</p></div>
          <button className="view-checklist" onClick={() => setRightTab("pntp")}>Abrir checklist completo <span>→</span></button>
        </section>}
      </aside>

      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
      {publishOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setPublishOpen(false)}><section className="publish-modal" role="dialog" aria-modal="true" aria-labelledby="publish-title" onMouseDown={(event) => event.stopPropagation()}><span className="modal-icon">!</span><small>PUBLICAÇÃO BLOQUEADA</small><h2 id="publish-title">Este rascunho ainda não pode ser publicado.</h2><p>O critério essencial <strong>1.2 — Informações institucionais</strong> perdeu uma evidência obrigatória nesta versão.</p><div className="impact"><span>Versão pública<strong>90,8%</strong></span><b>→</b><span>Este rascunho<strong>91,4%</strong></span></div><div className="modal-actions"><button className="button secondary" onClick={() => setPublishOpen(false)}>Voltar à edição</button><button className="button primary" onClick={() => { setPublishOpen(false); setRightTab("pntp"); }}>Ver bloqueio</button></div></section></div>}
    </main>
  );
}
