# 🚀 Vaibhav Sharma — AI & ML Engineer Portfolio

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-thevaibhavacom.vercel.app-22d3ee?style=for-the-badge)](https://thevaibhavacom.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

A modern, fully responsive AI Engineer portfolio built with React and Tailwind CSS. Features a **dark navy space aesthetic** with neon glow effects, designed to impress recruiters and hiring managers.

**🔗 Live:** [https://thevaibhavacom.vercel.app/](https://thevaibhavacom.vercel.app/)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌌 **Dark Navy Default** | Deep space background (`#060d1f`) with star field |
| 💫 **Neon Glow Effects** | Each card/section has unique colored neon glow on hover |
| ⌨️ **Typing Animation** | Rotating role descriptions in hero section |
| 🎨 **Outlined Skill Badges** | Clean border-only badges with category colors |
| 🔆 **Colored Category Icons** | `</>` cyan, `🧠` pink, `📈` teal, `🤖` violet, `>_` green |
| ✨ **Shimmer Animation** | Light sweep effect on card hover |
| 📌 **6 Featured Projects** | Each with unique neon color identity + live demo links |
| 🔄 **GitHub Auto-fetch** | Latest repos pulled from GitHub API |
| 📜 **Verified Certificates** | With grade badges (A+ from Intern Geek) |
| 🎯 **Goals with Priority Tags** | Top Priority, In Progress, Learning labels |
| 💪 **Real Challenges** | Authentic personal growth story |
| 📧 **EmailJS Contact Form** | Working contact form + WhatsApp CTA |
| 🌗 **Dark/Light Toggle** | Dark default, light mode available |
| 📱 **Fully Responsive** | Mobile, tablet, desktop |
| 🔝 **Scroll to Top** | Neon glow scroll button |

---

## 🎨 Design System

| Element | Value |
|---|---|
| Background | `#060d1f` (deep navy) |
| Card BG | `#0d1f3c` with 60% opacity |
| Primary Accent | `cyan-400` (#22d3ee) |
| Secondary Accent | `purple-400` (#a78bfa) |
| Text Primary | `slate-100` |
| Text Muted | `slate-400` |
| Border | `#1e3a5f` |

### Skill Category Colors
| Category | Color |
|---|---|
| Programming `</>` | Cyan |
| Machine Learning `🧠` | Pink |
| Data Analytics `📈` | Teal |
| NLP & Gen AI `🤖` | Violet |
| Backend `>_` | Green |
| Visualization `📊` | Yellow |
| Tools `⚙️` | Orange |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Contact | EmailJS |
| Deployment | Vercel |
| Data | GitHub REST API |

---

## 📂 Project Structure

```
vaibhav-portfolio/
├── public/
│   ├── index.html                 ← SEO meta tags
│   └── Vaibhav_Sharma_Resume.pdf  ← Add your resume here
├── src/
│   ├── App.js                     ← All sections in one file
│   ├── index.css                  ← @tailwind directives only
│   └── index.js                   ← React entry point
├── .env                           ← EmailJS keys (not in git)
├── tailwind.config.js
└── package.json
```

---

## 🚀 Local Setup

```bash
# 1. Clone
git clone https://github.com/Vaibhavsharma45/vaibhav-portfolio.git
cd vaibhav-portfolio

# 2. Install
npm install

# 3. Environment variables — create .env in root
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# 4. Run
npm start
# → http://localhost:3000
```

---

## 📧 EmailJS Setup (Free Contact Form)

1. Sign up at [emailjs.com](https://www.emailjs.com) — free tier: 200 emails/month
2. Connect Gmail → copy **Service ID**
3. Create template with `{{name}}`, `{{email}}`, `{{message}}` → copy **Template ID**
4. Account → API Keys → copy **Public Key**
5. Paste all 3 in `.env`
6. Add same keys in **Vercel → Settings → Environment Variables**

---

## 🌐 Deploy to Vercel

```bash
git add .
git commit -m "update portfolio"
git push origin main
# Vercel auto-deploys on push ✅
```

Add `.env` keys in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## 📝 How to Customise

All data is in `src/App.js` at the top — clearly labelled:

| Constant | What to change |
|---|---|
| `skills` | Categories, icons, badge items |
| `challenges` | Growth story cards |
| `experiences` | Work history |
| `certifications` | Certificates with grades |
| `goals` | Short & long term roadmap |
| `projects` | Featured projects with neon colors |

To change contact info, search `vaibhavsharma95124v@gmail.com` and replace globally.

---

## 📸 Sections

| # | Section | Neon Accent |
|---|---|---|
| 1 | **Home** | Cyan hero glow |
| 2 | **About** | Blue/Purple cards |
| 3 | **Challenges** | Cyan hover glow |
| 4 | **Skills** | Per-category neon |
| 5 | **Experience** | Purple glow |
| 6 | **Projects** | Per-project neon color |
| 7 | **Certifications** | Per-cert gradient glow |
| 8 | **Goals** | Green/Purple panels |
| 9 | **Contact** | Cyan form + Green WhatsApp |

---

## 👨‍💻 Author

**Vaibhav Sharma** — Aspiring AI & ML Engineer

- 🌐 Portfolio: [thevaibhavacom.vercel.app](https://thevaibhavacom.vercel.app/)
- 💼 LinkedIn: [linkedin.com/in/vaibhav-0sharma](https://linkedin.com/in/vaibhav-0sharma)
- 🐙 GitHub: [github.com/Vaibhavsharma45](https://github.com/Vaibhavsharma45)
- 📧 Email: vaibhavsharma95124v@gmail.com
- 💬 WhatsApp: [+91-9012907709](https://wa.me/919012907709)

---

⭐ **Star this repo if it helped you!**

---

*"Jo kuch bhi hota hai, ache ke liye hota hai" ❤️*