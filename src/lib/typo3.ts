/**
 * Typed Headless TYPO3 API Service Layer
 * Connects to a Headless TYPO3 API (EXT:t3headless)
 * with resilient local fallback so no route ever throws a 502 Bad Gateway.
 */

export interface Typo3PageMeta {
  title: string;
  subtitle?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export interface Typo3ContentElement {
  id: number;
  type: string;
  colPos: number;
  content: Record<string, unknown>;
}

export interface Typo3PageResponse {
  id: number;
  slug: string;
  title: string;
  meta: Typo3PageMeta;
  content: {
    colPos0: Typo3ContentElement[];
  };
}

const DEFAULT_API_BASE = import.meta.env.PUBLIC_TYPO3_API_URL || 'https://typo3.t3headless.com';

export async function fetchTypo3Page(slug: string, fallback: Typo3PageResponse): Promise<Typo3PageResponse> {
  // Only attempt live remote fetch if explicitly enabled via env flag
  if (import.meta.env.PUBLIC_ENABLE_LIVE_TYPO3_FETCH !== 'true') {
    return fallback;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const url = `${DEFAULT_API_BASE.replace(/\/$/, '')}/${slug.replace(/^\//, '')}?type=834`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return fallback;
    }
    const data = (await res.json()) as Typo3PageResponse;
    return data?.id ? data : fallback;
  } catch {
    return fallback;
  }
}

export const SAMPLE_JSON_PAYLOADS = [
  {
    id: 'hero_banner',
    label: 'CType: t3element_hero_banner',
    route: 'GET https://api.example.com/?type=834',
    componentName: '<HeroBanner />',
    json: `{
  "id": 1,
  "slug": "/",
  "title": "Example Headless TYPO3 Site",
  "meta": {
    "title": "Example Brand | Headless TYPO3",
    "canonical": "https://www.example.com/",
    "robots": { "index": true, "follow": true }
  },
  "content": {
    "colPos0": [
      {
        "id": 104,
        "type": "t3element_hero_banner",
        "colPos": 0,
        "appearance": { "layout": "split-grid-2col" },
        "content": {
          "eyebrow": "HEADLESS CONTENT BLOCK",
          "headline": "Structured content delivered directly from TYPO3 JSON.",
          "ctaPrimary": { "label": "Get Started", "href": "/get-started" },
          "metrics": { "apiSpeedMs": 18, "uptime": "99.99%" }
        }
      }
    ]
  }
}`,
    previewTitle: 'Hero Banner Content Block',
    previewSummary: 'Renders the 2-column hero section and structured CTA fields directly from colPos0 JSON.',
    previewMetrics: ['TTFB: 14ms', 'Zero Fluid Overhead', 'Auto-Typed Props'],
  },
  {
    id: 'bento_features',
    label: 'CType: t3element_capability_matrix',
    route: 'GET https://api.example.com/products?type=834',
    componentName: '<CapabilityMatrix />',
    json: `{
  "id": 42,
  "type": "t3element_capability_matrix",
  "colPos": 0,
  "content": {
    "sectionCode": "04 / COMPONENTS",
    "headline": "Customizable Content-to-Component Mapping",
    "engine": "T3Element",
    "fluidRequired": false,
    "mappings": [
      { "cType": "t3element_hero", "component": "HeroBanner.tsx" },
      { "cType": "t3element_grid", "component": "FeatureMatrix.tsx" },
      { "cType": "t3element_faq", "component": "FaqAccordion.tsx" }
    ],
    "pillDeliverables": [
      "1:1 CType Registry",
      "TypeScript Schema Gen",
      "Live Workspace Preview"
    ]
  }
}`,
    previewTitle: 'Declarative CType → Component Registry',
    previewSummary: 'Maps custom T3Element content blocks directly to React, Next.js, or Svelte UI components with compile-time validation.',
    previewMetrics: ['100% Type-Safe', 'No TypoScript Bloat', 'Instant HMR'],
  },
  {
    id: 'pagetree_i18n',
    label: 'Navigation & i18n Page Tree',
    route: 'GET https://api.example.com/de/unternehmen?type=834',
    componentName: '<LocalizedPageTree />',
    json: `{
  "id": 88,
  "slug": "/de/unternehmen",
  "i18n": {
    "languageId": 1,
    "locale": "de_CH.UTF-8",
    "hreflang": "de-CH",
    "alternates": [
      { "locale": "en", "slug": "/company" },
      { "locale": "de", "slug": "/de/unternehmen" }
    ]
  },
  "breadcrumbs": [
    { "title": "Startseite", "link": "/de" },
    { "title": "Unternehmen", "link": "/de/unternehmen" }
  ]
}`,
    previewTitle: 'Hierarchical Page Tree & Hreflang Sync',
    previewSummary: 'Preserves TYPO3’s native multi-language page tree, localized slugs, and SEO alternate links automatically.',
    previewMetrics: ['EN / DE Synced', 'Native Breadcrumbs', 'Edge Cached'],
  },
];
