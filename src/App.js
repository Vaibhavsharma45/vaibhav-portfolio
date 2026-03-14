import React, { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, Phone, Moon, Sun, Download, ExternalLink, Award, Target, Briefcase, Code, User, Heart, TrendingUp, ArrowUp, Sparkles, MessageCircle } from 'lucide-react';

const GITHUB_USERNAME = 'Vaibhavsharma45';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [githubRepos, setGithubRepos] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  const roles = useMemo(() => [
    'AI & ML Engineer', 'Data Scientist', 'Generative AI Enthusiast',
    'Python Developer', 'Backend Engineer', 'Problem Solver',
  ], []);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const text = roles[roleIndex];
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) { setTypedText(text.slice(0, index)); index++; }
      else { clearInterval(timer); setTimeout(() => setRoleIndex(prev => (prev + 1) % roles.length), 2000); }
    }, 100);
    return () => clearInterval(timer);
  }, [roleIndex, roles]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => Array.isArray(data) && setGithubRepos(data.filter(r => !r.fork)))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const sections = ['home','about','challenges','skills','experience','projects','certifications','goals','contact'];
      const current = sections.find(s => {
        const el = document.getElementById(s);
        if (el) { const r = el.getBoundingClientRect(); return r.top <= 100 && r.bottom >= 100; }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => setIsVisible(prev => ({ ...prev, [e.target.id]: e.isIntersecting }))),
      { threshold: 0.1 }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // ── THEME ─────────────────────────────────────────────────────────────────
  const D = darkMode;
  const bg        = D ? 'bg-[#060d1f]'     : 'bg-slate-50';
  const bgAlt     = D ? 'bg-[#0a1628]'     : 'bg-white';
  const bgCard    = D ? 'bg-[#0d1f3c]/70'  : 'bg-white';
  const bgCard2   = D ? 'bg-[#060d1f]'     : 'bg-gray-50';
  const border    = D ? 'border-[#1e3a5f]' : 'border-gray-200';
  const textMain  = D ? 'text-slate-100'   : 'text-gray-900';
  const textMuted = D ? 'text-slate-400'   : 'text-gray-600';
  const navBg     = D ? 'bg-[#060d1f]/90'  : 'bg-white/95';

  // Light mode section colors
  const sectionBg = (alt) => alt
    ? (D ? 'bg-[#0a1628]' : 'bg-blue-50/40')
    : (D ? 'bg-[#060d1f]' : 'bg-slate-50');

  // ── DATA ──────────────────────────────────────────────────────────────────
  const skills = [
    {
      category: 'Programming',
      icon: '</>',
      iconColor: D ? 'text-cyan-400' : 'text-cyan-600',
      glowColor: D ? 'rgba(34,211,238,0.15)' : 'rgba(8,145,178,0.12)',
      lightBg: 'bg-cyan-50',
      lightBorder: 'border-cyan-200',
      lightIconBg: 'bg-cyan-100',
      items: ['Python', 'SQL', 'JavaScript', 'HTML5', 'CSS3', 'C++', 'DSA'],
    },
    {
      category: 'Machine Learning',
      icon: '🧠',
      iconColor: D ? 'text-pink-400' : 'text-pink-600',
      glowColor: D ? 'rgba(244,114,182,0.15)' : 'rgba(219,39,119,0.1)',
      lightBg: 'bg-pink-50',
      lightBorder: 'border-pink-200',
      lightIconBg: 'bg-pink-100',
      items: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Classification', 'Regression', 'Hyperparameter Tuning'],
    },
    {
      category: 'Data Analytics',
      icon: '📈',
      iconColor: D ? 'text-teal-400' : 'text-teal-600',
      glowColor: D ? 'rgba(45,212,191,0.15)' : 'rgba(15,118,110,0.1)',
      lightBg: 'bg-teal-50',
      lightBorder: 'border-teal-200',
      lightIconBg: 'bg-teal-100',
      items: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering', 'Data Cleaning', 'Statistical Analysis', 'Power BI'],
    },
    {
      category: 'NLP & Gen AI',
      icon: '🤖',
      iconColor: D ? 'text-violet-400' : 'text-violet-600',
      glowColor: D ? 'rgba(167,139,250,0.15)' : 'rgba(124,58,237,0.1)',
      lightBg: 'bg-violet-50',
      lightBorder: 'border-violet-200',
      lightIconBg: 'bg-violet-100',
      items: ['NLP', 'Generative AI', 'LangChain', 'LangGraph', 'LlamaIndex', 'RAG', 'Prompt Engineering', 'Groq API', 'Fine-tuning', 'ChromaDB'],
    },
    {
      category: 'Backend',
      icon: '>_',
      iconColor: D ? 'text-green-400' : 'text-green-700',
      glowColor: D ? 'rgba(74,222,128,0.15)' : 'rgba(21,128,61,0.1)',
      lightBg: 'bg-green-50',
      lightBorder: 'border-green-200',
      lightIconBg: 'bg-green-100',
      items: ['Flask', 'FastAPI', 'REST APIs', 'MongoDB', 'MySQL', 'Web Development'],
    },
    {
      category: 'Visualization',
      icon: '📊',
      iconColor: D ? 'text-yellow-400' : 'text-yellow-600',
      glowColor: D ? 'rgba(250,204,21,0.15)' : 'rgba(202,138,4,0.1)',
      lightBg: 'bg-yellow-50',
      lightBorder: 'border-yellow-200',
      lightIconBg: 'bg-yellow-100',
      items: ['Matplotlib', 'Seaborn', 'Plotly', 'Streamlit', 'Power BI'],
    },
    {
      category: 'Tools',
      icon: '⚙️',
      iconColor: D ? 'text-orange-400' : 'text-orange-600',
      glowColor: D ? 'rgba(251,146,60,0.15)' : 'rgba(194,65,12,0.1)',
      lightBg: 'bg-orange-50',
      lightBorder: 'border-orange-200',
      lightIconBg: 'bg-orange-100',
      items: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Google Colab', 'Kaggle', 'Docker', 'Render', 'Vercel', 'Postman', 'GitHub Actions'],
    },
    {
      category: 'CS Fundamentals',
      icon: '🖥️',
      iconColor: D ? 'text-rose-400' : 'text-rose-600',
      glowColor: D ? 'rgba(251,113,133,0.15)' : 'rgba(190,18,60,0.1)',
      lightBg: 'bg-rose-50',
      lightBorder: 'border-rose-200',
      lightIconBg: 'bg-rose-100',
      items: ['Computer Networks', 'OS Concepts', 'DBMS', 'OOP', 'DSA', 'System Design'],
    },
  ];

  const challenges = [
    { icon: '👨‍👩‍👦', title: 'Family Pressure vs Passion', description: 'Coming from a non-tech background, there was constant pressure to pursue a stable government job instead of AI. I chose to let my work speak — built real projects, secured an internship, and proved that a career in AI is not just possible, but promising.', badge: 'Overcame ✓', darkBadge: 'text-green-400 border-green-400/40 bg-green-400/10', lightBadge: 'text-green-700 border-green-300 bg-green-50', accentDark: 'rgba(34,211,238,0.12)', accentLight: 'rgba(6,182,212,0.08)' },
    { icon: '🧠', title: 'Overcoming Self-Doubt', description: 'Early on, I doubted whether someone from a tier-2 city without elite college credentials could break into AI. My first Kaggle attempt landed in the bottom 50%. Instead of quitting, I analysed every mistake — and today I have 6 deployed projects to show for it.', badge: 'Still growing ↑', darkBadge: 'text-blue-400 border-blue-400/40 bg-blue-400/10', lightBadge: 'text-blue-700 border-blue-300 bg-blue-50', accentDark: 'rgba(34,211,238,0.12)', accentLight: 'rgba(37,99,235,0.08)' },
    { icon: '🌐', title: 'English Barrier in Technical Learning', description: 'Most quality AI/ML resources are in English, which was a significant barrier initially. I tackled it by combining vernacular explanations with official documentation, taking bilingual notes, and practising consistently — now I read research papers and docs with ease.', badge: 'Solved ✓', darkBadge: 'text-purple-400 border-purple-400/40 bg-purple-400/10', lightBadge: 'text-purple-700 border-purple-300 bg-purple-50', accentDark: 'rgba(167,139,250,0.12)', accentLight: 'rgba(124,58,237,0.08)' },
    { icon: '⚡', title: 'Self-Taught Without Formal Mentorship', description: 'With no structured mentorship or campus resources, the internet, GitHub, and open-source communities became my classroom. This forced me to develop strong independent problem-solving skills — a habit that now lets me pick up any new technology quickly.', badge: 'Core Strength 💪', darkBadge: 'text-orange-400 border-orange-400/40 bg-orange-400/10', lightBadge: 'text-orange-700 border-orange-300 bg-orange-50', accentDark: 'rgba(251,146,60,0.12)', accentLight: 'rgba(194,65,12,0.08)' },
  ];

  const experiences = [
    { role: 'Data Analyst Intern', company: 'Intern Geek', duration: 'Nov 2025 – Dec 2025', description: 'Developed and deployed an interactive Power BI Dashboard analysing the Titanic Survival Dataset. Visualised key KPIs — survival rates by Pclass and Gender — using data storytelling techniques. Gained hands-on experience with Power BI Desktop and Google Sheets, translating raw data into actionable insights.', skills: ['Power BI', 'Data Analysis', 'Google Sheets', 'Data Visualisation'] },
  ];

  const certifications = [
    { name: 'Artificial Intelligence & Machine Learning Cohort', org: 'Intern Geek', year: 'Jan – Feb 2026', grade: 'Grade: A+', color: 'from-purple-500 to-pink-500', darkGlow: 'rgba(168,85,247,0.2)', lightGlow: 'rgba(168,85,247,0.12)', icon: '🏆' },
    { name: 'Data Analytics Internship', org: 'Intern Geek', year: 'Nov – Dec 2025', grade: 'Intern ID: IG251491', color: 'from-green-500 to-teal-500', darkGlow: 'rgba(34,197,94,0.2)', lightGlow: 'rgba(34,197,94,0.12)', icon: '💼' },
    { name: 'Data Science with Generative AI', org: 'PW Skills', year: '2025 – Present (Ongoing)', grade: 'In Progress', color: 'from-blue-500 to-cyan-500', darkGlow: 'rgba(59,130,246,0.2)', lightGlow: 'rgba(59,130,246,0.12)', icon: '📊' },
    { name: 'Gen AI for All', org: 'PW Skills', year: '2025', grade: 'Completed', color: 'from-violet-500 to-purple-500', darkGlow: 'rgba(139,92,246,0.2)', lightGlow: 'rgba(139,92,246,0.12)', icon: '🤖' },
    { name: 'Introduction to Prompt Engineering', org: 'Simplilearn', year: '2026', grade: 'Completed', color: 'from-orange-500 to-red-500', darkGlow: 'rgba(249,115,22,0.2)', lightGlow: 'rgba(249,115,22,0.12)', icon: '💡' },
  ];

  const goals = {
    shortTerm: [
      { icon: '🎯', text: 'Land a full-time AI/ML role or internship within the next 6 months', tag: 'Top Priority' },
      { icon: '🚀', text: 'Complete the Data Science with Gen AI course and ship 2 more production-grade projects', tag: 'In Progress' },
      { icon: '🤖', text: 'Master Agentic AI — LangGraph, AutoGen, and multi-agent system design', tag: 'Learning' },
      { icon: '🌟', text: 'Make meaningful contributions to an open-source AI/ML library on GitHub', tag: 'Upcoming' },
      { icon: '📝', text: 'Start writing technical articles documenting projects, learnings, and experiments', tag: 'Upcoming' },
    ],
    longTerm: [
      { icon: '🏢', text: 'Work as an AI Engineer at a product-based company building real-world Generative AI solutions', tag: '1–2 Years' },
      { icon: '🎓', text: 'Pursue advanced studies or research in AI/ML if the right opportunity presents itself', tag: '2–3 Years' },
      { icon: '💡', text: 'Build and launch an AI-powered SaaS product that solves a genuine problem at scale', tag: '2–3 Years' },
      { icon: '🌍', text: 'Mentor aspiring AI engineers from tier-2 and tier-3 cities — give back what I never had', tag: 'Long Term' },
    ],
  };

  const projects = [
    { name: 'DataMind Pro', emoji: '📊', tag: 'AI · Full Stack', neonColor: '#22d3ee', darkBorder: 'border-cyan-500/40', lightBorder: 'border-cyan-300', darkTag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', lightTag: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: 'AI-powered data analysis platform — upload any CSV/Excel and get auto EDA, ML models, Groq LLM insights, PDF/PPT reports, and a chatbot. Built with Flask + 9 Blueprints + Groq Llama 3.3 70B.', stack: ['Flask', 'Python', 'Groq API', 'Scikit-learn', 'Plotly'], github: 'https://github.com/Vaibhavsharma45/Auto_analyst', live: 'https://datamind-pro.onrender.com', stars: 1 },
    { name: 'Bujji AI', emoji: '🤖', tag: 'AI · Voice Assistant', neonColor: '#a78bfa', darkBorder: 'border-violet-500/40', lightBorder: 'border-violet-300', darkTag: 'bg-violet-500/10 text-violet-400 border-violet-500/30', lightTag: 'bg-violet-100 text-violet-700 border-violet-300', description: 'Personal JARVIS-style voice assistant — wake word "Hey Robo", LangGraph ReAct agent, ChromaDB memory, PC control, WhatsApp/email, browser automation, and a web dashboard. 100% free stack.', stack: ['Python', 'LangGraph', 'Groq API', 'FastAPI', 'ChromaDB'], github: 'https://github.com/Vaibhavsharma45/Bujji_AI', live: null, stars: 0 },
    { name: 'Marg Darshak', emoji: '🧭', tag: 'AI · Web App', neonColor: '#34d399', darkBorder: 'border-emerald-500/40', lightBorder: 'border-emerald-300', darkTag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', lightTag: 'bg-emerald-100 text-emerald-700 border-emerald-300', description: 'Comprehensive web platform combining Career Compass (AI career recommendations), Gyan Kosh (spiritual wisdom repository), and Skill Saathi (curated learning resources) — solving real student pain-points.', stack: ['Flask', 'Python', 'Scikit-learn', 'Seaborn', 'ML'], github: 'https://github.com/Vaibhavsharma45/marg-darshak', live: 'https://marg-darshak.onrender.com', stars: 1 },
    { name: 'Resume Analyser', emoji: '📄', tag: 'AI · NLP', neonColor: '#fb923c', darkBorder: 'border-orange-500/40', lightBorder: 'border-orange-300', darkTag: 'bg-orange-500/10 text-orange-400 border-orange-500/30', lightTag: 'bg-orange-100 text-orange-700 border-orange-300', description: 'AI-powered resume analysis tool — parses uploaded PDFs, extracts skills and keywords, scores against job descriptions, and suggests improvements using NLP techniques.', stack: ['Python', 'Flask', 'NLP', 'JavaScript', 'CSS'], github: 'https://github.com/Vaibhavsharma45/Resume_Analyser', live: 'https://resume-analyser-gbp1.vercel.app/', stars: 1 },
    { name: 'Crypto Volatility Predictor', emoji: '📈', tag: 'ML · Finance', neonColor: '#facc15', darkBorder: 'border-yellow-500/40', lightBorder: 'border-yellow-300', darkTag: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', lightTag: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'End-to-end ML pipeline predicting 7-day crypto volatility using Random Forest with 14 engineered features (ATR, Bollinger Bands, momentum). Achieves R² ~0.85 with Streamlit deployment.', stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Plotly'], github: 'https://github.com/Vaibhavsharma45/crypto-volatility-prediction-project', live: 'https://crypto-volatility-prediction-project-mak4penaud7jwri5vptzto.streamlit.app/', stars: 2 },
    { name: 'Birth Weight Predictor', emoji: '🏥', tag: 'ML · Healthcare', neonColor: '#f472b6', darkBorder: 'border-pink-500/40', lightBorder: 'border-pink-300', darkTag: 'bg-pink-500/10 text-pink-400 border-pink-500/30', lightTag: 'bg-pink-100 text-pink-700 border-pink-300', description: 'Machine learning model predicting birth weight from maternal health indicators with 92%+ accuracy using regression techniques. Deployed as an interactive web app.', stack: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Seaborn'], github: 'https://github.com/Vaibhavsharma45/birth-weight-predictor', live: 'https://birth-weight-predictor.onrender.com', stars: 1 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
          template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
          template_params: { name: formData.name, email: formData.email, message: formData.message },
        }),
      });
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      window.location.href = `mailto:vaibhavsharma95124v@gmail.com?subject=From ${formData.name}&body=${formData.message}`;
      setFormStatus('sent');
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Vaibhav_Sharma_Resume.pdf';
    link.download = 'Vaibhav_Sharma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const RepoDescription = ({ repo }) => (
    <p className={`${textMuted} text-sm line-clamp-3 mb-3`}>
      {repo.description || 'An open-source project by Vaibhav Sharma. Click to view on GitHub.'}
    </p>
  );

  const SectionTitle = ({ icon, title, gradient }) => (
    <div className="flex flex-col items-center mb-12">
      <h2 className="text-4xl font-bold flex items-center justify-center gap-3 mb-3">
        <span>{icon}</span>
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{title}</span>
      </h2>
      <div className={`h-0.5 w-24 bg-gradient-to-r ${gradient} opacity-70 rounded-full`}></div>
    </div>
  );

  // Light mode card hover handler
  const cardHover = (el, color, enter) => {
    el.style.boxShadow = enter ? `0 4px 30px ${color}, 0 0 0 1px ${color}` : 'none';
    el.style.transform = enter ? 'translateY(-4px)' : 'translateY(0)';
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${bg} ${textMain} relative overflow-hidden`}>

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {D ? (
          <>
            {[...Array(80)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white"
                style={{ width: Math.random() * 2 + 0.5 + 'px', height: Math.random() * 2 + 0.5 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', opacity: Math.random() * 0.4 + 0.1, animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`, animationDelay: Math.random() * 5 + 's' }} />
            ))}
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-600/5 rounded-full blur-3xl"></div>
          </>
        ) : (
          <>
            {/* Light mode: soft gradient mesh */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-cyan-100/40 via-blue-50/30 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-tl from-purple-100/30 via-pink-50/20 to-transparent"></div>
            <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-2/3 right-0 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl"></div>
            {/* Subtle grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          </>
        )}
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${navBg} border-b ${D ? 'border-[#1e3a5f]/60' : 'border-gray-200 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`text-2xl font-bold bg-gradient-to-r ${D ? 'from-cyan-400 via-blue-400 to-purple-400' : 'from-cyan-600 via-blue-600 to-purple-600'} bg-clip-text text-transparent`}>VS</div>
            <div className="hidden md:flex space-x-1">
              {['Home','About','Skills','Experience','Projects','Certifications','Goals','Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? D ? 'text-cyan-400 bg-cyan-400/10' : 'text-cyan-600 bg-cyan-50 font-semibold'
                      : D ? `${textMuted} hover:text-cyan-400 hover:bg-cyan-400/5` : 'text-gray-600 hover:text-cyan-600 hover:bg-cyan-50'
                  }`}>
                  {item}
                </a>
              ))}
            </div>
            <button onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${D ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'}`}>
              {D ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className={`pt-32 pb-20 px-4 relative transition-opacity duration-1000 ${isVisible.home ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 relative inline-block">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center text-6xl font-bold text-white relative overflow-hidden group cursor-pointer"
              style={{ boxShadow: D ? '0 0 40px rgba(34,211,238,0.35), 0 0 80px rgba(99,102,241,0.2)' : '0 0 40px rgba(6,182,212,0.3), 0 0 70px rgba(99,102,241,0.15)' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              VS
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm{' '}
            <span className={`bg-gradient-to-r ${D ? 'from-cyan-400 via-blue-400 to-purple-400' : 'from-cyan-600 via-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
              Vaibhav Sharma
            </span>
          </h1>

          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center gap-2">
            <span className={textMuted}>Aspiring</span>
            <span className={`${D ? 'text-cyan-400' : 'text-cyan-600'} font-semibold min-w-[320px] text-left`}>{typedText}</span>
            <span className={`animate-pulse ${D ? 'text-cyan-400' : 'text-cyan-600'}`}>|</span>
          </div>

          <p className={`text-xl ${textMuted} max-w-3xl mx-auto mb-8`}>
            Data Science with Gen AI Learner · Building AI Solutions that Matter
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: Github, link: 'https://github.com/Vaibhavsharma45' },
              { icon: Linkedin, link: 'https://linkedin.com/in/vaibhav-0sharma' },
              { icon: Mail, link: 'mailto:vaibhavsharma95124v@gmail.com' },
            ].map((s, idx) => (
              <a key={idx} href={s.link} target={s.link.startsWith('http') ? '_blank' : undefined} rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`p-3 rounded-full border transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  D ? 'bg-white/5 border-white/10 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-400/10'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50 shadow-sm'
                }`}>
                <s.icon size={22} />
              </a>
            ))}
          </div>

          <button onClick={handleDownloadResume}
            className="px-8 py-3 rounded-full font-semibold text-white relative overflow-hidden group transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: D ? '0 0 25px rgba(99,102,241,0.5)' : '0 8px 25px rgba(99,102,241,0.4)' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2"><Download size={18} className="group-hover:animate-bounce" /> Download Resume</span>
          </button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={`py-20 px-4 ${sectionBg(true)} transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<User className={D ? 'text-blue-400' : 'text-blue-600'} size={32} />} title="About Me" gradient={D ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} />
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: <><Sparkles className="text-yellow-500" size={22} /> Who I Am</>,
                content: (
                  <>
                    <p className={`text-base leading-relaxed mb-4 ${textMuted}`}>I'm <strong className={D ? 'text-cyan-400' : 'text-cyan-600'}>Vaibhav Sharma</strong>, an aspiring AI & ML Engineer from Muzaffarnagar, UP. I recently completed my BCA and am actively building expertise in Python, Machine Learning, and Data Science — combining coursework at PW Skills with hands-on project development.</p>
                    <p className={`text-base leading-relaxed mb-4 ${textMuted}`}>I focus on <strong className={D ? 'text-cyan-400' : 'text-cyan-600'}>strong fundamentals and real projects</strong> over shortcuts. From building ML models to deploying Flask APIs, I want to understand every layer of the stack.</p>
                    <p className={`text-base leading-relaxed ${textMuted}`}>My philosophy: <span className={`italic font-semibold ${D ? 'text-purple-400' : 'text-purple-600'}`}>"Jo kuch bhi hota hai, ache ke liye hota hai"</span></p>
                  </>
                ),
                enterGlow: D ? '0 0 30px rgba(99,102,241,0.15)' : '0 6px 30px rgba(99,102,241,0.12)',
              },
              {
                title: <><Heart className="text-red-500" size={22} /> Personal Interests</>,
                content: (
                  <ul className="space-y-3">
                    {['Staying updated with latest AI/ML research and trends','Regular exercise and playing cricket with friends','Reading powerful thoughts and articles for personal growth','Exploring astrology and self-improvement methods','Building side projects and experimenting with new tools','Watching tech talks and following AI researchers on social media'].map((interest, idx) => (
                      <li key={idx} className={`flex items-start gap-2 hover:translate-x-2 transition-transform duration-300 ${textMuted}`}>
                        <span className={`${D ? 'text-cyan-400' : 'text-cyan-600'} mt-1`}>▹</span><span className="text-sm">{interest}</span>
                      </li>
                    ))}
                  </ul>
                ),
                enterGlow: D ? '0 0 30px rgba(244,114,182,0.12)' : '0 6px 30px rgba(244,114,182,0.1)',
              },
            ].map((card, i) => (
              <div key={i}
                className={`p-8 rounded-2xl ${bgCard} border ${border} transition-all duration-300 relative overflow-hidden group`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = card.enterGlow; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl group-hover:bg-cyan-400/10 transition-all duration-500"></div>
                <h3 className={`text-xl font-semibold mb-5 flex items-center gap-2 ${textMain}`}>{card.title}</h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section id="challenges" className={`py-20 px-4 ${sectionBg(false)} transition-all duration-1000 ${isVisible.challenges ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<TrendingUp className={D ? 'text-green-400' : 'text-green-600'} size={32} />} title="Challenges & Growth" gradient={D ? 'from-green-400 to-cyan-400' : 'from-green-600 to-cyan-600'} />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Real struggles. Real growth. No filter. 💪</p>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((c, i) => (
              <div key={i}
                className={`p-8 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden cursor-default`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? `0 0 30px ${c.accentDark}, 0 0 0 1px ${c.accentDark}` : `0 6px 30px ${c.accentLight}, 0 0 0 1px ${c.accentLight}`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{c.icon}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${D ? c.darkBadge : c.lightBadge}`}>{c.badge}</span>
                </div>
                <h3 className={`text-lg font-semibold mb-3 ${D ? 'text-cyan-400 group-hover:text-purple-400' : 'text-cyan-700 group-hover:text-purple-700'} transition-colors duration-300`}>{c.title}</h3>
                <p className={`${textMuted} leading-relaxed text-sm`}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className={`py-20 px-4 ${sectionBg(true)} transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Code className={D ? 'text-cyan-400' : 'text-cyan-600'} size={32} />} title="Technical Skills" gradient={D ? 'from-cyan-400 to-blue-400' : 'from-cyan-600 to-blue-600'} />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Tools & technologies I work with 🛠️</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {skills.map((cat, i) => (
              <div key={i}
                className={`p-5 rounded-2xl border ${D ? `${bgCard} border-[#1e3a5f]` : `${cat.lightBg} ${cat.lightBorder}`} group relative overflow-hidden`}
                style={{ boxShadow: D ? 'none' : '0 2px 10px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? `0 0 25px ${cat.glowColor}, 0 0 0 1px ${cat.glowColor}` : `0 6px 20px ${cat.glowColor}`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D ? 'via-white/5' : 'via-white/60'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`}></div>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${D ? 'bg-white/5' : cat.lightIconBg}`}>
                    <span className={`text-base font-bold font-mono ${cat.iconColor}`}>{cat.icon}</span>
                  </div>
                  <h3 className={`text-sm font-bold ${cat.iconColor}`}>{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill, si) => (
                    <span key={si}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all duration-200 hover:scale-105 cursor-default ${
                        D ? 'border-white/15 text-slate-300 bg-white/5 hover:border-white/30 hover:text-white'
                          : `border-current ${cat.iconColor} bg-white/80 hover:bg-white`
                      }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className={`py-20 px-4 ${sectionBg(false)} transition-all duration-1000 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Briefcase className={D ? 'text-purple-400' : 'text-purple-600'} size={32} />} title="Experience" gradient={D ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i}
                className={`p-8 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? '0 0 30px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.2)' : '0 6px 30px rgba(168,85,247,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${D ? 'text-purple-400' : 'text-purple-600'}`}>{exp.role}</h3>
                    <p className={`${textMuted} mt-1 font-medium`}>{exp.company}</p>
                  </div>
                  <span className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-xs font-mono ${D ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>{exp.duration}</span>
                </div>
                <p className={`${textMuted} mb-4 leading-relaxed text-sm`}>{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s, idx) => (
                    <span key={idx} className={`text-xs px-3 py-1 rounded-full border font-medium ${D ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : 'border-purple-200 text-purple-700 bg-purple-50'}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className={`py-20 px-4 ${sectionBg(true)} transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Github className={D ? 'text-cyan-400' : 'text-cyan-600'} size={32} />} title="Projects" gradient={D ? 'from-cyan-400 to-purple-400' : 'from-cyan-600 to-purple-600'} />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Real projects — built, deployed, and live 🚀</p>

          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${textMain}`}>
            <span className="text-yellow-500">📌</span> Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {projects.map((project, i) => (
              <div key={i}
                className={`p-6 rounded-2xl ${D ? bgCard2 : 'bg-white'} border ${D ? project.darkBorder : project.lightBorder} flex flex-col cursor-pointer relative overflow-hidden group`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? `0 0 30px ${project.neonColor}25, 0 0 0 1px ${project.neonColor}40` : `0 8px 30px ${project.neonColor}30`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D ? 'via-white/5' : 'via-white/80'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none z-10`}></div>
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to right, ${project.neonColor}, transparent)` }}></div>}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{project.emoji}</span>
                    <div>
                      <h3 className={`text-base font-bold ${D ? 'text-white' : textMain} leading-tight`}>{project.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${D ? project.darkTag : project.lightTag}`}>{project.tag}</span>
                    </div>
                  </div>
                  {project.stars > 0 && <span className="text-xs text-yellow-500 font-mono">⭐ {project.stars}</span>}
                </div>
                <p className={`text-sm leading-relaxed mb-4 flex-1 ${textMuted}`}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech, ti) => (
                    <span key={ti} className={`text-xs px-2 py-0.5 rounded-full font-mono border ${D ? 'border-white/10 text-slate-400 bg-white/5' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>{tech}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 hover:scale-105 ${D ? 'border-white/20 text-slate-300 bg-white/5 hover:border-white/40 hover:text-white' : 'border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100'}`}>
                    <Github size={12} /> Code
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-85 transition-all duration-300 hover:scale-105 shadow-sm">
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  ) : (
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${D ? 'border-white/10 text-slate-500' : 'border-gray-200 text-gray-400 bg-gray-50'}`}>🖥️ Local</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${textMain}`}>
            <Github size={18} className={D ? 'text-cyan-400' : 'text-cyan-600'} /> Latest GitHub Repos
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {githubRepos.length > 0 ? githubRepos.map((repo, i) => (
              <div key={i}
                className={`p-5 rounded-2xl ${D ? bgCard2 : 'bg-white'} border ${border} flex flex-col group relative overflow-hidden`}
                style={{ boxShadow: D ? 'none' : '0 2px 10px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? '0 0 25px rgba(34,211,238,0.1), 0 0 0 1px rgba(34,211,238,0.25)' : '0 6px 25px rgba(6,182,212,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D ? 'via-white/3' : 'via-white/70'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`}></div>
                <h3 className={`text-base font-semibold mb-2 ${D ? 'text-cyan-400 group-hover:text-purple-400' : 'text-cyan-600 group-hover:text-purple-600'} transition-colors duration-300`}>{repo.name}</h3>
                <div className="flex-1"><RepoDescription repo={repo} /></div>
                <div className="flex justify-between items-center mt-auto">
                  {repo.language && <span className={`text-xs px-2.5 py-1 rounded-full border font-mono ${D ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : 'border-purple-200 text-purple-700 bg-purple-50'}`}>{repo.language}</span>}
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`${textMuted} group-hover:text-yellow-500 transition-colors`}>⭐ {repo.stargazers_count}</span>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`${D ? 'text-cyan-400 hover:text-purple-400' : 'text-cyan-600 hover:text-purple-600'} transform hover:scale-110 transition-all duration-300`}><ExternalLink size={16} /></a>
                  </div>
                </div>
              </div>
            )) : <div className={`col-span-3 text-center ${textMuted} animate-pulse py-10`}>Loading projects…</div>}
          </div>

          <div className="text-center">
            <a href="https://github.com/Vaibhavsharma45" target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-3 px-8 py-3 rounded-full font-semibold border transition-all duration-300 hover:scale-105 ${D ? 'text-white border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400' : 'text-cyan-700 border-cyan-300 bg-cyan-50 hover:bg-cyan-100'}`}
              style={{ boxShadow: D ? '0 0 20px rgba(34,211,238,0.15)' : '0 4px 15px rgba(6,182,212,0.2)' }}>
              <Github size={20} /> Explore All on GitHub <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className={`py-20 px-4 ${sectionBg(false)} transition-all duration-1000 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Award className={D ? 'text-yellow-400' : 'text-yellow-600'} size={32} />} title="Certifications & Learning" gradient={D ? 'from-yellow-400 to-orange-400' : 'from-yellow-600 to-orange-600'} />
          <div className="grid md:grid-cols-2 gap-5">
            {certifications.map((cert, i) => (
              <div key={i}
                className={`p-6 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { const g = D ? cert.darkGlow : cert.lightGlow; e.currentTarget.style.boxShadow = `0 0 25px ${g}, 0 0 0 1px ${g}`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                {!D && <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D ? 'via-white/5' : 'via-white/80'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`}></div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{cert.icon}</span>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${textMain} ${D ? 'group-hover:text-cyan-400' : 'group-hover:text-cyan-600'} transition-colors duration-300`}>{cert.name}</h3>
                    <p className={`${textMuted} text-sm`}>{cert.org}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className={`text-sm bg-gradient-to-r ${cert.color} bg-clip-text text-transparent font-semibold`}>{cert.year}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${cert.color} text-white font-medium`}>{cert.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOALS ── */}
      <section id="goals" className={`py-20 px-4 ${sectionBg(true)} transition-all duration-1000 ${isVisible.goals ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Target className={D ? 'text-green-400' : 'text-green-600'} size={32} />} title="My Goals" gradient={D ? 'from-green-400 to-blue-400' : 'from-green-600 to-blue-600'} />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Where I'm headed — clear vision, consistent action 🎯</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '⚡ Short-term Goals',
                items: goals.shortTerm,
                darkGlow: 'rgba(34,197,94,0.15)',
                lightGlow: 'rgba(34,197,94,0.1)',
                accent: D ? 'text-green-400' : 'text-green-600',
                topBar: 'from-green-400 to-cyan-400',
                tagFn: (tag) => tag === 'Top Priority'
                  ? D ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-red-50 text-red-600 border-red-200'
                  : tag === 'In Progress'
                  ? D ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-600 border-blue-200'
                  : D ? `bg-white/5 ${textMuted} border-white/10` : 'bg-gray-100 text-gray-500 border-gray-200',
              },
              {
                title: '🌟 Long-term Goals',
                items: goals.longTerm,
                darkGlow: 'rgba(167,139,250,0.15)',
                lightGlow: 'rgba(167,139,250,0.1)',
                accent: D ? 'text-purple-400' : 'text-purple-600',
                topBar: 'from-purple-400 to-pink-400',
                tagFn: () => D ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200',
              },
            ].map((panel, pi) => (
              <div key={pi}
                className={`p-8 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? `0 0 30px ${panel.darkGlow}` : `0 6px 30px ${panel.lightGlow}`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; }}>
                {!D && <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${panel.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>}
                <h3 className={`text-xl font-semibold mb-6 ${panel.accent}`}>{panel.title}</h3>
                <ul className="space-y-4">
                  {panel.items.map((goal, gi) => (
                    <li key={gi} className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                      <span className="text-lg mt-0.5">{goal.icon}</span>
                      <div className="flex-1 flex flex-wrap items-center gap-1">
                        <span className={`text-sm leading-relaxed ${textMuted}`}>{goal.text}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${panel.tagFn(goal.tag)}`}>{goal.tag}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={`py-20 px-4 ${sectionBg(false)} transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle icon={<Mail className={D ? 'text-cyan-400' : 'text-cyan-600'} size={32} />} title="Get In Touch" gradient={D ? 'from-cyan-400 to-purple-400' : 'from-cyan-600 to-purple-600'} />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold mb-6 ${textMain}`}>Contact Information</h3>
              {[
                { icon: Mail, text: 'vaibhavsharma95124v@gmail.com', link: 'mailto:vaibhavsharma95124v@gmail.com' },
                { icon: Phone, text: '+91-9012907709', link: 'tel:+919012907709' },
                { icon: MessageCircle, text: 'WhatsApp: +91-9012907709', link: 'https://wa.me/919012907709' },
                { icon: Github, text: 'github.com/Vaibhavsharma45', link: 'https://github.com/Vaibhavsharma45' },
                { icon: Linkedin, text: 'linkedin.com/in/vaibhav-0sharma', link: 'https://linkedin.com/in/vaibhav-0sharma' },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                  <div className={`p-2.5 rounded-lg border transition-all duration-300 ${D ? 'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-500/20' : 'bg-cyan-50 border-cyan-200 group-hover:bg-cyan-100'}`}>
                    <c.icon className={D ? 'text-cyan-400' : 'text-cyan-600'} size={18} />
                  </div>
                  <a href={c.link} target={c.link.startsWith('http') ? '_blank' : undefined} rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`${textMuted} ${D ? 'hover:text-cyan-400' : 'hover:text-cyan-600'} transition-colors duration-300 text-sm`}>{c.text}</a>
                </div>
              ))}
              <a href="https://wa.me/919012907709" target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                style={{ boxShadow: D ? '0 0 20px rgba(34,197,94,0.3)' : '0 6px 20px rgba(34,197,94,0.35)' }}>
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
            <div className={`p-8 rounded-2xl ${bgCard} border ${border}`}
              style={{ boxShadow: D ? '0 0 30px rgba(34,211,238,0.05)' : '0 4px 20px rgba(0,0,0,0.08)' }}>
              <div className="space-y-4">
                {[
                  { type: 'text', placeholder: 'Your Name', key: 'name' },
                  { type: 'email', placeholder: 'Your Email', key: 'email' },
                ].map(field => (
                  <input key={field.key} type={field.type} placeholder={field.placeholder} value={formData[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    className={`w-full p-3 rounded-lg text-sm border outline-none transition-all duration-300 ${
                      D ? 'bg-[#060d1f] text-slate-100 border-[#1e3a5f] placeholder-slate-600 focus:border-cyan-500/60'
                        : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:bg-white'
                    }`} />
                ))}
                <textarea placeholder="Your Message" value={formData.message} rows="4"
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-3 rounded-lg text-sm border outline-none transition-all duration-300 resize-none ${
                    D ? 'bg-[#060d1f] text-slate-100 border-[#1e3a5f] placeholder-slate-600 focus:border-cyan-500/60'
                      : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:bg-white'
                  }`} />
                <button onClick={handleSubmit} disabled={formStatus === 'sending'}
                  className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: D ? '0 0 20px rgba(99,102,241,0.3)' : '0 6px 20px rgba(99,102,241,0.35)' }}>
                  {formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? '✓ Message Sent!' : 'Send Message →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`py-8 text-center ${D ? 'bg-[#0a1628] border-t border-[#1e3a5f]/60' : 'bg-white border-t border-gray-200 shadow-inner'}`}>
        <p className={`${textMuted} text-sm`}>
          © {new Date().getFullYear()} Vaibhav Sharma ·{' '}
          <a href="https://thevaibhavacom.vercel.app" target="_blank" rel="noreferrer" className={D ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}>
            thevaibhavacom.vercel.app
          </a>{' '}
          · "Jo kuch bhi hota hai, ache ke liye hota hai" ❤️
        </p>
      </footer>

      {showScrollTop && (
        <button onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full text-white transition-all duration-300 hover:scale-110 z-50"
          style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: D ? '0 0 20px rgba(34,211,238,0.4)' : '0 6px 20px rgba(99,102,241,0.5)' }}>
          <ArrowUp size={20} />
        </button>
      )}

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.6; } }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Portfolio;