# T3Headless

Enterprise headless TYPO3 CMS site for https://t3headless.com. Astro 5 static
site (EN + DE), Tailwind 4, GSAP + Lenis.

## Run

```sh
npm ci
npm run build
```

## Deploy

Static build served by nginx (see `Dockerfile`). Forms post directly from the
browser to the ERPNext guest endpoints on
`https://manager.woodwolfdigital.com/api/method` (contact, newsletter, demo,
support ticket); no server proxy is needed. CORS already allows t3headless.com.

Set `PUBLIC_DISCORD_WEBHOOK_URL` at build time to keep Discord form
notifications; it is never committed to the repo.
