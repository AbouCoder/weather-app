This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project structure

`app/` holds only routes. Everything else sits in folders at the project
root, which Next's docs describe as
["store project files outside of `app`"](https://nextjs.org/docs/app/getting-started/project-structure#store-project-files-outside-of-app).

```text
app/                    routes: layout, home page, [slug] city page, api/weather
components/
  ui/                   shadcn components, as the shadcn CLI generates them
  shared/               building blocks used across pages (GlassPanel, Section…)
  temperature/          temperature display and the °C/°F toggle
  city-cards/           the home page's sortable list of city cards
  city-page/            the city page's layout, heading and 7-day forecast
  hourly-forecast/      the city page's 24-hour chart
  icons/                animated weather icons and getWeatherIcon
lib/                    logic with no UI: dates, temperatures, utils
  weather/              the Open-Meteo fetch, weather codes and types
hooks/                  React hooks
context/                React context providers
data/                   static data: the city list and placeholder forecasts
```

Conventions:

- **Folders** are kebab-case.
- **Components** are PascalCase files named after the component they export.
- **Other modules** (functions, hooks, data) are camelCase.
- **shadcn files** in `components/ui` keep the CLI's lowercase names.
- **Imports** use the `@/` alias, except for files in the same folder (`./`).
- **Helpers used by one feature** live in that feature's folder, e.g.
  `hourly-forecast/hourlyChart.ts`; `lib/` is for code more than one part
  of the app uses.
- **`lib/` doesn't import from `components/`**, so logic stays independent of
  the UI.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
