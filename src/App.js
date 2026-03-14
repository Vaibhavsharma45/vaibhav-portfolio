import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = "Vaibhavsharma45";
const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";

const NAV_LINKS = ["Home","About","Skills","Projects","Experience","Certifications","Blog","Contact"];

const ROLES = [
  "AI & ML Engineer",
  "Python Developer",
  "Data Scientist",
  "Backend Engineer",
  "Open Source Contributor",
];

const SKILLS = {
  "AI / ML": ["Python","TensorFlow","PyTorch","Scikit-learn","Pandas","NumPy","OpenCV","Hugging Face","LangChain","RAG"],
  "Backend": ["FastAPI","Node.js","Express","REST APIs","MongoDB","PostgreSQL","Docker","Linux","Git"],
  "Frontend": ["React.js","JavaScript","Tailwind CSS","HTML5","CSS3"],
  "Tools": ["Jupyter","VS Code","GitHub Actions","Vercel","Kaggle","Postman"],
};

const EXPERIENCES = [
  {
    role: "AI/ML Intern (Self-directed)",
    company: "Personal Projects & Kaggle",
    period: "2024 – Present",
    points: [
      "Built birth-weight predictor ML model with 92%+ accuracy",
      "Developed Marg Darshak — AI career guidance web app",
      "Completed 10+ Kaggle competitions; achieved silver medals",
      "Explored LLM fine-tuning, RAG pipelines, and vector databases",
    ],
  },
  {
    role: "Computer Applications Student",
    company: "University",
    period: "2022 – Present",
    points: [
      "Specialising in AI, Data Structures, and System Design",
      "Top performer in ML and Backend coursework",
      "Built full-stack projects as part of curriculum",
    ],
  },
];

const CERTIFICATIONS = [
  { name: "Machine Learning Specialization", issuer: "Coursera / Andrew Ng", year: "2024" },
  { name: "Deep Learning Specialization", issuer: "deeplearning.ai", year: "2024" },
  { name: "Python for Data Science", issuer: "IBM / Coursera", year: "2023" },
  { name: "TensorFlow Developer Certificate", issuer: "Google", year: "2024" },
  { name: "Data Science Professional Certificate", issuer: "IBM", year: "2023" },
];

const BLOG_POSTS = [
  { title: "How I Built a Birth-Weight Predictor with 92% Accuracy", date: "Jan 2025", tag: "ML", summary: "Step-by-step walkthrough of feature engineering, model selection, and deployment using FastAPI." },
  { title: "RAG vs Fine-Tuning: When to Use Which?", date: "Feb 2025", tag: "LLM", summary: "A practical comparison guide for developers choosing between RAG pipelines and fine-tuned LLMs." },
  { title: "Getting Started with LangChain in 2025", date: "Mar 2025", tag: "AI Tools", summary: "Updated guide covering LangChain v0.3, LCEL, and building production-ready chains." },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function useTypingEffect(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? 40 : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) { setDisplay(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
        else { setTimeout(() => setDeleting(true), pause); }
      } else {
        if (charIdx > 0) { setDisplay(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
        else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── PARTICLE BACKGROUND ──────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 60;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,170,0.35)";
        ctx.fill();
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,170,${0.12 * (1 - dist / 130)})`;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-brand" onClick={() => scrollTo("home")}>
        <span className="brand-dot">▶</span> Vaibhav<span className="brand-accent">.ai</span>
      </div>
      <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {NAV_LINKS.map(l => (
          <button key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</button>
        ))}
        <a href="/resume.pdf" download className="nav-cta">Resume ↓</a>
      </div>
      <div className="nav-right">
        <button className="theme-btn" onClick={() => setDark(d => !d)} title="Toggle theme">
          {dark ? "☀" : "◑"}
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const role = useTypingEffect(ROLES);
  return (
    <section id="home" className="hero-section">
      <ParticleCanvas />
      <div className="hero-content">
        <div className="hero-badge reveal">👋 Available for Opportunities</div>
        <h1 className="hero-name reveal">
          Hi, I'm <span className="name-highlight">Vaibhav Sharma</span>
        </h1>
        <h2 className="hero-role reveal">
          <span className="role-text">{role}</span>
          <span className="cursor-blink">|</span>
        </h2>
        <p className="hero-bio reveal">
          Building intelligent systems with Python & ML — from raw data to production APIs.<br />
          Strong fundamentals. Clean architecture. Real results.
        </p>
        <div className="hero-actions reveal">
          <button className="btn-primary" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
            View Projects →
          </button>
          <a href="mailto:vaibhavsharma95124v@gmail.com" className="btn-ghost">
            Get In Touch
          </a>
        </div>
        <div className="hero-stats reveal">
          {[["10+", "ML Projects"], ["5+", "Certifications"], ["3+", "Languages"], ["1K+", "Commits"]].map(([num, label]) => (
            <div key={label} className="stat-item">
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
        <div className="hero-socials reveal">
          {[
            { label: "GitHub", href: "https://github.com/Vaibhavsharma45", icon: "⌂" },
            { label: "LinkedIn", href: "https://linkedin.com/in/vaibhav-0sharma", icon: "in" },
            { label: "Kaggle", href: "https://kaggle.com/Vaibhavsharma45", icon: "K" },
            { label: "Email", href: "mailto:vaibhavsharma95124v@gmail.com", icon: "@" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-chip" title={s.label}>
              <span>{s.icon}</span> {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="hero-scroll-hint">scroll ↓</div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle tag="01" title="About Me" />
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I'm a <strong>Computer Applications student</strong> from Muzaffarnagar, UP — deeply passionate about building AI systems that solve real problems. My journey started with curiosity about how machines can learn, and has evolved into hands-on expertise in ML pipelines, backend APIs, and data engineering.
            </p>
            <p>
              I believe in <strong>strong fundamentals over shortcuts</strong>. When I build something, I understand every layer — from data preprocessing to model deployment. I'm not chasing hype; I'm building things that actually work.
            </p>
            <p>
              Currently exploring <strong>LLM fine-tuning, RAG pipelines, and MLOps</strong> while sharpening my system design skills.
            </p>
            <div className="about-highlights">
              {[
                "📍 Muzaffarnagar, Uttar Pradesh",
                "🎓 B.C.A (Computer Applications)",
                "🧠 AI/ML Engineer in progress",
                "🌐 Open to remote opportunities",
              ].map(h => <span key={h} className="highlight-tag">{h}</span>)}
            </div>
          </div>
          <div className="about-card reveal">
            <div className="about-card-inner">
              <div className="about-avatar">VS</div>
              <div className="about-card-stats">
                <div className="card-stat"><span>🔥</span><div><b>Consistent</b><small>Daily learner</small></div></div>
                <div className="card-stat"><span>⚡</span><div><b>Fast Builder</b><small>Idea → MVP in days</small></div></div>
                <div className="card-stat"><span>🎯</span><div><b>Goal-oriented</b><small>Clear roadmap</small></div></div>
              </div>
              <div className="stack-chips">
                {["Python", "FastAPI", "PyTorch", "React", "MongoDB", "Docker"].map(t => (
                  <span key={t} className="stack-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionTitle tag="02" title="Technical Skills" />
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, skills], ci) => (
            <div key={cat} className="skill-card reveal" style={{ animationDelay: `${ci * 0.1}s` }}>
              <div className="skill-card-header">{cat}</div>
              <div className="skill-pills">
                {skills.map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI PROJECT DESCRIPTION ───────────────────────────────────────────────────
function AIDescription({ repo }) {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(async () => {
    if (generated) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Write a concise 2-sentence professional description for a GitHub repository called "${repo.name}" by an AI/ML engineer. 
The repo description is: "${repo.description || "No description provided"}".
Language: ${repo.language || "Unknown"}.
Stars: ${repo.stargazers_count}.
Make it sound impressive for a job portfolio. Return ONLY the 2 sentences, nothing else.`,
          }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || repo.description || "A project by Vaibhav Sharma.";
      setDesc(text);
      setGenerated(true);
    } catch {
      setDesc(repo.description || "An impactful project demonstrating ML and engineering expertise.");
      setGenerated(true);
    }
    setLoading(false);
  }, [repo, generated]);

  return (
    <div className="ai-desc-block">
      {!generated ? (
        <button className="ai-gen-btn" onClick={generate} disabled={loading}>
          {loading ? <span className="ai-loading">⏳ Generating…</span> : <span>✨ Generate AI Description</span>}
        </button>
      ) : (
        <p className="ai-desc-text">{desc}</p>
      )}
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data.filter(r => !r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const languages = ["All", ...new Set(repos.map(r => r.language).filter(Boolean))];
  const filtered = filter === "All" ? repos : repos.filter(r => r.language === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle tag="03" title="GitHub Projects" />
        <div className="project-filters reveal">
          {languages.slice(0, 6).map(lang => (
            <button key={lang} className={`filter-btn ${filter === lang ? "active" : ""}`} onClick={() => setFilter(lang)}>
              {lang}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="loading-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="project-skeleton" />)}
          </div>
        ) : (
          <div className="projects-grid">
            {filtered.map((repo, i) => (
              <div key={repo.id} className="project-card reveal" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="project-card-top">
                  <div className="project-icon">⌥</div>
                  <div className="project-meta">
                    <span className="project-lang">{repo.language || "—"}</span>
                    <span className="project-stars">⭐ {repo.stargazers_count}</span>
                    <span className="project-forks">🍴 {repo.forks_count}</span>
                  </div>
                </div>
                <h3 className="project-name">{repo.name}</h3>
                <AIDescription repo={repo} />
                <div className="project-footer">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="project-link">View Code →</a>
                  {repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer" className="project-link-demo">Live ↗</a>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="reveal" style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="btn-ghost">
            View All Repos on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <SectionTitle tag="04" title="Experience" />
        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="timeline-item reveal">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <ul className="timeline-points">
                  {exp.points.map((p, pi) => <li key={pi}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionTitle tag="05" title="Certifications" />
        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <div key={i} className="cert-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="cert-icon">🏆</div>
              <div className="cert-info">
                <h4 className="cert-name">{c.name}</h4>
                <span className="cert-issuer">{c.issuer}</span>
              </div>
              <span className="cert-year">{c.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
function Blog() {
  return (
    <section id="blog" className="section section-alt">
      <div className="container">
        <SectionTitle tag="06" title="Blog & Writings" />
        <div className="blog-grid">
          {BLOG_POSTS.map((post, i) => (
            <div key={i} className="blog-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="blog-tag">{post.tag}</div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-summary">{post.summary}</p>
              <div className="blog-footer">
                <span className="blog-date">{post.date}</span>
                <span className="blog-read">Coming Soon →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // EmailJS integration — add your Service ID, Template ID, Public Key from emailjs.com
    try {
      const emailjsEndpoint = "https://api.emailjs.com/api/v1.0/email/send";
      await fetch(emailjsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  template_params: {
    name: form.name,       // {{name}} → tera template
    email: form.email,     // {{email}} → Reply To field
    message: form.message, // {{message}} → tera template
      },
      }),
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:vaibhavsharma95124v@gmail.com?subject=From ${form.name}&body=${form.message}`;
      setStatus("sent");
    }
  };
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle tag="07" title="Get In Touch" />
        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>Let's Build Something Together</h3>
            <p>I'm open to internships, freelance projects, collaborations, or just a good tech conversation. Drop a message!</p>
            <div className="contact-links">
              {[
                { icon: "✉", label: "vaibhavsharma95124v@gmail.com", href: "mailto:vaibhavsharma95124v@gmail.com" },
                { icon: "⌂", label: "github.com/Vaibhavsharma45", href: "https://github.com/Vaibhavsharma45" },
                { icon: "in", label: "linkedin.com/in/vaibhav-0sharma", href: "https://linkedin.com/in/vaibhav-0sharma" },
              ].map(c => (
                <a key={c.label} href={c.href} className="contact-item" target="_blank" rel="noreferrer">
                  <span className="contact-icon">{c.icon}</span>
                  <span>{c.label}</span>
                </a>
              ))}
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={submit}>
            <input className="form-input" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <input className="form-input" type="email" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            <textarea className="form-textarea" placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
            <button className="btn-primary w-full" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : status === "sent" ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">▶ Vaibhav<span>.ai</span></span>
        <p className="footer-quote">"Jo kuch bhi hota hai, ache ke liye hota hai" 🙏</p>
        <p className="footer-copy">Built with React & ❤️ by Vaibhav Sharma · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

// ─── SECTION TITLE ────────────────────────────────────────────────────────────
function SectionTitle({ tag, title }) {
  return (
    <div className="section-title reveal">
      <span className="section-tag">{tag}</span>
      <h2 className="section-heading">{title}</h2>
      <div className="section-line" />
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  useScrollReveal();

  return (
    <div className={dark ? "app dark" : "app light"}>
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}