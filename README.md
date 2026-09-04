# Device Manager Dashboard

A network device manager dashboard: monitor, search, filter, add, and remove
devices (switches, routers, servers, storage, access points, cameras) from a
single dark, data-dense UI. Every chart and figure on screen — status counts,
fleet uptime, latency sparklines, uptime meters — is computed from stored
device data, not invented at render time.

- **Overview** (`/`) — fleet-wide health: status counts, an uptime gauge, a
  status-distribution donut, a "needs attention" list, and recent latency per
  device.
- **Devices** (`/devices`) — the device table/cards, with server-side search
  and status filtering, and add/delete.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) — Server
  Components fetch and filter device data; Server Actions handle add/delete.
- **React 19** + **TypeScript** (strict, no `any`) — all types are inferred
  from Zod schemas (`lib/schemas/`), so runtime validation and compile-time
  types can never drift apart.
- **Tailwind CSS v4** — a CSS-first dark "control room" design system
  (`app/globals.css`), styled with utility classes throughout; no component
  library.
- **[Zustand](https://zustand.docs.pmnd.rs)** — client UI state only (modal
  open/close, delete confirmation, toasts). The device list itself is never
  duplicated client-side — the server, filtered by `URLSearchParams`, is the
  single source of truth.
- **[React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)**
  — the add-device form, validated with the same schema the Server Action
  re-validates against.
- **Hand-rolled inline SVG charts** (`components/charts/`) — sparklines,
  meters, a donut, a radial gauge. No charting library; they render in Server
  Components with zero client JavaScript.

Data is mocked in `data/devices.json`, read and written directly by
`lib/server/device-repository.ts` — there's no database.

## Getting started

Requires Node.js 20.9+ (see [`next.config.ts`](./next.config.ts) /
[`package.json`](./package.json)).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run a production build (after npm run build)
npm run lint    # eslint
```

## Running in Docker

See **[DOCKER.md](./DOCKER.md)** for building and running the standalone
Docker image, including the data-persistence tradeoff (mount a volume over
`/app/data` to keep added/deleted devices across container restarts) and how
to publish the image to a registry.
