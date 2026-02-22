import React, { useState, useEffect, useRef, useMemo } from 'react';

/* ─────────────────────────────────────────
   INLINE STYLES — Glassmorphism Light Theme
   Cream background + frosted glass cards
   ───────────────────────────────────────── */
const S = {
  // tokens
  cream:  '#F5F0E8',
  cream2: '#EDE7D9',
  cream3: '#E4DDD0',
  ink:    '#1A1410',
  ink2:   '#3D3530',
  muted:  '#8A7F72',
  violet: '#6B3FA0',
  rose:   '#E8435A',
  gold:   '#D4900A',
  mint:   '#1A9E7A',
  sky:    '#2878C8',
  glass:  'rgba(255,255,255,0.55)',
  glass2: 'rgba(255,255,255,0.35)',
  border: 'rgba(255,255,255,0.7)',
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: #F5F0E8;
    color: #1A1410;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  /* Animated background blobs */
  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: blobdrift linear infinite;
  }
  @keyframes blobdrift {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(60px,-40px) scale(1.08); }
    66%  { transform: translate(-30px,50px) scale(0.95); }
    100% { transform: translate(0,0) scale(1); }
  }

  /* Cursor */
  #cur-dot {
    position: fixed; width: 10px; height: 10px;
    background: #6B3FA0; border-radius: 50%;
    pointer-events: none; z-index: 99999;
    transform: translate(-50%,-50%);
    mix-blend-mode: multiply;
    transition: width .2s, height .2s, background .2s;
  }
  #cur-ring {
    position: fixed; width: 40px; height: 40px;
    border: 1.5px solid rgba(107,63,160,0.4); border-radius: 50%;
    pointer-events: none; z-index: 99998;
    transform: translate(-50%,-50%);
    transition: left .12s cubic-bezier(0.16,1,0.3,1), top .12s cubic-bezier(0.16,1,0.3,1);
  }

  /* Glass card */
  .glass-card {
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.7);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(26,20,16,0.12);
    transition: transform .4s cubic-bezier(0.16,1,0.3,1), box-shadow .4s cubic-bezier(0.16,1,0.3,1);
  }
  .glass-card:hover {
    box-shadow: 0 24px 64px rgba(26,20,16,0.18);
  }

  /* Nav pill */
  .nav-pill-link {
    font-family: 'Space Mono', monospace;
    font-size: .58rem; letter-spacing: 1px; text-transform: uppercase;
    color: #8A7F72; padding: 8px 16px; border-radius: 100px;
    text-decoration: none; transition: all .25s; cursor: none;
  }
  .nav-pill-link:hover, .nav-pill-link.active {
    background: #1A1410; color: #F5F0E8;
  }

  /* Tag */
  .skill-tag {
    font-family: 'Space Mono', monospace; font-size: .62rem;
    padding: 5px 12px; border-radius: 100px;
    border: 1px solid rgba(26,20,16,0.1); color: #3D3530;
    background: rgba(255,255,255,0.35); backdrop-filter: blur(14px);
    transition: all .25s cubic-bezier(0.16,1,0.3,1); cursor: default; display: inline-block;
  }
  .skill-tag:hover { background: #1A1410; color: #F5F0E8; border-color: transparent; transform: translateY(-2px); }

  /* Typewriter cursor blink */
  .tw-cur {
    display: inline-block; width: 2px; height: .9em;
    background: #6B3FA0; vertical-align: middle; margin-left: 2px;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* Orbit */
  @keyframes orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes orbit-rev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes counter { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes counter-rev { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  /* Reveal */
  .rv { opacity: 0; transform: translateY(32px); transition: opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1); }
  .rv.in { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: .1s; } .d2 { transition-delay: .2s; }
  .d3 { transition-delay: .3s; } .d4 { transition-delay: .4s; }

  /* Interest list hover */
  .int-li { transition: background .2s, color .2s, padding-left .25s; border-radius: 8px; }
  .int-li:hover { background: rgba(107,63,160,0.06); color: #1A1410; padding-left: 22px !important; }

  /* Goal item hover */
  .goal-li { transition: color .2s, padding-left .25s; }
  .goal-li:hover { color: #1A1410 !important; padding-left: 22px !important; }

  /* Contact link hover */
  .clink { transition: all .25s cubic-bezier(0.16,1,0.3,1); }
  .clink:hover { background: rgba(255,255,255,0.85) !important; color: #1A1410 !important; transform: translateX(6px); }

  /* Project card tilt */
  .pcard { transition: transform .4s cubic-bezier(0.16,1,0.3,1), box-shadow .4s cubic-bezier(0.16,1,0.3,1); }

  /* Scroll bar */
  #stt { transition: all .3s; }
  #stt:hover { background: #1A1410 !important; color: #F5F0E8 !important; transform: translateY(-4px); }

  /* Badge dot */
  @keyframes bdot { 0%,100%{transform:scale(1)} 50%{transform:scale(1.8);opacity:.5} }

  /* Scan line */
  @keyframes scanl { 0%{top:0} 100%{top:100%} }

  /* Number card underline */
  .num-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: #6B3FA0; transform: scaleX(0);
    transition: transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .num-card:hover::after { transform: scaleX(1); }

  /* Cert card left bar */
  .cert-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: #6B3FA0; transform: scaleY(0); transform-origin: bottom;
    transition: transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .cert-card:hover::before { transform: scaleY(1); }

  /* Click pop animation */
  .click-pop { animation: cpop .8s cubic-bezier(0.16,1,0.3,1) forwards; pointer-events: none; }
  @keyframes cpop { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-60px) scale(0.5);opacity:0} }

  @media(max-width:960px){
    .hero-grid, .about-grid, .xp-grid, .proj-grid, .contact-grid { grid-template-columns: 1fr !important; }
    .hero-right-panel { display: none !important; }
    .skills-grid { grid-template-columns: 1fr 1fr !important; }
    .nums-row { grid-template-columns: 1fr 1fr !important; }
    .nav-pill-wrap { display: none !important; }
  }
  @media(max-width:600px){
    .ch-grid, .certs-grid, .goals-grid, .nums-row { grid-template-columns: 1fr !important; }
    .skills-grid { grid-template-columns: 1fr !important; }
  }
`;

/* ─────────────────────────────────────────
   DATA
   ───────────────────────────────────────── */
const ROLES = ['AI Engineer', 'Data Scientist', 'ML Enthusiast', 'Problem Solver'];

const SKILLS = [
  { label: 'Languages', tags: ['Python', 'C++', 'HTML', 'CSS', 'SQL'], color: S.violet },
  { label: 'ML / Data Science', tags: ['TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Plotly', 'Bokeh'], color: S.rose },
  { label: 'Tools & Platforms', tags: ['Power BI', 'Git', 'VS Code', 'Jupyter', 'IntelliJ', 'Render', 'Google Colab', 'Postman', 'Kaggle'], color: S.mint },
  { label: 'Databases', tags: ['MySQL', 'MongoDB'], color: S.sky },
  { label: 'Web Development', tags: ['Flask', 'HTML', 'CSS', 'JavaScript'], color: S.violet },
];

const PROJECTS = [
  {
    num: '01', live: false,
    name: 'Helmet Detection System',
    desc: 'Real-time safety compliance detection using YOLOv8. Identifies helmet usage in live video streams — a production-grade computer vision pipeline built for industrial environments.',
    tags: ['YOLOv8', 'OpenCV', 'Python', 'CV'],
    demo: null, github: 'https://github.com/Vaibhavsharma45',
  },
  {
    num: '02', live: true,
    name: 'Resume Analyser',
    desc: 'NLP-powered ATS compatibility scoring system. Evaluates resumes against job descriptions using TF-IDF and semantic similarity — helping candidates navigate automated screening systems.',
    tags: ['NLP', 'TF-IDF', 'NLTK', 'Flask', 'React'],
    demo: 'https://resume-analyser-gbp1.vercel.app/', github: 'https://github.com/Vaibhavsharma45',
  },
  {
    num: '03', live: true, score: '0.85',
    name: 'Crypto Volatility Predictor',
    desc: 'ML model predicting cryptocurrency market volatility with an R² score of 0.85. Leverages advanced feature engineering on time-series data with an interactive analytical dashboard.',
    tags: ['Random Forest', 'Streamlit', 'Feature Engineering', 'Time-Series'],
    demo: 'https://crypto-volatility-prediction-projectmak4penaud7jwri5vptzto.streamlit.app/', github: 'https://github.com/Vaibhavsharma45',
  },
  {
    num: '04', live: true,
    name: 'Marg Darshak',
    desc: 'An ML-powered career intelligence platform combining Career Compass (AI recommendations), Gyan Kosh (knowledge repository), and Skill Saathi (curated learning resources).',
    tags: ['Flask', 'Random Forest', 'Plotly', 'SQLite', 'Seaborn'],
    demo: 'https://marg-darshak-lzy4.onrender.com/', github: 'https://github.com/Vaibhavsharma45',
  },
];

const EXPERIENCE = [
  {
    period: 'Nov 2025 — Dec 2025',
    role: 'Data Analyst Intern',
    company: '@ InternGeek',
    bullets: [
      'Developed and deployed an interactive Power BI Dashboard analyzing the Titanic Survival Dataset',
      'Applied core data analysis skills to visualize key metrics (KPIs) and provide actionable insights regarding survival rates based on Pclass and Gender',
      'Gained hands-on experience with Power BI Desktop and Google Sheets, strengthening expertise in data storytelling and visualization',
    ],
    tags: ['Power BI', 'Data Analysis', 'Google Sheets', 'Data Visualization'],
  },
  {
    period: '2025',
    role: 'Full Stack Developer',
    company: '@ Marg Darshak (Personal Project)',
    bullets: [
      'Built a comprehensive web platform combining Career Compass (AI-powered career recommendations), Gyan Kosh (digital spiritual wisdom repository), and Skill Saathi (curated learning resources)',
      'Addressed real student challenges: career confusion, accessible wisdom, and scattered learning resources',
    ],
    tags: ['Flask', 'Python', 'Seaborn', 'Machine Learning', 'Web Development'],
  },
];

const CHALLENGES = [
  { num:'01', title:'Self-taught ML Journey', desc:'Learned Python and Machine Learning independently without formal mentorship, building small projects that eventually gained peer recognition.' },
  { num:'02', title:'Mastering Complex Algorithms', desc:'Struggled initially with ML algorithms; revisited foundational mathematics and practiced extensively with multiple datasets to build understanding.' },
  { num:'03', title:'Kaggle Comeback Story', desc:'First Kaggle competition attempt was unsuccessful. Analyzed mistakes, practiced continuously, and achieved top 20% finish in subsequent competitions.' },
  { num:'04', title:'Resource Optimization', desc:'Limited GPU access initially required using lightweight models and cloud resources while balancing learning with other responsibilities.' },
];

const CERTS = [
  { icon:'🎓', year:'2025 — Present (Ongoing)', name:'Data Science with Gen AI', org:'PW Skills' },
  { icon:'⚡', year:'2025', name:'Gen AI for All', org:'PW Skills' },
  { icon:'🐍', year:'2025 — 2026', name:'Python Programming & ML', org:'Self-learned' },
  { icon:'🤖', year:'2026', name:'Introduction to Prompt Engineering', org:'Simplilearn' },
];

const GOALS = {
  short: [
    'Complete Data Science with Gen AI course',
    'Build 5+ ML projects for portfolio',
    'Get AI/ML internship',
    'Complete Agentic AI journey',
  ],
  long: [
    'Become a skilled AI Engineer',
    'Work on cutting-edge AI products',
    'Contribute to open-source AI projects',
  ],
};

const ORBIT_PILLS = [
  ['Python', S.violet], ['YOLOv8', S.rose], ['LangChain', S.gold],
  ['Flask', S.mint], ['TensorFlow', S.sky], ['PyTorch', S.violet],
  ['OpenCV', S.mint], ['NLP', S.rose],
];
const ORBIT_PILLS_MID = [
  ['Pandas', S.gold], ['SQL', S.sky], ['React', S.violet], ['Streamlit', S.mint],
];

/* ─────────────────────────────────────────
   HOOKS
   ───────────────────────────────────────── */
function useTypewriter(words) {
  const [text, setText] = useState('');
  const state = useRef({ wi: 0, ci: 0, del: false });

  useEffect(() => {
    let timer;
    function tick() {
      const { wi, ci, del } = state.current;
      const w = words[wi];
      if (!del) {
        const next = ci + 1;
        setText(w.slice(0, next));
        if (next === w.length) { state.current = { wi, ci: next, del: true }; timer = setTimeout(tick, 2400); }
        else { state.current = { wi, ci: next, del: false }; timer = setTimeout(tick, 90); }
      } else {
        const next = ci - 1;
        setText(w.slice(0, next));
        if (next === 0) { state.current = { wi: (wi + 1) % words.length, ci: 0, del: false }; timer = setTimeout(tick, 90); }
        else { state.current = { wi, ci: next, del: true }; timer = setTimeout(tick, 55); }
      }
    }
    tick();
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: 0.08 });
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCardTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll('.glass-card');
    const handlers = [];
    cards.forEach(card => {
      const mm = e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - .5) * 8;
        const y = ((e.clientY - r.top) / r.height - .5) * -8;
        card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
      };
      const ml = () => { card.style.transform = ''; card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)'; setTimeout(() => { card.style.transition = ''; }, 500); };
      card.addEventListener('mousemove', mm);
      card.addEventListener('mouseleave', ml);
      handlers.push({ card, mm, ml });
    });
    return () => handlers.forEach(({ card, mm, ml }) => { card.removeEventListener('mousemove', mm); card.removeEventListener('mouseleave', ml); });
  });
}

/* ─────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────── */

// Glass card wrapper
const GlassCard = ({ children, style = {}, className = '' }) => (
  <div className={`glass-card ${className}`} style={style}>{children}</div>
);

// Section header
const SecEyebrow = ({ children }) => (
  <div className="rv" style={{ display:'inline-flex', alignItems:'center', gap:10, fontFamily:"'Space Mono',monospace", fontSize:'.58rem', letterSpacing:'2px', textTransform:'uppercase', color:S.muted, marginBottom:'1.5rem' }}>
    <span style={{ width:24, height:1, background:S.muted, display:'inline-block' }}></span>
    {children}
  </div>
);

const BigH = ({ children, style = {} }) => (
  <h2 className="rv" style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.5rem,5vw,4.5rem)', fontWeight:900, lineHeight:.97, letterSpacing:'-2px', color:S.ink, marginBottom:'2.5rem', ...style }}>
    {children}
  </h2>
);

// Skill tag
const Tag = ({ children }) => <span className="skill-tag">{children}</span>;

// Nav link
const NavLink = ({ href, children, active }) => (
  <a href={href} className={`nav-pill-link${active ? ' active' : ''}`}>{children}</a>
);

/* ─────────────────────────────────────────
   SECTIONS
   ───────────────────────────────────────── */

const Hero = ({ typedText }) => (
  <section id="home" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', padding:'100px 5% 60px', zIndex:1 }}>
    <div className="hero-grid" style={{ maxWidth:1240, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 420px', gap:'3rem', alignItems:'center' }}>

      {/* Left */}
      <div>
        {/* Tag */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:S.glass, backdropFilter:'blur(14px)', border:`1px solid ${S.border}`, borderRadius:100, padding:'6px 16px 6px 8px', marginBottom:'2rem', fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:S.muted, letterSpacing:'1.5px', boxShadow:'0 8px 32px rgba(26,20,16,0.12)' }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:S.mint, boxShadow:`0 0 8px ${S.mint}`, display:'inline-block', animation:'bdot 2s ease-in-out infinite' }}></span>
          Gen AI Engineer · Muzaffarnagar, UP, India
        </div>

        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(3.5rem,8vw,7.5rem)', fontWeight:900, lineHeight:.95, letterSpacing:'-3px', color:S.ink, marginBottom:'1.5rem' }}>
          Vaibhav<br /><em style={{ color:S.violet }}>Sharma</em>
        </h1>

        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'clamp(.85rem,1.5vw,1rem)', color:S.violet, marginBottom:'1.2rem', minHeight:'1.5em' }}>
          {typedText}<span className="tw-cur"></span>
        </div>

        <p style={{ fontSize:'.97rem', color:S.muted, lineHeight:1.85, maxWidth:460, marginBottom:'2.5rem', fontWeight:300 }}>
          BCA Graduate | Data Science with Gen AI Learner | Building AI Solutions that solve real problems.
        </p>

        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
          <a href="#projects" style={{ display:'inline-flex', alignItems:'center', gap:8, background:S.ink, color:S.cream, fontFamily:"'Space Mono',monospace", fontSize:'.65rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'14px 28px', borderRadius:100, textDecoration:'none', boxShadow:'0 4px 20px rgba(26,20,16,0.2)', transition:'all .3s', cursor:'none' }}
            onMouseOver={e => { e.currentTarget.style.background = S.violet; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = S.ink; e.currentTarget.style.transform = ''; }}>
            <span>View My Work</span> <span>→</span>
          </a>
          <a href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:8, background:S.glass, backdropFilter:'blur(14px)', border:`1px solid ${S.border}`, color:S.ink, fontFamily:"'Space Mono',monospace", fontSize:'.65rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'14px 28px', borderRadius:100, textDecoration:'none', boxShadow:'0 8px 32px rgba(26,20,16,0.12)', cursor:'none' }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = S.glass; e.currentTarget.style.transform = ''; }}>
            Let's Talk ✦
          </a>
        </div>
      </div>

      {/* Right — orbiting skills */}
      <div className="hero-right-panel" style={{ position:'relative' }}>
        <div style={{ position:'relative', width:'100%', height:420, display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* Decorative rings */}
          {[320, 220, 400].map((s, i) => (
            <div key={i} style={{ position:'absolute', top:'50%', left:'50%', width:s, height:s, borderRadius:'50%', border:'1px dashed rgba(26,20,16,0.08)', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />
          ))}

          {/* Outer orbit */}
          <div style={{ position:'absolute', width:'100%', height:'100%', animation:'orbit 12s linear infinite' }}>
            {ORBIT_PILLS.map(([label, color], i) => {
              const angle = (i / ORBIT_PILLS.length) * 2 * Math.PI;
              const r = 160;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <div key={label} style={{ position:'absolute', top:'50%', left:'50%', transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, animation:'counter 12s linear infinite', background:S.glass, backdropFilter:'blur(14px)', border:`1px solid ${color}30`, borderRadius:100, padding:'6px 14px', fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color, whiteSpace:'nowrap', boxShadow:'0 8px 32px rgba(26,20,16,0.12)' }}>
                  {label}
                </div>
              );
            })}
          </div>

          {/* Mid orbit */}
          <div style={{ position:'absolute', width:'100%', height:'100%', animation:'orbit-rev 16s linear infinite' }}>
            {ORBIT_PILLS_MID.map(([label, color], i) => {
              const angle = (i / ORBIT_PILLS_MID.length) * 2 * Math.PI;
              const r = 110;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <div key={label} style={{ position:'absolute', top:'50%', left:'50%', transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, animation:'counter-rev 16s linear infinite', background:S.glass, backdropFilter:'blur(14px)', border:`1px solid ${color}30`, borderRadius:100, padding:'5px 12px', fontFamily:"'Space Mono',monospace", fontSize:'.58rem', color, whiteSpace:'nowrap', boxShadow:'0 8px 32px rgba(26,20,16,0.12)' }}>
                  {label}
                </div>
              );
            })}
          </div>

          {/* Center orb */}
          <GlassCard style={{ width:120, height:120, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4, position:'relative', zIndex:2, boxShadow:'0 24px 64px rgba(26,20,16,0.18), inset 0 1px 0 rgba(255,255,255,0.9)' }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:700, color:S.ink }}>VS</span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.52rem', color:S.muted, letterSpacing:1 }}>AI ENGINEER</span>
          </GlassCard>
        </div>

        {/* Stats panel */}
        <GlassCard style={{ padding:'1.8rem', position:'relative', marginTop:'1.5rem' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right, ${S.violet}, ${S.mint}, transparent)`, borderRadius:'20px 20px 0 0' }} />
          {[
            ['Projects Shipped', '10+', S.violet],
            ['Best R² Score', '0.85', S.gold],
            ['Frameworks', '6+', S.mint],
          ].map(([label, val, color]) => (
            <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'.8rem 0', borderBottom:`1px solid rgba(26,20,16,0.06)` }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:S.muted, letterSpacing:1, textTransform:'uppercase' }}>{label}</span>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem', fontWeight:700, color }}>{val}</span>
            </div>
          ))}
          <div style={{ marginTop:'1.2rem', display:'flex', alignItems:'center', gap:10, background:'rgba(26,158,122,0.05)', border:'1px solid rgba(26,158,122,0.2)', borderRadius:12, padding:'11px 14px' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:S.mint, boxShadow:`0 0 6px ${S.mint}`, display:'inline-block', animation:'bdot 2s ease-in-out infinite' }}></span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:S.mint, letterSpacing:1 }}>OPEN TO WORK</span>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" style={{ background:S.cream2, position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>01 · About</SecEyebrow>
      <BigH>Strong fundamentals.<br /><em style={{ color:S.violet }}>Real solutions.</em></BigH>

      <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
        {/* Bio card */}
        <GlassCard style={{ padding:'2.5rem' }} className="rv">
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem', fontWeight:700, color:S.ink, marginBottom:'1.2rem' }}>
            <em style={{ color:S.violet }}>Who</em> I Am
          </h3>
          <p style={{ fontSize:'.9rem', fontWeight:300, color:S.muted, lineHeight:1.85, marginBottom:'1rem' }}>
            I'm <strong style={{ color:S.ink, fontWeight:500 }}>Vaibhav Sharma</strong>, an aspiring AI Engineer currently in the learning phase. I recently completed my BCA and am actively exploring the data science field while building various projects. I'm pursuing a Data Science with Gen AI course on PW Skills, combining theoretical knowledge with hands-on project development.
          </p>
          <p style={{ fontSize:'.9rem', fontWeight:300, color:S.muted, lineHeight:1.85, marginBottom:'1rem' }}>
            I believe in the philosophy: <em style={{ color:S.violet }}>"Jo kuch bhi hota hai, ache ke liye hota hai"</em> (Whatever happens, happens for good). This mindset keeps me motivated through challenges and continuous learning.
          </p>
          <div style={{ marginTop:'1.5rem', padding:'1.2rem 1.5rem', background:'rgba(107,63,160,0.06)', borderLeft:`3px solid ${S.violet}`, borderRadius:'0 12px 12px 0', fontFamily:"'Space Mono',monospace", fontSize:'.72rem', color:S.violet, lineHeight:1.7 }}>
            # Strong fundamentals. Real solutions. No shortcuts.
          </div>
        </GlassCard>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {/* Terminal */}
          <GlassCard style={{ padding:0, overflow:'hidden', position:'relative' }} className="rv d2">
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'rgba(107,63,160,0.1)', animation:'scanl 5s ease-in-out infinite' }} />
            <div style={{ display:'flex', alignItems:'center', gap:7, background:'rgba(26,20,16,0.05)', borderBottom:'1px solid rgba(26,20,16,0.08)', padding:'10px 16px' }}>
              {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width:10, height:10, borderRadius:'50%', background:c, display:'inline-block' }} />)}
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.55rem', color:S.muted, marginLeft:'auto' }}>vaibhav@ai-lab</span>
            </div>
            <div style={{ padding:'1.5rem', fontFamily:"'Space Mono',monospace", fontSize:'.75rem', lineHeight:2.1, background:'rgba(255,255,255,0.6)' }}>
              <div style={{ color:S.violet }}>$ whoami</div><br />
              {[
                ['Location', 'Muzaffarnagar, UP, India', S.ink],
                ['Education', 'BCA — Maa Shakumbhari University', S.ink],
                ['Specialization', 'Gen AI | CV | NLP', S.violet],
                ['Status', 'Actively Seeking Opportunities', S.mint],
                ['Kaggle', 'Top 20% Competitor', S.gold],
                ['Motto', 'Strong fundamentals. Real solutions.', S.muted],
              ].map(([k, v, c]) => (
                <div key={k} style={{ display:'grid', gridTemplateColumns:'130px 1fr', gap:'.5rem' }}>
                  <span style={{ color:S.muted }}>{k}</span>
                  <span style={{ color:c }}>{v}</span>
                </div>
              ))}
              <br /><div style={{ color:S.violet }}>$ <span className="tw-cur" /></div>
            </div>
          </GlassCard>

          {/* Interests */}
          <GlassCard style={{ padding:'.5rem' }} className="rv d3">
            {[
              ['01', 'Exploring new technologies and staying updated with AI/ML trends'],
              ['02', 'Regular exercise and playing cricket'],
              ['03', 'Reading articles and powerful thoughts for personal growth'],
              ['04', 'Exploring astrology and finding methods for self-improvement'],
              ['05', 'Gaining diverse experiences and trying new things'],
            ].map(([num, text]) => (
              <div key={num} className="int-li" style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 16px', borderBottom:'1px solid rgba(26,20,16,0.06)', fontSize:'.88rem', color:S.muted, fontWeight:300 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.55rem', color:S.violet, minWidth:28 }}>{num}</span>
                {text}
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" style={{ position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>02 · Skills & Stack</SecEyebrow>
      <BigH>Full Stack <em style={{ color:S.violet }}>AI.</em></BigH>
      <div className="skills-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
        {SKILLS.map(({ label, tags }, i) => (
          <GlassCard key={label} style={{ padding:'2rem' }} className={`rv d${i % 5}`}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.58rem', letterSpacing:'2px', textTransform:'uppercase', color:S.muted, marginBottom:'1rem', display:'flex', alignItems:'center', gap:8 }}>
              {label}
              <span style={{ flex:1, height:1, background:'rgba(26,20,16,0.08)' }} />
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.45rem' }}>
              {tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" style={{ background:S.cream2, position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>03 · Projects</SecEyebrow>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2rem' }}>
        <BigH style={{ marginBottom:0 }}>Things I built<br />that <span style={{ color:S.rose }}>work.</span></BigH>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:S.muted, letterSpacing:'2px' }}>04 / Projects</span>
      </div>
      <div className="proj-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem' }}>
        {PROJECTS.map((p, i) => (
          <GlassCard key={p.num} style={{ padding:'2.2rem' }} className={`pcard rv d${i % 4}`}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.58rem', color:S.muted, letterSpacing:'2px' }}>{p.num} /</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.55rem', letterSpacing:'1px', color: p.live ? S.mint : S.muted, background: p.live ? 'rgba(26,158,122,0.1)' : 'transparent', border:`1px solid ${p.live ? 'rgba(26,158,122,0.25)' : 'rgba(26,20,16,0.1)'}`, borderRadius:100, padding:'2px 10px' }}>
                {p.live ? 'Live ↗' : 'In Progress'}
              </span>
            </div>
            {p.score && (
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:"'Space Mono',monospace", fontSize:'.58rem', color:S.gold, background:'rgba(212,144,10,0.08)', border:'1px solid rgba(212,144,10,0.25)', borderRadius:100, padding:'3px 12px', marginBottom:'1rem' }}>
                ✦ R² Score: {p.score}
              </div>
            )}
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, color:S.ink, marginBottom:'.7rem', lineHeight:1.05 }}>{p.name}</div>
            <p style={{ fontSize:'.85rem', fontWeight:300, color:S.muted, lineHeight:1.75, marginBottom:'1.2rem' }}>{p.desc}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginBottom:'1.5rem' }}>
              {p.tags.map(t => <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:'.55rem', color:S.sky, background:'rgba(40,120,200,0.07)', border:'1px solid rgba(40,120,200,0.2)', borderRadius:100, padding:'3px 10px' }}>{t}</span>)}
            </div>
            <div style={{ display:'flex', gap:'.7rem' }}>
              {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Space Mono',monospace", fontSize:'.62rem', letterSpacing:'1px', textTransform:'uppercase', padding:'9px 20px', borderRadius:100, textDecoration:'none', background:S.ink, color:S.cream, cursor:'none' }}
                onMouseOver={e => e.currentTarget.style.background = S.violet}
                onMouseOut={e => e.currentTarget.style.background = S.ink}>Live Demo</a>}
              <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Space Mono',monospace", fontSize:'.62rem', letterSpacing:'1px', textTransform:'uppercase', padding:'9px 20px', borderRadius:100, border:'1px solid rgba(26,20,16,0.15)', color:S.muted, textDecoration:'none', cursor:'none' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = S.ink; e.currentTarget.style.color = S.ink; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(26,20,16,0.15)'; e.currentTarget.style.color = S.muted; }}>
                {p.demo ? 'GitHub' : 'GitHub ↗'}
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" style={{ position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>04 · Experience</SecEyebrow>
      <BigH>Where I've <em style={{ color:S.violet }}>grown.</em></BigH>
      <div className="xp-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
        {EXPERIENCE.map((e, i) => (
          <GlassCard key={e.role} style={{ padding:'2.2rem', position:'relative', overflow:'hidden' }} className={`rv d${i}`}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right, ${S.violet}, transparent)` }} />
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:S.violet, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'.8rem' }}>{e.period}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.5rem', fontWeight:700, color:S.ink, marginBottom:'.3rem', lineHeight:1.1 }}>{e.role}</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.65rem', color:S.muted, marginBottom:'1.4rem' }}>{e.company}</div>
            <ul style={{ listStyle:'none' }}>
              {e.bullets.map((b, j) => (
                <li key={j} style={{ fontSize:'.85rem', fontWeight:300, color:S.muted, padding:'5px 0 5px 1.2rem', position:'relative', lineHeight:1.65 }}>
                  <span style={{ position:'absolute', left:0, top:7, color:S.violet, fontSize:'.7rem' }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginTop:'1.2rem' }}>
              {e.tags.map(t => <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:'.55rem', color:S.violet, background:'rgba(107,63,160,0.08)', border:'1px solid rgba(107,63,160,0.2)', borderRadius:100, padding:'3px 10px' }}>{t}</span>)}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Challenges = () => (
  <section style={{ background:S.cream2, position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>05 · Challenges &amp; Growth</SecEyebrow>
      <BigH>Obstacles <span style={{ color:S.gold, fontStyle:'normal' }}>overcome.</span></BigH>
      <div className="ch-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem' }}>
        {CHALLENGES.map((c, i) => (
          <GlassCard key={c.num} style={{ padding:'2rem' }} className={`rv d${i % 4}`}>
            <div style={{ width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", fontSize:'.65rem', background:'rgba(107,63,160,0.1)', color:S.violet, marginBottom:'1.2rem', border:'1px solid rgba(107,63,160,0.2)' }}>{c.num}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', fontWeight:700, color:S.ink, marginBottom:'.6rem' }}>{c.title}</div>
            <p style={{ fontSize:'.85rem', fontWeight:300, color:S.muted, lineHeight:1.75 }}>{c.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Certifications = () => (
  <section style={{ position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>06 · Certifications</SecEyebrow>
      <BigH>Certified <em style={{ color:S.violet }}>learning.</em></BigH>
      <div className="certs-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem' }}>
        {CERTS.map((c, i) => (
          <GlassCard key={c.name} style={{ padding:'2rem', display:'flex', alignItems:'flex-start', gap:'1.2rem', position:'relative', overflow:'hidden' }} className={`cert-card rv d${i % 4}`}>
            <div style={{ width:44, height:44, borderRadius:12, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', background:'rgba(212,144,10,0.1)', border:'1px solid rgba(212,144,10,0.2)' }}>{c.icon}</div>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.58rem', color:S.muted, letterSpacing:'1px', marginBottom:'.5rem' }}>{c.year}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.05rem', fontWeight:700, color:S.ink, marginBottom:'.25rem', lineHeight:1.2 }}>{c.name}</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.62rem', color:S.violet, letterSpacing:'1px' }}>{c.org}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Goals = () => (
  <section style={{ background:S.cream2, position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>07 · Goals</SecEyebrow>
      <BigH>Where I'm <span style={{ color:S.mint, fontStyle:'normal' }}>headed.</span></BigH>
      <div className="goals-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
        {[
          { label:'Short-term', items:GOALS.short, icon:'→', color:S.violet, long:false },
          { label:'Long-term',  items:GOALS.long,  icon:'★', color:S.mint,   long:true  },
        ].map(({ label, items, icon, color, long }) => (
          <GlassCard key={label} style={{ padding:'2.2rem', position:'relative', overflow:'hidden' }} className={`rv ${long ? 'd2' : ''}`}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right, ${color}, transparent)` }} />
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.62rem', color, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1.5rem' }}>{label}</div>
            {items.map(item => (
              <div key={item} className="goal-li" style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'10px 0', borderBottom:'1px solid rgba(26,20,16,0.06)', fontSize:'.87rem', fontWeight:300, color:S.muted, lineHeight:1.6 }}>
                <span style={{ color, flexShrink:0, marginTop:1 }}>{icon}</span>
                {item}
              </div>
            ))}
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Numbers = () => (
  <section style={{ position:'relative', zIndex:1, padding:'80px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <div className="nums-row" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem' }}>
        {[
          ['10+', S.violet, 'Projects Shipped'],
          ['0.85', S.gold, 'Best R² Score'],
          ['6+', S.mint, 'Frameworks'],
          ['20%', S.sky, 'Kaggle Top Finish'],
        ].map(([val, color, label]) => (
          <GlassCard key={label} style={{ padding:'2.5rem 1.5rem', textAlign:'center', position:'relative', overflow:'hidden' }} className="num-card rv">
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'4rem', fontWeight:900, lineHeight:1, letterSpacing:'-3px', color, marginBottom:'.4rem' }}>{val}</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.58rem', color:S.muted, letterSpacing:'2px', textTransform:'uppercase' }}>{label}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" style={{ background:S.cream2, position:'relative', zIndex:1, padding:'100px 5%' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SecEyebrow>08 · Contact</SecEyebrow>
      <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:'4rem', alignItems:'start' }}>
        <div className="rv">
          <BigH>Let's build<br />something<br /><em style={{ color:S.violet }}>intelligent.</em></BigH>
          <p style={{ fontSize:'.95rem', fontWeight:300, color:S.muted, lineHeight:1.85, marginBottom:'2.5rem' }}>
            Actively seeking opportunities in AI/ML engineering, data science, and Gen AI. Open to full-time roles, internships, and interesting collaborations. Let's build something together.
          </p>
          <a href="mailto:vaibhavsharma95124v@gmail.com" style={{ display:'inline-flex', alignItems:'center', gap:12, background:S.ink, color:S.cream, fontFamily:"'Space Mono',monospace", fontSize:'.7rem', letterSpacing:'2px', textTransform:'uppercase', padding:'18px 36px', borderRadius:100, textDecoration:'none', cursor:'none', boxShadow:'0 4px 24px rgba(26,20,16,0.2)', transition:'all .35s' }}
            onMouseOver={e => { e.currentTarget.style.background = S.violet; e.currentTarget.style.boxShadow = '0 8px 36px rgba(107,63,160,0.4)'; }}
            onMouseOut={e => { e.currentTarget.style.background = S.ink; e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,20,16,0.2)'; }}>
            <span>Send me a message</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }} className="rv d2">
          {[
            { label:'Email', val:'vaibhavsharma95124v@gmail.com', href:'mailto:vaibhavsharma95124v@gmail.com' },
            { label:'Phone', val:'+91-9012907709', href:'tel:+919012907709' },
            { label:'GitHub', val:'github.com/Vaibhavsharma45', href:'https://github.com/Vaibhavsharma45' },
            { label:'LinkedIn', val:'linkedin.com/in/vaibhav-0sharma', href:'https://linkedin.com/in/vaibhav-0sharma' },
            { label:'Kaggle', val:'kaggle.com/Vaibhavsharma45', href:'https://kaggle.com/Vaibhavsharma45' },
          ].map(({ label, val, href }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="clink"
              style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', borderRadius:14, background:S.glass, backdropFilter:'blur(14px)', border:`1px solid ${S.border}`, textDecoration:'none', color:S.muted, boxShadow:'0 2px 12px rgba(26,20,16,0.06)', cursor:'none' }}>
              <div style={{ flex:1 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.52rem', color:S.muted, letterSpacing:'2px', textTransform:'uppercase', display:'block', marginBottom:1 }}>{label}</span>
                <span style={{ fontSize:'.82rem' }}>{val}</span>
              </div>
              <span style={{ color:S.violet, fontSize:'.75rem' }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   ROOT APP
   ───────────────────────────────────────── */
export default function App() {
  const [navGlass, setNavGlass] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showStt, setShowStt] = useState(false);
  const [clicks, setClicks] = useState(0);
  const typedText = useTypewriter(ROLES);

  useReveal();
  useCardTilt();

  // Cursor
  useEffect(() => {
    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    const onMove = e => {
      dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
      setTimeout(() => { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }, 90);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      setNavGlass(window.scrollY > 60);
      setShowStt(window.scrollY > 500);
      const ids = ['home','about','skills','projects','experience','contact'];
      let cur = 'home';
      ids.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 100) cur = id; });
      setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Blob parallax
  useEffect(() => {
    const onMove = e => {
      const bx = (e.clientX / window.innerWidth - .5) * 30;
      const by = (e.clientY / window.innerHeight - .5) * 30;
      document.querySelectorAll('.blob').forEach((b, i) => {
        const f = (i + 1) * .4;
        b.style.transform = `translate(${bx * f}px,${by * f}px)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Logo easter egg click pop
  const handleLogoClick = e => {
    e.preventDefault();
    const next = clicks + 1;
    setClicks(next);
    const msgs = ['🚀','🔥','💡','⚡','🧠','🏆','🎯','✨','🤖','👾'];
    const pop = document.createElement('div');
    pop.className = 'click-pop';
    pop.textContent = msgs[next % msgs.length];
    pop.style.cssText = `position:fixed;top:${e.clientY - 10}px;left:${e.clientX - 10}px;font-size:1.2rem;z-index:99999;pointer-events:none;`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
    if (next === 10) {
      const burst = document.createElement('div');
      burst.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-family:Playfair Display,serif;font-size:3rem;color:#6B3FA0;z-index:99999;pointer-events:none;text-align:center;animation:cpop 1.5s forwards;';
      burst.textContent = 'You found it! 🎉';
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 1500);
    }
  };

  const navSections = ['home','about','skills','projects','experience','contact'];

  return (
    <>
      <style>{css}</style>

      {/* Background blobs */}
      <div className="blob" style={{ width:600, height:600, background:'radial-gradient(circle,rgba(107,63,160,0.25),transparent 70%)', top:-100, left:-100, animationDuration:'25s', opacity:.55 }} />
      <div className="blob" style={{ width:500, height:500, background:'radial-gradient(circle,rgba(232,67,90,0.18),transparent 70%)', top:'30%', right:-80, animationDuration:'30s', animationDelay:'-10s', opacity:.55 }} />
      <div className="blob" style={{ width:700, height:700, background:'radial-gradient(circle,rgba(212,144,10,0.15),transparent 70%)', bottom:-150, left:'20%', animationDuration:'35s', animationDelay:'-18s', opacity:.55 }} />
      <div className="blob" style={{ width:400, height:400, background:'radial-gradient(circle,rgba(26,158,122,0.18),transparent 70%)', top:'60%', left:'5%', animationDuration:'20s', animationDelay:'-5s', opacity:.55 }} />

      {/* Cursor */}
      <div id="cur-dot" />
      <div id="cur-ring" />

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:900, padding:'0 5%', height:70, display:'flex', alignItems:'center', justifyContent:'space-between', transition:'all .4s', ...(navGlass ? { background:'rgba(245,240,232,0.8)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(26,20,16,0.08)', boxShadow:'0 2px 24px rgba(26,20,16,0.06)' } : {}) }}>
        <a href="#home" onClick={handleLogoClick} style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.5rem', fontWeight:900, color:S.ink, letterSpacing:'-1px', textDecoration:'none', cursor:'none' }}>
          V<em style={{ color:S.violet }}>S</em>
          {clicks > 0 && <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'.55rem', color:S.violet, marginLeft:4 }}>×{clicks}</span>}
        </a>
        <div className="nav-pill-wrap" style={{ display:'flex', gap:0, background:S.glass, backdropFilter:'blur(14px)', border:`1px solid ${S.border}`, borderRadius:100, padding:4, boxShadow:'0 4px 16px rgba(26,20,16,0.08)' }}>
          {navSections.map(id => (
            <NavLink key={id} href={`#${id}`} active={activeSection === id}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </NavLink>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:S.glass, backdropFilter:'blur(14px)', border:`1px solid ${S.border}`, borderRadius:100, padding:'8px 16px', fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:S.mint, letterSpacing:'1px', boxShadow:'0 8px 32px rgba(26,20,16,0.12)' }}>
          <span className="badge-dot" style={{ width:6, height:6, borderRadius:'50%', background:S.mint, boxShadow:`0 0 6px ${S.mint}`, display:'inline-block', animation:'bdot 2s ease-in-out infinite' }} />
          Open to Work
        </div>
      </nav>

      {/* Sections */}
      <Hero typedText={typedText} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Challenges />
      <Certifications />
      <Goals />
      <Numbers />
      <Contact />

      {/* Footer */}
      <footer style={{ background:S.cream3, borderTop:'1px solid rgba(26,20,16,0.08)', padding:'2.5rem 5%', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem', position:'relative', zIndex:1 }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem', fontWeight:900, color:S.ink }}>V<em style={{ color:S.violet }}>S</em></span>
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:S.muted, textAlign:'center', lineHeight:1.8, letterSpacing:'.5px' }}>
          Built with <span style={{ color:S.violet }}>Python</span> in my soul and <span style={{ color:S.violet }}>JavaScript</span> in production.<br />
          Vaibhav Sharma © 2025 · "Jo kuch bhi hota hai, ache ke liye hota hai"
        </p>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem', fontWeight:900, color:S.ink, opacity:.15 }}>V<em style={{ color:S.violet }}>S</em></span>
      </footer>

      {/* Scroll to top */}
      {showStt && (
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} id="stt"
          style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:800, width:48, height:48, borderRadius:'50%', background:S.glass, backdropFilter:'blur(24px)', border:`1px solid ${S.border}`, color:S.ink, fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center', cursor:'none', boxShadow:'0 8px 32px rgba(26,20,16,0.12)' }}>
          ↑
        </button>
      )}
    </>
  );
}