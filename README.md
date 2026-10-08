# Kestrel

Private chat rooms and calls that run in the browser. GitHub only hosts the page, and you can install it as an app.

## Use it
Pick a name, **Create a room** (or enter a friend's code). Your rooms are listed on the home screen so you can rejoin them any time.

- **Self-destructing rooms:** never, after 1 hour / 24 hours / 7 days, or **when I close it** (nothing is saved, and the room vanishes when you leave). Anyone can also **Destroy for everyone** from room settings.
- **Settings (⚙):** theme (light, night, match device), accent colour, wallpapers (built-in or your own photo), dimming, text size, bubble shape, Enter-to-send, times, sounds, notifications, save-history switch, default disappearing messages.
- **Per room:** its own name, accent, wallpaper and mute.
- **Install:** use the Install button (Android, desktop) or Share → Add to Home Screen (iPhone/iPad). It then opens full screen and loads offline.

## How it works
- **Hosting:** `deploy-web.yml` tests and publishes `apps/web` to GitHub Pages.
- **Messages and calls:** browsers connect directly (WebRTC, encrypted by DTLS). The free public PeerJS cloud introduces browsers to each other and Google's public STUN helps them find a route. Neither sees your messages.
- **Storage:** rooms, history, settings and wallpapers stay in this browser's localStorage. Clearing site data removes them.
- **Rooms:** the first person to open a code hosts it. People already inside stay connected if the host leaves, and the next person to enter the code reopens it.

## Deploy
Push to `main`, set Settings → Pages → Source to **GitHub Actions**, share the link. Invite links look like `https://you.github.io/repo/#ABC-DEF`.

## Limits
- A room is live only while someone has it open. Destruction is enforced by each browser, so a device that is offline keeps its copy until it next opens Kestrel.
- Strict networks can block direct connections; calls may fail there. Mesh calls suit about 4 people.
- Anyone with the code can join, so share it privately.

Tests: `node --test tests/`
