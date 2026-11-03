import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Instagram, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ADDRESS,
  INSTAGRAM_URL,
  MAPS_URL,
  MESSAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  whatsappUrl,
} from "@/lib/contact";

// Real hero photos supplied by the school — 16:9 desktop only, 9:16 mobile only. Used exclusively in the hero.
import heroDesktop from "@/assets/hero-fleet-desktop.jpg.asset.json";
import heroMobile from "@/assets/hero-fleet-mobile.jpg.asset.json";
import logo from "@/assets/logo.png.asset.json";
import pubbbGround from "@/assets/pubbb-ground.jpg.asset.json";
import pubbbFlight from "@/assets/pubbb-flight.jpg.asset.json";
import pubbbLanding from "@/assets/pubbb-landing.jpg.asset.json";
import luiz from "@/assets/luiz.jpg.asset.json";
import hangar from "@/assets/hangar.jpg.asset.json";
import cockpit from "@/assets/cockpit-view.jpg.asset.json";

const TITLE = "ADD SKY Escola de Pilotagem | Cursos de Pilotagem em Blumenau";
const DESC =
  "Conheça a ADD SKY Escola de Pilotagem em Blumenau. Saiba mais sobre os cursos de formação, conheça nossa história e entre em contato.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "ADD SKY Escola de Pilotagem",
          foundingDate: "1997",
          founder: { "@type": "Person", name: "Luiz Probst" },
          telephone: "+" + PHONE_E164,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Arthur Fischer, 153 — Itoupava Central",
            addressLocality: "Blumenau",
            addressRegion: "SC",
            postalCode: "89068-024",
            addressCountry: "BR",
          },
          sameAs: [INSTAGRAM_URL],
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#cursos", label: "Cursos" },
  { href: "#historia", label: "Nossa história" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground transition hover:bg-accent";
const btnGhost =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-background/60";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "border-b bg-background/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="#inicio" className="shrink-0" aria-label="ADD SKY Escola de Pilotagem — início">
          <img src={logo.url} alt="ADD SKY Escola de Pilotagem" className="h-14 w-24 object-cover mix-blend-multiply" width={1080} height={1080} />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 transition hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappUrl(MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="hidden min-h-10 items-center gap-2 rounded-full border border-foreground/15 px-4 text-sm font-semibold transition hover:bg-ink hover:text-ink-foreground sm:inline-flex">
            Fale conosco
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t bg-background px-5 pb-6 lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b font-display text-xl font-semibold">
                  {n.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
          <a href={whatsappUrl(MESSAGES.general)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-6 w-full`}>
            Falar com a ADD SKY
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] overflow-hidden">
      <picture className="absolute inset-0 -z-10">
        <source media="(min-width: 768px)" srcSet={heroDesktop.url} />
        <img src={heroMobile.url} alt="Aeronave de instrução da ADD SKY em voo rasante" className="h-full w-full object-cover object-center" width={945} height={1677} fetchPriority="high" />
      </picture>
      <div aria-hidden className="absolute inset-0 -z-10 hidden md:block" style={{ background: "var(--hero-veil)" }} />
      <div aria-hidden className="absolute inset-0 -z-10 md:hidden" style={{ background: "var(--hero-veil-mobile)" }} />
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-32 md:justify-center md:px-10 md:pb-24">
        <div className="max-w-xl rise">
          <p className="eyebrow mb-6">Blumenau · Santa Catarina · Desde 1997</p>
          <h1 className="text-[2.6rem] font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-[5.25rem]">
            Seu sonho de pilotar <span className="text-accent">começa aqui.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
            Conheça a ADD SKY Escola de Pilotagem, em Blumenau, e descubra como dar os primeiros passos na aviação.
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row md:mt-10 rise" style={{ animationDelay: "150ms" }}>
          <a href="#cursos" className={btnPrimary}>
            Quero conhecer os cursos <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#historia" className={`${btnGhost} bg-background/50 backdrop-blur-sm`}>
            Conheça a ADD SKY
          </a>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
      <div className="md:col-span-5 md:pt-10">
        <p className="eyebrow">Uma escola para quem sonha em voar</p>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-5xl">
          Aprender a voar é transformar um sonho em realidade.
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          Na ADD SKY, a paixão pela aviação faz parte da nossa história. Conheça uma escola dedicada à formação de pilotos e à experiência de aprender a voar.
        </p>
        <a href="#historia" className={`${btnGhost} mt-10`}>
          Conheça nossa escola <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <figure className="relative md:col-span-7">
        <img src={pubbbFlight.url} alt="Aeronave PU-BBB da ADD SKY em voo sobre Blumenau, vista sob a asa" loading="lazy" width={1470} height={1070} className="aspect-[4/3] w-full rounded-2xl object-cover" style={{ boxShadow: "var(--shadow-soft)" }} />
        <figcaption className="mt-3 text-xs text-muted-foreground">PU-BBB em voo sobre a região de Blumenau.</figcaption>
      </figure>
    </section>
  );
}

const COURSES = [
  {
    code: "CPA",
    name: "Curso de Piloto Aerodesportivo",
    text: "Para quem deseja dar os primeiros passos na pilotagem aerodesportiva e conhecer a formação necessária para começar a voar.",
    cta: "Quero saber mais sobre o CPA",
    msg: MESSAGES.cpa,
  },
  {
    code: "INVCPA",
    name: "Curso de Instrutor de Voo Aerodesportivo",
    text: "Conheça a formação de instrutores de voo aerodesportivo e consulte a escola sobre os requisitos e a disponibilidade do curso.",
    cta: "Quero saber mais sobre o curso",
    msg: MESSAGES.invcpa,
  },
];

function Courses() {
  return (
    <section id="cursos" className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-signal">Cursos e formação</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl">Encontre seu caminho na aviação.</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-foreground/70 md:col-span-5">
            Conheça as opções de formação divulgadas pela ADD SKY e converse com a escola para descobrir por onde começar.
          </p>
        </div>
        <ol className="mt-16 border-t border-ink-foreground/15">
          {COURSES.map((c, i) => (
            <li key={c.code} className="grid gap-6 border-b border-ink-foreground/15 py-10 md:grid-cols-12 md:items-center md:py-14">
              <span className="font-display text-sm text-ink-foreground/50 md:col-span-1">0{i + 1}</span>
              <div className="md:col-span-6">
                <p className="font-display text-5xl font-semibold tracking-tight md:text-7xl">{c.code}</p>
                <h3 className="mt-2 text-xl font-medium text-ink-foreground/90">{c.name}</h3>
              </div>
              <div className="md:col-span-5">
                <p className="leading-relaxed text-ink-foreground/70">{c.text}</p>
                <a href={whatsappUrl(c.msg)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground transition hover:bg-signal">
                  {c.cta} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-ink-foreground/50">
          Duração, requisitos e valores são informados diretamente pela escola.
        </p>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <div className="max-w-2xl">
        <p className="eyebrow">Experiência real de voar</p>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl">Descubra a aviação de perto.</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Dos primeiros contatos com a aeronave à experiência de aprender a pilotar, descubra como é fazer parte do universo da aviação.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
        <img src={cockpit.url} alt="Vista da janela da cabine sobre a cidade e nuvens, com a asa e o montante visíveis" loading="lazy" width={1463} height={1075} className="col-span-2 aspect-[4/3] w-full rounded-2xl object-cover md:col-span-8 md:row-span-2 md:aspect-auto md:h-full" />
        <img src={pubbbGround.url} alt="Aeronave PU-BBB vermelha, branca e amarela estacionada sob céu azul" loading="lazy" width={1138} height={1382} className="aspect-[4/5] w-full rounded-2xl object-cover md:col-span-4" />
        <img src={pubbbLanding.url} alt="Aeronave vermelha e branca próxima ao solo durante pouso" loading="lazy" width={1639} height={960} className="aspect-[4/5] w-full rounded-2xl object-cover md:col-span-4 md:aspect-[16/10]" />
      </div>
    </section>
  );
}

function History() {
  return (
    <section id="historia" className="relative overflow-hidden bg-secondary">
      <p aria-hidden className="pointer-events-none absolute -bottom-6 right-0 select-none font-display text-[28vw] font-semibold leading-none tracking-tighter text-accent/[0.06] md:text-[18rem]">
        1997
      </p>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-6">
          <p className="eyebrow">Nossa história</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl">Uma história construída pela paixão de voar.</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Com raízes na aviação desde 1997, a ADD SKY carrega uma trajetória de dedicação ao ensino e à formação de novos pilotos.
          </p>
          <div className="mt-12 flex items-center gap-6">
            <img src={logo.url} alt="Logotipo ADD SKY Escola de Pilotagem, desde 1997" loading="lazy" width={1080} height={1080} className="h-36 w-36 rounded-xl bg-background object-contain p-2" />
            <div>
              <p className="font-display text-5xl font-semibold text-accent">Desde 1997</p>
              <p className="mt-1 text-sm text-muted-foreground">Blumenau, Santa Catarina</p>
            </div>
          </div>
        </div>
        <img src={hangar.url} alt="Aeronaves estacionadas no gramado diante do hangar ao entardecer" loading="lazy" width={1108} height={1419} className="aspect-[4/5] w-full rounded-2xl object-cover md:col-span-5 md:col-start-8" />
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
      <img src={luiz.url} alt="Comandante Luiz Probst de braços cruzados diante da aeronave PU-BBB" loading="lazy" width={1254} height={1254} className="aspect-square w-full rounded-2xl object-cover md:col-span-6" />
      <div className="md:col-span-5 md:col-start-8">
        <p className="eyebrow">Conheça quem está por trás da ADD SKY</p>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-5xl">Comandante Luiz Probst</h2>
        <p className="mt-2 text-muted-foreground">Fundador da ADD SKY Escola de Pilotagem</p>
        <p className="mt-8 text-lg leading-relaxed">
          A paixão de Luiz Probst pela aviação começou cedo, inspirada pelo pai, que também era piloto. Essa trajetória se transformou em uma vida dedicada ao voo, à instrução e à formação de novos pilotos.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t pt-8">
          <div>
            <dt className="text-sm text-muted-foreground">Horas de voo</dt>
            <dd className="font-display text-3xl font-semibold">+18 mil</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Alunos formados</dt>
            <dd className="font-display text-3xl font-semibold">+1.000</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">Números divulgados pela própria escola, sujeitos à confirmação.</p>
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="text-4xl font-semibold leading-[1.05] md:col-span-7 md:text-6xl">Conheça de perto o universo da ADD SKY.</h2>
          <p className="text-lg text-ink-foreground/70 md:col-span-5">
            Explore imagens das aeronaves, dos voos e do ambiente que fazem parte da rotina da escola.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { src: pubbbLanding.url, alt: "PU-BBB em aproximação para pouso", w: 1639, h: 960, cls: "md:col-span-2 aspect-[16/10]" },
            { src: pubbbGround.url, alt: "PU-BBB no pátio", w: 1138, h: 1382, cls: "aspect-[4/5] md:aspect-auto md:h-full" },
            { src: hangar.url, alt: "Hangar e aeronaves no aeródromo", w: 1108, h: 1419, cls: "aspect-[4/5]" },
            { src: pubbbFlight.url, alt: "PU-BBB fotografada em voo", w: 1470, h: 1070, cls: "md:col-span-2 aspect-[16/10] md:aspect-auto md:h-full" },
          ].map((p) => (
            <img key={p.alt} src={p.src} alt={p.alt} loading="lazy" width={p.w} height={p.h} className={`w-full rounded-2xl object-cover ${p.cls}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Sergio Silva", text: "Relata experiência positiva no curso CPA e destaca o conhecimento e a paciência de Luiz como instrutor." },
  { name: "Jean Deglmann", text: "Recomenda a escola para interessados em pilotagem e destaca o trabalho do instrutor." },
  { name: "Jonathan Levy Jacinto Schulz", text: "Relata conhecer o trabalho da escola há anos e recomenda a experiência de voar." },
];

function Reviews() {
  return (
    <section id="avaliacoes" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Avaliações de alunos</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-5xl">Quem vive a experiência tem muito a contar.</h2>
          <div className="mt-10 flex items-center gap-4">
            <span className="font-display text-6xl font-semibold">5,0</span>
            <div>
              <div className="flex text-signal" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">15 avaliações no Google</p>
            </div>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={`${btnGhost} mt-10`}>
            Ver avaliações no Google <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <ul className="divide-y border-y md:col-span-6 md:col-start-7">
          {REVIEWS.map((r) => (
            <li key={r.name} className="py-8">
              <p className="text-lg leading-relaxed">{r.text}</p>
              <p className="mt-4 text-sm font-semibold">{r.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-xs text-muted-foreground md:text-right">Resumos de avaliações públicas no Google, não transcrições literais.</p>
    </section>
  );
}

const FAQ = [
  { q: "Como faço para começar a aprender a pilotar?", a: "O primeiro passo é conversar com a ADD SKY. A equipe orienta sobre a formação mais adequada ao seu objetivo e explica como iniciar." },
  { q: "Quais cursos a ADD SKY oferece?", a: "A escola divulga o Curso de Piloto Aerodesportivo (CPA) e o Curso de Instrutor de Voo Aerodesportivo (INVCPA)." },
  { q: "Como posso saber os requisitos para cada formação?", a: "Requisitos, duração e valores devem ser consultados diretamente com a escola, que informa as condições atualizadas de cada curso." },
  { q: "Onde fica localizada a escola?", a: `A ADD SKY fica na ${ADDRESS}.` },
  { q: "Como posso falar com a equipe?", a: `Pelo telefone ${PHONE_DISPLAY}, pelo botão de contato neste site ou pelo Instagram @addsky.escola.pilotagem.` },
];

function Faq() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <h2 className="text-4xl font-semibold leading-[1.05] md:col-span-4 md:text-5xl">Dúvidas antes de começar?</h2>
        <Accordion type="single" collapsible className="md:col-span-7 md:col-start-6">
          {FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-foreground/10">
              <AccordionTrigger className="py-6 text-left font-display text-lg font-medium hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contato" className="relative isolate overflow-hidden">
      <img src={cockpit.url} alt="" loading="lazy" width={1463} height={1075} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--final-veil)" }} />
      <div className="mx-auto max-w-7xl px-5 py-28 text-ink-foreground md:px-10 md:py-44">
        <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] md:text-7xl">Seu próximo passo pode ser nos céus.</h2>
        <p className="mt-6 max-w-lg text-lg text-ink-foreground/80">
          Entre em contato com a ADD SKY, tire suas dúvidas e descubra como começar sua jornada na aviação.
        </p>
        <a href={whatsappUrl(MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-background px-8 font-semibold text-foreground transition hover:bg-signal">
          Falar com a ADD SKY <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <img src={logo.url} alt="ADD SKY Escola de Pilotagem" loading="lazy" width={1080} height={1080} className="h-28 w-28 rounded-xl bg-background object-contain p-1" />
          <p className="mt-6 font-display text-lg font-semibold">ADD SKY Escola de Pilotagem</p>
        </div>
        <ul className="space-y-3 text-sm text-ink-foreground/75 md:col-span-4">
          <li><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-ink-foreground"><MapPin className="h-4 w-4 shrink-0" />{ADDRESS}</a></li>
          <li><a href={`tel:+${PHONE_E164}`} className="flex gap-3 hover:text-ink-foreground"><Phone className="h-4 w-4 shrink-0" />{PHONE_DISPLAY}</a></li>
          <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-ink-foreground"><Instagram className="h-4 w-4 shrink-0" />@addsky.escola.pilotagem</a></li>
        </ul>
        <nav aria-label="Rodapé" className="md:col-span-3">
          <ul className="space-y-3 text-sm text-ink-foreground/75">
            {NAV.slice(1).map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-ink-foreground">{n.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink-foreground/10 px-5 py-6 text-center text-xs text-ink-foreground/50">
        © {new Date().getFullYear()} ADD SKY Escola de Pilotagem · Blumenau — SC
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Courses />
        <Experience />
        <History />
        <Founder />
        <Fleet />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <a
        href={whatsappUrl(MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com a ADD SKY no WhatsApp"
        className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition hover:brightness-95"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
