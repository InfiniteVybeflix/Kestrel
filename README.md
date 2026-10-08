# Kestrel

Private chat rooms and calls that run in the browser. GitHub only hosts the page.

Open the site, pick a name, **Create a room** (or enter a friend's code), and chat. No accounts, no tokens.

## How it works
- **Hosting:** `deploy-web.yml` tests and publishes `apps/web` to GitHub Pages.
- **Messages and calls:** browsers connect directly (WebRTC, encrypted by DTLS). The free public PeerJS cloud introduces the browsers to each other and Google's public STUN helps them find a route. Neither sees your messages. You run no servers.
- **Rooms:** the first person to open a code hosts it; anyone entering the same code joins. People already inside stay connected if the host leaves, and the next person to enter the code reopens the room.
- **History:** stored in each browser (last 200 messages) and shared with people who join. Messages sent while alone are synced when someone connects.

## Deploy
1. Push this folder to a GitHub repo's `main` branch.
2. Settings → Pages → Source: **GitHub Actions**.
3. Share the Pages link. Invite links look like `https://you.github.io/repo/#ABC-DEF`.

## Features
Rooms by code, group chat, replies, reactions, photos, voice notes, disappearing messages, voice and video group calls (small groups), mobile-first golden UI.

## Limits
- Strict corporate or mobile networks can block direct connections; calls may fail there (a TURN relay would be needed).
- Anyone with the code can join, so share it privately.
- Mesh calls suit about 4 people.

Run tests: `node --test tests/`
