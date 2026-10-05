# Deploy Notes — Portfolio → GitHub Pages → shaista.me

Setup for publishing this Next.js portfolio to GitHub Pages under the personal
`shaistao` GitHub account, with the Porkbun domain `shaista.me` pointed at it.

## Identities

- **Personal GitHub account:** `shaistao`
- **Personal email:** `obaidullahshaista@gmail.com`
- **Repo:** `https://github.com/shaistao/shaistao.github.io`
- **Live URL (default):** `https://shaistao.github.io/`
- **Custom domain:** `shaista.me` (bought on Porkbun)

The repo is named `<username>.github.io` so Pages serves at the root path. No
`basePath` needed in `next.config.ts`.

## Local git — scoped to this folder

Global git identity on this machine is the HelloFresh work identity. This
folder uses a local override so commits land under the personal account:

```bash
cd ~/shaista-portfolio
git config user.name "Shaista Obaidullah"
git config user.email "obaidullahshaista@gmail.com"
```

Verify with `git config --local --list | grep user` — HelloFresh repos
elsewhere are untouched.

On a new machine, repeat these two `git config` lines after cloning.

## Auth — HTTPS + Personal Access Token

Not SSH. On first push:
- Username: `shaistao`
- Password: a **fine-grained Personal Access Token** scoped to the one repo
  with `Contents: read & write` + `Workflows: read & write` permissions.

Tokens are generated at:
GitHub → avatar → Settings → Developer settings → Personal access tokens →
Fine-grained tokens → Generate new token.

If macOS Keychain has a stale credential for another GitHub account:

```bash
printf "host=github.com\nprotocol=https\n\n" | git credential-osxkeychain erase
```

Or delete the `github.com` entry via Keychain Access.app and retry the push.

## Next.js static export config

`next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

Also `app/icon.tsx` must include `export const dynamic = 'force-static';` so
the generated favicon route is exportable.

Build locally with `npm run build` → outputs to `out/`.

## GitHub Actions deploy workflow

Workflow at `.github/workflows/deploy.yml` runs on every push to `main`:
1. Install deps (`npm ci`)
2. Build (`npm run build`)
3. Upload the `out/` folder as a Pages artifact
4. Deploy to Pages

Required one-time setting in the GitHub repo:
Settings → Pages → **Source: GitHub Actions** (not "Deploy from a branch").

Monitor at `https://github.com/shaistao/shaistao.github.io/actions`.

## Porkbun DNS → GitHub Pages (shaista.me)

In Porkbun: Domain Management → `shaista.me` → DNS. Delete any pre-existing
root A/ALIAS/CNAME and `www` CNAME records that conflict, then add:

| Type  | Host  | Answer                 |
|-------|-------|------------------------|
| A     | *(blank)* | `185.199.108.153`  |
| A     | *(blank)* | `185.199.109.153`  |
| A     | *(blank)* | `185.199.110.153`  |
| A     | *(blank)* | `185.199.111.153`  |
| CNAME | `www`     | `shaistao.github.io` |

Then in GitHub:
Settings → Pages → **Custom domain: `shaista.me`** → Save. GitHub commits a
`CNAME` file to the repo automatically. Once DNS propagates (~10–60 min), tick
**Enforce HTTPS**.

## Known caveats

- **Large video files:** `.mov` assets in `public/` push well past GitHub's
  50 MB per-file "recommended max". Push works but shows warnings. To clean
  up later: compress `.mov` → `.mp4` or `.webm` with ffmpeg and update the
  `src` paths in `lib/projects.ts`. GitHub Pages' bandwidth limit is a soft
  100 GB/month — not a real concern for a portfolio.
- **CursorFollower.tsx:** has a legacy `toElement` reference that needed a
  type cast to compile under the current Next.js. If a future Next upgrade
  tightens types again, re-cast.

## On a new machine

```bash
git clone https://github.com/shaistao/shaistao.github.io.git ~/shaista-portfolio
cd ~/shaista-portfolio
git config user.name "Shaista Obaidullah"
git config user.email "obaidullahshaista@gmail.com"
npm install
npm run dev    # local preview at http://localhost:3000
```

Push to `main` → Action deploys → site updates at `shaista.me`.
