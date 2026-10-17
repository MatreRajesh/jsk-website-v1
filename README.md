# JSK — IT Infrastructure & Field Technical Solutions

Marketing site built with React 19, Vite, Tailwind CSS v4, Framer Motion and Lenis.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Before going live

- Edit phone, email, address and hours in `src/data/site.ts`.
- Edit services, industries, projects and copy in `src/data/services.ts`.
- The contact form opens the visitor's email app pre-filled (no backend needed).
  To receive submissions directly, point `onSubmit` in `src/components/Contact.tsx` at a form service (Formspree, Web3Forms, etc.).

## Deploy

The site is fully static — deploy the `dist/` folder anywhere:

- **Vercel / Netlify / Cloudflare Pages:** import the repo, build command `npm run build`, output directory `dist`.
- **Any web host:** run `npm run build` and upload the contents of `dist/`.

## Images

Photos are from [Unsplash](https://unsplash.com) (free to use under the Unsplash License), stored locally in `public/images/` as optimized WebP.
