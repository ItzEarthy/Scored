# Scored

A simple, offline-first scoreboard PWA — a clone of "Scoreboard - Keep Score" by Truyendiv. No backend, no accounts. Everything is stored locally in your browser.

## Features

- Full-screen split scoreboard (two color blocks), portrait (stacked) or landscape (side by side)
- Tap a team's block to add a point; swipe up to add, swipe down to subtract
- Center pill with a countdown timer (play/pause + reset)
- 👑 crown on the leading team
- Settings screen: points to win, win margin, rounds to win, increment per tap, timer length, and per-team name/color/points/rounds
- Win banner when a team hits the win condition
- Installable PWA with offline support (service worker + manifest)
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
docker-compose.yml
```

## Notes

- Gestures are detected with pointer events (tap vs. swipe up/down) directly on each team's block — there are no visible +/- buttons on the main screen, matching the original app.
- Settings changes only apply after pressing **Save**; **Cancel** discards them.
- Everything is local: clearing your browser storage resets the app to defaults.
