# Chike Okigbo — personal site

Static personal portfolio. No framework, no build step — plain HTML, CSS, and vanilla JavaScript.

## Local preview

```powershell
py -m http.server 8000
```

Open <http://localhost:8000>.

## Where content lives

| What you want to change | File |
| --- | --- |
| Email + social links | `data/site.js` |
| Portfolio projects | `data/projects.js` |
| Bio + toolbelt + currently | `about.html` |
| Hero name + tagline | `index.html` |
| Nav labels | `partials/nav.html` |
| Footer text | `partials/footer.html` |
| Colors, typography, layout | `assets/css/styles.css` |
| Fog animation | `assets/js/fog.js` |

## Deploy to Netlify

The `netlify.toml` in the repo root tells Netlify how to serve the site (publish from root, no build).

### First-time deploy (CLI)

```powershell
netlify login
netlify init      # links this folder to a Netlify site
netlify deploy --prod
```

### Continuous deploy (git-connected)

Push this folder to a GitHub repo, then in Netlify dashboard: **Add new site → Import from Git**, pick the repo, deploy. After that, every `git push` re-deploys automatically.

## Adding a project

Edit `data/projects.js` and add an entry:

```js
{
  number: "002",
  title: "Project name",
  description: "What it does. What you built. What it validates.",
  tags: ["AWS", "Terraform"],
  image: "images/projects/screenshot.png",  // or null for placeholder
  github: "https://github.com/Chike-dev/repo",
  live: null
}
```

Drop the screenshot in `images/projects/` and reference it in `image`.
