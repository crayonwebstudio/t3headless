export type Locale = 'en' | 'de';

export const T3ELEMENT_LINKS = {
  siteUrl: 'https://t3element.com',
  appLoginUrl: 'https://ce.t3element.com/auth/login',
  appRegisterUrl: 'https://ce.t3element.com/auth/registration',
  terUrl: 'https://extensions.typo3.org/extension/t3element',
  t3headlessTerUrl: 'https://extensions.typo3.org/extension/t3headless',
  docsGuideUrl: 'https://document.t3elements.com/category/headless',
  packagistUrl: 'https://packagist.org/packages/t3element/t3element12',
  githubUrl: 'https://github.com/milancrayon/t3element12',
  composerCmd: 'composer require t3element/t3element12',
  t3headlessComposerCmd: 'composer require t3element/t3headless',
  meetingUrl: 'https://cal.com/milan-pandya-m3tsbn/15min',
} as const;

export interface RouteMap {
  home: string;
  builtWith: string;
  document: string;
  contact: string;
  supportTicket: string;
  privacyPolicy: string;
  faq: string;
}

export const ROUTES: Record<Locale, RouteMap> = {
  en: {
    home: '/',
    builtWith: '/for-typo3-lovers',
    document: '/document',
    contact: '/contact',
    supportTicket: '/support-ticket',
    privacyPolicy: '/privacy-policy',
    faq: '/faq',
  },
  de: {
    home: '/de',
    builtWith: '/de/erstellt-mit',
    document: '/de/dokumentation',
    contact: '/de/kontakt',
    supportTicket: '/de/support-ticket',
    privacyPolicy: '/de/datenschutz',
    faq: '/de/faq',
  },
};

export function getEquivalentRoute(currentPath: string, targetLocale: Locale): string {
  const cleanPath = currentPath.replace(/\/$/, '') || '/';
  const sourceLocale: Locale = cleanPath === '/de' || cleanPath.startsWith('/de/') ? 'de' : 'en';
  if (sourceLocale === targetLocale) return cleanPath;

  const entries = Object.entries(ROUTES[sourceLocale]) as [keyof RouteMap, string][];
  for (const [key, path] of entries) {
    if (path === cleanPath) {
      return ROUTES[targetLocale][key];
    }
  }
  return ROUTES[targetLocale].home;
}

export const SITE_CONTENT = {
  en: {
    meta: {
      siteTitle: 'T3Headless - Enterprise Headless TYPO3 CMS & T3Element Solutions',
      siteTagline: 'Enterprise Headless TYPO3 Architecture',
      description:
        'Unlock the full potential of your digital content with an API-first headless architecture powered by TYPO3 CMS and T3Element.',
      hqLocation: 'Glattpark (Opfikon), Switzerland',
      address: 'Thurgauerstrasse 117, 8152 Opfikon (Glattpark), Switzerland',
      email: 'support@t3headless.com',
      salesEmail: 'hello@t3headless.com',
      enterpriseEmail: 'enterprise@t3headless.com',
      calLink: 'https://cal.com/milan-pandya-m3tsbn/15min',
    },
    nav: {
      home: 'Home',
      builtWith: 'Built With 🧡',
      services: 'Services',
      program360: '360 Program',
      document: 'Docs',
      faq: 'FAQ',
      support: 'Support Ticket',
      contactCta: "Let's talk",
      bookCall: 'Book Consultation',
      apiStatus: 'TYPO3 v13/v14 API Ready',
    },
    hero: {
      eyebrow: 'PREMIUM HEADLESS CMS SOLUTIONS',
      radarEyebrow: 'OUR ARCHITECTURE BENCHMARK',
      title: 'We engineer API-first headless experiences powered by TYPO3.',
      subtitle:
        'Unlock the full potential of your digital content with a decoupled headless architecture, structured JSON content delivery, and zero-Fluid overhead powered by T3Element.',
      primaryCta: 'Sign Up For Free',
      secondaryCta: 'Explore T3Element',
      consultationBadge: 'Book a free 1:1 architecture consultation',
      radarLegend: {
        legacy: 'Traditional Monolithic CMS',
        headless: 'T3Headless + T3Element',
      },
      radarAxes: [
        { label: 'API Speed', legacy: 42, headless: 98, detail: '< 18ms cached edge JSON payload delivery' },
        { label: 'Page Tree', legacy: 65, headless: 96, detail: '1:1 native TYPO3 page tree to frontend routing' },
        { label: 'Frontend Freedom', legacy: 35, headless: 100, detail: 'React, Next.js, Remix, Mobile & IoT ready' },
        { label: 'Editor Preview', legacy: 70, headless: 94, detail: 'Instant live external frontend preview in TYPO3' },
        { label: 'Security', legacy: 58, headless: 99, detail: 'Air-gapped backend CMS with read-only edge APIs' },
        { label: 'SEO Control', legacy: 60, headless: 95, detail: 'Canonical, OpenGraph, hreflang & JSON-LD native' },
      ],
    },
    capabilities: {
      eyebrow: 'CORE ARCHITECTURE & DELIVERABLES',
      heading: 'Everything you need for a powerful Headless TYPO3 CMS experience.',
      description:
        'We bridge enterprise-grade TYPO3 governance with modern frontend agility, providing API-ready content blocks, automated page tree synchronization, and type-safe component mapping without writing legacy Fluid templates.',
      clusters: [
        {
          category: 'HEADLESS API ENGINE',
          tags: [
            'Structured JSON REST API',
            'Decoupled Page Tree Routing',
            'Multi-Language / hreflang',
            'Multi-Site Domain Trees',
            'Edge CDN Caching',
            'GraphQL & Webhook Hooks',
          ],
        },
        {
          category: 'T3ELEMENT DEVELOPER DX',
          tags: [
            'Zero Fluid Templates',
            'Custom Content Elements',
            'JSON-to-Component Mapping',
            'TypeScript Schema Gen',
            'Real-Time Split Preview',
            'React / Next.js Starters',
          ],
        },
        {
          category: 'ENTERPRISE GOVERNANCE',
          tags: [
            'Granular RBAC Workspaces',
            'Built-in SEO Metadata',
            '360 Care SLA Maintenance',
            'Automated Security Patches',
            'Swiss Cloud Compliance',
            'High-Concurrency Scaling',
          ],
        },
      ],
      pipeline: [
        {
          step: '01',
          title: 'Content Modeling',
          summary: 'Define modular content elements and structured fields in TYPO3 using T3Element without Fluid overhead.',
        },
        {
          step: '02',
          title: 'Page Tree Mapping',
          summary: 'Preserve TYPO3’s intuitive hierarchical page tree and automatically resolve slugs, menus, and breadcrumbs.',
        },
        {
          step: '03',
          title: 'JSON API Serialization',
          summary: 'Expose clean, predictable JSON endpoints via our official TYPO3 extension EXT:t3headless.',
        },
        {
          step: '04',
          title: 'Component Hydration',
          summary: 'Map each `CType` directly to React, Next.js, or Svelte UI components with full TypeScript safety.',
        },
        {
          step: '05',
          title: 'Real-Time Preview & Edge Deploy',
          summary: 'Editors preview draft changes live inside external frontends before instant edge invalidation.',
        },
      ],
    },
    showcase: {
      eyebrow: 'ECOSYSTEM & WORKLOADS',
      heading: 'Built to integrate seamlessly and scale rapidly.',
      viewAllCta: 'Explore documentation & blueprints',
      cards: [
        {
          id: 't3headless-core',
          badge: 'CORE PLATFORM • v13 / v14',
          title: 'T3Headless Enterprise Distribution',
          metric: '99.99% API Uptime • <18ms TTFB',
          description:
            'Pre-configured Headless TYPO3 distribution with our official TER extension `EXT:t3headless`, automated route enhancers, and enterprise caching.',
          tags: ['TYPO3 v13 / v14', 'REST JSON API', 'Page Tree Sync'],
          theme: 'orange',
          href: '/document',
        },
        {
          id: 't3element-engine',
          badge: 'BUILT WITH 🧡 • ZERO FLUID',
          title: 'T3Element Content Block Engine',
          metric: '4.2× Faster Custom CE Creation',
          description:
            'Create custom TYPO3 content elements that output structured JSON directly to your frontend components, with no Fluid templates or complex TypoScript required.',
          tags: ['T3Element', 'Custom CTypes', 'Live Preview'],
          theme: 'dark',
          href: '/for-typo3-lovers',
        },
        {
          id: 'frontend-starters',
          badge: 'FRONTEND ACCELERATORS',
          title: 'React & Next.js Headless Kits',
          metric: '100 / 100 Core Web Vitals',
          description:
            'Production-ready frontend kits featuring dynamic component resolvers, automated SEO metadata injection, and multi-language i18n routing.',
          tags: ['React 19', 'Next.js App Router', 'TypeScript'],
          theme: 'cream',
          href: '/services',
        },
        {
          id: '360-enterprise-care',
          badge: 'MANAGED SLA PROGRAM',
          title: '360 Care: Continuous TYPO3 Operations',
          metric: '24/7 Proactive Monitoring & Upgrades',
          description:
            'End-to-end maintenance, ELTS/LTS version upgrades, security hardening, and dedicated Swiss engineering support for mission-critical TYPO3 workloads.',
          tags: ['360 Program', 'Security SLA', 'LTS Upgrades'],
          theme: 'amber',
          href: '/360-program',
        },
      ],
    },
    thesis: {
      eyebrow: 'OUR ENGINEERING APPROACH',
      heading: 'Model. Deliver. Render.',
      body: 'Decouple content management from presentation without sacrificing what editors love about TYPO3. Editors keep the visual page tree; developers get clean JSON APIs.',
      cta: 'Explore architecture docs',
    },
    features: {
      eyebrow: 'KEY FEATURES OF TYPO3 HEADLESS SOLUTION',
      heading: 'Main engineering directions.',
      items: [
        {
          code: '01 / API',
          title: 'Structured API-Driven Content Delivery',
          description:
            'Deliver all page layouts, content elements, navigation menus, and media assets as clean, predictable JSON endpoints ready for any consumer.',
          deliverables: ['RESTful JSON Endpoints', 'Custom Route Enhancers', 'Media Variant URLs'],
        },
        {
          code: '02 / MODELING',
          title: 'Flexible Content Modeling',
          description:
            'Design reusable, modular content blocks and custom TCA fields tailored to your domain without rigid page templates.',
          deliverables: ['Custom Content Elements', 'Inline IRRE Relations', 'Repeatable Grid Containers'],
        },
        {
          code: '03 / ROUTING',
          title: 'Decoupled Page Tree Mapping',
          description:
            'Retain TYPO3’s hierarchical page tree, multi-domain roots, and localized URL slugs while delegating rendering to your JavaScript framework.',
          deliverables: ['Hierarchical Menus', 'Slug Resolution API', 'Breadcrumb Trails'],
        },
        {
          code: '04 / COMPONENTS',
          title: 'Customizable Content-to-Component Mapping',
          description:
            'Map each TYPO3 `CType` directly to React, Next.js, or Svelte components using declarative component registries.',
          deliverables: ['1:1 CType Registry', 'Type-Safe Props', 'Dynamic Lazy Loading'],
        },
        {
          code: '05 / SEO',
          title: 'Built-in SEO Metadata Control',
          description:
            'Manage meta titles, descriptions, OpenGraph tags, canonical URLs, hreflang alternates, and robots directives directly inside TYPO3.',
          deliverables: ['OpenGraph & Twitter Cards', 'XML Sitemap JSON', 'Hreflang Matrix'],
        },
        {
          code: '06 / PREVIEW',
          title: 'Real-Time Preview with External Frontends',
          description:
            'Empower editors to preview unpublished workspaces and hidden content elements live inside your decoupled React or Next.js frontend.',
          deliverables: ['Draft Token Auth', 'Split-Screen Backend View', 'Workspace Preview'],
        },
        {
          code: '07 / SCALE',
          title: 'Scalable for Enterprise Workloads',
          description:
            'Handle millions of requests with decoupled edge caching, stale-while-revalidate strategies, and air-gapped backend administration.',
          deliverables: ['Edge CDN Purge', 'Horizontal API Scaling', 'Zero Backend Exposure'],
        },
        {
          code: '08 / OMNI',
          title: 'Omnichannel & Multi-Language Ready',
          description:
            'Publish once in TYPO3 and distribute localized content simultaneously across web apps, native mobile apps, kiosks, and AI agents.',
          deliverables: ['Unlimited Locales', 'Fallback Chains', 'Webhook Triggers'],
        },
      ],
    },
    benchmarks: {
      eyebrow: 'VALUE FOR ENTERPRISE TEAMS',
      heading: 'Why engineering teams switch to T3Headless.',
      rows: [
        {
          rank: '#1',
          domain: 'Enterprise Corporate Portals',
          impact: '100+ Multi-Site Markets',
          summary: 'Centralized TYPO3 governance with localized React/Next.js frontends deployed at the edge.',
        },
        {
          rank: '#2',
          domain: 'High-Traffic E-Commerce & Media',
          impact: '< 18ms API Response',
          summary: 'Instant page transitions and 100/100 Lighthouse performance by eliminating monolithic rendering.',
        },
        {
          rank: '#3',
          domain: 'Regulated Finance & Healthcare',
          impact: 'Zero Public CMS Attack Surface',
          summary: 'TYPO3 backend runs inside a private VPC while public visitors interact strictly with static/SSR edge nodes.',
        },
      ],
      stats: [
        { value: '100%', label: 'Native TYPO3 Page Tree Preserved' },
        { value: '0', label: 'Fluid Templates Required with T3Element' },
        { value: '4.2×', label: 'Faster Frontend Feature Delivery' },
        { value: '24/7', label: 'Swiss Enterprise SLA & 360 Care' },
      ],
    },
    faqs: {
      eyebrow: 'TECHNICAL FAQ',
      heading: 'Frequently asked questions.',
      items: [
        {
          q: 'What is a headless architecture in TYPO3?',
          a: 'In a headless TYPO3 architecture, the backend CMS (TYPO3) is decoupled from the frontend presentation layer. Instead of rendering HTML via Fluid templates on the server, TYPO3 delivers structured content as JSON via REST APIs to modern frontend frameworks like React or Next.js.',
        },
        {
          q: 'Which TYPO3 versions are compatible with T3Headless?',
          a: 'T3Headless fully supports modern LTS releases including TYPO3 v13 LTS and TYPO3 v14, with migration pathways and 360 Care support for older v11/v12 installations.',
        },
        {
          q: 'Which frontend frameworks can I use with T3Headless?',
          a: 'Because T3Headless outputs standard, structured JSON over HTTP, you can use any frontend technology, including React, Next.js (App Router), SvelteKit, Angular, Remix, or native iOS/Android applications.',
        },
        {
          q: 'Where can I get the official T3Headless TYPO3 extension?',
          a: 'Our official extension `EXT:t3headless` is published on the TYPO3 Extension Repository and pairs seamlessly with `T3Element` for zero-Fluid content element creation and component mapping.',
        },
        {
          q: 'Do editors lose the TYPO3 Page Tree in headless mode?',
          a: 'Not at all. Editors continue working with the familiar TYPO3 hierarchical page tree, drag-and-drop content elements, workspaces, and permissions. Our routing API mirrors the page tree automatically.',
        },
        {
          q: 'Is T3Headless suitable for large-scale enterprise websites?',
          a: 'Absolutely. Decoupling the CMS allows independent scaling of read-heavy frontend traffic on global CDNs while keeping the TYPO3 backend secure behind corporate firewalls or VPNs.',
        },
        {
          q: 'How is SEO handled in a decoupled TYPO3 setup?',
          a: 'All SEO fields managed in TYPO3 (meta title, description, canonical tags, OpenGraph images, robots instructions, and localized hreflang links) are included in every page JSON payload for server-side rendering.',
        },
        {
          q: 'Can we migrate an existing Fluid-based TYPO3 site to T3Headless?',
          a: 'Yes. You can migrate incrementally (hybrid headless) or perform a clean frontend modernization while keeping your existing database pages, FAL media assets, and redirects intact.',
        },
        {
          q: 'How does real-time preview work for editors?',
          a: 'When an editor clicks "View" in the TYPO3 backend, T3Headless generates a secure preview token and opens the external frontend in draft mode, rendering unpublished changes immediately.',
        },
        {
          q: 'Do you provide starter kits, boilerplates, or live demos?',
          a: 'Yes. We provide starter blueprints, JSON schema references in our Documentation Hub, and personalized 1:1 walkthroughs of T3Headless + T3Element.',
        },
        {
          q: 'Can we integrate third-party APIs (CRM, ERP, Search, Dam) alongside TYPO3?',
          a: 'Yes. A headless frontend makes composable architecture effortless. Combine TYPO3 content JSON with Algolia/Meilisearch, Shopify/Shopware, HubSpot, or custom microservices in one unified UI.',
        },
        {
          q: 'What ongoing support is available after launch?',
          a: 'Our 360 Program provides continuous TYPO3 core & extension maintenance, proactive security patching, performance tuning, and dedicated engineering support from our team.',
        },
      ],
    },
    footer: {
      eyebrow: 'READY TO MODERNIZE YOUR TYPO3 STACK?',
      giantCta: "Let's talk",
      bannerTitle: 'Looking for an Enterprise-Level TYPO3 Headless CMS?',
      bannerSubtitle: 'Scalable, secure, and API-first architecture engineered for modern digital teams.',
      newsletterLabel: 'SUBSCRIBE TO ARCHITECTURE UPDATES',
      newsletterPlaceholder: 'ENTER YOUR WORK EMAIL',
      newsletterButton: 'Subscribe',
      copyright: '© 2026 T3Headless. All Rights Reserved.',
    },
  },
  de: {
    meta: {
      siteTitle: 'T3Headless - Enterprise Headless TYPO3 CMS & T3Element Lösungen',
      siteTagline: 'Enterprise Headless TYPO3 Architektur',
      description:
        'Entfesseln Sie das volle Potenzial Ihrer digitalen Inhalte mit einer API-First Headless-Architektur auf Basis von TYPO3 CMS und T3Element.',
      hqLocation: 'Glattpark (Opfikon), Schweiz',
      address: 'Thurgauerstrasse 117, 8152 Opfikon (Glattpark), Schweiz',
      email: 'support@t3headless.com',
      salesEmail: 'hello@t3headless.com',
      enterpriseEmail: 'enterprise@t3headless.com',
      calLink: 'https://cal.com/milan-pandya-m3tsbn/15min',
    },
    nav: {
      home: 'Startseite',
      builtWith: 'Erstellt mit 🧡',
      services: 'Leistungen',
      program360: '360 Programm',
      document: 'Doku',
      faq: 'FAQ',
      support: 'Support-Ticket',
      contactCta: 'Kontakt aufnehmen',
      bookCall: 'Beratung buchen',
      apiStatus: 'TYPO3 v13/v14 API Bereit',
    },
    hero: {
      eyebrow: 'PREMIUM HEADLESS CMS LÖSUNGEN',
      radarEyebrow: 'UNSER ARCHITEKTUR-BENCHMARK',
      title: 'Wir entwickeln API-First Headless-Erlebnisse mit TYPO3.',
      subtitle:
        'Nutzen Sie das volle Potenzial Ihrer Inhalte mit einer entkoppelten Headless-Architektur, strukturierter JSON-Auslieferung und null Fluid-Overhead dank T3Element.',
      primaryCta: 'Kostenlos starten',
      secondaryCta: 'T3Element entdecken',
      consultationBadge: 'Kostenlose 1:1 Architektur-Beratung buchen',
      radarLegend: {
        legacy: 'Traditionelles Monolithisches CMS',
        headless: 'T3Headless + T3Element',
      },
      radarAxes: [
        { label: 'API-Speed', legacy: 42, headless: 98, detail: '< 18ms gecachte Edge-JSON-Antwortzeit' },
        { label: 'Seitenbaum', legacy: 65, headless: 96, detail: '1:1 nativer TYPO3-Seitenbaum im Frontend-Routing' },
        { label: 'Frontend-Freiheit', legacy: 35, headless: 100, detail: 'Bereit für React, Next.js, Mobile & IoT' },
        { label: 'Editor-Vorschau', legacy: 70, headless: 94, detail: 'Sofortige Live-Vorschau im externen Frontend' },
        { label: 'Sicherheit', legacy: 58, headless: 99, detail: 'Isoliertes CMS-Backend mit Read-Only Edge-APIs' },
        { label: 'SEO-Kontrolle', legacy: 60, headless: 95, detail: 'Canonical, OpenGraph, hreflang & JSON-LD nativ' },
      ],
    },
    capabilities: {
      eyebrow: 'KERNARCHITEKTUR & DELIVERABLES',
      heading: 'Alles für ein leistungsstarkes Headless TYPO3 CMS Erlebnis.',
      description:
        'Wir verbinden Enterprise-Governance von TYPO3 mit moderner Frontend-Agilität, inklusive API-fertiger Content-Blöcke, automatischer Seitenbaum-Synchronisation und typsicherem Komponenten-Mapping ohne Fluid-Templates.',
      clusters: [
        {
          category: 'HEADLESS API ENGINE',
          tags: [
            'Strukturierte JSON REST API',
            'Entkoppeltes Seitenbaum-Routing',
            'Mehrsprachigkeit / hreflang',
            'Multi-Site Domain-Bäume',
            'Edge CDN Caching',
            'GraphQL & Webhooks',
          ],
        },
        {
          category: 'T3ELEMENT DEVELOPER DX',
          tags: [
            'Keine Fluid-Templates nötig',
            'Eigene Content-Elemente',
            'JSON-zu-Komponenten Mapping',
            'TypeScript Schema-Gen',
            'Echtzeit Split-Vorschau',
            'React / Next.js Starter',
          ],
        },
        {
          category: 'ENTERPRISE GOVERNANCE',
          tags: [
            'Granulare RBAC Workspaces',
            'Integrierte SEO-Metadaten',
            '360 Care SLA Wartung',
            'Automatische Sicherheits-Patches',
            'Schweizer Cloud-Compliance',
            'Hochlast-Skalierung',
          ],
        },
      ],
      pipeline: [
        {
          step: '01',
          title: 'Content-Modellierung',
          summary: 'Definieren Sie modulare Inhaltselemente in TYPO3 mit T3Element, komplett ohne Fluid-Aufwand.',
        },
        {
          step: '02',
          title: 'Seitenbaum-Mapping',
          summary: 'Behalten Sie den hierarchischen TYPO3-Seitenbaum bei und lösen Sie Slugs, Menüs und Breadcrumbs automatisch auf.',
        },
        {
          step: '03',
          title: 'JSON API Serialisierung',
          summary: 'Stellen Sie saubere JSON-Endpunkte über unsere offizielle TYPO3 Extension EXT:t3headless bereit.',
        },
        {
          step: '04',
          title: 'Komponenten-Hydration',
          summary: 'Verknüpfen Sie jeden `CType` direkt mit React-, Next.js- oder Svelte-Komponenten.',
        },
        {
          step: '05',
          title: 'Echtzeit-Vorschau & Edge-Deploy',
          summary: 'Redakteure prüfen Entwürfe live im externen Frontend vor der weltweiten Edge-Auslieferung.',
        },
      ],
    },
    showcase: {
      eyebrow: 'ÖKOSYSTEM & WORKLOADS',
      heading: 'Nahtlos integrieren, schnell wachsen.',
      viewAllCta: 'Dokumentation & Blueprints ansehen',
      cards: [
        {
          id: 't3headless-core',
          badge: 'KERNPLATTFORM • v13 / v14',
          title: 'T3Headless Enterprise Distribution',
          metric: '99,99% API-Verfügbarkeit • <18ms TTFB',
          description:
            'Vorkonfigurierte Headless-TYPO3-Distribution mit unserer offiziellen TER-Extension `EXT:t3headless`, Route-Enhancern und Enterprise-Caching.',
          tags: ['TYPO3 v13 / v14', 'REST JSON API', 'Seitenbaum-Sync'],
          theme: 'orange',
          href: '/de/dokumentation',
        },
        {
          id: 't3element-engine',
          badge: 'ERSTELLT MIT 🧡 • ZERO FLUID',
          title: 'T3Element Content-Block Engine',
          metric: '4,2× schnellere CE-Entwicklung',
          description:
            'Erstellen Sie eigene TYPO3 Content-Elemente, die direkt strukturiertes JSON für Ihre Frontend-Komponenten liefern, ohne Fluid oder komplexes TypoScript.',
          tags: ['T3Element', 'Custom CTypes', 'Live-Vorschau'],
          theme: 'dark',
          href: '/de/erstellt-mit',
        },
        {
          id: 'frontend-starters',
          badge: 'FRONTEND ACCELERATORS',
          title: 'React & Next.js Headless Kits',
          metric: '100 / 100 Core Web Vitals',
          description:
            'Produktionsreife Frontend-Starter mit dynamischem Komponenten-Resolver, automatischem SEO-Meta-Rendering und i18n-Routing.',
          tags: ['React 19', 'Next.js App Router', 'TypeScript'],
          theme: 'cream',
          href: '/de/dienstleistungen',
        },
        {
          id: '360-enterprise-care',
          badge: 'MANAGED SLA PROGRAMM',
          title: '360 Care: Kontinuierlicher TYPO3-Betrieb',
          metric: '24/7 Monitoring & LTS-Upgrades',
          description:
            'Rundum-Wartung, ELTS/LTS-Versions-Upgrades, Security-Hardening und dedizierter Schweizer Engineering-Support.',
          tags: ['360 Programm', 'Security SLA', 'LTS-Upgrades'],
          theme: 'amber',
          href: '/de/360-programm',
        },
      ],
    },
    thesis: {
      eyebrow: 'UNSER ENGINEERING-ANSATZ',
      heading: 'Modellieren. Ausliefern. Rendern.',
      body: 'Entkoppeln Sie Content-Management und Darstellung, ohne auf die Stärken von TYPO3 zu verzichten. Redakteure behalten den Seitenbaum; Entwickler erhalten saubere JSON-APIs.',
      cta: 'Architektur-Doku entdecken',
    },
    features: {
      eyebrow: 'KERNFUNKTIONEN DER TYPO3 HEADLESS LÖSUNG',
      heading: 'Unsere technischen Schwerpunkte.',
      items: [
        {
          code: '01 / API',
          title: 'Strukturierte API-gestützte Content-Auslieferung',
          description:
            'Liefern Sie Seitenlayouts, Inhaltselemente, Navigationsmenüs und Medien als saubere, vorhersehbare JSON-Endpunkte aus.',
          deliverables: ['RESTful JSON-Endpunkte', 'Custom Route Enhancer', 'Medien-Varianten URLs'],
        },
        {
          code: '02 / MODELLIERUNG',
          title: 'Flexible Content-Modellierung',
          description:
            'Entwerfen Sie wiederverwendbare Content-Blöcke und eigene TCA-Felder ohne starre Seitenvorlagen.',
          deliverables: ['Eigene Content-Elemente', 'Inline IRRE-Relationen', 'Grid-Container'],
        },
        {
          code: '03 / ROUTING',
          title: 'Entkoppeltes Seitenbaum-Mapping',
          description:
            'Nutzen Sie den hierarchischen TYPO3-Seitenbaum, Multi-Domain-Wurzeln und lokalisierte URL-Slugs nahtlos im JS-Framework.',
          deliverables: ['Hierarchische Menüs', 'Slug-Resolution API', 'Breadcrumb-Pfade'],
        },
        {
          code: '04 / KOMPONENTEN',
          title: 'Anpassbares Content-zu-Komponenten Mapping',
          description:
            'Verknüpfen Sie jeden TYPO3 `CType` deklarativ mit React-, Next.js- oder Svelte-Komponenten.',
          deliverables: ['1:1 CType-Registry', 'Typsichere Props', 'Dynamisches Lazy Loading'],
        },
        {
          code: '05 / SEO',
          title: 'Integrierte SEO-Metadaten-Steuerung',
          description:
            'Verwalten Sie Meta-Titel, Beschreibungen, OpenGraph-Tags, Canonicals, hreflang und Robots direkt in TYPO3.',
          deliverables: ['OpenGraph & Twitter Cards', 'XML-Sitemap JSON', 'Hreflang-Matrix'],
        },
        {
          code: '06 / VORSCHAU',
          title: 'Echtzeit-Vorschau mit externen Frontends',
          description:
            'Redakteure prüfen unveröffentlichte Workspaces und Entwürfe live im entkoppelten React- oder Next.js-Frontend.',
          deliverables: ['Draft-Token Auth', 'Split-Screen Ansicht', 'Workspace-Vorschau'],
        },
        {
          code: '07 / SKALIERUNG',
          title: 'Skalierbar für Enterprise-Workloads',
          description:
            'Bewältigen Sie Millionen Zugriffe durch Edge-Caching, Stale-While-Revalidate und ein geschütztes CMS-Backend.',
          deliverables: ['Edge CDN Purge', 'Horizontale Skalierung', 'Null Backend-Exponierung'],
        },
        {
          code: '08 / OMNI',
          title: 'Omnichannel & Mehrsprachigkeit',
          description:
            'Einmal in TYPO3 pflegen und gleichzeitig auf Web-Apps, Mobile-Apps, Terminals und KI-Agenten ausspielen.',
          deliverables: ['Unbegrenzte Sprachen', 'Fallback-Ketten', 'Webhook-Trigger'],
        },
      ],
    },
    benchmarks: {
      eyebrow: 'MEHRWERT FÜR ENTERPRISE-TEAMS',
      heading: 'Warum Engineering-Teams zu T3Headless wechseln.',
      rows: [
        {
          rank: '#1',
          domain: 'Enterprise Corporate Portale',
          impact: '100+ Multi-Site Märkte',
          summary: 'Zentrale TYPO3-Governance kombiniert mit lokalisierten React/Next.js Edge-Frontends.',
        },
        {
          rank: '#2',
          domain: 'High-Traffic E-Commerce & Medien',
          impact: '< 18ms API-Antwortzeit',
          summary: 'Sofortige Seitenwechsel und 100/100 Lighthouse-Scores ohne monolithischen Render-Ballast.',
        },
        {
          rank: '#3',
          domain: 'Finanzwesen & Gesundheitssektor',
          impact: 'Null öffentliche CMS-Angriffsfläche',
          summary: 'Das TYPO3-Backend läuft isoliert im privaten Netz, während Besucher nur mit Edge-Knoten interagieren.',
        },
      ],
      stats: [
        { value: '100%', label: 'Nativer TYPO3-Seitenbaum bleibt erhalten' },
        { value: '0', label: 'Fluid-Templates nötig dank T3Element' },
        { value: '4,2×', label: 'Schnellere Frontend-Entwicklung' },
        { value: '24/7', label: 'Schweizer Enterprise SLA & 360 Care' },
      ],
    },
    faqs: {
      eyebrow: 'TECHNISCHE FAQ',
      heading: 'Häufig gestellte Fragen.',
      items: [
        {
          q: 'Was bedeutet Headless-Architektur bei TYPO3?',
          a: 'In einer Headless-TYPO3-Architektur ist das Backend-CMS (TYPO3) von der Darstellungsschicht entkoppelt. Statt HTML über Fluid-Templates auf dem Server zu generieren, liefert TYPO3 strukturierte Inhalte als JSON über REST-APIs an moderne Frameworks wie React oder Next.js.',
        },
        {
          q: 'Welche TYPO3-Versionen sind mit T3Headless kompatibel?',
          a: 'T3Headless unterstützt alle modernen LTS-Versionen einschliesslich TYPO3 v13 LTS und TYPO3 v14 sowie Migrationspfade für bestehende v11/v12-Systeme.',
        },
        {
          q: 'Welche Frontend-Frameworks kann ich mit T3Headless nutzen?',
          a: 'Da T3Headless standardisiertes JSON über HTTP ausgibt, können Sie jedes beliebige Framework einsetzen, darunter React, Next.js, SvelteKit, Angular oder native Mobile-Apps.',
        },
        {
          q: 'Wo finde ich die offizielle T3Headless TYPO3 Extension?',
          a: 'Unsere offizielle Extension `EXT:t3headless` ist im TYPO3 Extension Repository verfügbar und lässt sich nahtlos mit `T3Element` kombinieren. Kein Fluid erforderlich.',
        },
        {
          q: 'Bleibt der gewohnte TYPO3-Seitenbaum für Redakteure erhalten?',
          a: 'Vollständig. Redakteure arbeiten weiterhin mit dem vertrauten hierarchischen Seitenbaum, Drag-and-Drop-Elementen, Workspaces und Zugriffsrechten.',
        },
        {
          q: 'Eignet sich T3Headless für grosse Enterprise-Plattformen?',
          a: 'Absolut. Durch die Entkopplung skaliert das Frontend weltweit über Edge-CDNs, während das TYPO3-Backend geschützt im internen Netzwerk verbleibt.',
        },
        {
          q: 'Wie wird SEO in einem entkoppelten TYPO3-Setup umgesetzt?',
          a: 'Alle SEO-Felder aus TYPO3 (Meta-Titel, Description, Canonical, OpenGraph, Robots, hreflang) werden direkt im JSON-Payload für Server-Side-Rendering oder Static Generation mitgeliefert.',
        },
        {
          q: 'Können wir ein bestehendes Fluid-basiertes TYPO3-Projekt migrieren?',
          a: 'Ja. Sowohl schrittweise Hybrid-Migrationen als auch komplette Frontend-Relaunches unter Beibehaltung Ihrer bestehenden Datenbank und FAL-Medien sind möglich.',
        },
        {
          q: 'Wie funktioniert die Echtzeit-Vorschau für Redakteure?',
          a: 'Beim Klick auf „Vorschau“ im TYPO3-Backend öffnet T3Headless das externe Frontend mit einem sicheren Draft-Token und zeigt unveröffentlichte Änderungen sofort live an.',
        },
        {
          q: 'Gibt es Starter-Kits, Boilerplates oder Live-Demos?',
          a: 'Ja, in unserem Dokumentations-Hub finden Sie Architektur-Blueprints, JSON-Schemata sowie die Möglichkeit, eine persönliche 1:1 Live-Demo zu buchen.',
        },
        {
          q: 'Lassen sich Drittsysteme (CRM, ERP, Suche, Shop) integrieren?',
          a: 'Ja. In einer Composable-Architektur kombinieren Sie TYPO3-JSON mühelos mit Algolia, Shopware/Shopify, HubSpot oder eigenen Microservices.',
        },
        {
          q: 'Welcher laufende Support wird nach dem Go-Live angeboten?',
          a: 'Unser 360-Programm bietet kontinuierliche TYPO3-Wartung, Sicherheits-Updates, LTS-Upgrades und garantierten SLA-Support aus der Schweiz.',
        },
      ],
    },
    footer: {
      eyebrow: 'BEREIT FÜR DIE MODERNISIERUNG IHRES TYPO3-STACKS?',
      giantCta: 'Kontakt aufnehmen',
      bannerTitle: 'Suchen Sie ein Enterprise TYPO3 Headless CMS?',
      bannerSubtitle: 'Skalierbare, sichere und API-zentrierte Architektur für moderne Digital-Teams.',
      newsletterLabel: 'ARCHITEKTUR-UPDATES ABONNIEREN',
      newsletterPlaceholder: 'IHRE GESCHÄFTLICHE E-MAIL-ADRESSE',
      newsletterButton: 'Abonnieren',
      copyright: '© 2026 T3Headless. Alle Rechte vorbehalten.',
    },
  },
} as const;

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  category: 'nocode' | 'architecture' | 'enterprise';
}

export const MERGED_FAQS: Record<Locale, FaqItem[]> = {
  en: [
    {
      id: 'faq-01',
      category: 'nocode',
      q: 'Do I need to write Next.js code when I create a new element in TYPO3?',
      a: 'No. That is the core advantage of T3Headless. You create Custom Elements or Container Elements visually inside TYPO3 (using the 3-tab Info, Fields, Template wizard), place them on any page, and T3Headless automatically generates the Next.js component on the frontend. You never have to open Next.js to write rendering code from scratch.',
    },
    {
      id: 'faq-02',
      category: 'nocode',
      q: 'How do Custom Elements and Container Elements work without coding knowledge?',
      a: 'In Web > T3headless > Elements, you click "+ Create New Element" or "New Container Element", drag and drop fields (String, Text, File, Link, Repeating groups, or Columns), and save. T3Headless generates the template and click-to-copy field markers automatically.',
    },
    {
      id: 'faq-03',
      category: 'nocode',
      q: 'How does the Next.js frontend stay in sync with TYPO3 changes?',
      a: 'After creating or updating elements or theme options in TYPO3, run "yarn themebuild" (or "npm run themebuild") in your t3headless-frontend directory to sync and regenerate all components and styles automatically.',
    },
    {
      id: 'faq-04',
      category: 'enterprise',
      q: 'Which TYPO3 versions are supported by EXT:t3headless?',
      a: 'EXT:t3headless supports TYPO3 v13 LTS and TYPO3 v14. Install via Composer ("composer require t3element/t3headless") for TYPO3 v13 and v14 (Composer is mandatory for TYPO3 v14+).',
    },
    {
      id: 'faq-05',
      category: 'architecture',
      q: 'What is a headless TYPO3 architecture?',
      a: 'In a headless TYPO3 architecture, the backend CMS is decoupled from the frontend presentation layer. Instead of rendering HTML server-side via legacy Fluid templates, TYPO3 delivers structured content as pure JSON REST APIs directly to modern JavaScript frontends like Next.js or React.',
    },
    {
      id: 'faq-06',
      category: 'nocode',
      q: 'What happens when I add a new field to an existing element later?',
      a: 'T3Headless protects your existing template from being overwritten. When you edit an element and add a new field, a new click-to-copy Field Marker appears above the template editor so you can place it exactly where you want.',
    },
    {
      id: 'faq-07',
      category: 'nocode',
      q: 'Can editors manage global Logo, Favicon, Fonts, and Header layouts from TYPO3?',
      a: 'Yes. Under Theme Options > Header in TYPO3, editors can upload Logos (with custom dimensions), Favicons, Theme Fonts, CSS/JS files, or assign a dedicated TYPO3 Header Page that renders across the entire Next.js site.',
    },
    {
      id: 'faq-08',
      category: 'enterprise',
      q: 'Where can I get the official T3Headless TYPO3 extension?',
      a: 'Our official extension EXT:t3headless is published on the TYPO3 Extension Repository (TER) and pairs seamlessly with T3Element for zero-Fluid content element creation and component mapping.',
    },
    {
      id: 'faq-09',
      category: 'architecture',
      q: 'Do editors lose the TYPO3 Page Tree in headless mode?',
      a: 'Not at all. Editors continue working with the familiar TYPO3 hierarchical page tree, drag-and-drop content elements, workspaces, and granular permissions. Our routing API mirrors the page tree automatically.',
    },
    {
      id: 'faq-10',
      category: 'enterprise',
      q: 'Is T3Headless suitable for large-scale enterprise websites?',
      a: 'Absolutely. Decoupling the CMS allows independent scaling of read-heavy frontend traffic on global CDNs while keeping the TYPO3 backend secure behind corporate firewalls or private VPC networks.',
    },
    {
      id: 'faq-11',
      category: 'architecture',
      q: 'How is SEO handled in a decoupled TYPO3 setup?',
      a: 'All SEO fields managed in TYPO3 (meta title, description, canonical tags, OpenGraph images, robots instructions, and localized hreflang links) are included in every page JSON payload for server-side rendering and edge caching.',
    },
    {
      id: 'faq-12',
      category: 'enterprise',
      q: 'Can we migrate an existing Fluid-based TYPO3 site to T3Headless?',
      a: 'Yes. You can migrate incrementally (hybrid headless) or perform a clean frontend modernization while keeping your existing database pages, FAL media assets, and redirects intact.',
    },
    {
      id: 'faq-13',
      category: 'architecture',
      q: 'How does real-time preview work for editors?',
      a: 'When an editor clicks "View" in the TYPO3 backend, T3Headless generates a secure preview token and opens the external frontend in draft mode, rendering unpublished changes immediately.',
    },
    {
      id: 'faq-14',
      category: 'nocode',
      q: 'Do you provide starter kits, boilerplates, or live demos?',
      a: 'Yes. We provide starter blueprints, JSON schema references in our Documentation Hub, and personalized 1:1 walkthroughs of T3Headless and T3Element.',
    },
    {
      id: 'faq-15',
      category: 'architecture',
      q: 'Can we integrate third-party APIs (CRM, ERP, Search, E-Commerce) alongside TYPO3?',
      a: 'Yes. A headless frontend makes composable architecture effortless. Combine TYPO3 content JSON with Algolia, Shopify, Shopware, HubSpot, or custom microservices in one unified UI.',
    },
    {
      id: 'faq-16',
      category: 'enterprise',
      q: 'What ongoing support is available after launch?',
      a: 'Our 360 Program provides continuous TYPO3 core and extension maintenance, proactive security patching, performance tuning, and dedicated Swiss engineering support.',
    },
    {
      id: 'faq-17',
      category: 'enterprise',
      q: 'Where is the T3Headless engineering team based?',
      a: 'Our headquarters and core engineering team are based in Glattpark (Opfikon), Zurich, Switzerland, operating in strict compliance with Swiss and European data protection standards.',
    },
  ],
  de: [
    {
      id: 'faq-01',
      category: 'nocode',
      q: 'Muss ich Next.js-Code schreiben, wenn ich ein neues Element in TYPO3 erstelle?',
      a: 'Nein. Genau das ist der Kernvorteil von T3Headless. Sie erstellen Custom Elements oder Container-Elemente visuell in TYPO3 (über den 3-Reiter-Assistenten Info, Felder, Template), platzieren sie auf beliebigen Seiten, und T3Headless generiert die Next.js-Komponente automatisch. Sie müssen keinen Frontend-Code schreiben.',
    },
    {
      id: 'faq-02',
      category: 'nocode',
      q: 'Wie funktionieren Custom Elements und Container ohne Programmierkenntnisse?',
      a: 'Unter Web > T3headless > Elements klicken Sie auf "+ Neues Element erstellen" oder "Neues Container-Element", ziehen Felder (Text, String, Datei, Link, Repeating-Gruppen oder Spalten) per Drag-and-Drop hinein und speichern. T3Headless generiert das Template und klickbare Feld-Marker automatisch.',
    },
    {
      id: 'faq-03',
      category: 'nocode',
      q: 'Wie bleibt das Next.js-Frontend mit den TYPO3-Änderungen synchron?',
      a: 'Nach dem Erstellen oder Bearbeiten von Elementen oder Theme-Optionen in TYPO3 führen Sie einfach "yarn themebuild" (oder "npm run themebuild") in Ihrem t3headless-frontend-Verzeichnis aus, um alle Komponenten und Styles automatisch abzugleichen.',
    },
    {
      id: 'faq-04',
      category: 'enterprise',
      q: 'Welche TYPO3-Versionen werden von EXT:t3headless unterstützt?',
      a: 'EXT:t3headless unterstützt TYPO3 v13 LTS und TYPO3 v14. Die Installation erfolgt per Composer ("composer require t3element/t3headless") für TYPO3 v13 und v14 (Composer ist ab TYPO3 v14 verpflichtend).',
    },
    {
      id: 'faq-05',
      category: 'architecture',
      q: 'Was bedeutet Headless-Architektur bei TYPO3?',
      a: 'In einer Headless-TYPO3-Architektur ist das Backend-CMS (TYPO3) von der Darstellungsschicht entkoppelt. Statt HTML über Fluid-Templates auf dem Server zu generieren, liefert TYPO3 strukturierte Inhalte als reine JSON-REST-APIs direkt an moderne JavaScript-Frontends wie Next.js oder React.',
    },
    {
      id: 'faq-06',
      category: 'nocode',
      q: 'Was passiert, wenn ich nachträglich neue Felder zu einem bestehenden Element hinzufüge?',
      a: 'T3Headless schützt Ihr bestehendes Template vor Überschreibungen. Beim Hinzufügen neuer Felder erscheint oben ein neuer Klick-Kopier-Feldmarker, den Sie an beliebiger Stelle in Ihr Template einfügen können.',
    },
    {
      id: 'faq-07',
      category: 'nocode',
      q: 'Können Redakteure globale Logos, Favicons, Schriftarten und Header-Layouts in TYPO3 verwalten?',
      a: 'Ja. Unter Theme Options > Header in TYPO3 können Logos (mit individuellen Abmessungen), Favicons, Fonts, CSS/JS-Dateien hochgeladen oder eine dedizierte Header-Seite zugewiesen werden, die auf der gesamten Next.js-Website greift.',
    },
    {
      id: 'faq-08',
      category: 'enterprise',
      q: 'Wo erhalte ich die offizielle T3Headless TYPO3-Extension?',
      a: 'Unsere offizielle Extension EXT:t3headless ist im TYPO3 Extension Repository (TER) verfügbar und lässt sich nahtlos mit T3Element für die Fluid-freie Inhaltserstellung kombinieren.',
    },
    {
      id: 'faq-09',
      category: 'architecture',
      q: 'Verlieren Redakteure den TYPO3-Seitenbaum im Headless-Betrieb?',
      a: 'Nein, keineswegs. Redakteure arbeiten wie gewohnt mit dem hierarchischen TYPO3-Seitenbaum, Content-Elementen, Workspaces und Benutzerrechten. Unsere Routing-API spiegelt den Seitenbaum automatisch wider.',
    },
    {
      id: 'faq-10',
      category: 'enterprise',
      q: 'Ist T3Headless für anspruchsvolle Enterprise-Websites geeignet?',
      a: 'Absolut. Durch die Entkopplung kann das Frontend auf weltweiten Edge-CDNs hochgradig skalieren, während das TYPO3-Backend geschützt im internen Unternehmensnetz oder privaten VPC verbleibt.',
    },
    {
      id: 'faq-11',
      category: 'architecture',
      q: 'Wie wird SEO in einem entkoppelten TYPO3-Setup umgesetzt?',
      a: 'Alle SEO-Felder aus TYPO3 (Meta-Titel, Description, Canonical, OpenGraph, Robots, hreflang) werden direkt im JSON-Payload für Server-Side-Rendering und Edge-Caching mitgeliefert.',
    },
    {
      id: 'faq-12',
      category: 'enterprise',
      q: 'Können bestehende Fluid-basierte TYPO3-Websites migriert werden?',
      a: 'Ja. Eine Migration kann schrittweise (hybrides Headless) oder als saubere Frontend-Modernisierung erfolgen, während Datenbankinhalte, FAL-Medien und Weiterleitungen vollständig erhalten bleiben.',
    },
    {
      id: 'faq-13',
      category: 'architecture',
      q: 'Wie funktioniert die Live-Vorschau für Redakteure?',
      a: 'Klickt ein Redakteur im TYPO3-Backend auf "Vorschau", erzeugt T3Headless ein sicheres Token und öffnet das Frontend im Entwurfsmodus mit sofortiger Darstellung unveröffentlichter Inhalte.',
    },
    {
      id: 'faq-14',
      category: 'nocode',
      q: 'Gibt es Starter-Kits, Boilerplates oder Live-Demos?',
      a: 'Ja. Wir stellen Starter-Blueprints, JSON-Schema-Referenzen im Dokumentationsportal sowie persönliche 1:1 Demos für T3Headless und T3Element bereit.',
    },
    {
      id: 'faq-15',
      category: 'architecture',
      q: 'Lassen sich Drittsysteme (CRM, ERP, Suche, Shop) integrieren?',
      a: 'Ja. In einer Composable-Architektur kombinieren Sie TYPO3-JSON mühelos mit Algolia, Shopify, Shopware, HubSpot oder eigenen Microservices in einer einheitlichen Oberfläche.',
    },
    {
      id: 'faq-16',
      category: 'enterprise',
      q: 'Welcher laufende Support wird nach dem Go-Live angeboten?',
      a: 'Unser 360-Programm bietet kontinuierliche TYPO3-Wartung, Sicherheits-Updates, LTS-Upgrades und garantierten SLA-Support aus der Schweiz.',
    },
    {
      id: 'faq-17',
      category: 'enterprise',
      q: 'Wo sitzt das T3Headless Engineering-Team?',
      a: 'Unser Hauptsitz und Entwicklungsteam befinden sich in Glattpark (Opfikon), Zürich, Schweiz, unter strikter Einhaltung schweizerischer und europäischer Datenschutzgesetze.',
    },
  ],
};
