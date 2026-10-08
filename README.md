# Kestrel

Encrypted messaging that runs entirely on GitHub: no servers of your own.

## How it works
GitHub Actions can't hold live connections (jobs are short-lived and accept no inbound traffic), so Kestrel uses GitHub for everything else:

- **Hosting:** the web app (`apps/web`) is deployed to GitHub Pages by `deploy-web.yml`.
- **Messages:** each room is an Issue in this repo; each message is an AES-GCM encrypted comment. GitHub only ever sees ciphertext.
- **Delivery:** clients poll the GitHub API every 3 s, so messages arrive within a few seconds.
- **Disappearing messages and 24 h Status:** `cleanup.yml` deletes expired comments every ~10 min; clients hide them immediately.
- **Offline:** unsent messages queue locally and retry automatically.

## Setup
1. Create a **public** GitHub repo, push this folder to `main`.
2. Settings → Pages → Source: **GitHub Actions**. Settings → Actions → allow workflows to write issues.
3. Open the Pages URL. Enter the repo (`owner/name`) and a token (classic with `public_repo`, or fine-grained with Issues: read/write).
4. **Chat** creates a room and shows an invite code. Share it privately, since it contains the encryption key. **Join** accepts a code. **Status** is a room whose messages expire after 24 h.

## Features
Real-time-ish chat, replies, reactions, delete for everyone, photos, 15 s voice notes, disappearing messages, status, group rooms (anyone with the invite), offline queue, dark mode, notifications while the tab is open, tests + CI + auto-deploy.

## Limits
- Attachments are limited to about 30 KB (a comment holds 64 KB); images are shrunk automatically.
- No delivery or read receipts, push when closed, calls, or message search.
- Room members can see who posted (GitHub usernames). Public repos hide nothing but content.
- GitHub rate limits apply (5,000 API calls/hour per token). Scheduled workflows pause after 60 days of repo inactivity.

Run tests: `node --test tests/`
