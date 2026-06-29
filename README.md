# Slingshot TV — Link Page

A self-hosted replacement for your Linktree, built as plain HTML/CSS/JS (no framework, no subscription). Dark racing-themed design in your red/black/white palette, now using your real logo files.

## Files

- `index.html` — page content (all your links live here)
- `style.css` — styling
- `script.js` — splash screen, countdown, live player, tilt effect, scroll animations, footer year
- `assets/` — your logo images (S icon, Slingshot TV wordmark, Simperior, Card Gorilla)
- `CNAME` — used by GitHub Pages for your custom domain

## 1. Preview it locally

Double-clicking `index.html` will show the page, but the YouTube live embed won't load correctly over `file://` (see the Error 153 note below). For a fully accurate preview, run a local server instead:

```
cd slingshot-site
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 2. Two things to finish before you launch

1. **X / Twitter link** — I couldn't confirm a Slingshot TV X/Twitter handle, so that icon currently points to `#`. Open `index.html`, search for `data-todo`, and replace the `href="#"` with your real profile URL (or delete that `<a>` block if you don't use X).
2. **Firecracker Summer Classic logo** — you shared this one as an inline image rather than a file attachment, so I wasn't able to save it. Drag the actual image file into this `slingshot-site` folder (or the `assets` subfolder) and let me know — I'll drop it into the featured event card right away.

Everything else (Instagram, Facebook, YouTube, email, registration form, podcast, driver intake form, partners) is wired up with the real URLs I pulled from your current Linktree and your league site.

## About the YouTube "Error 153" issue

That error ("Video player configuration error") is a known YouTube embed quirk — it's almost always caused by the page's referrer/origin not being passed through cleanly, which happens most often when:

- You're opening the page directly via `file://` (double-clicking `index.html`) instead of a real `http(s)://` origin.
- A restrictive `Referrer-Policy` header is being sent by the host.

I switched the embed to `youtube-nocookie.com` and explicitly set `referrerpolicy="strict-origin-when-cross-origin"`, which is the standard fix. Once this is live on GitHub Pages (a real https domain), it should resolve on its own. If it persists, test on the deployed URL rather than locally first.

## 3. Host it free on GitHub Pages

1. Create a free GitHub account if you don't have one: https://github.com/join
2. Create a new repository (e.g. `slingshot-tv-links`) — public, no need to add a README.
3. Upload these files to the repo (drag-and-drop on github.com works fine, or use git):
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
6. GitHub will give you a URL like `https://<your-username>.github.io/<repo-name>/`. Confirm the site loads there first.

## 4. Point your existing domain at it

Say your domain is `slingshottv.com`.

**At GitHub:**
- Still in **Settings → Pages**, under "Custom domain", enter your domain (e.g. `www.slingshottv.com` or the bare `slingshottv.com`) and save. This updates the `CNAME` file in your repo automatically.

**At your domain registrar (Namecheap, GoDaddy, etc.), in DNS settings:**

To use the bare/apex domain (`slingshottv.com`), add four **A records** pointing `@` to GitHub's IPs:
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

To also support `www.slingshottv.com`, add:
```
CNAME   www   <your-username>.github.io
```

(Most people set up both — the apex record so the bare domain works, and the `www` CNAME so that variant works too. Then in GitHub Pages, set "Custom domain" to whichever one you want to be canonical, and GitHub will redirect the other to it.)

DNS changes can take anywhere from a few minutes to ~24 hours to propagate. Once it does, go back to **Settings → Pages** and check "Enforce HTTPS" for a free SSL certificate.

## Updating content later

Everything is plain HTML in `index.html` — open it in any text editor, find the link or text you want to change, edit, and push to GitHub. The site updates automatically within a minute or two.
