'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';
import { EASE } from '@/lib/motion';

// ─── Cards Logos ────────────────────────────────────────────────────────────────────
import coaLogo       from '@/assets/images/clients/logos/COAlogo.png';
import cerrame8Logo  from '@/assets/images/clients/logos/cerramela8-logo_blue.png';
import maxcerLogoCard from '@/assets/images/clients/logos/maxcerLogo.jpg';
import luagroLogo    from '@/assets/images/clients/logos/luagroRED.png';
import vuottoLogo    from '@/assets/images/clients/logos/estudioVuotto.png';
import recreoLogo    from '@/assets/images/clients/logos/elrecreo.png';
import takeoffLogo   from '@/assets/images/clients/logos/takeOffEnglish.webp';
import floridaLogo   from '@/assets/images/clients/logos/floridaAventura.png';
import lizzeLogo     from '@/assets/images/clients/logos/lizze.png';
import dyxomaLogo    from '@/assets/images/clients/logos/dyxoma.jpg';
import miguelLogo    from '@/assets/images/clients/logos/logoDodorico.png';

// ─── Lights ───────────────────────────────────────────────────────────────────────────────
import vesLogoCardLight   from '@/assets/images/clients/logoCards/light/VESwhite.jpg';
import tessioLogoLight    from '@/assets/images/clients/logoCards/light/tessioYvuotto2.png';
import cabanasLogoLight   from '@/assets/images/clients/logoCards/light/cabanias-negro-transparente.png';
import INBlight           from '@/assets/images/clients/logoCards/light/INBazul.png';
import queensLogoLight    from '@/assets/images/clients/logoCards/light/3.png';
// ─── Darks ────────────────────────────────────────────────────────────────────────────────
import vesLogoCardDark    from '@/assets/images/clients/logoCards/dark/VESblack.jpg';
import tessioLogoDark     from '@/assets/images/clients/logoCards/dark/tessioYvuotto1.png';
import cabanasLogo        from '@/assets/images/clients/logos/cabanias-blancoyverde.png';
import INBdark           from '@/assets/images/clients/logoCards/dark/INBblanco.png';
import queensLogoDark    from '@/assets/images/clients/logoCards/dark/2.png';

// ─── Carrousell Logos  ────────────────────────────────────────────────────────────────────
import maxcerLogo    from '@/assets/images/clients/logoCarrousel/maxcer.png';
import VESarqLogoCar from '@/assets/images/clients/logoCarrousel/VESarq.png'
import lizzeCarLightLogo  from '@/assets/images/clients/logoCarrousel/lizzeBlack.png'
import logoMD        from '@/assets/images/clients/logoCarrousel/logoMD.png'
import vuottoCarLogo from '@/assets/images/clients/logoCarrousel/estudioVuotto.png';
import luagroCarLogo from '@/assets/images/clients/logoCarrousel/luagro-transparente.png'
import queensLogoCar from '@/assets/images/clients/logoCarrousel/5.png'
// ─── Darks ────────────────────────────────────────────────────────────────────────────────
import lizzeCarDarkLogo  from '@/assets/images/clients/logoCarrousel/lizzeLogo.png'
import luagroCarLogoLight from '@/assets/images/clients/logoCarrousel/luagro-transparente-red.png'
// ─── Constantes ───────────────────────────────────────────────────────────────
const TECH_COLORS = {
  React:      '#61dafb',
  WordPress:  '#21759b',
  TiendaNube: '#00b1ff',
};

const SERVICE_COLORS = {
  'web':        '#3256D7',
  'google-ads': '#4285F4',
  'meta-ads':   '#1877F2',
  'instagram':  '#e1306c',
};

const SERVICE_LABELS = {
  'web':        'Desarrollo Web',
  'google-ads': 'Google Ads',
  'meta-ads':   'Meta Ads',
  'instagram':  'Instagram',
};

const FILTERS = [
  { id: 'all',        label: 'Todos'       },
  { id: 'web',        label: 'Desarrollo Web'  },
  { id: 'google-ads', label: 'Google Ads'  },
  { id: 'meta-ads',   label: 'Meta Ads'    },
  { id: 'instagram',  label: 'Instagram'   },
];

function cardColor(client) {
  return (client.tech && TECH_COLORS[client.tech])
    || SERVICE_COLORS[client.services[0]]
    || '#3256D7';
}

// ─── Logo helpers ─────────────────────────────────────────────────────────────
// Estructura de logos por cliente (todos los campos son opcionales salvo `logo`):
//   logo            → fallback universal
//   logoLight       → card en light mode  (si no está, usa logo)
//   logoDark        → card en dark mode   (si no está, usa logo)
//   logoCarousel    → carousel, ambos temas (si no está, usa card logo del tema)
//   logoCarouselLight → carousel light     (si no está, usa logoCarousel → logoLight → logo)
//   logoCarouselDark  → carousel dark      (si no está, usa logoCarousel → logoDark  → logo)

function getCardLogo(client, isDark) {
  return isDark
    ? (client.logoDark   || client.logo)
    : (client.logoLight  || client.logo);
}

function getCarouselLogo(client, isDark) {
  return isDark
    ? (client.logoCarouselDark   || client.logoCarousel || client.logoDark   || client.logo)
    : (client.logoCarouselLight  || client.logoCarousel || client.logoLight  || client.logo);
}

// ─── Clientes ─────────────────────────────────────────────────────────────────
const clients = [
  {
    id: 1,
    name: 'Sello Ambiental COA',
    initials: 'SA',
    tipo: 'ONG Ambiental',
    tech: 'WordPress',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://selloambientalcoa.org.ar/' }],
    logo: coaLogo,
  },
  {
    id: 2,
    name: 'Cerrame la Ocho',
    initials: 'C8',
    tipo: 'Podcast',
    tech: 'React',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://cerramelaocho.com/' }],
    logo: cerrame8Logo,
  },
  {
    id: 3,
    name: 'MAXCER',
    initials: 'MX',
    tipo: 'Empresa',
    tech: 'React',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://maxcer.com.ar/' }],
    logo: maxcerLogoCard,
    logoCarousel: maxcerLogo,
  },
  {
    id: 4,
    name: 'LUAGRO',
    initials: 'LU',
    tipo: 'Agropecuario',
    tech: 'WordPress',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://luagro.com.ar/' }],
    logo: luagroLogo,
    logoCarousel: luagroCarLogo,
    logoCarouselLight: luagroCarLogoLight,
  },
  {
    id: 5,
    name: 'VES Arquitectura',
    initials: 'VE',
    tipo: 'Arquitectura',
    tech: 'WordPress',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://vesarquitectura.com.ar/' }],
    logoLight: vesLogoCardDark,
    logoDark: vesLogoCardLight,
    logoCarousel: VESarqLogoCar,
  },
  {
    id: 6,
    name: 'Estudio Vuotto',
    initials: 'EV',
    tipo: 'Estudio Contable',
    tech: 'WordPress',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://www.estudiovuotto.com.ar/' }],
    logo: vuottoLogo,
    logoCarousel: vuottoCarLogo,
  },
  {
    id: 7,
    name: 'Tessio y Vuotto',
    initials: 'TV',
    tipo: 'Estudio Contable',
    tech: 'WordPress',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://tesioyvuottoestudio.com/' }],
    logoLight: tessioLogoLight,
    logoDark: tessioLogoDark,
  },
  {
    id: 8,
    name: 'El Recreo Fútbol',
    initials: 'ER',
    tipo: 'Deportes',
    tech: 'React',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://elrecreofutbol.com/' }],
    logo: recreoLogo,
  },
  {
    id: 9,
    name: 'Take Off English',
    initials: 'TO',
    tipo: 'Academia de inglés',
    tech: 'React',
    services: ['web', 'instagram'],
    links: [
      { label: 'Ver sitio',     url: 'https://takeoffenglish.ar/' },
      { label: 'Ver Instagram', url: 'https://www.instagram.com/_takeoffenglish/' },
    ],
    logo: takeoffLogo,
  },
  {
    id: 10,
    name: 'Cabañas Arcángeles',
    initials: 'CA',
    tipo: 'Turismo',
    tech: 'React',
    services: ['web'],
    links: [{ label: 'Ver sitio', url: 'https://xn--cabaasarcangeles-9tb.com/' }],
    logoDark: cabanasLogo,
    logoLight: cabanasLogoLight,
  },
  {
    id: 11,
    name: 'Florida Aventura',
    initials: 'FA',
    tipo: 'Rent a Car',
    tech: 'React',
    services: ['web', 'instagram'],
    links: [
      { label: 'Ver sitio',     url: 'https://www.floridaaventura.com/' },
      { label: 'Ver Instagram', url: 'https://www.instagram.com/floridaaventura/' },
    ],
    logo: floridaLogo,
  },
  {
    id: 12,
    name: 'Lizze Argentina',
    initials: 'LZ',
    tipo: 'E-commerce',
    tech: 'TiendaNube',
    services: ['web'],
    links: [{ label: 'Ver tienda', url: 'https://lizze.ar/' }],
    logo: lizzeLogo,
    logoCarouselLight: lizzeCarLightLogo,
    logoCarouselDark: lizzeCarDarkLogo,
  },
  {
    id: 13,
    name: 'Dyxoma',
    initials: 'DY',
    tipo: 'E-commerce',
    tech: null,
    services: ['google-ads', 'meta-ads', 'instagram'],
    links: [
      { label: 'Ver tienda',     url: 'https://www.dyxoma.com.ar/' },
      { label: 'Ver Instagram', url: 'https://www.instagram.com/dyxoma.ar/' },
    ],
    logo: dyxomaLogo,
  },
  {
    id: 14,
    name: 'Fútbol Queens',
    initials: 'FQ',
    tipo: 'Deportes',
    tech: null,
    services: ['google-ads', 'meta-ads', 'instagram'],
    links: [
      { label: 'Ver sitio',     url: 'https://futbolqueens.com/' },
      { label: 'Ver Instagram', url: 'https://www.instagram.com/futbolqueens/' },
    ],
    logoLight: queensLogoLight,
    logoDark: queensLogoDark,
    logoCarousel: queensLogoCar,
  },
  {
    id: 15,
    name: "Miguel D'Odorico",
    initials: 'MD',
    tipo: 'Inmobiliaria',
    tech: null,
    services: ['google-ads', 'meta-ads', 'instagram'],
    links: [
      { label: 'Ver sitio',     url: 'https://www.migueldodorico.com/' },
      { label: 'Ver Instagram', url: 'https://www.instagram.com/migueldodorico/' },
    ],
    logo: miguelLogo,
    logoCarousel: logoMD
  },
  {
    id: 16,
    name: 'INB Seguros',
    initials: 'IN',
    tipo: 'Seguros',
    tech: null,
    services: ['google-ads', 'meta-ads', 'instagram'],
    links: [{ label: 'Ver Instagram', url: 'https://www.instagram.com/inbseguros/' }],
    logoLight: INBlight,
    logoDark: INBdark,
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: '14+', label: 'Sitios desarrollados' },
  { value: '20+',  label: 'Clientes' },
  { value: '10+',   label: 'Tecnologías' },
];

// ─── Service chip ─────────────────────────────────────────────────────────────
function ServiceChip({ service }) {
  const color = SERVICE_COLORS[service];
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: `${color}1a`, color }}
    >
      {SERVICE_LABELS[service]}
    </span>
  );
}

// ─── Client card ──────────────────────────────────────────────────────────────
function ClientCard({ client, isDark }) {
  const [hovered, setHovered] = useState(false);
  const color = cardColor(client);
  const expandedHeight = 88 + client.links.length * 48;

  const borderColor = hovered ? color : (isDark ? '#1e1e1e' : '#e5e7eb');
  const overlayBg = isDark ? '#111111' : '#ffffff';
  const logoBg = isDark ? '#1a1a1a' : '#f3f4f6';
  const logo = getCardLogo(client, isDark);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minHeight: hovered && client.links.length > 1 ? expandedHeight : 110,
        borderColor,
        boxShadow: hovered ? `0 0 40px ${color}28` : 'none',
        transition: 'min-height 0.22s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className="relative rounded-2xl border bg-white dark:bg-[#111111] overflow-hidden cursor-pointer"
    >
      {/* Overlay hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-5 py-6 z-10"
            style={{ background: `linear-gradient(135deg, ${color}1a 0%, ${overlayBg} 65%)` }}
          >
            <span className="text-base font-bold text-[#111111] dark:text-white tracking-tight text-center">
              {client.name}
            </span>
            {client.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity w-full justify-center"
                style={{ background: color, color: '#fff' }}
              >
                {link.label}
                <ExternalLink size={13} />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido normal */}
      <div
        className="absolute inset-0 flex flex-row items-stretch transition-opacity duration-150"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <div className="flex-1 flex flex-col justify-between min-w-0 p-5">
          <div>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-0.5 leading-snug">{client.name}</h3>
            <p className="text-gray-500 text-xs mb-3">{client.tipo}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {client.tech && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: `${TECH_COLORS[client.tech]}18`,
                  color: TECH_COLORS[client.tech],
                }}
              >
                {client.tech}
              </span>
            )}
            {client.services.map((s) => (
              <ServiceChip key={s} service={s} />
            ))}
          </div>
        </div>

        <div
          className="w-28 shrink-0 flex items-center justify-center overflow-hidden"
          style={{ background: logoBg }}
        >
          <img
            src={logo.src}
            alt={client.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({ active, onChange, isDark }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
          style={
            active === f.id
              ? { background: '#3256D7', color: '#fff' }
              : isDark
                ? { background: '#1a1a1a', color: '#6b7280', border: '1px solid #1e1e1e' }
                : { background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb' }
          }
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

// ─── Logo carousel ────────────────────────────────────────────────────────────
function LogoCarousel({ isDark }) {
  const [paused, setPaused] = useState(false);
  const items = [...clients, ...clients];
  const fadeColor = isDark ? '#080808' : '#f8f8f8';

  return (
    <div
      className="relative mt-16 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
        style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
        style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }} />

      <div
        className="flex gap-4"
        style={{
          width: 'max-content',
          animation: 'marquee 32s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {items.map((client, i) => {
          const logo = getCarouselLogo(client, isDark);
          return (
            <a
              key={`${client.id}-${i}`}
              href={client.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 h-32 w-56 overflow-hidden hover:border-[#3256D7]/50 transition-colors duration-300 group"
            >
              <img
                src={logo.src}
                alt={client.name}
                className="w-full h-full object-contain p-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────────
export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const filtered = activeFilter === 'all'
    ? clients
    : clients.filter((c) => c.services.includes(activeFilter));

  return (
    <section id="casos" className="section-padding bg-[#f8f8f8] dark:bg-[#080808]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#111111] dark:text-white mb-4 tracking-tight">
            Nuestros <span style={{ color: '#3256D7' }}>clientes</span>.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            Proyectos reales. Resultados concretos. Tecnología que funciona.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-3 gap-px mb-12 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#1e1e1e]"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#111111] px-4 py-6 text-center"
              style={{ borderRight: i < stats.length - 1 ? `1px solid ${isDark ? '#1e1e1e' : '#e5e7eb'}` : 'none' }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#111111] dark:text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <FilterBar active={activeFilter} onChange={setActiveFilter} isDark={isDark} />
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-start"
          >
            {filtered.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
              >
                <ClientCard client={client} isDark={isDark} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Carousel — full width */}
      <LogoCarousel isDark={isDark} />

    </section>
  );
}
