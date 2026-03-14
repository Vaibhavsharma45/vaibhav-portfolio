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

  // ── THEME CLASSES ─────────────────────────────────────────────────────────
  const bg       = darkMode ? 'bg-[#060d1f]'      : 'bg-gray-50';
  const bgAlt    = darkMode ? 'bg-[#0a1628]'      : 'bg-white';
  const border   = darkMode ? 'border-[#1e3a5f]'  : 'border-gray-200';
  const textMain = darkMode ? 'text-slate-100'     : 'text-gray-900';
  const textMuted= darkMode ? 'text-slate-400'     : 'text-gray-500';
  const navBg    = darkMode ? 'bg-[#060d1f]/90'   : 'bg-white/90';

  // ── DATA ──────────────────────────────────────────────────────────────────
  const skills = [
    {
      category: 'Programming',
      icon: '</>',
      iconColor: 'text-cyan-400',
      glowColor: 'rgba(34,211,238,0.15)',
      borderHover: 'hover:border-cyan-400/60',
      items: ['Python', 'SQL', 'JavaScript', 'HTML5', 'CSS3', 'C++'],
    },
    {
      category: 'Machine Learning',
      icon: '🧠',
      iconColor: 'text-pink-400',
      glowColor: 'rgba(244,114,182,0.15)',
      borderHover: 'hover:border-pink-400/60',
      items: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Classification', 'Regression', 'Hyperparameter Tuning'],
    },
    {
      category: 'Data Analytics',
      icon: '📈',
      iconColor: 'text-teal-400',
      glowColor: 'rgba(45,212,191,0.15)',
      borderHover: 'hover:border-teal-400/60',
      items: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering', 'Data Cleaning', 'Statistical Analysis', 'Power BI'],
    },
    {
      category: 'NLP & Gen AI',
      icon: '🤖',
      iconColor: 'text-violet-400',
      glowColor: 'rgba(167,139,250,0.15)',
      borderHover: 'hover:border-violet-400/60',
      items: ['NLP', 'Generative AI', 'LangChain', 'LangGraph', 'LlamaIndex', 'RAG', 'Prompt Engineering', 'Groq API', 'Fine-tuning', 'ChromaDB'],
    },
    {
      category: 'Backend',
      icon: '>_',
      iconColor: 'text-green-400',
      glowColor: 'rgba(74,222,128,0.15)',
      borderHover: 'hover:border-green-400/60',
      items: ['Flask', 'FastAPI', 'REST APIs', 'MongoDB', 'MySQL', 'Web Development'],
    },
    {
      category: 'Visualization',
      icon: '📊',
      iconColor: 'text-yellow-400',
      glowColor: 'rgba(250,204,21,0.15)',
      borderHover: 'hover:border-yellow-400/60',
      items: ['Matplotlib', 'Seaborn', 'Plotly', 'Streamlit', 'Power BI'],
    },
    {
      category: 'Tools',
      icon: '⚙️',
      iconColor: 'text-orange-400',
      glowColor: 'rgba(251,146,60,0.15)',
      borderHover: 'hover:border-orange-400/60',
      items: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Google Colab', 'Kaggle', 'Docker', 'Render', 'Vercel', 'Postman', 'GitHub Actions'],
    },
  ];

  const challenges = [
    { icon: '👨‍👩‍👦', title: 'Family Pressure vs Passion', description: 'Coming from a non-tech background, there was constant pressure to pursue a stable government job instead of AI. I chose to let my work speak — built real projects, secured an internship, and proved that a career in AI is not just possible, but promising.', badge: 'Overcame ✓', badgeColor: 'text-green-400 border-green-400/40 bg-green-400/10' },
    { icon: '🧠', title: 'Overcoming Self-Doubt', description: 'Early on, I doubted whether someone from a tier-2 city without elite college credentials could break into AI. My first Kaggle attempt landed in the bottom 50%. Instead of quitting, I analysed every mistake — and today I have 6 deployed projects to show for it.', badge: 'Still growing ↑', badgeColor: 'text-blue-400 border-blue-400/40 bg-blue-400/10' },
    { icon: '🌐', title: 'English Barrier in Technical Learning', description: 'Most quality AI/ML resources are in English, which was a significant barrier initially. I tackled it by combining vernacular explanations with official documentation, taking bilingual notes, and practising consistently — now I read research papers and docs with ease.', badge: 'Solved ✓', badgeColor: 'text-purple-400 border-purple-400/40 bg-purple-400/10' },
    { icon: '⚡', title: 'Self-Taught Without Formal Mentorship', description: 'With no structured mentorship or campus resources, the internet, GitHub, and open-source communities became my classroom. This forced me to develop strong independent problem-solving skills — a habit that now lets me pick up any new technology quickly.', badge: 'Core Strength 💪', badgeColor: 'text-orange-400 border-orange-400/40 bg-orange-400/10' },
  ];

  const experiences = [
    { role: 'Data Analyst Intern', company: 'Intern Geek', duration: 'Nov 2025 – Dec 2025', description: 'Developed and deployed an interactive Power BI Dashboard analysing the Titanic Survival Dataset. Visualised key KPIs — survival rates by Pclass and Gender — using data storytelling techniques. Gained hands-on experience with Power BI Desktop and Google Sheets, translating raw data into actionable insights.', skills: ['Power BI', 'Data Analysis', 'Google Sheets', 'Data Visualisation'] },
  ];

  const certifications = [
    { name: 'Artificial Intelligence & Machine Learning Cohort', org: 'Intern Geek', year: 'Jan – Feb 2026', grade: 'Grade: A+', color: 'from-purple-500 to-pink-500', glowColor: 'rgba(168,85,247,0.2)', icon: '🏆' },
    { name: 'Data Analytics Internship', org: 'Intern Geek', year: 'Nov – Dec 2025', grade: 'Intern ID: IG251491', color: 'from-green-500 to-teal-500', glowColor: 'rgba(34,197,94,0.2)', icon: '💼' },
    { name: 'Data Science with Generative AI', org: 'PW Skills', year: '2025 – Present (Ongoing)', grade: 'In Progress', color: 'from-blue-500 to-cyan-500', glowColor: 'rgba(59,130,246,0.2)', icon: '📊' },
    { name: 'Gen AI for All', org: 'PW Skills', year: '2025', grade: 'Completed', color: 'from-violet-500 to-purple-500', glowColor: 'rgba(139,92,246,0.2)', icon: '🤖' },
    { name: 'Introduction to Prompt Engineering', org: 'Simplilearn', year: '2026', grade: 'Completed', color: 'from-orange-500 to-red-500', glowColor: 'rgba(249,115,22,0.2)', icon: '💡' },
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
    { name: 'DataMind Pro', emoji: '📊', tag: 'AI · Full Stack', neonColor: '#22d3ee', borderColor: 'border-cyan-500/40', tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', description: 'AI-powered data analysis platform — upload any CSV/Excel and get auto EDA, ML models, Groq LLM insights, PDF/PPT reports, and a chatbot. Built with Flask + 9 Blueprints + Groq Llama 3.3 70B.', stack: ['Flask', 'Python', 'Groq API', 'Scikit-learn', 'Plotly'], github: 'https://github.com/Vaibhavsharma45/Auto_analyst', live: 'https://datamind-pro.onrender.com', stars: 1 },
    { name: 'Bujji AI', emoji: '🤖', tag: 'AI · Voice Assistant', neonColor: '#a78bfa', borderColor: 'border-violet-500/40', tagColor: 'bg-violet-500/10 text-violet-400 border-violet-500/30', description: 'Personal JARVIS-style voice assistant — wake word "Hey Robo", LangGraph ReAct agent, ChromaDB memory, PC control, WhatsApp/email, browser automation, and a web dashboard. 100% free stack.', stack: ['Python', 'LangGraph', 'Groq API', 'FastAPI', 'ChromaDB'], github: 'https://github.com/Vaibhavsharma45/Bujji_AI', live: null, stars: 0 },
    { name: 'Marg Darshak', emoji: '🧭', tag: 'AI · Web App', neonColor: '#34d399', borderColor: 'border-emerald-500/40', tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', description: 'Comprehensive web platform combining Career Compass (AI career recommendations), Gyan Kosh (spiritual wisdom repository), and Skill Saathi (curated learning resources) — solving real student pain-points.', stack: ['Flask', 'Python', 'Scikit-learn', 'Seaborn', 'ML'], github: 'https://github.com/Vaibhavsharma45/marg-darshak', live: 'https://marg-darshak.onrender.com', stars: 1 },
    { name: 'Resume Analyser', emoji: '📄', tag: 'AI · NLP', neonColor: '#fb923c', borderColor: 'border-orange-500/40', tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30', description: 'AI-powered resume analysis tool — parses uploaded PDFs, extracts skills and keywords, scores against job descriptions, and suggests improvements using NLP techniques.', stack: ['Python', 'Flask', 'NLP', 'JavaScript', 'CSS'], github: 'https://github.com/Vaibhavsharma45/Resume_Analyser', live: 'https://resume-analyser-gbp1.vercel.app/', stars: 1 },
    { name: 'Crypto Volatility Predictor', emoji: '📈', tag: 'ML · Finance', neonColor: '#facc15', borderColor: 'border-yellow-500/40', tagColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', description: 'End-to-end ML pipeline predicting 7-day crypto volatility using Random Forest with 14 engineered features (ATR, Bollinger Bands, momentum). Achieves R² ~0.85 with Streamlit deployment.', stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Plotly'], github: 'https://github.com/Vaibhavsharma45/crypto-volatility-prediction-project', live: 'https://crypto-volatility-prediction-project-mak4penaud7jwri5vptzto.streamlit.app/', stars: 2 },
    { name: 'Birth Weight Predictor', emoji: '🏥', tag: 'ML · Healthcare', neonColor: '#f472b6', borderColor: 'border-pink-500/40', tagColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30', description: 'Machine learning model predicting birth weight from maternal health indicators with 92%+ accuracy using regression techniques. Deployed as an interactive web app.', stack: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Seaborn'], github: 'https://github.com/Vaibhavsharma45/birth-weight-predictor', live: 'https://birth-weight-predictor.onrender.com', stars: 1 },
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
      <h2 className={`text-4xl font-bold flex items-center justify-center gap-3 mb-3`}>
        <span>{icon}</span>
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{title}</span>
      </h2>
      <div className={`h-px w-24 bg-gradient-to-r ${gradient} opacity-60`}></div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bg} ${textMain} relative overflow-hidden`}>

      {/* Star field background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: Math.random() * 2 + 0.5 + 'px', height: Math.random() * 2 + 0.5 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', opacity: Math.random() * 0.5 + 0.1, animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`, animationDelay: Math.random() * 5 + 's' }} />
        ))}
        {/* Nebula glow blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${navBg} border-b ${darkMode ? 'border-[#1e3a5f]/60' : 'border-gray-200'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">VS</div>
            <div className="hidden md:flex space-x-1">
              {['Home','About','Skills','Experience','Projects','Certifications','Goals','Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${activeSection === item.toLowerCase() ? 'text-cyan-400 bg-cyan-400/10' : `${textMuted} hover:text-cyan-400 hover:bg-cyan-400/5`}`}>
                  {item}
                </a>
              ))}
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' : 'bg-gray-900 text-yellow-400'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className={`pt-32 pb-20 px-4 relative transition-opacity duration-1000 ${isVisible.home ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 relative">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center text-6xl font-bold text-white shadow-2xl relative overflow-hidden group"
              style={{ boxShadow: '0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(99,102,241,0.2)' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              VS
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Vaibhav Sharma</span>
          </h1>
          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center gap-2">
            <span className={textMuted}>Aspiring</span>
            <span className="text-cyan-400 font-semibold min-w-[320px] text-left">{typedText}</span>
            <span className="animate-pulse text-cyan-400">|</span>
          </div>
          <p className={`text-xl ${textMuted} max-w-3xl mx-auto mb-8`}>
            Data Science with Gen AI Learner · Building AI Solutions that Matter
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: Github, link: 'https://github.com/Vaibhavsharma45', glow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]' },
              { icon: Linkedin, link: 'https://linkedin.com/in/vaibhav-0sharma', glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' },
              { icon: Mail, link: 'mailto:vaibhavsharma95124v@gmail.com', glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]' },
            ].map((s, idx) => (
              <a key={idx} href={s.link} target={s.link.startsWith('http') ? '_blank' : undefined} rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`p-3 rounded-full ${darkMode ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-gray-100 text-gray-700'} hover:text-white hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-110 ${s.glow}`}>
                <s.icon size={22} />
              </a>
            ))}
          </div>
          <button onClick={handleDownloadResume}
            className="px-8 py-3 rounded-full font-semibold text-white relative overflow-hidden group transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: '0 0 25px rgba(99,102,241,0.4)' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2"><Download size={18} className="group-hover:animate-bounce" /> Download Resume</span>
          </button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={`py-20 px-4 ${darkMode ? bgAlt : 'bg-white/50'} transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<User className="text-blue-400" size={32} />} title="About Me" gradient="from-blue-400 to-purple-400" />
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: <><Sparkles className="text-yellow-400" size={22} /> Who I Am</>,
                content: (
                  <>
                    <p className={`text-lg leading-relaxed mb-4 ${textMuted}`}>I'm <strong className="text-cyan-400">Vaibhav Sharma</strong>, an aspiring AI & ML Engineer from Muzaffarnagar, UP. I recently completed my BCA and am actively building expertise in Python, Machine Learning, and Data Science — combining coursework at PW Skills with hands-on project development.</p>
                    <p className={`text-lg leading-relaxed mb-4 ${textMuted}`}>I focus on <strong className="text-cyan-400">strong fundamentals and real projects</strong> over shortcuts. From building ML models to deploying Flask APIs, I want to understand every layer of the stack.</p>
                    <p className={`text-lg leading-relaxed ${textMuted}`}>My philosophy: <span className="italic font-semibold text-purple-400">"Jo kuch bhi hota hai, ache ke liye hota hai"</span></p>
                  </>
                ),
                glow: 'rgba(99,102,241,0.1)',
              },
              {
                title: <><Heart className="text-red-400" size={22} /> Personal Interests</>,
                content: (
                  <ul className="space-y-3">
                    {['Staying updated with latest AI/ML research and trends','Regular exercise and playing cricket with friends','Reading powerful thoughts and articles for personal growth','Exploring astrology and self-improvement methods','Building side projects and experimenting with new tools','Watching tech talks and following AI researchers on social media'].map((interest, idx) => (
                      <li key={idx} className={`flex items-start gap-2 hover:translate-x-2 transition-transform duration-300 ${textMuted}`}>
                        <span className="text-cyan-400 mt-1">▹</span><span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                ),
                glow: 'rgba(244,114,182,0.1)',
              },
            ].map((card, i) => (
              <div key={i} className={`p-8 rounded-2xl ${darkMode ? 'bg-[#0d1f3c]/60' : 'bg-gray-50'} border ${border} group hover:border-cyan-500/40 transition-all duration-500 relative overflow-hidden`}
                style={{ boxShadow: `0 0 0 transparent`, transition: 'box-shadow 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${card.glow}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 transparent'}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500"></div>
                <h3 className={`text-xl font-semibold mb-5 flex items-center gap-2 ${textMain}`}>{card.title}</h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section id="challenges" className={`py-20 px-4 transition-all duration-1000 ${isVisible.challenges ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<TrendingUp className="text-green-400" size={32} />} title="Challenges & Growth" gradient="from-green-400 to-cyan-400" />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Real struggles. Real growth. No filter. 💪</p>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((c, i) => (
              <div key={i} className={`p-8 rounded-2xl ${darkMode ? 'bg-[#0d1f3c]/60' : 'bg-white/80'} border ${border} transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden cursor-default`}
                style={{ transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(34,211,238,0.12), 0 0 0 1px rgba(34,211,238,0.2)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{c.icon}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${c.badgeColor}`}>{c.badge}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">{c.title}</h3>
                <p className={`${textMuted} leading-relaxed text-sm`}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className={`py-20 px-4 ${darkMode ? bgAlt : 'bg-white/50'} transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Code className="text-cyan-400" size={32} />} title="Technical Skills" gradient="from-cyan-400 to-blue-400" />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Tools & technologies I work with 🛠️</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {skills.map((cat, i) => (
              <div key={i}
                className={`p-5 rounded-2xl ${darkMode ? 'bg-[#0d1f3c]/60' : 'bg-gray-50'} border ${border} ${cat.borderHover} transition-all duration-400 hover:-translate-y-1 group relative overflow-hidden`}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 25px ${cat.glowColor}, 0 0 0 1px ${cat.glowColor}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-lg font-bold font-mono ${cat.iconColor}`}>{cat.icon}</span>
                  <h3 className={`text-sm font-bold ${cat.iconColor}`}>{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill, si) => (
                    <span key={si}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all duration-200 hover:scale-105 cursor-default ${darkMode ? `border-white/15 text-slate-300 bg-white/5 hover:border-white/30 hover:text-white` : 'border-gray-300 text-gray-600 bg-white hover:border-gray-400'}`}>
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
      <section id="experience" className={`py-20 px-4 transition-all duration-1000 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Briefcase className="text-purple-400" size={32} />} title="Experience" gradient="from-purple-400 to-pink-400" />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className={`p-8 rounded-2xl ${darkMode ? 'bg-[#0d1f3c]/60' : 'bg-white/80'} border ${border} transition-all duration-400 hover:-translate-y-1`}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.2)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">{exp.role}</h3>
                    <p className={`${textMuted} mt-1`}>{exp.company}</p>
                  </div>
                  <span className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-xs font-mono ${darkMode ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-600'}`}>{exp.duration}</span>
                </div>
                <p className={`${textMuted} mb-4 leading-relaxed text-sm`}>{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s, idx) => (
                    <span key={idx} className={`text-xs px-3 py-1 rounded-full border font-medium ${darkMode ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : 'border-purple-300 text-purple-600 bg-purple-50'}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className={`py-20 px-4 ${darkMode ? bgAlt : 'bg-white/50'} transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Github className="text-cyan-400" size={32} />} title="Projects" gradient="from-cyan-400 to-purple-400" />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Real projects — built, deployed, and live 🚀</p>

          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${textMain}`}>
            <span className="text-yellow-400">📌</span> Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {projects.map((project, i) => (
              <div key={i}
                className={`p-6 rounded-2xl ${darkMode ? 'bg-[#060d1f]' : 'bg-white'} border ${project.borderColor} flex flex-col cursor-pointer relative overflow-hidden group transition-all duration-400 hover:-translate-y-2`}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${project.neonColor}25, 0 0 0 1px ${project.neonColor}40`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none z-10"></div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{project.emoji}</span>
                    <div>
                      <h3 className={`text-base font-bold text-white leading-tight`}>{project.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${project.tagColor}`}>{project.tag}</span>
                    </div>
                  </div>
                  {project.stars > 0 && <span className="text-xs text-yellow-400 font-mono">⭐ {project.stars}</span>}
                </div>
                <p className={`text-sm leading-relaxed mb-4 flex-1 ${textMuted}`}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech, ti) => (
                    <span key={ti} className={`text-xs px-2 py-0.5 rounded-full font-mono border ${darkMode ? 'border-white/10 text-slate-400 bg-white/5' : 'border-gray-200 text-gray-500 bg-gray-50'}`}>{tech}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 hover:scale-105 ${darkMode ? 'border-white/20 text-slate-300 bg-white/5 hover:border-white/40 hover:text-white' : 'border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-100'}`}>
                    <Github size={12} /> Code
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-85 transition-all duration-300 hover:scale-105">
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  ) : (
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${darkMode ? 'border-white/10 text-slate-500' : 'border-gray-200 text-gray-400'}`}>🖥️ Local</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${textMain}`}>
            <Github size={18} className="text-cyan-400" /> Latest GitHub Repos
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {githubRepos.length > 0 ? githubRepos.map((repo, i) => (
              <div key={i}
                className={`p-5 rounded-2xl ${darkMode ? 'bg-[#060d1f]' : 'bg-white'} border ${border} flex flex-col group relative overflow-hidden transition-all duration-400 hover:-translate-y-2`}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 25px rgba(34,211,238,0.1), 0 0 0 1px rgba(34,211,238,0.25)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                <h3 className={`text-base font-semibold mb-2 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300`}>{repo.name}</h3>
                <div className="flex-1"><RepoDescription repo={repo} /></div>
                <div className="flex justify-between items-center mt-auto">
                  {repo.language && <span className={`text-xs px-2.5 py-1 rounded-full border font-mono ${darkMode ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : 'border-purple-300 text-purple-600 bg-purple-50'}`}>{repo.language}</span>}
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`${textMuted} group-hover:text-yellow-400 transition-colors`}>⭐ {repo.stargazers_count}</span>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-purple-400 transform hover:scale-110 transition-all duration-300"><ExternalLink size={16} /></a>
                  </div>
                </div>
              </div>
            )) : <div className={`col-span-3 text-center ${textMuted} animate-pulse py-10`}>Loading projects…</div>}
          </div>

          <div className="text-center">
            <a href="https://github.com/Vaibhavsharma45" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-semibold text-white border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 20px rgba(34,211,238,0.15)' }}>
              <Github size={20} /> Explore All on GitHub <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className={`py-20 px-4 transition-all duration-1000 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Award className="text-yellow-400" size={32} />} title="Certifications & Learning" gradient="from-yellow-400 to-orange-400" />
          <div className="grid md:grid-cols-2 gap-5">
            {certifications.map((cert, i) => (
              <div key={i}
                className={`p-6 rounded-2xl ${darkMode ? 'bg-[#0d1f3c]/60' : 'bg-white/80'} border ${border} transition-all duration-400 hover:-translate-y-1 group relative overflow-hidden`}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 25px ${cert.glowColor}, 0 0 0 1px ${cert.glowColor}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{cert.icon}</span>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${textMain} group-hover:text-cyan-400 transition-colors duration-300`}>{cert.name}</h3>
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
      <section id="goals" className={`py-20 px-4 ${darkMode ? bgAlt : 'bg-white/50'} transition-all duration-1000 ${isVisible.goals ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={<Target className="text-green-400" size={32} />} title="My Goals" gradient="from-green-400 to-blue-400" />
          <p className={`text-center ${textMuted} mb-12 text-sm -mt-6`}>Where I'm headed — clear vision, consistent action 🎯</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: '⚡ Short-term Goals', items: goals.shortTerm, glow: 'rgba(34,197,94,0.15)', accent: 'text-green-400', tagFn: (tag) => tag === 'Top Priority' ? 'bg-red-500/10 text-red-400 border-red-500/30' : tag === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : `bg-white/5 ${textMuted} border-white/10` },
              { title: '🌟 Long-term Goals', items: goals.longTerm, glow: 'rgba(167,139,250,0.15)', accent: 'text-purple-400', tagFn: () => 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
            ].map((panel, pi) => (
              <div key={pi} className={`p-8 rounded-2xl ${darkMode ? 'bg-[#0d1f3c]/60' : 'bg-gray-50'} border ${border} transition-all duration-400`}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${panel.glow}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <h3 className={`text-xl font-semibold mb-6 ${panel.accent}`}>{panel.title}</h3>
                <ul className="space-y-4">
                  {panel.items.map((goal, gi) => (
                    <li key={gi} className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                      <span className="text-lg mt-0.5">{goal.icon}</span>
                      <div className="flex-1">
                        <span className={`text-sm leading-relaxed ${textMuted}`}>{goal.text}</span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full border font-medium ${panel.tagFn(goal.tag)}`}>{goal.tag}</span>
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
      <section id="contact" className={`py-20 px-4 transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle icon={<Mail className="text-cyan-400" size={32} />} title="Get In Touch" gradient="from-cyan-400 to-purple-400" />
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
                  <div className={`p-2.5 rounded-lg ${darkMode ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-gray-100'} group-hover:bg-cyan-500/20 transition-all duration-300`}>
                    <c.icon className="text-cyan-400" size={18} />
                  </div>
                  <a href={c.link} target={c.link.startsWith('http') ? '_blank' : undefined} rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`${textMuted} hover:text-cyan-400 transition-colors duration-300 text-sm`}>{c.text}</a>
                </div>
              ))}
              <a href="https://wa.me/919012907709" target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                style={{ boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}>
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-[#0d1f3c]/60' : 'bg-white'} border ${border}`}
              style={{ boxShadow: darkMode ? '0 0 30px rgba(34,211,238,0.05)' : 'none' }}>
              <div className="space-y-4">
                {[
                  { type: 'text', placeholder: 'Your Name', key: 'name' },
                  { type: 'email', placeholder: 'Your Email', key: 'email' },
                ].map(field => (
                  <input key={field.key} type={field.type} placeholder={field.placeholder} value={formData[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    className={`w-full p-3 rounded-lg text-sm ${darkMode ? 'bg-[#060d1f] text-slate-100 border-[#1e3a5f] placeholder-slate-600 focus:border-cyan-500/60' : 'bg-gray-50 border-gray-200 focus:border-blue-400'} border focus:ring-0 outline-none transition-all duration-300`} />
                ))}
                <textarea placeholder="Your Message" value={formData.message} rows="4"
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-3 rounded-lg text-sm ${darkMode ? 'bg-[#060d1f] text-slate-100 border-[#1e3a5f] placeholder-slate-600 focus:border-cyan-500/60' : 'bg-gray-50 border-gray-200 focus:border-blue-400'} border focus:ring-0 outline-none transition-all duration-300 resize-none`} />
                <button onClick={handleSubmit} disabled={formStatus === 'sending'}
                  className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
                  {formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? '✓ Message Sent!' : 'Send Message →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`py-8 text-center ${darkMode ? 'bg-[#0a1628] border-t border-[#1e3a5f]/60' : 'bg-white/70 border-t border-gray-200'}`}>
        <p className={`${textMuted} text-sm`}>
          © {new Date().getFullYear()} Vaibhav Sharma · <span className="text-cyan-400">thevaibhavacom.vercel.app</span> · "Jo kuch bhi hota hai, ache ke liye hota hai" ❤️
        </p>
      </footer>

      {showScrollTop && (
        <button onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full text-white transition-all duration-300 hover:scale-110 z-50"
          style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: '0 0 20px rgba(34,211,238,0.4)' }}>
          <ArrowUp size={20} />
        </button>
      )}

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.6; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Portfolio;