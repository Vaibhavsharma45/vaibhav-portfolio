# Deployment Guide — Vaibhav Sharma Portfolio

Deploy to **GitHub Pages**, **Vercel**, or **Netlify**. All support static Vite/React builds.

---

## 1. GitHub Pages

### Step 1: Build

```bash
npm run build
```

### Step 2: `vite.config.js` base

For `https://<username>.github.io/<repo>/`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/personal_portfolio/',  // your repo name
})
```

For `https://<username>.github.io/` (user/org site):

```js
base: './',
```

### Step 3: Deploy with `gh-pages`

```bash
npm install -D gh-pages
```

In `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then:

```bash
npm run deploy
```

### Step 4: GitHub repo settings

- **Settings → Pages**
- **Source:** Deploy from branch
- **Branch:** `gh-pages` / `root`
- Save

Site: `https://<username>.github.io/<repo>/`

---

## 2. Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
npm run build
vercel
```

Follow prompts. Use `dist` as output if asked.

### Option B: Git + Vercel

1. Push the project to **GitHub**.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import the repo.
4. **Build:**
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`
5. **Deploy.**

Custom domain: **Project → Settings → Domains**.

---

## 3. Netlify

### Option A: Drag & drop

```bash
npm run build
```

In [Netlify](https://app.netlify.com): **Sites → Add new site → Deploy manually** and drag the `dist` folder.

### Option B: Git + Netlify

1. Push to **GitHub**.
2. **Add new site → Import from Git** → choose repo.
3. **Build:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Deploy.**

### `netlify.toml` (optional)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 4. Post-deploy checks

- [ ] All sections load (Hero, About, Skills, Projects, Experience, Contact).
- [ ] **Resume** button works (PDF in `public/` or correct `resumeUrl` in `data.js`).
- [ ] **GitHub** and **LinkedIn** open in a new tab.
- [ ] **Contact** form opens the mail client or your form backend.
- [ ] Site is responsive on mobile.

---

## 5. Custom domain (Vercel / Netlify)

- Add the domain in **Project Settings → Domains**.
- Point DNS to the host’s nameservers or add the given **A** / **CNAME** at your DNS provider.
- Enforce **HTTPS** in the dashboard.

---

## 6. Resume PDF

- **Local file:** Put `VaibhavSharmaResume.pdf` in `public/`.  
  Resume URL: `/VaibhavSharmaResume.pdf` (or `resumeUrl: '/VaibhavSharmaResume.pdf'` in `data.js`).
- **External:** Set `resumeUrl` in `data.js` to the full URL (Google Drive, Dropbox, etc.).  
  For Drive: use the “share” link that ends in `.../view` or a direct download URL.
