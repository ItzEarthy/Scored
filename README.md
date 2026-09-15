# Scored

A simple, offline-first scoreboard PWA — a clone of "Scoreboard - Keep Score" by Truyendiv. No backend, no accounts. Everything is stored locally in your browser.

## Features

- Full-screen split scoreboard (two color blocks), portrait (stacked) or landscape (side by side)
- Tap a team's block to add a point; swipe up to add, swipe down to subtract
- Center pill with a countdown timer (play/pause + reset)
- 👑 crown on the leading team
- Settings screen: points to win, win margin, rounds to win, increment per tap, timer length, and per-team name/color/points/rounds
- Win banner when a team hits the win condition
- Installable PWA with offline support (service worker + manifest), plus an in-app **Install** button (Android/desktop Chrome & Edge) and Add-to-Home-Screen instructions on iOS Safari
- State (scores, settings, timer) persists in `localStorage` across sessions

The data model supports any number of teams (not hard-coded to two), even though the UI defaults to two.

## Tech stack

React + Vite + Tailwind CSS, bundled as a PWA with `vite-plugin-pwa`. No server-side code.

## Local development

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site to `dist/`, including the generated service worker and manifest.

## Run with Docker

```bash
docker compose up --build
```

This builds the app and serves the static `dist/` output with nginx on [http://localhost:8080](http://localhost:8080).

## Automated builds (GitHub Actions -> GHCR)

Every push to `main` (and any `v*` tag) triggers [.github/workflows/docker-publish.yml](.github/workflows/docker-publish.yml), which builds the Docker image and publishes it to the GitHub Container Registry as:

```
ghcr.io/itzearthy/scored:latest
```

**First-time setup:** GHCR packages are private by default, even in a public repo. After the workflow's first successful run, open the package on GitHub (your profile/org -> Packages -> `scored`) and set its visibility to Public, or link it to the repo and grant read access — otherwise `docker pull` from another machine (e.g. Dockge) will fail with an auth error.

### Deploying with Dockge (or Portainer, or plain `docker compose`)

Use [docker-compose.deploy.yml](docker-compose.deploy.yml) — it only references the published image, with no build step, so the host doesn't need the source code:

```yaml
services:
  scored:
    image: ghcr.io/itzearthy/scored:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

Paste that into a new Dockge stack and deploy — it pulls the image straight from GHCR and starts the container. To pick up new pushes, use Dockge's "Pull" / "Update" action (or `docker compose pull && docker compose up -d`) to fetch the latest tag.

If the package is private, first authenticate the Dockge host once with a [GitHub personal access token](https://github.com/settings/tokens) that has `read:packages` scope:

```bash
docker login ghcr.io -u <your-github-username>
```

## Project structure

```
src/
  components/     UI components (TeamBlock, TimerPill, SettingsModal, WinBanner, Stepper)
  hooks/          useOrientation (portrait/landscape detection)
  lib/            model.js (data model, localStorage persistence, win detection)
  App.jsx         top-level state and layout
public/
  icons/          PWA app icons
Dockerfile        multi-stage build -> nginx static server
docker-compose.yml         local dev/build (builds the image from source)
docker-compose.deploy.yml  deploy-only (pulls the published GHCR image, e.g. for Dockge)
.github/workflows/         CI: builds and publishes the image to GHCR
```

## Notes

- Gestures are detected with pointer events (tap vs. swipe up/down) directly on each team's block — there are no visible +/- buttons on the main screen, matching the original app.
- Settings changes only apply after pressing **Save**; **Cancel** discards them.
- Everything is local: clearing your browser storage resets the app to defaults.
