import React, { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, Phone, Moon, Sun, Download, ExternalLink, Award, Target, Briefcase, Code, User, Heart, TrendingUp, ArrowUp, Sparkles, MessageCircle, GraduationCap } from 'lucide-react';

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
    'AI & ML Engineer', 'Data Scientist', 'Generative AI Developer',
    'Python Developer', 'LLM App Builder', 'Problem Solver',
  ], []);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const text = roles[roleIndex];
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) { setTypedText(text.slice(0, index)); index++; }
      else { clearInterval(timer); setTimeout(() => setRoleIndex(p => (p + 1) % roles.length), 2000); }
    }, 100);
    return () => clearInterval(timer);
  }, [roleIndex, roles]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(r => r.json())
      .then(d => Array.isArray(d) && setGithubRepos(d.filter(r => !r.fork)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const sections = ['home','about','education','challenges','skills','experience','projects','certifications','goals','contact'];
      const cur = sections.find(s => {
        const el = document.getElementById(s);
        if (el) { const r = el.getBoundingClientRect(); return r.top <= 100 && r.bottom >= 100; }
        return false;
      });
      if (cur) setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => setIsVisible(p => ({ ...p, [e.target.id]: e.isIntersecting }))),
      { threshold: 0.1 }
    );
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const D = darkMode;
  const bg      = D ? 'bg-[#060d1f]'    : 'bg-slate-50';
  const bgCard  = D ? 'bg-[#0d1f3c]/70' : 'bg-white';
  const bgCard2 = D ? 'bg-[#060d1f]'    : 'bg-gray-50';
  const border  = D ? 'border-[#1e3a5f]': 'border-gray-200';
  const tMain   = D ? 'text-slate-100'  : 'text-gray-900';
  const tMuted  = D ? 'text-slate-400'  : 'text-gray-600';
  const navBg   = D ? 'bg-[#060d1f]/90' : 'bg-white/95';
  const sec     = (alt) => alt ? (D ? 'bg-[#0a1628]' : 'bg-blue-50/30') : (D ? bg : 'bg-slate-50');

  const NAV_ITEMS = ['Home','About','Education','Skills','Experience','Projects','Certifications','Goals','Contact'];

  // ── STATS BAR ─────────────────────────────────────────────────────────────
  const stats = [
    { value: '6+', label: 'Deployed Projects' },
    { value: '92%', label: 'Best Model Accuracy' },
    { value: 'R²·0.85', label: 'Regression Score' },
    { value: '10+', label: 'ML/AI Tools' },
    { value: 'A+', label: 'AI/ML Cohort Grade' },
    { value: '50K+', label: 'Records Analysed' },
  ];

  const skills = [
  { category:'Programming', icon:'</>', iconColor:D?'text-cyan-400':'text-cyan-600', glowD:'rgba(34,211,238,0.18)', glowL:'rgba(6,182,212,0.12)', lightBg:'bg-cyan-50', lightBorder:'border-cyan-200', items:[{n:'Python',l:5},{n:'SQL',l:4},{n:'JavaScript',l:3},{n:'HTML5',l:4},{n:'CSS3',l:3},{n:'C++',l:3},{n:'DSA',l:3}] },
  { category:'Machine Learning', icon:'🧠', iconColor:D?'text-pink-400':'text-pink-600', glowD:'rgba(244,114,182,0.18)', glowL:'rgba(219,39,119,0.1)', lightBg:'bg-pink-50', lightBorder:'border-pink-200', items:[{n:'Scikit-learn',l:5},{n:'TensorFlow',l:4},{n:'PyTorch',l:4},{n:'Keras',l:4},{n:'Classification',l:5},{n:'Regression',l:5},{n:'Deep Learning',l:4},{n:'Hyperparameter Tuning',l:3}] },
  { category:'Data Analytics', icon:'📈', iconColor:D?'text-teal-400':'text-teal-600', glowD:'rgba(45,212,191,0.18)', glowL:'rgba(15,118,110,0.1)', lightBg:'bg-teal-50', lightBorder:'border-teal-200', items:[{n:'Pandas',l:5},{n:'NumPy',l:5},{n:'EDA',l:5},{n:'Feature Engineering',l:4},{n:'Data Cleaning',l:5},{n:'Statistical Analysis',l:4},{n:'Power BI',l:3}] },
  { category:'NLP & Gen AI', icon:'🤖', iconColor:D?'text-violet-400':'text-violet-600', glowD:'rgba(167,139,250,0.18)', glowL:'rgba(124,58,237,0.1)', lightBg:'bg-violet-50', lightBorder:'border-violet-200', items:[{n:'LangChain',l:4},{n:'LangGraph',l:4},{n:'LlamaIndex',l:3},{n:'RAG',l:4},{n:'Groq API',l:5},{n:'ChromaDB',l:4},{n:'Prompt Engineering',l:5},{n:'Fine-tuning',l:3}] },
  { category:'Backend', icon:'>_', iconColor:D?'text-green-400':'text-green-700', glowD:'rgba(74,222,128,0.18)', glowL:'rgba(21,128,61,0.1)', lightBg:'bg-green-50', lightBorder:'border-green-200', items:[{n:'Flask',l:5},{n:'FastAPI',l:4},{n:'REST APIs',l:4},{n:'MongoDB',l:3},{n:'MySQL',l:4},{n:'Web Development',l:3}] },
  { category:'Visualization', icon:'📊', iconColor:D?'text-yellow-400':'text-yellow-600', glowD:'rgba(250,204,21,0.18)', glowL:'rgba(202,138,4,0.1)', lightBg:'bg-yellow-50', lightBorder:'border-yellow-200', items:[{n:'Matplotlib',l:5},{n:'Seaborn',l:5},{n:'Plotly',l:4},{n:'Streamlit',l:4},{n:'Power BI',l:3}] },
  { category:'Tools & DevOps', icon:'⚙️', iconColor:D?'text-orange-400':'text-orange-600', glowD:'rgba(251,146,60,0.18)', glowL:'rgba(194,65,12,0.1)', lightBg:'bg-orange-50', lightBorder:'border-orange-200', items:[{n:'Git',l:5},{n:'GitHub',l:5},{n:'VS Code',l:5},{n:'Jupyter',l:5},{n:'Google Colab',l:5},{n:'Docker',l:3},{n:'Vercel',l:4},{n:'Render',l:4},{n:'Postman',l:3},{n:'GitHub Actions',l:3}] },
  { category:'CS Fundamentals', icon:'🖥️', iconColor:D?'text-rose-400':'text-rose-600', glowD:'rgba(251,113,133,0.18)', glowL:'rgba(190,18,60,0.1)', lightBg:'bg-rose-50', lightBorder:'border-rose-200', items:[{n:'DBMS',l:4},{n:'OOP',l:4},{n:'Computer Networks',l:3},{n:'OS Concepts',l:3},{n:'DSA',l:3},{n:'System Design',l:3}] },
  { category:'Currently Learning', icon:'🔥', iconColor:D?'text-amber-400':'text-amber-600', glowD:'rgba(251,191,36,0.18)', glowL:'rgba(217,119,6,0.1)', lightBg:'bg-amber-50', lightBorder:'border-amber-200', items:[{n:'Agentic AI',l:3},{n:'AutoGen',l:2},{n:'Vector DBs',l:3},{n:'LLM Fine-tuning',l:2},{n:'Multi-agent Systems',l:2},{n:'OpenCV',l:2}] },
];

  const education = [
    { degree:'Bachelor of Computer Applications (BCA)', institution:'Maa Shakumbhari University', location:'Saharanpur, Uttar Pradesh', period:'2023 – 2026', grade:'In Progress', icon:'🎓', color:'from-cyan-500 to-blue-500', glowD:'rgba(34,211,238,0.2)', glowL:'rgba(6,182,212,0.12)', highlights:['Specialized in Data Structures, Algorithms, and Database Management','Completed coursework in Computer Networks, Operating Systems, and OOP','Built 6+ real-world ML/AI projects alongside degree coursework','Self-taught Python, ML, and GenAI — parallel to formal curriculum'] },
    { degree:'Data Science with Generative AI', institution:'PW Skills (Physics Wallah)', location:'Online', period:'2025 – Present', grade:'In Progress', icon:'🤖', color:'from-purple-500 to-pink-500', glowD:'rgba(168,85,247,0.2)', glowL:'rgba(124,58,237,0.12)', highlights:['Advanced ML, Deep Learning, NLP, and Generative AI curriculum','Hands-on model building — TensorFlow, PyTorch, LangChain, LangGraph','Covering LLMs, RAG pipelines, Vector DBs, and Agentic AI systems','Real dataset projects: EDA → feature engineering → model deployment'] },
  ];

  const challenges = [
    { icon:'👨‍👩‍👦', title:'Family Pressure vs Passion', description:'Coming from a non-tech background, there was constant pressure to pursue a stable government job instead of AI. I chose to let my work speak — built real projects, secured an internship, and proved that a career in AI is not just possible, but promising.', badge:'Overcame ✓', darkBadge:'text-green-400 border-green-400/40 bg-green-400/10', lightBadge:'text-green-700 border-green-200 bg-green-50', glowD:'rgba(34,211,238,0.12)', glowL:'rgba(6,182,212,0.08)' },
    { icon:'🧠', title:'Overcoming Self-Doubt', description:"Early on, I doubted whether someone from a tier-2 city without elite college credentials could break into AI. My first Kaggle attempt ranked bottom 50%. Instead of quitting, I analysed every mistake, iterated fast — and today I have 6 deployed AI/ML projects and a Grade A+ certification.", badge:'Still growing ↑', darkBadge:'text-blue-400 border-blue-400/40 bg-blue-400/10', lightBadge:'text-blue-700 border-blue-200 bg-blue-50', glowD:'rgba(99,102,241,0.12)', glowL:'rgba(37,99,235,0.08)' },
    { icon:'🌐', title:'English Barrier in Technical Learning', description:'Most quality AI/ML resources — research papers, documentation, Hugging Face models — are in English, which was a significant barrier initially. I tackled it by combining Hindi explanations with official docs, and now I read arxiv papers and ML blogs comfortably.', badge:'Solved ✓', darkBadge:'text-purple-400 border-purple-400/40 bg-purple-400/10', lightBadge:'text-purple-700 border-purple-200 bg-purple-50', glowD:'rgba(167,139,250,0.12)', glowL:'rgba(124,58,237,0.08)' },
    { icon:'⚡', title:'Self-Taught Without Formal Mentorship', description:'With no structured AI/ML mentorship or campus lab, YouTube, GitHub, Kaggle, and open-source communities became my university. This forced me to develop strong independent problem-solving habits — I can now pick up any new ML framework or LLM tool quickly from scratch.', badge:'Core Strength 💪', darkBadge:'text-orange-400 border-orange-400/40 bg-orange-400/10', lightBadge:'text-orange-700 border-orange-200 bg-orange-50', glowD:'rgba(251,146,60,0.12)', glowL:'rgba(194,65,12,0.08)' },
  ];

  const experiences = [
    {
      role: 'Data Analyst Intern',
      company: 'Intern Geek',
      duration: 'Nov 2025 – Dec 2025',
      description: 'Analysed retail sales and customer behaviour dataset using Python — performed end-to-end EDA across 4 CSV tables (customers, orders, order_items, products), built customer segmentation, identified top revenue-driving products, and delivered a comprehensive report with data-backed business recommendations.',
      metrics: ['4 datasets joined & analysed', 'EDA → Segmentation → Insights pipeline', 'Final report with actionable recommendations'],
      skills: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA', 'Data Visualisation'],
      github: 'https://github.com/Vaibhavsharma45/Intern_Geek_project_analysis',
    },
  ];

  const certifications = [
    { name:'Artificial Intelligence & Machine Learning Cohort', org:'Intern Geek', year:'Jan – Feb 2026', grade:'Grade: A+', color:'from-purple-500 to-pink-500', glowD:'rgba(168,85,247,0.2)', glowL:'rgba(168,85,247,0.12)', icon:'🏆' },
    { name:'Data Analytics Internship', org:'Intern Geek', year:'Nov – Dec 2025', grade:'Intern ID: IG251491', color:'from-green-500 to-teal-500', glowD:'rgba(34,197,94,0.2)', glowL:'rgba(34,197,94,0.12)', icon:'💼' },
    { name:'Data Science with Generative AI', org:'PW Skills', year:'2025 – Present (Ongoing)', grade:'In Progress', color:'from-blue-500 to-cyan-500', glowD:'rgba(59,130,246,0.2)', glowL:'rgba(59,130,246,0.12)', icon:'📊' },
    { name:'Gen AI for All', org:'PW Skills', year:'2025', grade:'Completed', color:'from-violet-500 to-purple-500', glowD:'rgba(139,92,246,0.2)', glowL:'rgba(139,92,246,0.12)', icon:'🤖' },
    { name:'Introduction to Prompt Engineering', org:'Simplilearn', year:'2026', grade:'Completed', color:'from-orange-500 to-red-500', glowD:'rgba(249,115,22,0.2)', glowL:'rgba(249,115,22,0.12)', icon:'💡' },
  ];

  const goals = {
    shortTerm: [
      { icon:'🎯', text:'Land a full-time AI/ML role or internship — applying with 6 deployed projects as proof of work', tag:'Top Priority' },
      { icon:'🚀', text:'Complete Data Science with GenAI course · build 2 more production-grade AI projects', tag:'In Progress' },
      { icon:'🤖', text:'Master Agentic AI — LangGraph multi-agent systems, AutoGen, tool-calling pipelines', tag:'Learning' },
      { icon:'🌟', text:'Contribute to an open-source ML/LLM library on GitHub — give back to the community', tag:'Upcoming' },
      { icon:'📝', text:'Write technical articles — model breakdowns, project walkthroughs, AI experiments', tag:'Upcoming' },
    ],
    longTerm: [
      { icon:'🏢', text:'Join a product-based company as an AI Engineer — building GenAI solutions at scale', tag:'1–2 Years' },
      { icon:'🎓', text:'Pursue MS/research in AI/ML — deep dive into model architectures and applied AI', tag:'2–3 Years' },
      { icon:'💡', text:'Build and launch an AI-powered SaaS product solving a real problem — from idea to revenue', tag:'2–3 Years' },
      { icon:'🌍', text:'Mentor aspiring AI engineers from tier-2/3 cities — break the access barrier', tag:'Long Term' },
    ],
  };

  const projects = [
    { name:'DataMind Pro', emoji:'📊', tag:'AI · Full Stack', neon:'#22d3ee', darkBorder:'border-cyan-500/40', lightBorder:'border-cyan-300', darkTag:'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', lightTag:'bg-cyan-100 text-cyan-700 border-cyan-300',
      desc:'AI-powered data analysis platform — upload CSV/Excel, get auto EDA, 5+ ML models, Groq Llama 3.3 70B insights, PDF/PPT reports, and an LLM chatbot. Built with Flask + 9 Blueprints.',
      metrics: ['5+ ML models auto-trained', 'Groq Llama 3.3 70B powered', 'PDF + PPT report generation'],
      stack:['Flask','Python','Groq API','Scikit-learn','Plotly'], github:'https://github.com/Vaibhavsharma45/Auto_analyst', live:'https://datamind-pro.onrender.com', stars:1 },
    { name:'Bujji AI', emoji:'🤖', tag:'AI · Agentic', neon:'#a78bfa', darkBorder:'border-violet-500/40', lightBorder:'border-violet-300', darkTag:'bg-violet-500/10 text-violet-400 border-violet-500/30', lightTag:'bg-violet-100 text-violet-700 border-violet-300',
      desc:'JARVIS-style AI assistant — LangGraph ReAct agent, wake-word activation, ChromaDB persistent memory, PC control, WhatsApp/email automation, and web dashboard. 100% free stack.',
      metrics: ['LangGraph ReAct agent', 'ChromaDB long-term memory', 'PC + browser automation'],
      stack:['Python','LangGraph','Groq API','FastAPI','ChromaDB'], github:'https://github.com/Vaibhavsharma45/Bujji_AI', live:null, stars:0 },
    { name:'Marg Darshak', emoji:'🧭', tag:'AI · Web App', neon:'#34d399', darkBorder:'border-emerald-500/40', lightBorder:'border-emerald-300', darkTag:'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', lightTag:'bg-emerald-100 text-emerald-700 border-emerald-300',
      desc:'Career recommendation platform — ML model suggests career paths, Gyan Kosh for wisdom, Skill Saathi for curated resources. Solves real guidance gap for tier-2/3 students.',
      metrics: ['ML-based career classifier', '3 modules in one platform', 'Targets tier-2/3 students'],
      stack:['Flask','Python','Scikit-learn','Seaborn','ML'], github:'https://github.com/Vaibhavsharma45/marg-darshak', live:'https://marg-darshak.onrender.com', stars:1 },
    { name:'Resume Analyser', emoji:'📄', tag:'AI · NLP', neon:'#fb923c', darkBorder:'border-orange-500/40', lightBorder:'border-orange-300', darkTag:'bg-orange-500/10 text-orange-400 border-orange-500/30', lightTag:'bg-orange-100 text-orange-700 border-orange-300',
      desc:'NLP-powered resume scanner — parses PDF, extracts skills via TF-IDF, scores against JD keywords, and gives improvement suggestions. ATS-aware matching logic.',
      metrics: ['TF-IDF keyword extraction', 'ATS-score against JD', 'PDF parsing + skill gap report'],
      stack:['Python','Flask','NLP','JavaScript','CSS'], github:'https://github.com/Vaibhavsharma45/Resume_Analyser', live:'https://resume-analyser-gbp1.vercel.app/', stars:1 },
    { name:'Crypto Volatility Predictor', emoji:'📈', tag:'ML · Finance', neon:'#facc15', darkBorder:'border-yellow-500/40', lightBorder:'border-yellow-300', darkTag:'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', lightTag:'bg-yellow-100 text-yellow-700 border-yellow-300',
      desc:'End-to-end ML pipeline predicting 7-day crypto volatility — 14 engineered features (ATR, Bollinger Bands, momentum) on 50K+ records. Random Forest with R² ~0.85.',
      metrics: ['R² score: ~0.85', '14 engineered features', '50K+ records · Streamlit deployed'],
      stack:['Python','Scikit-learn','Pandas','Streamlit','Plotly'], github:'https://github.com/Vaibhavsharma45/crypto-volatility-prediction-project', live:'https://crypto-volatility-prediction-project-mak4penaud7jwri5vptzto.streamlit.app/', stars:2 },
    { name:'Birth Weight Predictor', emoji:'🏥', tag:'ML · Healthcare', neon:'#f472b6', darkBorder:'border-pink-500/40', lightBorder:'border-pink-300', darkTag:'bg-pink-500/10 text-pink-400 border-pink-500/30', lightTag:'bg-pink-100 text-pink-700 border-pink-300',
      desc:'Regression model predicting neonatal birth weight from maternal health indicators — 92%+ accuracy using feature-engineered dataset. Deployed as an interactive Flask web app.',
      metrics: ['92%+ model accuracy', 'Maternal health feature set', 'Flask web app · deployed live'],
      stack:['Python','Scikit-learn','Pandas','Flask','Seaborn'], github:'https://github.com/Vaibhavsharma45/birth-weight-predictor', live:'https://birth-weight-predictor.onrender.com', stars:1 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
          template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
          template_params: { name: formData.name, email: formData.email, message: formData.message },
        }),
      });
      if (res.status === 200) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 4000);
      } else { throw new Error('failed'); }
    } catch {
      window.open(
        `mailto:vaibhavsharma95124v@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`,
        '_blank'
      );
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 4000);
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

  const RepoDesc = ({ repo }) => (
    <p className={`${tMuted} text-sm line-clamp-3 mb-3`}>
      {repo.description || 'An open-source AI/ML project by Vaibhav Sharma. Click to view on GitHub.'}
    </p>
  );

  const Title = ({ icon, title, gradient }) => (
    <div className="flex flex-col items-center mb-12">
      <h2 className="text-4xl font-bold flex items-center justify-center gap-3 mb-3">
        {icon}
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{title}</span>
      </h2>
      <div className={`h-0.5 w-24 rounded-full bg-gradient-to-r ${gradient} opacity-70`}></div>
    </div>
  );

  const inputCls = `w-full p-3 rounded-xl text-sm border outline-none transition-all duration-300 ${
    D ? 'bg-[#060d1f] text-slate-100 border-[#1e3a5f] placeholder-slate-600 focus:border-cyan-400'
      : 'bg-white text-gray-900 border-gray-200 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100'
  }`;

  return (
    <div className={`min-h-screen transition-all duration-500 ${bg} ${tMain} relative overflow-hidden`}>

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {D ? (
          <>
            {[...Array(80)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white"
                style={{ width: Math.random() * 2 + 0.5 + 'px', height: Math.random() * 2 + 0.5 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', opacity: Math.random() * 0.4 + 0.1, animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`, animationDelay: Math.random() * 5 + 's' }} />
            ))}
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-600/5 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-br from-cyan-100/50 via-blue-50/30 to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-80 bg-gradient-to-tl from-purple-100/30 via-pink-50/20 to-transparent" />
            <div className="absolute top-1/3 left-0 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl" />
            <div className="absolute top-2/3 right-0 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          </>
        )}
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${navBg} border-b ${D ? 'border-[#1e3a5f]/60' : 'border-gray-200 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`text-2xl font-bold bg-gradient-to-r ${D ? 'from-cyan-400 via-blue-400 to-purple-400' : 'from-cyan-600 via-blue-600 to-purple-600'} bg-clip-text text-transparent`}>VS</div>
            <div className="hidden md:flex space-x-1">
              {NAV_ITEMS.map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? D ? 'text-cyan-400 bg-cyan-400/10' : 'text-cyan-600 bg-cyan-50 font-semibold'
                      : D ? `${tMuted} hover:text-cyan-400 hover:bg-cyan-400/5` : `text-gray-600 hover:text-cyan-600 hover:bg-cyan-50`
                  }`}>{item}</a>
              ))}
            </div>
            <button onClick={() => setDarkMode(!D)}
              className={`p-2 rounded-full transition-all duration-300 ${D ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'}`}>
              {D ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className={`pt-32 pb-16 px-4 relative transition-opacity duration-1000 ${isVisible.home ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 relative inline-block">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center text-6xl font-bold text-white relative overflow-hidden group cursor-pointer"
              style={{ boxShadow: D ? '0 0 40px rgba(34,211,238,0.35), 0 0 80px rgba(99,102,241,0.2)' : '0 0 40px rgba(6,182,212,0.3), 0 0 70px rgba(99,102,241,0.15)' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000" />
              VS
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm <span className={`bg-gradient-to-r ${D ? 'from-cyan-400 via-blue-400 to-purple-400' : 'from-cyan-600 via-blue-600 to-purple-600'} bg-clip-text text-transparent`}>Vaibhav Sharma</span>
          </h1>
          <div className="text-2xl md:text-3xl mb-6 h-12 flex items-center justify-center gap-2">
            <span className={tMuted}>Aspiring</span>
            <span className={`${D ? 'text-cyan-400' : 'text-cyan-600'} font-semibold min-w-[320px] text-left`}>{typedText}</span>
            <span className={`animate-pulse ${D ? 'text-cyan-400' : 'text-cyan-600'}`}>|</span>
          </div>
          <p className={`text-lg ${tMuted} max-w-2xl mx-auto mb-8`}>
            Building AI/ML solutions that go beyond notebooks — <span className={D?'text-cyan-400':'text-cyan-600'}>6 deployed projects</span>, real data, real results.
          </p>

          {/* STATS BAR */}
          <div className={`flex flex-wrap justify-center gap-4 mb-8 max-w-3xl mx-auto`}>
            {stats.map((s, i) => (
              <div key={i} className={`px-4 py-2 rounded-xl border ${D ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'} flex flex-col items-center min-w-[90px]`}>
                <span className={`text-lg font-bold ${D?'text-cyan-400':'text-cyan-600'}`}>{s.value}</span>
                <span className={`text-xs ${tMuted} text-center leading-tight`}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: Github, link: 'https://github.com/Vaibhavsharma45' },
              { icon: Linkedin, link: 'https://linkedin.com/in/vaibhav-0sharma' },
              { icon: Mail, link: 'mailto:vaibhavsharma95124v@gmail.com' },
            ].map((s, i) => (
              <a key={i} href={s.link} target={s.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${D ? 'bg-white/5 border-white/10 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-400/10' : 'bg-white border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50 shadow-sm'}`}>
                <s.icon size={22} />
              </a>
            ))}
          </div>
          <button onClick={handleDownloadResume}
            className="px-8 py-3 rounded-full font-semibold text-white relative overflow-hidden group transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: D ? '0 0 25px rgba(99,102,241,0.5)' : '0 8px 25px rgba(99,102,241,0.4)' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2"><Download size={18} className="group-hover:animate-bounce" /> Download Resume</span>
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`py-20 px-4 ${sec(true)} transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Title icon={<User className={D ? 'text-blue-400' : 'text-blue-600'} size={32} />} title="About Me" gradient={D ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} />
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                head: <><Sparkles className="text-yellow-500" size={20} /> Who I Am</>,
                body: <>
                  <p className={`text-sm leading-relaxed mb-4 ${tMuted}`}>I'm <strong className={D?'text-cyan-400':'text-cyan-600'}>Vaibhav Sharma</strong>, an aspiring AI & ML Engineer from Muzaffarnagar, UP. Currently pursuing BCA while actively building ML models, LLM applications, and deployed AI products — combining PW Skills coursework with real project development.</p>
                  <p className={`text-sm leading-relaxed mb-4 ${tMuted}`}>I've built <strong className={D?'text-cyan-400':'text-cyan-600'}>6 deployed AI/ML projects</strong> — achieving R² ~0.85 in regression, 92%+ classification accuracy, and powering apps with Groq Llama 3.3 70B. I care about the full stack: data → model → deployment → user.</p>
                  <p className={`text-sm leading-relaxed ${tMuted}`}>My philosophy: <span className={`italic font-semibold ${D?'text-purple-400':'text-purple-600'}`}>"Jo kuch bhi hota hai, ache ke liye hota hai"</span></p>
                </>,
                enterShadow: D ? '0 0 30px rgba(99,102,241,0.15)' : '0 6px 30px rgba(99,102,241,0.12)',
              },
              {
                head: <><Heart className="text-red-500" size={20} /> Personal Interests</>,
                body: <ul className="space-y-2.5">
                  {[
                    'Reading AI research papers & staying updated on LLM advancements',
                    'Kaggle competitions — turning losses into learning loops',
                    'Regular exercise and playing cricket with friends',
                    'Exploring astrology and self-improvement methods',
                    'Building side projects to experiment with new AI tools',
                    'Watching AI researcher talks — Andrej Karpathy, Yann LeCun, Sam Altman',
                  ].map((t, i) => (
                    <li key={i} className={`flex items-start gap-2 hover:translate-x-2 transition-transform duration-300 ${tMuted}`}>
                      <span className={`${D?'text-cyan-400':'text-cyan-600'} mt-0.5 text-xs`}>▹</span><span className="text-sm">{t}</span>
                    </li>
                  ))}
                </ul>,
                enterShadow: D ? '0 0 30px rgba(244,114,182,0.12)' : '0 6px 30px rgba(244,114,182,0.1)',
              },
            ].map((card, i) => (
              <div key={i} className={`p-8 rounded-2xl ${bgCard} border ${border} relative overflow-hidden group`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = card.enterShadow; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-400/5 rounded-full blur-3xl group-hover:bg-cyan-400/10 transition-all duration-500" />
                <h3 className={`text-lg font-semibold mb-5 flex items-center gap-2 ${tMain}`}>{card.head}</h3>
                {card.body}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className={`py-20 px-4 ${sec(false)} transition-all duration-1000 ${isVisible.education ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Title icon={<GraduationCap className={D?'text-cyan-400':'text-cyan-600'} size={32} />} title="Education" gradient={D?'from-cyan-400 to-blue-400':'from-cyan-600 to-blue-600'} />
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, i) => (
              <div key={i} className={`p-8 rounded-2xl ${bgCard} border ${border} relative overflow-hidden group`}
                style={{ boxShadow: D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? `0 0 30px ${edu.glowD}` : `0 6px 30px ${edu.glowL}`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D ? 'none' : '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${edu.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D?'via-white/5':'via-white/60'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`} />
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>{edu.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-base font-bold ${tMain} leading-tight mb-1`}>{edu.degree}</h3>
                    <p className={`text-sm font-semibold ${D?'text-cyan-400':'text-cyan-600'}`}>{edu.institution}</p>
                    <p className={`text-xs ${tMuted} mt-0.5`}>{edu.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs px-3 py-1 rounded-full font-mono border ${D?'border-[#1e3a5f] text-slate-400 bg-white/5':'border-gray-200 text-gray-500 bg-gray-50'}`}>{edu.period}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium bg-gradient-to-r ${edu.color} text-white`}>{edu.grade}</span>
                </div>
                <ul className="space-y-2">
                  {edu.highlights.map((h, hi) => (
                    <li key={hi} className={`flex items-start gap-2 text-sm ${tMuted} hover:translate-x-1 transition-transform duration-200`}>
                      <span className={`${D?'text-cyan-400':'text-cyan-600'} mt-0.5 text-xs`}>▹</span><span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section id="challenges" className={`py-20 px-4 ${sec(true)} transition-all duration-1000 ${isVisible.challenges ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Title icon={<TrendingUp className={D?'text-green-400':'text-green-600'} size={32} />} title="Challenges & Growth" gradient={D?'from-green-400 to-cyan-400':'from-green-600 to-cyan-600'} />
          <p className={`text-center ${tMuted} mb-12 text-sm -mt-6`}>Real struggles. Real growth. No filter. 💪</p>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((c, i) => (
              <div key={i} className={`p-8 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden cursor-default`}
                style={{ boxShadow: D?'none':'0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? `0 0 28px ${c.glowD}, 0 0 0 1px ${c.glowD}` : `0 6px 28px ${c.glowL}`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D?'none':'0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{c.icon}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${D?c.darkBadge:c.lightBadge}`}>{c.badge}</span>
                </div>
                <h3 className={`text-lg font-semibold mb-3 ${D?'text-cyan-400 group-hover:text-purple-400':'text-cyan-700 group-hover:text-purple-700'} transition-colors duration-300`}>{c.title}</h3>
                <p className={`${tMuted} leading-relaxed text-sm`}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
<section id="skills" className={`py-20 px-4 ${sec(false)} transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  <div className="max-w-7xl mx-auto">
    <Title icon={<Code className={D?'text-cyan-400':'text-cyan-600'} size={32} />} title="Technical Skills" gradient={D?'from-cyan-400 to-blue-400':'from-cyan-600 to-blue-600'} />
    <p className={`text-center ${tMuted} mb-2 text-sm -mt-6`}>Tools & technologies I work with 🛠️</p>
    <div className={`flex items-center justify-center gap-6 mb-10 text-xs ${tMuted}`}>
      {[1,2,3,4,5].map(l => (
        <span key={l} className="flex items-center gap-1.5">
          <span className="flex gap-0.5">{[...Array(5)].map((_,i) => <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < l ? (D?'bg-cyan-400':'bg-cyan-500') : (D?'bg-white/15':'bg-gray-200')}`} />)}</span>
          <span>{['Basics','Learning','Comfortable','Proficient','Expert'][l-1]}</span>
        </span>
      ))}
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((cat, i) => (
        <div key={i} className={`p-6 rounded-2xl border group relative overflow-hidden ${D ? `${bgCard} border-[#1e3a5f]` : `${cat.lightBg} ${cat.lightBorder}`}`}
          style={{ boxShadow: D?'none':'0 2px 10px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s, transform 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = D ? `0 0 30px ${cat.glowD}, 0 0 0 1px ${cat.glowD}` : `0 6px 20px ${cat.glowL}`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = D?'none':'0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D?'via-white/5':'via-white/60'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`} />

          {/* Card Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${D?'bg-white/8':'bg-white'} shadow-md border ${D?'border-white/10':cat.lightBorder}`}>
              <span className={`text-base font-bold font-mono ${cat.iconColor}`}>{cat.icon}</span>
            </div>
            <h3 className={`text-sm font-bold ${cat.iconColor} tracking-wide`}>{cat.category}</h3>
          </div>

          {/* Skill Badges with proficiency dots */}
          <div className="flex flex-col gap-2">
            {cat.items.map((skill, si) => (
              <div key={si} className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-default group/skill ${
                D ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  : 'border-white/80 bg-white hover:border-gray-300 hover:bg-white shadow-sm'
              }`}>
                <span className={`text-xs font-semibold ${D?'text-slate-200':'text-gray-700'}`}>{skill.n}</span>
                <span className="flex gap-0.5 ml-2 flex-shrink-0">
                  {[...Array(5)].map((_,di) => (
                    <span key={di} className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      di < skill.l
                        ? (D ? 'bg-cyan-400 group-hover/skill:bg-cyan-300' : 'bg-cyan-500 group-hover/skill:bg-cyan-600')
                        : (D ? 'bg-white/15' : 'bg-gray-200')
                    }`} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* EXPERIENCE */}
      <section id="experience" className={`py-20 px-4 ${sec(true)} transition-all duration-1000 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Title icon={<Briefcase className={D?'text-purple-400':'text-purple-600'} size={32} />} title="Experience" gradient={D?'from-purple-400 to-pink-400':'from-purple-600 to-pink-600'} />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className={`p-8 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden`}
                style={{ boxShadow: D?'none':'0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D?'0 0 30px rgba(168,85,247,0.15)':'0 6px 30px rgba(168,85,247,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D?'none':'0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${D?'text-purple-400':'text-purple-600'}`}>{exp.role}</h3>
                    <p className={`${tMuted} mt-1 font-medium`}>{exp.company}</p>
                  </div>
                  <span className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-xs font-mono ${D?'bg-purple-500/10 text-purple-400 border border-purple-500/30':'bg-purple-100 text-purple-700 border border-purple-200'}`}>{exp.duration}</span>
                </div>
                <p className={`${tMuted} mb-4 leading-relaxed text-sm`}>{exp.description}</p>

                {/* Metrics chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.metrics.map((m, mi) => (
                    <span key={mi} className={`text-xs px-3 py-1 rounded-full font-mono border ${D?'border-cyan-500/30 text-cyan-400 bg-cyan-500/5':'border-cyan-300 text-cyan-700 bg-cyan-50'}`}>
                      📌 {m}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.skills.map((s, si) => (
                    <span key={si} className={`text-xs px-3 py-1 rounded-full border font-medium ${D?'border-purple-500/30 text-purple-400 bg-purple-500/10':'border-purple-200 text-purple-700 bg-purple-50'}`}>{s}</span>
                  ))}
                </div>
                {exp.github && (
                  <a href={exp.github} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 hover:scale-105 ${D?'border-purple-500/40 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20':'border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100'}`}>
                    <Github size={13} /> View Project on GitHub →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`py-20 px-4 ${sec(false)} transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Title icon={<Github className={D?'text-cyan-400':'text-cyan-600'} size={32} />} title="Projects" gradient={D?'from-cyan-400 to-purple-400':'from-cyan-600 to-purple-600'} />
          <p className={`text-center ${tMuted} mb-12 text-sm -mt-6`}>Real AI/ML projects — built, measured, deployed 🚀</p>
          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${tMain}`}><span className="text-yellow-500">📌</span> Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {projects.map((p, i) => (
              <div key={i} className={`p-6 rounded-2xl ${D?bgCard2:'bg-white'} border ${D?p.darkBorder:p.lightBorder} flex flex-col cursor-pointer relative overflow-hidden group`}
                style={{ boxShadow: D?'none':'0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D?`0 0 30px ${p.neon}25, 0 0 0 1px ${p.neon}40`:`0 8px 30px ${p.neon}30`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D?'none':'0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D?'via-white/5':'via-white/70'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none z-10`} />
                {!D && <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to right, ${p.neon}, transparent)` }} />}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{p.emoji}</span>
                    <div>
                      <h3 className={`text-base font-bold ${D?'text-white':tMain} leading-tight`}>{p.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${D?p.darkTag:p.lightTag}`}>{p.tag}</span>
                    </div>
                  </div>
                  {p.stars > 0 && <span className="text-xs text-yellow-500 font-mono">⭐ {p.stars}</span>}
                </div>
                <p className={`text-sm leading-relaxed mb-3 flex-1 ${tMuted}`}>{p.desc}</p>

                {/* Metrics */}
                <div className="flex flex-col gap-1 mb-3">
                  {p.metrics.map((m, mi) => (
                    <span key={mi} className={`text-xs font-mono ${D?'text-cyan-400/80':'text-cyan-700'}`}>↳ {m}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map((t, ti) => (<span key={ti} className={`text-xs px-2 py-0.5 rounded-full font-mono border ${D?'border-white/10 text-slate-400 bg-white/5':'border-gray-200 text-gray-600 bg-gray-50'}`}>{t}</span>))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 hover:scale-105 ${D?'border-white/20 text-slate-300 bg-white/5 hover:border-white/40 hover:text-white':'border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100'}`}>
                    <Github size={12} /> Code
                  </a>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-85 transition-all duration-300 hover:scale-105 shadow-sm">
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  ) : (
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${D?'border-white/10 text-slate-500':'border-gray-200 text-gray-400 bg-gray-50'}`}>🖥️ Local</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${tMain}`}><Github size={18} className={D?'text-cyan-400':'text-cyan-600'} /> Latest GitHub Repos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {githubRepos.length > 0 ? githubRepos.map((repo, i) => (
              <div key={i} className={`p-5 rounded-2xl ${D?bgCard2:'bg-white'} border ${border} flex flex-col group relative overflow-hidden`}
                style={{ boxShadow: D?'none':'0 2px 10px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = D?'0 0 25px rgba(34,211,238,0.1), 0 0 0 1px rgba(34,211,238,0.25)':'0 6px 25px rgba(6,182,212,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = D?'none':'0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D?'via-white/3':'via-white/70'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`} />
                <h3 className={`text-base font-semibold mb-2 ${D?'text-cyan-400 group-hover:text-purple-400':'text-cyan-600 group-hover:text-purple-600'} transition-colors duration-300`}>{repo.name}</h3>
                <div className="flex-1"><RepoDesc repo={repo} /></div>
                <div className="flex justify-between items-center mt-auto">
                  {repo.language && <span className={`text-xs px-2.5 py-1 rounded-full border font-mono ${D?'border-purple-500/30 text-purple-400 bg-purple-500/10':'border-purple-200 text-purple-700 bg-purple-50'}`}>{repo.language}</span>}
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`${tMuted} group-hover:text-yellow-500 transition-colors`}>⭐ {repo.stargazers_count}</span>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`${D?'text-cyan-400 hover:text-purple-400':'text-cyan-600 hover:text-purple-600'} transform hover:scale-110 transition-all duration-300`}><ExternalLink size={16} /></a>
                  </div>
                </div>
              </div>
            )) : <div className={`col-span-3 text-center ${tMuted} animate-pulse py-10`}>Loading projects…</div>}
          </div>
          <div className="text-center">
            <a href="https://github.com/Vaibhavsharma45" target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-3 px-8 py-3 rounded-full font-semibold border transition-all duration-300 hover:scale-105 ${D?'text-white border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400':'text-cyan-700 border-cyan-300 bg-cyan-50 hover:bg-cyan-100'}`}
              style={{ boxShadow: D?'0 0 20px rgba(34,211,238,0.15)':'0 4px 15px rgba(6,182,212,0.2)' }}>
              <Github size={20} /> Explore All on GitHub <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className={`py-20 px-4 ${sec(true)} transition-all duration-1000 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Title icon={<Award className={D?'text-yellow-400':'text-yellow-600'} size={32} />} title="Certifications & Learning" gradient={D?'from-yellow-400 to-orange-400':'from-yellow-600 to-orange-600'} />
          <div className="grid md:grid-cols-2 gap-5">
            {certifications.map((cert, i) => (
              <div key={i} className={`p-6 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden`}
                style={{ boxShadow: D?'none':'0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { const g=D?cert.glowD:cert.glowL; e.currentTarget.style.boxShadow=`0 0 25px ${g}, 0 0 0 1px ${g}`; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow=D?'none':'0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform='none'; }}>
                {!D && <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${D?'via-white/5':'via-white/70'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`} />
                <div className="flex items-start gap-4">
                  <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{cert.icon}</span>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${tMain} ${D?'group-hover:text-cyan-400':'group-hover:text-cyan-600'} transition-colors duration-300`}>{cert.name}</h3>
                    <p className={`${tMuted} text-sm`}>{cert.org}</p>
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

      {/* GOALS */}
      <section id="goals" className={`py-20 px-4 ${sec(false)} transition-all duration-1000 ${isVisible.goals ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Title icon={<Target className={D?'text-green-400':'text-green-600'} size={32} />} title="My Goals" gradient={D?'from-green-400 to-blue-400':'from-green-600 to-blue-600'} />
          <p className={`text-center ${tMuted} mb-12 text-sm -mt-6`}>Where I'm headed — clear vision, consistent action 🎯</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title:'⚡ Short-term Goals', items:goals.shortTerm, glowD:'rgba(34,197,94,0.15)', glowL:'rgba(34,197,94,0.1)', accent:D?'text-green-400':'text-green-600', bar:'from-green-400 to-cyan-400', tagFn:(tag)=>tag==='Top Priority'?(D?'bg-red-500/10 text-red-400 border-red-500/30':'bg-red-50 text-red-600 border-red-200'):tag==='In Progress'?(D?'bg-blue-500/10 text-blue-400 border-blue-500/30':'bg-blue-50 text-blue-600 border-blue-200'):(D?`bg-white/5 ${tMuted} border-white/10`:'bg-gray-100 text-gray-500 border-gray-200') },
              { title:'🌟 Long-term Goals', items:goals.longTerm, glowD:'rgba(167,139,250,0.15)', glowL:'rgba(167,139,250,0.1)', accent:D?'text-purple-400':'text-purple-600', bar:'from-purple-400 to-pink-400', tagFn:()=>D?'bg-purple-500/10 text-purple-400 border-purple-500/30':'bg-purple-50 text-purple-700 border-purple-200' },
            ].map((panel, pi) => (
              <div key={pi} className={`p-8 rounded-2xl ${bgCard} border ${border} group relative overflow-hidden`}
                style={{ boxShadow: D?'none':'0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=D?`0 0 30px ${panel.glowD}`:`0 6px 30px ${panel.glowL}`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow=D?'none':'0 2px 12px rgba(0,0,0,0.06)'; }}>
                {!D && <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${panel.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />}
                <h3 className={`text-xl font-semibold mb-6 ${panel.accent}`}>{panel.title}</h3>
                <ul className="space-y-4">
                  {panel.items.map((goal, gi) => (
                    <li key={gi} className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                      <span className="text-lg mt-0.5">{goal.icon}</span>
                      <div className="flex-1 flex flex-wrap items-center gap-1">
                        <span className={`text-sm leading-relaxed ${tMuted}`}>{goal.text}</span>
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

      {/* CONTACT */}
      <section id="contact" className={`py-20 px-4 ${sec(true)} transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <Title icon={<Mail className={D?'text-cyan-400':'text-cyan-600'} size={32} />} title="Get In Touch" gradient={D?'from-cyan-400 to-purple-400':'from-cyan-600 to-purple-600'} />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold mb-6 ${tMain}`}>Contact Information</h3>
              {[
                { icon: Mail, text: 'vaibhavsharma95124v@gmail.com', link: 'mailto:vaibhavsharma95124v@gmail.com' },
                { icon: Phone, text: '+91-9012907709', link: 'tel:+919012907709' },
                { icon: MessageCircle, text: 'WhatsApp: +91-9012907709', link: 'https://wa.me/919012907709' },
                { icon: Github, text: 'github.com/Vaibhavsharma45', link: 'https://github.com/Vaibhavsharma45' },
                { icon: Linkedin, text: 'linkedin.com/in/vaibhav-0sharma', link: 'https://linkedin.com/in/vaibhav-0sharma' },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                  <div className={`p-2.5 rounded-lg border transition-all duration-300 ${D?'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-500/20':'bg-cyan-50 border-cyan-200 group-hover:bg-cyan-100'}`}>
                    <c.icon className={D?'text-cyan-400':'text-cyan-600'} size={18} />
                  </div>
                  <a href={c.link} target={c.link.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                    className={`${tMuted} ${D?'hover:text-cyan-400':'hover:text-cyan-600'} transition-colors duration-300 text-sm`}>{c.text}</a>
                </div>
              ))}
              <a href="https://wa.me/919012907709" target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                style={{ boxShadow: D?'0 0 20px rgba(34,197,94,0.3)':'0 6px 20px rgba(34,197,94,0.35)' }}>
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>

            <div className={`p-8 rounded-2xl ${bgCard} border ${border}`}
              style={{ boxShadow: D?'0 0 30px rgba(34,211,238,0.05)':'0 4px 20px rgba(0,0,0,0.08)' }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${D?'text-slate-400':'text-gray-500'}`}>Your Name *</label>
                  <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required className={inputCls} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${D?'text-slate-400':'text-gray-500'}`}>Your Email *</label>
                  <input type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required className={inputCls} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${D?'text-slate-400':'text-gray-500'}`}>Your Message *</label>
                  <textarea placeholder="Hi Vaibhav, I'd like to discuss..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={5} required className={`${inputCls} resize-none`} />
                </div>
                <button type="submit" disabled={formStatus === 'sending' || !formData.name || !formData.email || !formData.message}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: D?'0 0 20px rgba(99,102,241,0.3)':'0 6px 20px rgba(99,102,241,0.35)' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">
                    {formStatus === 'sending' ? '⏳ Sending…' : formStatus === 'sent' ? '✅ Message Sent!' : 'Send Message →'}
                  </span>
                </button>
                <p className={`text-xs text-center ${tMuted}`}>
                  Or reach me directly at{' '}
                  <a href="mailto:vaibhavsharma95124v@gmail.com" className={D?'text-cyan-400':'text-cyan-600'}>vaibhavsharma95124v@gmail.com</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-8 text-center ${D?'bg-[#0a1628] border-t border-[#1e3a5f]/60':'bg-white border-t border-gray-200 shadow-inner'}`}>
        <p className={`${tMuted} text-sm`}>
          © {new Date().getFullYear()} Vaibhav Sharma ·{' '}
          <a href="https://thevaibhavacom.vercel.app" target="_blank" rel="noreferrer" className={D?'text-cyan-400 hover:text-cyan-300':'text-cyan-600 hover:text-cyan-700'}>thevaibhavacom.vercel.app</a>
          {' '}· "Jo kuch bhi hota hai, ache ke liye hota hai" ❤️
        </p>
      </footer>

      {showScrollTop && (
        <button onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full text-white transition-all duration-300 hover:scale-110 z-50"
          style={{ background:'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: D?'0 0 20px rgba(34,211,238,0.4)':'0 6px 20px rgba(99,102,241,0.5)' }}>
          <ArrowUp size={20} />
        </button>
      )}

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.1} 50%{opacity:0.6} }
        .line-clamp-3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>
    </div>
  );
};

export default Portfolio;