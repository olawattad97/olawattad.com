# olawattad.com — site files and go-live guide

This folder is the whole website. No build step, no subscription: it is plain HTML, CSS and JavaScript, so it can be hosted anywhere for free and edited with any text editor.

```
index.html      the page (all the content lives here)
styles.css      the look
script.js       small enhancements (menu, active nav link, image fallbacks)
CNAME           tells GitHub Pages the site's domain (olawattad.com)
assets/
  favicon.svg
  portrait-hero.jpg      ← intro photo (drop your file here)
  portrait-bio.jpg       ← bio photo (drop your file here)
  research/
    motivation.png            ← figures for the Research section (8 cards)
    uniform-efficiency.png
    nonuniform-gradient.png
    coupled-response.png
    pi-heatmap.png
    decoupled-method.png
    energy-balance.png
    uhpc-beams.jpg
```

Until a file exists at one of those paths the page shows a labelled placeholder (photos) or a line drawing (research cards). Drop the file in with exactly that name and it appears; nothing else needs to change.

---

## Part 1 — Put the site on GitHub Pages (free hosting)

1. Create a GitHub account at github.com if you do not have one.
2. Click **New repository**. Name it `olawattad.com`, keep it **Public**, and click **Create repository**.
3. On the empty repository page choose **uploading an existing file** (or **Add file → Upload files**). Drag in everything in this folder — `index.html`, `styles.css`, `script.js`, `CNAME`, `README.md` and the `assets` folder. Click **Commit changes**.
4. Open **Settings → Pages** (left sidebar, under "Code and automation").
5. Under **Build and deployment**, set *Source* to **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
6. Under **Custom domain**, type `olawattad.com` and click **Save**. GitHub will say the DNS check is in progress — that is expected until Part 2 is done.

After a minute the site is live at `https://<your-username>.github.io/olawattad.com/` (this temporary address works before the domain is switched).

## Part 2 — Point olawattad.com at GitHub instead of Canva

Your domain is registered with Squarespace, so its DNS records are edited there.

1. Log in to Squarespace and open the **Domains** dashboard, select **olawattad.com**, then click **DNS** in the side panel.
2. **Delete the records that currently point the domain at Canva** (and any "Squarespace defaults" records for the website): the `A` records on host `@` and the `CNAME` on host `www`. Leave any `MX` / `TXT` records alone — those are for email, if you use it with this domain.
3. **Add four `A` records**, each with host `@`:

   | Type | Host | Data |
   |------|------|------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

   Optional, for IPv6, add four `AAAA` records on host `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
4. **Add one `CNAME` record**: host `www`, data `<your-username>.github.io` (your GitHub username followed by `.github.io` — no repository name).
5. Save. DNS changes usually take minutes but can take up to 24–48 hours.
6. Back in GitHub **Settings → Pages**, once the DNS check shows a green tick, tick **Enforce HTTPS**. (If the box is greyed out, wait an hour and reload — the certificate is issued automatically.)

From then on `https://olawattad.com` serves this site. Canva is no longer involved; you can unpublish the Canva site and cancel the subscription without affecting the domain, which stays registered with Squarespace (keep that renewal active — it is the only thing that costs money).

## Updating the site later

* **Text** (a new paper, a talk, an award): open `index.html` on GitHub, click the pencil icon, edit, and **Commit changes**. The page updates within a minute. Each publication is one `<article class="pub">…</article>` block — copy an existing one and change the year, title, venue and DOI.
* **Photos and figures**: upload the file into `assets/` (or `assets/research/`) with the exact filename listed above.
* **The "Research" cards**: each card is an `<article class="work">` in `index.html`. The `<img>` inside it is the real figure; the `<svg>` under it is the line drawing shown until the file exists.

## Sources for the hosting steps

* GitHub Docs — Managing a custom domain for your GitHub Pages site
* Squarespace Help — Edit your domain's DNS records
