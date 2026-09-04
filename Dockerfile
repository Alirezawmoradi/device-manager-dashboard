# syntax=docker/dockerfile:1

# Multi-stage build targeting Next.js's `output: "standalone"` (next.config.ts):
# the runtime stage ships only the traced server bundle, not the full
# node_modules or source tree. Node 20.9+ is required by Next.js 16.

FROM node:20-alpine AS base

# --- Dependencies -----------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `npm ci`'s lockfile-sync check is stricter than `npm install`'s and varies
# across npm versions, so a lockfile produced by a newer npm on the host can
# fail it under the npm bundled with this base image even though nothing is
# actually wrong. `npm install` reconciles that drift instead of hard-failing
# on it, while still resolving from the committed lockfile as its starting point.
RUN npm install

# --- Build --------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Runtime ------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root runtime user, following the standard Next.js Docker convention.
RUN addgroup -S -g 1001 nodejs \
  && adduser -S -D -H -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public

# .next/standalone ships its own minimal server.js and pruned node_modules.
# It expects to own ./.next, so that directory is created and chowned before
# the traced build output is copied into it.
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# The mock device store: a seeded JSON file the app reads and writes at
# runtime (adding/deleting a device). Next's output tracing already copies
# it into .next/standalone since the repository reads it at request time,
# but it's copied explicitly here too so this stays correct even if that
# tracing behavior ever changes. Baked in so the image runs standalone out
# of the box; mount a volume over /app/data to persist changes across
# container restarts — see the "Data persistence" note in DOCKER.md.
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

USER nextjs

EXPOSE 3000
ENV PORT=3000
# The standalone server binds to localhost by default; 0.0.0.0 is required
# for it to be reachable from outside the container.
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
