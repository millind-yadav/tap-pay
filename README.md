# TapPay Coming Soon

A high-impact coming-soon landing page for TapPay, optimized for India-first messaging, brand colors, and a dynamic hero layout.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Cloudflare Pages Deployment

Use the GitHub integration or manual upload. Build output is the `dist` folder.

### Option A: GitHub Integration

1) Create a new Pages project and select the `tap-pay` repo.
2) Set the build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
3) Save and deploy.

### Option B: Manual Deploy

1) Run `npm run build` locally.
2) Upload the `dist` folder to Cloudflare Pages.

## Notes

- The landing page does not expose internal implementation details.
- Static assets live in `public` and are copied into `dist` at build time.
