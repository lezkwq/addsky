import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Instagram, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import heroDesktop from "@/assets/hero-fleet-desktop.jpg";
import heroMobile from "@/assets/hero-fleet-mobile.jpg";
import logo from "@/assets/addsky-logo-transparent.png";
import pubbbGround from "@/assets/pubbb-ground.jpg";
import pubbbFlight from "@/assets/pubbb-flight.jpg";
import luiz from "@/assets/luiz-probst-portrait.jpg";
import hangar from "@/assets/hangar.jpg";
import cockpit from "@/assets/cockpit-view.jpg";
import wingAtSunset from "@/assets/wing-at-sunset.jpg";
import cloudyRunway from "@/assets/pubbb-cloudy-runway.jpg";
import hangarApron from "@/assets/pubbb-hangar-apron.jpg";
import overHill from "@/assets/pubbb-over-hill.jpg";
import pilotPassenger from "@/assets/pubbb-pilot-passenger.jpg";
import sergioAvatar from "@/assets/review-sergio-silva.webp";
import homeroAvatar from "@/assets/review-homero-pedrollo.webp";
import ederAvatar from "@/assets/review-eder-barni.webp";

const TITLE = "ADD SKY Escola de Pilotagem | Cursos de Pilotagem em Blumenau";
const DESC =
  "Conheça a ADD SKY Escola de Pilotagem em Blumenau. Saiba mais sobre os cursos de formação, conheça nossa história e entre em contato.";

const getSiteOrigin = createIsomorphicFn()
  .server(() => getRequestUrl().origin)
  .client(() => window.location.origin);

export const Route = createFileRoute("/")({
  loader: () => new URL("/og-image.png", getSiteOrigin()).href,
  head: ({ loaderData: ogImage }) => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Logotipo da ADD SKY Escola de Pilotagem" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
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

const FLIGHT_STATS = [
  { label: "Horas de voo", value: "+19 mil" },
  { label: "Alunos formados", value: "+1.500" },
];
const GOOGLE_REVIEW_COUNT = 15;

function Header() {
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overPhoto, setOverPhoto] = useState(true);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const photos = document.querySelectorAll("[data-header-photo]");
    const desktop = window.matchMedia("(min-width: 64rem)");
    const update = () => {
      setAtTop(window.scrollY <= 0);
      const barHeight = bar.current?.offsetHeight ?? 0;
      setOverPhoto(Array.from(photos).some((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top < barHeight && bottom > 0;
      }));
    };
    const closeMenuOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    desktop.addEventListener("change", closeMenuOnDesktop);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      desktop.removeEventListener("change", closeMenuOnDesktop);
    };
  }, []);

  const lightContent = overPhoto && !open;
  const transparent = atTop && !open;
  const barStyle = transparent
    ? "border-transparent bg-transparent text-white"
    : lightContent
      ? "border-transparent bg-transparent text-white md:border-white/20 md:bg-ink/75 md:backdrop-blur"
      : "bg-background/95 text-foreground backdrop-blur";
  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b ${barStyle}`}>
      <div ref={bar} className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-10">
        <a href="#inicio" className="shrink-0" aria-label="ADD SKY Escola de Pilotagem — início">
          <img src={logo} alt="ADD SKY Escola de Pilotagem" className={`h-14 w-24 object-contain${lightContent ? " md:brightness-0 md:invert" : ""}`} width={432} height={288} />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={`text-sm font-medium transition ${
              lightContent ? "hover:underline" : "text-foreground/80 hover:text-foreground"
            }`}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappUrl(MESSAGES.general)} target="_blank" rel="noopener noreferrer" className={`hidden min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition sm:inline-flex ${
            lightContent ? "border-white/60 hover:bg-white hover:text-ink" : "border-foreground/15 hover:bg-ink hover:text-ink-foreground"
          }`}>
            Fale conosco
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full max-md:text-foreground lg:hidden"
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
    <section id="inicio" data-header-photo className="relative isolate flex min-h-[100svh] overflow-hidden">
      <picture className="absolute inset-0 -z-10">
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        <img src={heroMobile} alt="Aeronave de instrução da ADD SKY em voo rasante" className="h-full w-full object-cover object-center" width={945} height={1677} fetchPriority="high" />
      </picture>
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 pt-32 md:justify-center md:px-10 md:pb-24 lg:pb-8 lg:pt-24">
        <div className="max-w-xl rise">
          <p className="eyebrow mb-6 w-fit rounded-full bg-background px-3 py-1.5 shadow-sm max-md:tracking-[0.1em]">Blumenau · Santa Catarina · Desde 1997</p>
          <h1 className="text-photo text-[2.6rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-[clamp(3.25rem,10svh,5.25rem)]">
            Seu sonho de pilotar <span className="text-white">começa aqui.</span>
          </h1>
          <p className="text-photo mt-6 max-w-md text-base font-medium leading-relaxed text-white md:text-lg">
            Conheça a ADD SKY Escola de Pilotagem, em Blumenau, e descubra como dar os primeiros passos na aviação.
          </p>
        </div>
        <div className="mt-auto md:mt-10 lg:mt-8 lg:flex lg:items-center lg:gap-4">
          <div className="rise flex flex-col gap-3 pt-10 sm:flex-row lg:shrink-0 lg:pt-0" style={{ animationDelay: "150ms" }}>
            <a href="#cursos" className={btnPrimary}>
              Quero conhecer os cursos <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#historia" className={`${btnGhost} bg-background/50 backdrop-blur-sm`}>
              Conheça a ADD SKY
            </a>
          </div>
          <div className="mt-4 flex w-full max-w-md items-stretch divide-x divide-white/25 rounded-2xl border border-white/25 bg-ink/80 py-3 text-white backdrop-blur-sm sm:mt-5 lg:mt-0 lg:w-96">
            <dl className="grid flex-2 grid-cols-2 divide-x divide-white/25">
              {FLIGHT_STATS.map(({ label, value }) => (
                <div key={label} className="flex flex-col-reverse items-center justify-center gap-1 px-1 text-center">
                  <dt className="text-xs text-white/90">{label}</dt>
                  <dd className="font-display text-lg font-semibold leading-none sm:text-xl">{value}</dd>
                </div>
              ))}
            </dl>
            <a href="#avaliacoes" className="flex flex-1 flex-col items-center justify-center gap-1 px-1 text-center text-xs text-white/90 hover:underline">
              <span className="flex h-[1.125rem] items-center gap-0.5 text-signal sm:h-5" role="img" aria-label="5 de 5 estrelas no Google">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden="true" className="size-3 fill-current sm:size-3.5" />
                ))}
              </span>
              {GOOGLE_REVIEW_COUNT} avaliações
            </a>
          </div>
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
        <img src={pubbbFlight} alt="Aeronave PU-BBB da ADD SKY em voo sobre Blumenau, vista sob a asa" loading="lazy" width={1470} height={1070} className="aspect-[4/3] w-full rounded-2xl object-cover" style={{ boxShadow: "var(--shadow-soft)" }} />
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
            Conheça as opções de formação da ADD SKY e fale com a nossa equipe para descobrir por onde começar.
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
        <img src={cockpit} alt="Vista da janela da cabine sobre a cidade e nuvens, com a asa e o montante visíveis" loading="lazy" width={1463} height={1075} className="col-span-2 aspect-[4/3] w-full rounded-2xl object-cover md:col-span-8 md:row-span-2 md:aspect-auto md:h-full" />
        <img src={pubbbGround} alt="Aeronave PU-BBB vermelha, branca e amarela estacionada sob céu azul" loading="lazy" width={1138} height={1382} className="aspect-[4/5] w-full rounded-2xl object-cover md:col-span-4" />
        <img src={wingAtSunset} alt="Vista da asa pela cabine ao pôr do sol" loading="lazy" width={900} height={1600} className="aspect-[4/5] w-full rounded-2xl object-cover md:col-span-4 md:aspect-[16/10]" />
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
          <p className="eyebrow">NOSSA HISTÓRIA</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl">Uma história construída pela paixão de voar.</h2>
          <div className="mt-6 max-w-lg space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Com raízes na aviação desde 1997, a ADD SKY Escola de Pilotagem construiu uma trajetória marcada pela dedicação ao ensino, à segurança e à formação de novos pilotos.</p>
            <p>Somos uma escola CIAC (Centro de Instrução de Aviação Civil), certificada pela ANAC, comprometida com a qualidade e a excelência na formação aeronáutica.</p>
            <p>Há 30 anos, caminhamos lado a lado com a ABUL (Associação Brasileira de Ultraleves), nossa parceira nessa jornada de incentivo à aviação aerodesportiva, compartilhando conhecimento, experiências e a paixão por voar.</p>
            <p>Mais do que ensinar a voar, nossa história é construída por pessoas, conquistas e pelo compromisso de manter viva a paixão pela aviação.</p>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <img src={logo} alt="Logotipo ADD SKY Escola de Pilotagem, desde 1997" loading="lazy" width={432} height={288} className="h-36 w-36 object-contain p-2" />
            <div>
              <p className="font-display text-5xl font-semibold text-accent">Desde 1997</p>
              <p className="mt-1 text-sm text-muted-foreground">Blumenau, Santa Catarina</p>
            </div>
          </div>
        </div>
        <img src={hangar} alt="Aeronaves estacionadas no gramado diante do hangar ao entardecer" loading="lazy" width={1108} height={1419} className="aspect-[4/5] w-full rounded-2xl object-cover md:col-span-5 md:col-start-8" />
      </div>
    </section>
  );
}

function Founder() {
  const teamIntro = "Conheça quem está por trás da ADD SKY";
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
      <p className="eyebrow -mb-6 md:hidden">{teamIntro}</p>
      <img src={luiz} alt="Comandante Luiz Probst apoiado na aeronave PU-BBB" loading="lazy" width={1066} height={1600} className="aspect-square w-full rounded-2xl object-cover object-[center_35%] md:col-span-6" />
      <div className="md:col-span-5 md:col-start-8">
        <p className="eyebrow hidden md:block">{teamIntro}</p>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.05] md:text-5xl">Comandante Luiz Probst</h2>
        <p className="mt-2 text-muted-foreground">Fundador da ADD SKY Escola de Pilotagem</p>
        <p className="mt-8 text-lg leading-relaxed">
          A paixão de Luiz Probst pela aviação começou cedo, inspirada pelo pai, que também era piloto. Essa trajetória se transformou em uma vida dedicada ao voo, à instrução e à formação de novos pilotos.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t pt-8">
          {FLIGHT_STATS.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="font-display text-3xl font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid items-center gap-8 border-t pt-12 md:col-span-12 md:grid-cols-12 md:gap-12 md:pt-16">
        <div aria-hidden="true" className="grid aspect-square w-full place-items-center rounded-2xl bg-secondary font-display text-5xl font-semibold text-accent md:col-span-6">
          MS
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">MURIEL MANOEL DA SILVEIRA</h2>
          <p className="mt-2 text-muted-foreground">Instrutor de Voo</p>
          <div className="mt-6 space-y-4 text-lg leading-relaxed">
            <p>É profissional da aviação atuando como instrutor de voo e como piloto na aviação executiva, com mais de 800h totais. Possui licença de Piloto de Avião e Piloto Aerodesportivo e habilitações MNTE, IFR e Instrutor de Voo de CPA (INVCPA). É Gestor de Segurança Operacional e possui diversos cursos na área de Safety.</p>
            <p>Além de sua atuação na instrução aeronáutica e na aviação executiva, possui experiência como operador aerotático em órgão de segurança pública, atividade que exige elevado nível de preparo técnico, disciplina operacional, capacidade de tomada de decisão e comprometimento com a segurança.</p>
            <p>Sua vivência em diferentes contextos operacionais da aviação contribui para uma formação que vai além dos conhecimentos básicos de pilotagem, proporcionando aos alunos uma visão abrangente sobre responsabilidade, consciência situacional, gerenciamento de riscos e segurança de voo.</p>
            <p>Como instrutor, tem o compromisso de transmitir conhecimentos e experiências, contribuindo para a formação de pilotos tecnicamente preparados, disciplinados e conscientes da responsabilidade envolvida na atividade aeronáutica.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 md:grid md:grid-cols-12 md:gap-x-6 md:px-10 md:py-32">
        <h2 className="text-4xl font-semibold leading-[1.05] md:col-span-7 md:text-6xl">Conheça de perto o universo da ADD SKY.</h2>
        <div className="mt-12 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 sm:p-8 md:col-span-full">
          <h3 className="text-2xl font-semibold md:text-3xl">TECNAM ECHO P92 S</h3>
          <div className="mt-5 max-w-3xl space-y-4 leading-relaxed text-ink-foreground/85">
            <p>O <strong>Tecnam Echo P92 S</strong> é uma aeronave leve de dois lugares, projetada para oferecer simplicidade operacional, conforto e excelente desempenho nas atividades de instrução e treinamento de pilotos.</p>
            <p>Com configuração de asa alta, cabine com ampla visibilidade e comandos de voo que proporcionam uma experiência de pilotagem intuitiva, o P92 S é uma excelente plataforma para o desenvolvimento das habilidades fundamentais da aviação.</p>
            <p>Sua versatilidade e características de voo permitem ao aluno vivenciar diferentes etapas da formação aeronáutica, desde os primeiros contatos com os comandos da aeronave até o aperfeiçoamento das técnicas de pilotagem.</p>
            <p>O Tecnam P92 S reúne praticidade, confiabilidade e características ideais para proporcionar uma formação de qualidade, contribuindo para uma experiência de aprendizado segura e eficiente.</p>
            <p className="border-t border-ink-foreground/15 pt-4">A ADD SKY possui em sua frota e como principal aeronave de instrução o PU-BBB. Aeronave modelo ECHO P92S, ano 2001 e número de séria 527, equipada com motor ROTAX912 ULS de 100hp, com velocidade de cruzeiro de 100KT, peso máximo decolagem de 500kg e autonomia de 6h.</p>
          </div>
        </div>
        <h3 className="mt-10 text-4xl font-semibold leading-[1.05] md:col-span-full md:mt-16 md:text-6xl">
          Explore imagens das aeronaves
          <span className="hidden md:block"> e da rotina da escola</span>
        </h3>
        <div className="mt-6 grid gap-4 md:col-span-full md:mt-8 md:grid-cols-[1.35fr_0.85fr_0.85fr_1.35fr] md:items-start">
          {[
            { src: hangarApron, alt: "PU-BBB no pátio com o hangar ao fundo", w: 1600, h: 900, cls: "md:aspect-[4/3]" },
            { src: cloudyRunway, alt: "PU-BBB na pista sob nuvens carregadas", w: 900, h: 1600, cls: "md:mt-12 md:aspect-[4/5]" },
            { src: overHill, alt: "Aeronave sobrevoando um morro", w: 900, h: 1600, cls: "object-[center_65%] md:mt-4 md:aspect-[4/5]" },
            { src: pilotPassenger, alt: "Piloto e passageiro na cabine da PU-BBB", w: 1066, h: 1600, cls: "object-[center_57%] md:mt-16 md:aspect-[4/3]" },
          ].map((p) => (
            <img key={p.alt} src={p.src} alt={p.alt} loading="lazy" width={p.w} height={p.h} className={`aspect-[16/10] w-full rounded-2xl object-cover ${p.cls}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS: { name: string; text: string; avatar?: string }[] = [
  {
    name: "Sergio Silva",
    avatar: sergioAvatar,
    text: "É uma escola excelente. Fiz meu curso de CPA com muita tranquilidade. O Luiz é um instrutor de alto gabarito. Sabe muito e tem paciência para respeitar as limitações dos alunos. É um instrutor que se tornou um amigo. Recomendo muito esta escola!",
  },
  {
    name: "Homero Luiggi Pedrollo",
    avatar: homeroAvatar,
    text: "Para mim, é a melhor escola de aviação. O instrutor Luiz é muito experiente e cauteloso. O ambiente é tranquilo, de camaradagem e, acima de tudo, de segurança. Estou muito satisfeito com minhas aulas de voo.",
  },
  {
    name: "Eder Barni",
    avatar: ederAvatar,
    text: "Muita gente sonha em pilotar um avião e acha que é impossível. Mas não é! A ADD SKY é uma escola fantástica. O Luiz domina uma aeronave como ninguém e transmite esse conhecimento com muita dedicação e sabedoria. Tem esse sonho? Então só vai! O resto é com ele. Escola nota 1000!",
  },
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
              <p className="mt-1 text-sm text-muted-foreground">{GOOGLE_REVIEW_COUNT} avaliações no Google</p>
            </div>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={`${btnGhost} mt-10`}>
            Ver avaliações no Google <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <ul className="divide-y border-y md:col-span-6 md:col-start-7">
          {REVIEWS.map((r) => (
            <li key={r.name} className="py-8">
              <blockquote className="text-lg leading-relaxed">{r.text}</blockquote>
              <div className="mt-4 flex items-center gap-3">
                <Avatar aria-hidden="true">
                  <AvatarImage src={r.avatar} alt="" className="object-cover" />
                  <AvatarFallback className="bg-secondary text-sm font-semibold text-accent">
                    {r.name.split(" ").slice(0, 2).map((name) => name[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold">{r.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "Como faço para começar a aprender a pilotar?", a: "O primeiro passo é conversar com a ADD SKY. A equipe orienta sobre a formação mais adequada ao seu objetivo e explica como iniciar." },
  { q: "Quais cursos a ADD SKY oferece?", a: "Oferecemos o Curso de Piloto Aerodesportivo (CPA) e o Curso de Instrutor de Voo Aerodesportivo (INVCPA)." },
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
    <section id="contato" data-header-photo className="relative isolate overflow-hidden">
      <img src={cockpit} alt="" loading="lazy" width={1463} height={1075} className="absolute inset-0 -z-10 h-full w-full object-cover" />
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
          <img src={logo} alt="ADD SKY Escola de Pilotagem" loading="lazy" width={432} height={288} className="h-28 w-28 object-contain p-1 invert" />
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
