import type { APIRoute } from 'astro';
import { ROUTES, type RouteMap } from '../lib/i18n';

const SITE_URL = 'https://t3headless.com';
const LAST_MOD = '2026-11-18';

const ROUTE_PRIORITY: Record<keyof RouteMap, string> = {
  home: '1.0',
  builtWith: '0.9',
  document: '0.85',
  faq: '0.8',
  contact: '0.8',
  supportTicket: '0.7',
  privacyPolicy: '0.5',
};

export const GET: APIRoute = () => {
  const keys = Object.keys(ROUTES.en) as (keyof RouteMap)[];

  const urlEntries = keys.flatMap((key) => {
    const enPath = ROUTES.en[key];
    const dePath = ROUTES.de[key];
    const enUrl = `${SITE_URL}${enPath === '/' ? '/' : enPath}`;
    const deUrl = `${SITE_URL}${dePath}`;
    const priority = ROUTE_PRIORITY[key];

    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
      `    <xhtml:link rel="alternate" hreflang="de" href="${deUrl}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    ].join('\n');

    return [
      `  <url>\n    <loc>${enUrl}</loc>\n    <lastmod>${LAST_MOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n${alternates}\n  </url>`,
      `  <url>\n    <loc>${deUrl}</loc>\n    <lastmod>${LAST_MOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n${alternates}\n  </url>`,
    ];
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
