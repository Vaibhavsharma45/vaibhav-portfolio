# 🚀 Vaibhav Sharma — AI & ML Engineer Portfolio

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-thevaibhavacom.vercel.app-blue?style=for-the-badge)](https://thevaibhavacom.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

A modern, fully responsive personal portfolio built with React and Tailwind CSS. Designed for job applications and personal branding as an aspiring AI & ML Engineer.

**🔗 Live:** [https://thevaibhavacom.vercel.app/](https://thevaibhavacom.vercel.app/)

---

## ✨ Features

- 🌗 **Dark / Light Mode** — Seamless theme toggle
- ⌨️ **Typing Animation** — Rotating role descriptions in hero
- 🎨 **Unique Colored Cards** — Each project card has its own gradient identity
- ✨ **Shimmer & Glow Animations** — Smooth hover effects on all cards
- 📌 **Featured Projects** — 6 real deployed projects with live demo links
- 🔄 **GitHub Repos** — Auto-fetched latest repositories
- 📜 **Certifications** — Verified certificates with grade badges
- 🎯 **Goals Section** — Short-term and long-term with priority tags
- 💪 **Challenges & Growth** — Real personal story, no filter
- 📧 **Contact Form** — EmailJS integration with WhatsApp CTA
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ⚡ **Floating Particles** — Animated background
- 🔝 **Scroll to Top** — Smooth scroll behaviour
- 🔍 **SEO Ready** — Meta tags in `public/index.html`

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
│   ├── index.html              ← SEO meta tags
│   └── Vaibhav_Sharma_Resume.pdf  ← Resume (add yours here)
├── src/
│   ├── App.js                  ← Main component (all sections)
│   ├── index.css               ← Tailwind directives
│   └── index.js                ← React entry point
├── .env                        ← EmailJS keys (not in git)
├── tailwind.config.js
└── package.json
```

---

## 🚀 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Vaibhavsharma45/vaibhav-portfolio.git
cd vaibhav-portfolio

# 2. Install dependencies
npm install

# 3. Add environment variables
# Create a .env file in root:
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# 4. Start dev server
npm start
# → Open http://localhost:3000
```

---

## 📧 EmailJS Setup

1. Sign up free at [emailjs.com](https://www.emailjs.com)
2. Create a Gmail service → copy **Service ID**
3. Create an email template with `{{name}}`, `{{email}}`, `{{message}}` variables → copy **Template ID**
4. Go to Account → API Keys → copy **Public Key**
5. Add all three to your `.env` file
6. Add same keys to **Vercel → Settings → Environment Variables** for production

---

## 🌐 Deploying to Vercel

```bash
# Push to GitHub — Vercel auto-deploys on every push
git add .
git commit -m "your message"
git push origin main
```

Make sure to add your `.env` variables in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## 📝 Customisation

All content is in `src/App.js` at the top in clearly labelled data constants:

| Constant | What to edit |
|---|---|
| `skills` | Technical skills by category |
| `challenges` | Your personal growth story |
| `experiences` | Work experience |
| `certifications` | Your certificates |
| `goals` | Short-term and long-term goals |
| `projects` | Your featured projects |

To update contact info, search for `vaibhavsharma95124v@gmail.com` and replace with your details.

---

## 🎨 Sections

| # | Section | Description |
|---|---|---|
| 1 | **Home** | Hero with typing animation and social links |
| 2 | **About** | Bio and personal interests |
| 3 | **Challenges** | Real growth story with outcome badges |
| 4 | **Skills** | 4 colored category cards with shimmer |
| 5 | **Experience** | Work timeline |
| 6 | **Projects** | 6 featured + GitHub repos auto-fetched |
| 7 | **Certifications** | Verified certificates with grades |
| 8 | **Goals** | Roadmap with priority tags |
| 9 | **Contact** | Form + WhatsApp CTA |

---

## 👨‍💻 Author

**Vaibhav Sharma** — Aspiring AI & ML Engineer

- 🌐 Portfolio: [thevaibhavacom.vercel.app](https://thevaibhavacom.vercel.app/)
- 💼 LinkedIn: [linkedin.com/in/vaibhav-0sharma](https://linkedin.com/in/vaibhav-0sharma)
- 🐙 GitHub: [github.com/Vaibhavsharma45](https://github.com/Vaibhavsharma45)
- 📧 Email: vaibhavsharma95124v@gmail.com
- 💬 WhatsApp: [+91-9012907709](https://wa.me/919012907709)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

⭐ **If this helped you, give it a star!**

---

*"Jo kuch bhi hota hai, ache ke liye hota hai" ❤️*