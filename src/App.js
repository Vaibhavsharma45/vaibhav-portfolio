import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Moon, Sun, Download, ExternalLink, Award, Target, Briefcase, Code, User, Heart, TrendingUp, ArrowUp, Sparkles, Zap } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [githubRepos, setGithubRepos] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  const roles = ['AI Engineer', 'Data Scientist', 'ML Enthusiast', 'Problem Solver'];
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
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [roleIndex]);

  useEffect(() => {
    fetch('https://api.github.com/users/vaibhavsharma45/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => setGithubRepos(data))
      .catch(err => console.log(err));
  }, [roles]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      const sections = ['home', 'about', 'challenges', 'skills', 'experience', 'projects', 'certifications', 'goals', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skills = {
    'Languages': ['Python', 'C++', 'HTML', 'CSS', 'SQL'],
    'ML/Data Science': ['TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Plotly', 'Bokeh'],
    'Tools & Platforms': ['Power BI', 'Git', 'VS Code', 'Jupyter', 'IntelliJ', 'Render', 'Google Colab', 'Postman', 'Kaggle'],
    'Databases': ['MySQL', 'MongoDB'],
    'Web Development': ['Flask', 'HTML', 'CSS', 'JavaScript']
  };

  const experiences = [
    {
      role: 'Data Analyst Intern',
      company: 'Inten Geek',
      duration: 'Nov 2025 - Dec 2025',
      description: 'Developed and deployed an interactive Power BI Dashboard analyzing the Titanic Survival Dataset. Applied core data analysis skills to visualize key metrics (KPIs) and provide actionable insights regarding survival rates based on Pclass and Gender. Gained hands-on experience with Power BI Desktop and Google Sheets, strengthening expertise in data storytelling and visualization.',
      skills: ['Power BI', 'Data Analysis', 'Google Sheets', 'Data Visualization']
    },
    {
      role: 'Full Stack Developer',
      company: 'Marg Darshak (Personal Project)',
      duration: '2025',
      description: 'Built a comprehensive web platform combining Career Compass (AI-powered career recommendations), Gyan Kosh (digital spiritual wisdom repository), and Skill Saathi (curated learning resources). Addressed real student challenges: career confusion, accessible wisdom, and scattered learning resources.',
      skills: ['Flask', 'Python', 'Seaborn', 'Machine Learning', 'Web Development']
    }
  ];

  const challenges = [
    {
      title: 'Self-taught ML Journey',
      description: 'Learned Python and Machine Learning independently without formal mentorship, building small projects that eventually gained peer recognition.',
      icon: '🚀'
    },
    {
      title: 'Mastering Complex Algorithms',
      description: 'Struggled initially with ML algorithms; revisited foundational mathematics and practiced extensively with multiple datasets to build understanding.',
      icon: '🧠'
    },
    {
      title: 'Kaggle Comeback Story',
      description: 'First Kaggle competition attempt was unsuccessful. Analyzed mistakes, practiced continuously, and achieved top 20% finish in subsequent competitions.',
      icon: '🏆'
    },
    {
      title: 'Resource Optimization',
      description: 'Limited GPU access initially required using lightweight models and cloud resources while balancing learning with other responsibilities.',
      icon: '⚡'
    }
  ];

  const certifications = [
    { name: 'Data Science with Gen AI', org: 'PW Skills', year: '2025-Present (Ongoing)', color: 'from-blue-500 to-cyan-500' },
    { name: 'Power BI for Data Analytics', org: 'Various Masterclasses', year: '2025', color: 'from-purple-500 to-pink-500' },
    { name: 'Python Programming & ML', org: 'Self-learned', year: '2025', color: 'from-green-500 to-teal-500' },
    { name: 'Agentic AI 60 Days Roadmap', org: 'Self-paced Learning', year: '2025-2025 (Ongoing)', color: 'from-orange-500 to-red-500' }
  ];

  const goals = {
    shortTerm: [
      'Complete Data Science with Gen AI course',
      'Build 5+ ML projects for portfolio',
      'Get AI/ML internship',
      'Complete Agentic AI journey'
    ],
    longTerm: [
      'Become a skilled AI Engineer',
      'Work on cutting-edge AI products',
      'Contribute to open-source AI projects'
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(VaibhavSharmaRes.pdf);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleDownloadResume = () => {
    alert('VaibhavSharmaRes.pdf');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${darkMode ? 'bg-blue-500' : 'bg-purple-400'}`}
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference bg-white transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              VS
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Goals', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative hover:text-blue-500 transition-all duration-300 ${activeSection === item.toLowerCase() ? 'text-blue-500 font-semibold' : ''} group`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : ''}`}></span>
                </a>
              ))}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full hover:scale-110 transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-900 text-yellow-400'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`pt-32 pb-20 px-4 relative transition-opacity duration-1000 ${isVisible.home ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 relative">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold text-white shadow-2xl animate-[pulse_3s_ease-in-out_infinite] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              VS
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
            Hi, I'm <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-[gradient_3s_ease-in-out_infinite]">Vaibhav Sharma</span>
          </h1>
          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center gap-2">
            Aspiring <span className="text-blue-500 font-semibold min-w-[300px] text-left">{typedText}</span>
            <span className="animate-pulse text-blue-500">|</span>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-[fadeIn_1.5s_ease-out]">
            BCA Graduate | Data Science with Gen AI Learner | Building AI Solutions
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: Github, link: 'https://github.com/vaibhavsharma45', color: 'hover:bg-gray-800' },
              { icon: Linkedin, link: 'https://linkedin.com/in/vaibhav-0sharma', color: 'hover:bg-blue-600' },
              { icon: Mail, link: 'mailto:vaibhavsharma95124v@gmail.com', color: 'hover:bg-red-500' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target={social.link.startsWith('http') ? '_blank' : undefined}
                rel={social.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-2xl`}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
          <button onClick={handleDownloadResume} className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Download size={20} className="relative z-10 group-hover:animate-bounce" />
            <span className="relative z-10">Download Resume</span>
          </button>
        </div>
      </section>

      {/* About Section */}
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
                  <Sparkles className="text-yellow-500" />
                  Who I Am
                </h3>
                <p className="text-lg leading-relaxed mb-6 relative z-10">
                  I'm Vaibhav Sharma, an aspiring AI Engineer currently in the learning phase. I recently completed my BCA and am actively exploring the data science field while building various projects. I'm pursuing a Data Science with Gen AI course on PW Skills, combining theoretical knowledge with hands-on project development.
                </p>
                <p className="text-lg leading-relaxed relative z-10">
                  I believe in the philosophy: <span className="italic font-semibold text-blue-500 animate-pulse">"Jo kuch bhi hota hai, ache ke liye hota hai"</span> (Whatever happens, happens for good). This mindset keeps me motivated through challenges and continuous learning.
                </p>
              </div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-500 group">
              <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} backdrop-blur-sm shadow-xl hover:shadow-2xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'} relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 relative z-10">
                  <Heart className="text-red-500 animate-[pulse_2s_ease-in-out_infinite]" />
                  Personal Interests
                </h3>
                <ul className="space-y-3 text-lg relative z-10">
                  {[
                    'Exploring new technologies and staying updated with AI/ML trends',
                    'Regular exercise and playing cricket',
                    'Reading articles and powerful thoughts for personal growth',
                    'Exploring astrology and finding methods for self-improvement',
                    'Gaining diverse experiences and trying new things'
                  ].map((interest, idx) => (
                    <li key={idx} className="flex items-start gap-2 group/item hover:translate-x-2 transition-transform duration-300">
                      <span className="text-blue-500 text-xl group-hover/item:scale-125 transition-transform duration-300">•</span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className={`py-20 px-4 transition-all duration-1000 ${isVisible.challenges ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <TrendingUp className="text-blue-500 animate-bounce" />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Challenges & Growth</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10">{challenge.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-500 relative z-10 group-hover:text-purple-500 transition-colors duration-300">{challenge.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Code className="text-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Technical Skills</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], catIdx) => (
              <div key={category} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Zap className="text-yellow-500 group-hover:animate-bounce" />
                  <h3 className="text-xl font-semibold text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {items.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl cursor-pointer">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-4 transition-all duration-1000 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Briefcase className="text-blue-500 animate-bounce" />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
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
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm hover:from-pink-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg cursor-pointer">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Github className="text-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">GitHub Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {githubRepos.length > 0 ? githubRepos.map((repo, index) => (
              <div key={index} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform hover:scale-105 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                <h3 className="text-xl font-semibold mb-2 text-blue-500 group-hover:text-purple-500 transition-colors duration-300 relative z-10">{repo.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2 relative z-10">
                  {repo.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center relative z-10">
                  {repo.language && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs transform group-hover:scale-110 transition-all duration-300">
                      {repo.language}
                    </span>
                  )}
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-purple-500 transform hover:scale-125 hover:rotate-12 transition-all duration-300">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 animate-pulse">Loading projects...</div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className={`py-20 px-4 transition-all duration-1000 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Award className="text-blue-500 animate-bounce" />
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Certifications & Learning</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="flex items-start gap-4 relative z-10">
                  <Award className={`text-yellow-500 mt-1 group-hover:animate-bounce flex-shrink-0`} />
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

      {/* Goals Section */}
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
                {goals.shortTerm.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300 group/item">
                    <span className="text-green-500 text-2xl group-hover/item:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-lg">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-500 group-hover:text-pink-500 transition-colors duration-300 relative z-10">Long-term Goals</h3>
              <ul className="space-y-4 relative z-10">
                {goals.longTerm.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300 group/item">
                    <span className="text-purple-500 text-2xl group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300">★</span>
                    <span className="text-lg">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
                { icon: Github, text: 'github.com/vaibhavsharma45', link: 'https://github.com/vaibhavsharma45' },
                { icon: Linkedin, text: 'linkedin.com/in/vaibhav-0sharma', link: 'https://linkedin.com/in/vaibhav-0sharma' },
              ].map((contact, idx) => (
                <div key={idx} className="flex items-center gap-3 transform hover:translate-x-4 transition-all duration-300 group">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300`}>
                    <contact.icon className="text-blue-500 group-hover:text-white transition-colors duration-300" size={20} />
                  </div>
                  <a href={contact.link} target={contact.link.startsWith('http') ? '_blank' : undefined} rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="hover:text-blue-500 transition-colors duration-300">
                    {contact.text}
                  </a>
                </div>
              ))}
            </div>
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105`}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105`}
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105`}
                />
                <button onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">
          © 2025 Vaibhav Sharma. Built with React & Tailwind CSS. "Everything happens for a reason". ❤️
        </p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 z-50 animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;