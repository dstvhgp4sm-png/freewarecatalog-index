# Freeware Catalog — the tool shelf

[Browse the tool shelf](https://dstvhgp4sm-png.github.io/freewarecatalog-index/) ·
[Explore the full catalogue](https://freewarecatalog.com/)

[Freeware Catalog](https://freewarecatalog.com/) is an independent directory of
free desktop software, organised around tasks rather than a wall of download
buttons. This repository is a small, open companion website: twelve practical
starting points for files, remote connections, writing, creative work and
everyday browsing.

The full application listings live on **freewarecatalog.com**. This project
does not host installers or claim to be the official website of the programmes
it lists.

## Explore the catalogue

| Task | Starting points |
| --- | --- |
| Archives and remote connections | [7-Zip](https://freewarecatalog.com/programs/7-zip/), [PuTTY](https://freewarecatalog.com/programs/putty/), [WinSCP](https://freewarecatalog.com/programs/winscp/) |
| Writing and documents | [Notepad++](https://freewarecatalog.com/programs/notepad-plus-plus/), [LibreOffice](https://freewarecatalog.com/programs/libreoffice/) |
| Everyday browsing and credentials | [Firefox](https://freewarecatalog.com/programs/mozilla-firefox/), [Bitwarden](https://freewarecatalog.com/programs/bitwarden/) |
| Sound, video and recording | [VLC](https://freewarecatalog.com/programs/vlc-media-player/), [Audacity](https://freewarecatalog.com/programs/audacity/), [OBS Studio](https://freewarecatalog.com/programs/obs-studio/) |
| Images and 3D | [GIMP](https://freewarecatalog.com/programs/gimp/), [Blender](https://freewarecatalog.com/programs/blender/) |

Read the current catalogue entry for platform support, licence information,
publisher links and download availability. Product names belong to their
respective owners. Inclusion is not a guarantee that a file is risk-free.

## The website

- A responsive tool shelf with client-side search and task filters.
- Automatic light/dark appearance, with a local theme preference.
- Native static text, semantic headings and accessible controls.
- Original interface illustrations; no borrowed software logos.
- About and Privacy pages, canonical URLs and CollectionPage/ItemList JSON-LD.
- No custom analytics, advertising scripts or third-party font service.

## Build locally

Node.js 20 or newer is sufficient; no third-party build packages are required.

```sh
SITE_URL=https://YOUR-OWNER.github.io/freewarecatalog-index/ npm run build
SITE_URL=https://YOUR-OWNER.github.io/freewarecatalog-index/ npm test
npm run preview
```

Edit `site.config.mjs` to change the selection. Page URLs, the sitemap and
IndexNow use the same configuration. `src/render.mjs` contains page content;
`assets/` contains the styles, browser behaviour and original SVG artwork.

## Publish on GitHub Pages

Create a public repository named `freewarecatalog-index`, using `main` as its
default branch. Upload these source files, then choose **Settings → Pages →
Source → GitHub Actions**. The included workflow builds, tests and publishes
the website, using the actual Pages base URL for metadata.

For a project repository, the default website is:
`https://YOUR-OWNER.github.io/freewarecatalog-index/`.

The IndexNow proof is published at:
`https://YOUR-OWNER.github.io/freewarecatalog-index/<key>.txt` — **not** at the
host root. Its contents must be the key, not an empty file. `keyLocation`
constrains submissions to this project's path.

After a successful deployment the workflow verifies the published sitemap,
pages and proof, then makes one IndexNow POST. HTTP 200 means receipt; HTTP 202
means receipt with key validation pending. Neither response confirms indexing
or ranking. A failed submission is visible as a workflow error and is not
silently retried.

To check manually without sending a notification:

```sh
SITE_URL=https://YOUR-OWNER.github.io/freewarecatalog-index/ npm run indexnow
```

Add `-- --submit` only after publishing a meaningful change. This script submits
the Pages website, not the github.com repository page or freewarecatalog.com.
Those are separate hosts with separate ownership verification.

The project cannot control `https://YOUR-OWNER.github.io/robots.txt` from a
repository subdirectory. Submit its sitemap through verified webmaster tools
where supported; do not claim that a subdirectory robots.txt controls crawling.
The obsolete Google/Bing sitemap-ping endpoints are not used.

References: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages),
[IndexNow protocol](https://www.indexnow.org/documentation).

## Corrections

Contact [admin@freewarecatalog.com](mailto:admin@freewarecatalog.com) or use the
[catalogue contact page](https://freewarecatalog.com/contact/).
