import React, { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, Phone, Moon, Sun, Download, ExternalLink, Award, Target, Briefcase, Code, User, Heart, TrendingUp, ArrowUp, Sparkles, Zap } from 'lucide-react';

const GITHUB_USERNAME = 'Vaibhavsharma45';
const ANTHROPIC_MODEL = 'claude-sonnet-4-20250514';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [githubRepos, setGithubRepos] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  // ── TYPING ANIMATION ──────────────────────────────────────────────────────
  const roles = useMemo(() => [
    'AI & ML Engineer',
    'Data Scientist',
    'Generative AI Enthusiast',
    'Python Developer',
    'Backend Engineer',
    'Problem Solver',
  ], []);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const text = roles[roleIndex];
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setRoleIndex(prev => (prev + 1) % roles.length), 2000);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [roleIndex, roles]);

  // ── GITHUB REPOS ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => Array.isArray(data) && setGithubRepos(data.filter(r => !r.fork)))
      .catch(err => console.log(err));
  }, []);

  // ── SCROLL ────────────────────────────────────────────────────────────────
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

  // ── INTERSECTION OBSERVER ─────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => setIsVisible(prev => ({ ...prev, [e.target.id]: e.isIntersecting }))),
      { threshold: 0.1 }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // ── DATA ──────────────────────────────────────────────────────────────────
  const skills = {
    'Languages': ['Python', 'C++', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    'AI / ML': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'OpenCV', 'LangChain', 'Machine Learning', 'Data Analysis', 'Data Visualisation', 'EDA', 'Feature Engineering', 'Model Deployment'],
    'Backend & Web': ['Flask', 'FastAPI', 'MongoDB', 'MySQL', 'REST APIs', 'Web Development'],
    'Tools & Platforms': ['Power BI', 'Git', 'GitHub', 'Docker', 'VS Code', 'Jupyter', 'Google Colab', 'Kaggle', 'Postman', 'Render', 'Vercel', 'Groq API', 'ChromaDB', 'Google Sheets', 'Plotly', 'LlamaIndex', 'LangGraph'],
  };

  const challenges = [
    {
      title: 'Self-taught ML Journey',
      description: 'Learned Python and Machine Learning independently — no formal mentorship. Built small projects from scratch that eventually gained peer recognition and boosted my confidence.',
      icon: '🚀',
    },
    {
      title: 'Mastering Complex Algorithms',
      description: 'Struggled initially with ML math. Revisited linear algebra and statistics from fundamentals, practised on multiple datasets, and built genuine intuition over time.',
      icon: '🧠',
    },
    {
      title: 'Kaggle Comeback Story',
      description: 'First competition attempt was unsuccessful. Analysed mistakes methodically, improved feature engineering skills, and achieved top 20% finishes in subsequent competitions.',
      icon: '🏆',
    },
    {
      title: 'Resource Optimisation',
      description: 'Limited GPU access required creative solutions — lightweight models, Google Colab, and smart batching strategies. Constraints accelerated problem-solving ability.',
      icon: '⚡',
    },
  ];

  const experiences = [
    {
      role: 'Data Analyst Intern',
      company: 'Inten Geek',
      duration: 'Nov 2025 – Dec 2025',
      description: 'Developed and deployed an interactive Power BI Dashboard analysing the Titanic Survival Dataset. Visualised key KPIs — survival rates by Pclass and Gender — using data storytelling techniques. Gained hands-on experience with Power BI Desktop and Google Sheets, translating raw data into actionable insights.',
      skills: ['Power BI', 'Data Analysis', 'Google Sheets', 'Data Visualisation'],
    },
  ];

  const certifications = [
    { name: 'Data Science with Gen AI', org: 'PW Skills', year: '2025–Present (Ongoing)', color: 'from-blue-500 to-cyan-500' },
    { name: 'Gen AI for All', org: 'PW Skills', year: '2025', color: 'from-purple-500 to-pink-500' },
    { name: 'Introduction to Prompt Engineering', org: 'Simplilearn', year: '2026', color: 'from-orange-500 to-red-500' },
    { name: 'Python Programming & ML', org: 'Self-directed Learning', year: '2025–2026', color: 'from-green-500 to-teal-500' },
    { name: 'AI & ML COHART', org: 'Intern Geek', year: '2026', color: 'from-indigo-500 to-blue-500' },
  ];

  const goals = {
    shortTerm: [
      'Complete Data Science with Gen AI course (PW Skills)',
      'Build 5+ end-to-end ML projects for portfolio',
      'Land first AI/ML internship/job',
      'Complete Agentic AI & LangChain deep-dive',
      'Contribute to an open-source ML library',
    ],
    longTerm: [
      'Become a skilled AI Engineer at a product company',
      'Work on cutting-edge generative AI products',
      'Publish research or technical blog posts',
      'Build an AI-powered SaaS product',
    ],
  };

  const projects = [
    {
      name: 'DataMind Pro', emoji: '📊', tag: 'AI · Full Stack',
      gradient: 'from-blue-400/25 to-cyan-300/25',
      gradientHover: 'from-blue-400/40 to-cyan-300/40',
      border: 'border-blue-300/60', titleColor: 'text-blue-600',
      tagBg: 'bg-blue-100 text-blue-600',
      description: 'AI-powered data analysis platform — upload any CSV/Excel and get auto EDA, ML models, Groq LLM insights, PDF/PPT reports, and a chatbot. Built with Flask + 9 Blueprints + Groq Llama 3.3 70B.',
      stack: ['Flask', 'Python', 'Groq API', 'Scikit-learn', 'Plotly'],
      github: 'https://github.com/Vaibhavsharma45/Auto_analyst',
      live: 'https://datamind-pro.onrender.com', stars: 1,
    },
    {
      name: 'Bujji AI', emoji: '🤖', tag: 'AI · Voice Assistant',
      gradient: 'from-violet-400/25 to-purple-300/25',
      gradientHover: 'from-violet-400/40 to-purple-300/40',
      border: 'border-violet-300/60', titleColor: 'text-violet-600',
      tagBg: 'bg-violet-100 text-violet-600',
      description: 'Personal JARVIS-style voice assistant — wake word "Hey Robo", LangGraph ReAct agent, ChromaDB memory, PC control, WhatsApp/email, browser automation, and a web dashboard. 100% free stack.',
      stack: ['Python', 'LangGraph', 'Groq API', 'FastAPI', 'ChromaDB'],
      github: 'https://github.com/Vaibhavsharma45/Bujji_AI',
      live: null, stars: 0,
    },
    {
      name: 'Marg Darshak', emoji: '🧭', tag: 'AI · Web App',
      gradient: 'from-emerald-400/25 to-teal-300/25',
      gradientHover: 'from-emerald-400/40 to-teal-300/40',
      border: 'border-emerald-300/60', titleColor: 'text-emerald-600',
      tagBg: 'bg-emerald-100 text-emerald-600',
      description: 'Comprehensive web platform combining Career Compass (AI career recommendations), Gyan Kosh (spiritual wisdom repository), and Skill Saathi (curated learning resources) — solving real student pain-points.',
      stack: ['Flask', 'Python', 'Scikit-learn', 'Seaborn', 'ML'],
      github: 'https://github.com/Vaibhavsharma45/marg-darshak',
      live: 'https://marg-darshak.onrender.com', stars: 1,
    },
    {
      name: 'Resume Analyser', emoji: '📄', tag: 'AI · NLP',
      gradient: 'from-orange-400/25 to-amber-300/25',
      gradientHover: 'from-orange-400/40 to-amber-300/40',
      border: 'border-orange-300/60', titleColor: 'text-orange-600',
      tagBg: 'bg-orange-100 text-orange-600',
      description: 'AI-powered resume analysis tool — parses uploaded PDFs, extracts skills and keywords, scores against job descriptions, and suggests improvements using NLP techniques.',
      stack: ['Python', 'Flask', 'NLP', 'JavaScript', 'CSS'],
      github: 'https://github.com/Vaibhavsharma45/Resume_Analyser',
      live: 'https://resume-analyser-gbp1.vercel.app/', stars: 1,
    },
    {
      name: 'Crypto Volatility Predictor', emoji: '📈', tag: 'ML · Finance',
      gradient: 'from-yellow-400/25 to-lime-300/25',
      gradientHover: 'from-yellow-400/40 to-lime-300/40',
      border: 'border-yellow-300/60', titleColor: 'text-yellow-600',
      tagBg: 'bg-yellow-100 text-yellow-700',
      description: 'End-to-end ML pipeline predicting 7-day crypto volatility using Random Forest with 14 engineered features (ATR, Bollinger Bands, momentum). Achieves R² ~0.85 with Streamlit deployment.',
      stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Plotly'],
      github: 'https://github.com/Vaibhavsharma45/crypto-volatility-prediction-project',
      live: 'https://crypto-volatility-prediction-project-mak4penaud7jwri5vptzto.streamlit.app/', stars: 2,
    },
    {
      name: 'Birth Weight Predictor', emoji: '🏥', tag: 'ML · Healthcare',
      gradient: 'from-pink-400/25 to-rose-300/25',
      gradientHover: 'from-pink-400/40 to-rose-300/40',
      border: 'border-pink-300/60', titleColor: 'text-pink-600',
      tagBg: 'bg-pink-100 text-pink-600',
      description: 'Machine learning model predicting birth weight from maternal health indicators with 92%+ accuracy using regression techniques. Deployed as an interactive web app.',
      stack: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Seaborn'],
      github: 'https://github.com/Vaibhavsharma45/birth-weight-predictor',
      live: 'https://birth-weight-predictor.onrender.com', stars: 1,
    },
  ];

  // ── CONTACT WITH EMAILJS ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  // ── AI PROJECT DESCRIPTION ────────────────────────────────────────────────
  const AIDescription = ({ repo }) => {
    const [desc, setDesc] = useState(repo.description || '');
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(false);
    const generate = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ANTHROPIC_MODEL, max_tokens: 1000,
            messages: [{ role: 'user', content: `Write a concise 2-sentence professional description for a GitHub repository called "${repo.name}" by an AI/ML engineer. Description: "${repo.description || 'No description'}". Language: ${repo.language || 'Unknown'}. Stars: ${repo.stargazers_count}. Make it impressive for a job portfolio. Return ONLY the 2 sentences.` }],
          }),
        });
        const data = await res.json();
        const text = data.content?.find(b => b.type === 'text')?.text;
        if (text) setDesc(text);
        setGenerated(true);
      } catch { setGenerated(true); }
      setLoading(false);
    };
    return (
      <div className="mb-3">
        {!generated ? (
          <button onClick={generate} disabled={loading}
            className="text-xs px-3 py-1 border border-dashed border-blue-400 text-blue-400 rounded-full hover:bg-blue-500/10 transition-all duration-200">
            {loading ? '⏳ Generating…' : '✨ AI Description'}
          </button>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{desc}</p>
        )}
      </div>
    );
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-amber-50 text-gray-900'} relative overflow-hidden`}>

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div key={i} className={`absolute rounded-full ${darkMode ? 'bg-blue-500' : 'bg-purple-400'}`}
              style={{
                width: Math.random() * 4 + 1 + 'px', height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%', left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: Math.random() * 5 + 's',
              }} />
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">VS</div>
            <div className="hidden md:flex space-x-8">
              {['Home','About','Skills','Experience','Projects','Certifications','Goals','Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className={`relative hover:text-blue-500 transition-all duration-300 ${activeSection === item.toLowerCase() ? 'text-blue-500 font-semibold' : ''} group`}>
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : ''}`}></span>
                </a>
              ))}
            </div>
            <button onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full hover:scale-110 transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-900 text-yellow-400'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className={`pt-32 pb-20 px-4 relative transition-opacity duration-1000 ${isVisible.home ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 relative">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold text-white shadow-2xl animate-[pulse_3s_ease-in-out_infinite] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              VS
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Vaibhav Sharma</span>
          </h1>
          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center gap-2">
            Aspiring <span className="text-blue-500 font-semibold min-w-[300px] text-left">{typedText}</span>
            <span className="animate-pulse text-blue-500">|</span>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Data Science with Gen AI Learner · Building AI Solutions that Matter
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: Github, link: 'https://github.com/Vaibhavsharma45', color: 'hover:bg-gray-800' },
              { icon: Linkedin, link: 'https://linkedin.com/in/vaibhav-0sharma', color: 'hover:bg-blue-600' },
              { icon: Mail, link: 'mailto:vaibhavsharma95124v@gmail.com', color: 'hover:bg-red-500' },
            ].map((s, idx) => (
              <a key={idx} href={s.link} target={s.link.startsWith('http') ? '_blank' : undefined}
                rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 ${s.color} hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-2xl`}>
                <s.icon size={24} />
              </a>
            ))}
          </div>
          <button onClick={handleDownloadResume}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Download size={20} className="relative z-10 group-hover:animate-bounce" />
            <span className="relative z-10">Download Resume</span>
          </button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <User className="text-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="transform hover:scale-105 transition-all duration-500 group">
              <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} backdrop-blur-sm shadow-xl hover:shadow-2xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="text-yellow-500" /> Who I Am
                </h3>
                <p className="text-lg leading-relaxed mb-4 relative z-10">
                  I'm <strong>Vaibhav Sharma</strong>, an aspiring AI & ML Engineer from Muzaffarnagar, UP. I recently completed my BCA and am actively building expertise in Python, Machine Learning, and Data Science — combining coursework at PW Skills with hands-on project development.
                </p>
                <p className="text-lg leading-relaxed mb-4 relative z-10">
                  I focus on <strong>strong fundamentals and real projects</strong> over shortcuts. From building ML models to deploying Flask APIs, I want to understand every layer of the stack.
                </p>
                <p className="text-lg leading-relaxed relative z-10">
                  My philosophy: <span className="italic font-semibold text-blue-500 animate-pulse">"Jo kuch bhi hota hai, ache ke liye hota hai"</span> — this mindset keeps me going through challenges.
                </p>
              </div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-500 group">
              <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} backdrop-blur-sm shadow-xl hover:shadow-2xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'} relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 relative z-10">
                  <Heart className="text-red-500 animate-[pulse_2s_ease-in-out_infinite]" /> Personal Interests
                </h3>
                <ul className="space-y-3 text-lg relative z-10">
                  {[
                    'Staying updated with latest AI/ML research and trends',
                    'Regular exercise and playing cricket with friends',
                    'Reading powerful thoughts and articles for personal growth',
                    'Exploring astrology and self-improvement methods',
                    'Building side projects and experimenting with new tools',
                    'Watching tech talks and following AI researchers on social media',
                  ].map((interest, idx) => (
                    <li key={idx} className="flex items-start gap-2 hover:translate-x-2 transition-transform duration-300">
                      <span className="text-blue-500 text-xl">•</span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section id="challenges" className={`py-20 px-4 transition-all duration-1000 ${isVisible.challenges ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <TrendingUp className="text-blue-500 animate-bounce" />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Challenges & Growth</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((c, i) => (
              <div key={i} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10">{c.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-500 relative z-10 group-hover:text-purple-500 transition-colors duration-300">{c.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Code className="text-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Technical Skills</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Zap className="text-yellow-500 group-hover:animate-bounce" />
                  <h3 className="text-lg font-semibold text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg cursor-pointer">
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
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Briefcase className="text-blue-500 animate-bounce" />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 relative z-10">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{exp.role}</h3>
                    <p className="text-xl font-medium mt-1">{exp.company}</p>
                  </div>
                  <span className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300`}>
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed relative z-10">{exp.description}</p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {exp.skills.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm hover:from-pink-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
            <Github className="text-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12 text-sm">Real projects — built, deployed, and live 🚀</p>

          {/* Featured Projects */}
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-yellow-500">📌</span>
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>Featured Projects</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {projects.map((project, i) => (
              <div key={i}
                className={`p-6 rounded-2xl bg-gradient-to-br ${darkMode ? 'from-gray-700/80 to-gray-800/80' : project.gradient} backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-[1.03] border-2 ${project.border} group relative overflow-hidden flex flex-col cursor-pointer`}>

                {/* Shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-10 pointer-events-none"></div>

                {/* Glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientHover} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none`}></div>

                {/* Header */}
                <div className="flex items-start justify-between mb-3 relative z-20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 inline-block">{project.emoji}</span>
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : project.titleColor} transition-all duration-300 leading-tight`}>{project.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${darkMode ? 'bg-gray-600 text-gray-300' : project.tagBg}`}>{project.tag}</span>
                    </div>
                  </div>
                  {project.stars > 0 && <span className="text-xs text-yellow-500 font-mono">⭐ {project.stars}</span>}
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 relative z-20 flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4 relative z-20">
                  {project.stack.map((tech, ti) => (
                    <span key={ti}
                      className={`text-xs px-2 py-0.5 rounded-full font-mono border hover:scale-110 transition-transform duration-200 cursor-default ${darkMode ? 'bg-gray-600/60 border-gray-500 text-gray-200' : 'bg-white/70 border-white/60 text-gray-600'}`}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 relative z-20 mt-auto">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md">
                    <Github size={13} /> Code
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-85 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md">
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  ) : (
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default ${darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                      🖥️ Local
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Latest GitHub Repos */}
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Github size={20} className="text-blue-500" />
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>Latest GitHub Repos</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {githubRepos.length > 0 ? githubRepos.map((repo, i) => (
              <div key={i} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden flex flex-col`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                <h3 className="text-xl font-semibold mb-2 text-blue-500 group-hover:text-purple-500 transition-colors duration-300 relative z-10">{repo.name}</h3>
                <div className="relative z-10 flex-1">
                  <AIDescription repo={repo} />
                </div>
                <div className="flex justify-between items-center relative z-10 mt-auto">
                  {repo.language && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs">{repo.language}</span>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>⭐ {repo.stargazers_count}</span>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                      className="text-blue-500 hover:text-purple-500 transform hover:scale-125 transition-all duration-300">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 animate-pulse">Loading projects…</div>
            )}
          </div>

          {/* Explore Button */}
          <div className="text-center">
            <a href="https://github.com/Vaibhavsharma45" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <Github size={22} />
              Explore All Projects on GitHub
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className={`py-20 px-4 transition-all duration-1000 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Award className="text-blue-500 animate-bounce" />
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Certifications & Learning</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="flex items-start gap-4 relative z-10">
                  <Award className="text-yellow-500 mt-1 group-hover:animate-bounce flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-300">{cert.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{cert.org}</p>
                    <p className={`text-sm bg-gradient-to-r ${cert.color} bg-clip-text text-transparent font-semibold mt-2`}>{cert.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOALS ── */}
      <section id="goals" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.goals ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Target className="text-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">My Goals</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-blue-500/0 group-hover:from-green-500/20 group-hover:to-blue-500/20 transition-all duration-500"></div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-500 group-hover:text-green-500 transition-colors duration-300 relative z-10">Short-term Goals</h3>
              <ul className="space-y-4 relative z-10">
                {goals.shortTerm.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-lg">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-500 group-hover:text-pink-500 transition-colors duration-300 relative z-10">Long-term Goals</h3>
              <ul className="space-y-4 relative z-10">
                {goals.longTerm.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <span className="text-purple-500 text-2xl">★</span>
                    <span className="text-lg">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={`py-20 px-4 transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Mail className="text-blue-500 animate-bounce" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              {[
                { icon: Mail, text: 'vaibhavsharma95124v@gmail.com', link: 'mailto:vaibhavsharma95124v@gmail.com' },
                { icon: Phone, text: '+91-9012907709', link: 'tel:+919012907709' },
                { icon: Github, text: 'github.com/Vaibhavsharma45', link: 'https://github.com/Vaibhavsharma45' },
                { icon: Linkedin, text: 'linkedin.com/in/vaibhav-0sharma', link: 'https://linkedin.com/in/vaibhav-0sharma' },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center gap-3 transform hover:translate-x-4 transition-all duration-300 group">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300`}>
                    <c.icon className="text-blue-500 group-hover:text-white transition-colors duration-300" size={20} />
                  </div>
                  <a href={c.link} target={c.link.startsWith('http') ? '_blank' : undefined}
                    rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:text-blue-500 transition-colors duration-300">{c.text}</a>
                </div>
              ))}
            </div>
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105 outline-none`} />
                <input type="email" placeholder="Your Email" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105 outline-none`} />
                <textarea placeholder="Your Message" value={formData.message} rows="4"
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105 outline-none resize-none`} />
                <button onClick={handleSubmit} disabled={formStatus === 'sending'}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group disabled:opacity-70">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? '✓ Message Sent!' : 'Send Message'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`py-8 text-center ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">
          © {new Date().getFullYear()} Vaibhav Sharma · "Jo kuch bhi hota hai, ache ke liye hota hai" ❤️
        </p>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 z-50 animate-bounce">
          <ArrowUp size={24} />
        </button>
      )}

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Portfolio;