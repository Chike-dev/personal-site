# Portfolio Site — Working Notes

Shared scratchpad between Chike and Claude for the portfolio site build. Update whenever Chike says **"remember this"** (or similar) so we can pick up cleanly next session.

Last touched: **2026-09-24**

---

## Where we are

Personal portfolio site. Pages: `index.html`, `about.html`, `portfolio.html`, `labs.html`. Deployed via Netlify.

**Last session:** full visual rebrand — warm light theme, single-family Satoshi, fog animation removed. All labs verified live-linked.

## Labs architecture

- `labs.html` — page shell, injects nav/footer partials, renders `#labs-grid`.
- `data/labs.js` — `window.LABS` array; each entry has `number, title, subtitle, course, date, description, tags, coverType, pdf, downloads?, credit?`.
- `assets/js/labs.js` — renders cards. Falls back to "PDF coming soon" if `pdf` is null.
- `labs/` — published deliverables (checked into repo, deployed).
- `labs-source/` — raw originals (`.docx`, `.pdf`, `.pka`). **Gitignored** — never published.
- `have a look-source/` — screenshot drops for Claude review. Also gitignored.

## Cover types in use

`aws-compliance`, `azure-cloud`, `network-scale`, `network-tiered`, `security-analysis`, `packet-tracer`, `docker`. Defined via CSS classes `.lab-cover--<type>` in `assets/css/styles.css`.

## Lab upload status (2026-09-01) — all wired ✅

| # | Title | Deliverable in `labs/` | Wired in `data/labs.js` |
|---|---|---|---|
| 001 | PayBridge | `paybridge.pdf` ✅ | ✅ |
| 002 | ChartPath Medical | `chartpath-medical.pdf` ✅ | ✅ |
| 003 | EVIL Airport | `evil-airport.pdf` ✅ | ✅ |
| 004 | CSUN Campus IT | `csun-campus-it.pdf` ✅ | ✅ |
| 005 | MSU Network Design | `msu-network-design.pdf` ✅ | ✅ |
| 006 | CSUN Security Analysis | `csun-security-analysis.pdf` ✅ | ✅ |
| 007 | Networking Fundamentals | 4× `.pka` in `labs/packet-tracer/` ✅ | ✅ |
| 008 | Docker DoS | `docker-dos-lab.pdf` ✅ | ✅ |
| 009 | VitalLiving *(added)* | `vitalliving.pdf` ✅ | ✅ |
| 010 | EVIL Bank *(added)* | `evil-bank.pdf` ✅ | ✅ |

Also patched `assets/js/labs.js`: no more "PDF coming soon" on cards that only have downloads (Lab 007 was showing it despite having 4 `.pka` files).

**Skipped (not portfolio-worthy):** `Azure Lab Setup 2 - BookNook.docx` — starter-level Azure lab (one VM + SQL DB + Reader role). Source still in `labs-source/`; Chike hasn't decided whether to delete.

## .docx → PDF conversion

Using Word COM automation via PowerShell (`ExportAsFixedFormat` with format = 17).

**Gotchas learned the hard way:**
- 3-arg `Open($path, $false, $true)` works. Longer positional Open signatures fail with PowerShell PSObject boxing errors.
- `SaveAs` with `[ref]` params also breaks the same way — use `ExportAsFixedFormat` instead.
- **Running multiple conversions in one PowerShell session hangs**, even with a fresh Word instance per file. Individual per-call conversions work fine (~5–15 s each). Root cause unknown; leaving as "one file per PowerShell invocation" for now.
- Each conversion spawns a headless `WINWORD.EXE`. When a run times out, orphans stay behind (`Get-Process WINWORD` to spot them; `Stop-Process -Id <n> -Force` to clean up). **Never kill PID with a visible MainWindowTitle** — that's Chike's real open document.

## Design system (post 2026-09-24 rebrand)

- **Font:** single family — **Satoshi** (300/400/500/700/900) from Fontshare. All four `--font-*` tokens point to it. Different roles get different sizes/weights only.
- **Palette (light, earthy):**
  - `--bg` `#F3ECD8` (warm straw), `--bg-elevated` `#FBF5E6`, `--bg-inset` `#E7DFC8`
  - `--fg` `#2A2418` (warm dark brown), `--fg-muted` `#6B6350`, `--fg-subtle` `#A69C82`
  - `--border` `#D9D0B7`, `--border-strong` `#C4B995`
  - `--accent` `#0E7490` deep teal, `--accent-hover` `#155E75`
  - `--chalk-warm` `#F0E6D1` — only for text-on-dark-card-cover contexts (e.g. `.lab-cover__num`). Do NOT reuse for page-level headings; they use `--fg`.
- **Card covers stay dark** by design — they're representational tech "screens" and the contrast with the beige page is intentional.
- **No fog:** `assets/js/fog.js` deleted, `.fog-canvas` CSS block removed, `<script>` tag removed from all four HTML files. If you want a subtle background back, add it via CSS not JS.
- **Capitalization:** Title Case for all headings and hero text ("Chike Okigbo", "The Personal Log of a Cloud Engineer", "About Me", "Beyond the Console").

## What's next

- (No open blockers.)
- Nice-to-haves: audit remaining page copy for Title Case consistency; consider a light hover state for cards on the beige bg.

## Session conventions

- Shared notes file: **this file**. Update it whenever Chike says "remember this" — or when we hit anything worth recovering next session.
- Chike's real open Word document (check `MainWindowTitle`) is never a candidate for `Stop-Process`.
- Publish only from `labs/`. `labs-source/` and `have a look-source/` stay local.
