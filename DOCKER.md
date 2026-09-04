# Running in Docker

The image is a multi-stage build targeting Next.js's `output: "standalone"`
mode (`next.config.ts`): the runtime stage ships only the traced server
bundle and a pruned `node_modules`, not the full source tree.

## Build

```bash
docker build -t device-manager-dashboard .
```

## Run

```bash
docker run --rm -p 3000:3000 device-manager-dashboard
```

Open http://localhost:3000.

`-p 3000:3000` maps *host* port 3000 to the container's port 3000 — the
container always listens on 3000 internally (`PORT` below), but the host
side is just a normal port mapping and can be anything free, e.g.
`-p 8080:3000`. If another app on the host already owns port 3000 (as
`docker-compose.yml` in this repo assumes — it maps to host port 3001
instead), pick a different host port and point your reverse proxy at that
one.

## Data persistence

This app's "database" is `data/devices.json` — the repository reads and
writes it directly (`lib/server/device-repository.ts`), which is what makes
adding and deleting devices actually work without a real database.

The image bakes in the seeded file, so it runs standalone with no extra
setup. But **without a mounted volume, every write happens inside the
container's writable layer and is lost when the container is removed** —
each fresh `docker run` starts back at the seed data.

To persist changes across restarts, mount a volume over `/app/data`:

```bash
docker run --rm -p 3000:3000 -v device-data:/app/data device-manager-dashboard
```

The first run copies the image's seed data into the named volume
(`device-data`); later runs reuse it. To reset back to the seed data, remove
the volume: `docker volume rm device-data`.

This also means **the container needs a writable filesystem** — it will not
run under a platform or `docker run --read-only` policy that forces a
read-only root filesystem, since a delete/add would then fail to write.

## Publishing to a registry

```bash
# Docker Hub
docker build -t <your-dockerhub-username>/device-manager-dashboard:latest .
docker push <your-dockerhub-username>/device-manager-dashboard:latest

# GitHub Container Registry
docker build -t ghcr.io/<your-github-username>/device-manager-dashboard:latest .
docker push ghcr.io/<your-github-username>/device-manager-dashboard:latest
```

Log in first (`docker login` or `docker login ghcr.io`) if you haven't
already.

## Configuration

| Variable   | Default   | Notes                                                                 |
| ---------- | --------- | ---------------------------------------------------------------------- |
| `PORT`     | `3000`    | Port the standalone server listens on inside the container.            |
| `HOSTNAME` | `0.0.0.0` | Must stay `0.0.0.0` — the default `localhost` isn't reachable from outside the container. |

Override at run time, e.g. `docker run -e PORT=8080 -p 8080:8080 ...`.
