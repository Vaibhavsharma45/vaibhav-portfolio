# Vaibhav Sharma — Personal Portfolio

A modern, **dark futuristic** portfolio built with React, Vite, and Tailwind CSS.  
Optimized for recruiters and ATS-friendly content.

---

## 🚀 Quick Start

```bash
# Install (if you see cache errors: npm cache clean --force first)
npm install

# Dev
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

---

## 📁 Project Structure

```
personal_portfolio/
├── public/
│   ├── favicon.svg
│   └── VaibhavSharmaResume.pdf   ← Place your resume PDF here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data.js          ← Edit content here
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── DEPLOYMENT.md        ← Deployment steps
└── README.md
```

---

## ✏️ Updating Content

Edit **`src/data.js`** to change:

- `profile` — name, role, links, email, resume URL  
- `about` — story, passion, focus  
- `skills` — categories and items  
- `projects` — title, tech, problem, solution, GitHub, live URL  
- `experience` — jobs and bullets  
- `education` — degree, school, period  
- `certifications` — name, issuer  

**Resume download:**  
Place `VaibhavSharmaResume.pdf` in the `public/` folder.  
To use an external link (e.g. Google Drive), set `resumeUrl` in `data.js` to the full URL.

---

## 🛠 Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **Lucide React** (icons)
- **Google Fonts:** Outfit, JetBrains Mono

---

## 📄 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for:

- GitHub Pages  
- Vercel  
- Netlify  

---

---

## 💡 Improvement Suggestions

- **Resume:** Put `VaibhavSharmaResume.pdf` in `public/` so the **Resume** button works. Or set `resumeUrl` in `data.js` to a Google Drive/Dropbox link.
- **Live demos:** Add `live: 'https://...'` for projects in `data.js` to show a **Demo** link (e.g. Streamlit, Render, Vercel).
- **Contact form backend:** Replace the `mailto:` form with [Formspree](https://formspree.io), [Netlify Forms](https://www.netlify.com/products/forms/), or a small backend (e.g. serverless function) to receive messages without opening the mail client.
- **Blog / case studies:** Add a `/blog` or project deep-dives (problem, approach, metrics) to show thought process and impact.
- **OG image:** Add `og:image` in `index.html` (e.g. a 1200×630 image in `public/`) for richer link previews on LinkedIn/Twitter.
- **Analytics:** Add Vercel Analytics, Plausible, or Google Analytics to see traffic and improve content.
- **Performance:** You’re already on Vite + production build. For heavy images, use next-gen formats (WebP) and `loading="lazy"`.

---

## 📌 License

Private. Use as your personal portfolio.
