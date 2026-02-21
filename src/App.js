// import WhyHireMe from "./components/WhyHIreme";
// import CurrentlyLearning from "./components/CurrentlyLearning";
// import React, { useState, useEffect, useMemo } from 'react';
// import { Github, Linkedin, Mail, Phone, Moon, Sun, Download, ExternalLink, Award, Target, Briefcase, Code, User, Heart, TrendingUp, ArrowUp, Sparkles, Zap } from 'lucide-react';

// const Portfolio = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const [typedText, setTypedText] = useState('');
//   const [githubRepos, setGithubRepos] = useState([]);
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isVisible, setIsVisible] = useState({});

//   const roles = useMemo(() => ['AI Engineer', 'Data Scientist', 'ML Enthusiast', 'Problem Solver'], []);
//   const [roleIndex, setRoleIndex] = useState(0);

//   useEffect(() => {
//     const text = roles[roleIndex];
//     let index = 0;
//     const timer = setInterval(() => {
//       if (index <= text.length) {
//         setTypedText(text.slice(0, index));
//         index++;
//       } else {
//         clearInterval(timer);
//         setTimeout(() => {
//           setRoleIndex((prev) => (prev + 1) % roles.length);
//         }, 2000);
//       }
//     }, 100);
//     return () => clearInterval(timer);
//   }, [roleIndex, roles]);

//   useEffect(() => {
//     fetch('https://api.github.com/users/vaibhavsharma45/repos?sort=updated&per_page=6')
//       .then(res => res.json())
//       .then(data => setGithubRepos(data))
//       .catch(err => console.log(err));
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 300);
      
//       const sections = ['home', 'about', 'challenges', 'skills', 'experience', 'projects', 'certifications', 'goals', 'contact'];
//       const current = sections.find(section => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           return rect.top <= 100 && rect.bottom >= 100;
//         }
//         return false;
//       });
//       if (current) setActiveSection(current);
//     };

//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           setIsVisible(prev => ({
//             ...prev,
//             [entry.target.id]: entry.isIntersecting
//           }));
//         });
//       },
//       { threshold: 0.1 }
//     );

//     document.querySelectorAll('section[id]').forEach(section => {
//       observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const skills = {
//     'Languages': ['Python', 'C++', 'HTML', 'CSS', 'SQL'],
//     'ML/Data Science': ['TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Plotly', 'Bokeh'],
//     'Tools & Platforms': ['Power BI', 'Git', 'VS Code', 'Jupyter', 'IntelliJ', 'Render', 'Google Colab', 'Postman', 'Kaggle'],
//     'Databases': ['MySQL', 'MongoDB'],
//     'Web Development': ['Flask', 'HTML', 'CSS', 'JavaScript']
//   };

//   const experiences = [
//     {
//       role: 'Data Analyst Intern',
//       company: 'Inten Geek',
//       duration: 'Nov 2025 - Dec 2025',
//       description: 'Developed and deployed an interactive Power BI Dashboard analyzing the Titanic Survival Dataset. Applied core data analysis skills to visualize key metrics (KPIs) and provide actionable insights regarding survival rates based on Pclass and Gender. Gained hands-on experience with Power BI Desktop and Google Sheets, strengthening expertise in data storytelling and visualization.',
//       skills: ['Power BI', 'Data Analysis', 'Google Sheets', 'Data Visualization']
//     },
//     {
//       role: 'Full Stack Developer',
//       company: 'Marg Darshak (Personal Project)',
//       duration: '2025',
//       description: 'Built a comprehensive web platform combining Career Compass (AI-powered career recommendations), Gyan Kosh (digital spiritual wisdom repository), and Skill Saathi (curated learning resources). Addressed real student challenges: career confusion, accessible wisdom, and scattered learning resources.',
//       skills: ['Flask', 'Python', 'Seaborn', 'Machine Learning', 'Web Development']
//     }
//   ];

//   const challenges = [
//     {
//       title: 'Self-taught ML Journey',
//       description: 'Learned Python and Machine Learning independently without formal mentorship, building small projects that eventually gained peer recognition.',
//       icon: '🚀'
//     },
//     {
//       title: 'Mastering Complex Algorithms',
//       description: 'Struggled initially with ML algorithms; revisited foundational mathematics and practiced extensively with multiple datasets to build understanding.',
//       icon: '🧠'
//     },
//     {
//       title: 'Kaggle Comeback Story',
//       description: 'First Kaggle competition attempt was unsuccessful. Analyzed mistakes, practiced continuously, and achieved top 20% finish in subsequent competitions.',
//       icon: '🏆'
//     },
//     {
//       title: 'Resource Optimization',
//       description: 'Limited GPU access initially required using lightweight models and cloud resources while balancing learning with other responsibilities.',
//       icon: '⚡'
//     }
//   ];

//   const certifications = [
//     { name: 'Data Science with Gen AI', org: 'PW Skills', year: '2025-Present (Ongoing)', color: 'from-blue-500 to-cyan-500' },
//     { name: 'Gen AI for all', org: 'PW Skills', year: '2025', color: 'from-purple-500 to-pink-500' },
//     { name: 'Python Programming & ML', org: 'Self-learned', year: '2025-2026', color: 'from-green-500 to-teal-500' },
//     { name: 'Introduction to Prompt Engineering', org: 'Simplilearn', year: '2026', color: 'from-orange-500 to-red-500' }
//   ];

//   const goals = {
//     shortTerm: [
//       'Complete Data Science with Gen AI course',
//       'Build 5+ ML projects for portfolio',
//       'Get AI/ML internship',
//       'Complete Agentic AI journey'
//     ],
//     longTerm: [
//       'Become a skilled AI Engineer',
//       'Work on cutting-edge AI products',
//       'Contribute to open-source AI projects'
//     ]
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Thanks for reaching out! I will get back to you soon. 😊');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const handleDownloadResume = () => {
//     const resumeUrl = '/Vaibhav_Sharma_Resume.pdf';
//     const link = document.createElement('a');
//     link.href = resumeUrl;
//     link.download = 'Vaibhav_Sharma_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
//       {/* Animated Background */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         <div className="absolute inset-0 opacity-30">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className={`absolute rounded-full ${darkMode ? 'bg-blue-500' : 'bg-purple-400'}`}
//               style={{
//                 width: Math.random() * 4 + 1 + 'px',
//                 height: Math.random() * 4 + 1 + 'px',
//                 top: Math.random() * 100 + '%',
//                 left: Math.random() * 100 + '%',
//                 animation: `float ${Math.random() * 10 + 10}s linear infinite`,
//                 animationDelay: Math.random() * 5 + 's'
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Mouse Follower */}
//       <div
//         className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference bg-white transition-transform duration-100"
//         style={{
//           left: mousePosition.x - 12,
//           top: mousePosition.y - 12,
//           transform: 'translate(-50%, -50%)'
//         }}
//       />

//       {/* Navigation */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
//               VS
//             </div>
//             <div className="hidden md:flex space-x-8">
//               {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Goals', 'Contact'].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`relative hover:text-blue-500 transition-all duration-300 ${activeSection === item.toLowerCase() ? 'text-blue-500 font-semibold' : ''} group`}
//                 >
//                   {item}
//                   <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : ''}`}></span>
//                 </a>
//               ))}
//             </div>
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`p-2 rounded-full hover:scale-110 transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-900 text-yellow-400'}`}
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className={`pt-32 pb-20 px-4 relative transition-opacity duration-1000 ${isVisible.home ? 'opacity-100' : 'opacity-0'}`}>
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <div className="mb-8 relative">
//             <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold text-white shadow-2xl animate-[pulse_3s_ease-in-out_infinite] relative overflow-hidden group">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
//               VS
//             </div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
//           </div>
//           <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
//             Hi, I'm <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-[gradient_3s_ease-in-out_infinite]">Vaibhav Sharma</span>
//           </h1>
//           <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center gap-2">
//             Aspiring <span className="text-blue-500 font-semibold min-w-[300px] text-left">{typedText}</span>
//             <span className="animate-pulse text-blue-500">|</span>
//           </div>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-[fadeIn_1.5s_ease-out]">
//             BCA Graduate | Data Science with Gen AI Learner | Building AI Solutions
//           </p>
//           <div className="flex justify-center gap-4 mb-8">
//             {[
//               { icon: Github, link: 'https://github.com/vaibhavsharma45', color: 'hover:bg-gray-800' },
//               { icon: Linkedin, link: 'https://linkedin.com/in/vaibhav-0sharma', color: 'hover:bg-blue-600' },
//               { icon: Mail, link: 'mailto:vaibhavsharma95124v@gmail.com', color: 'hover:bg-red-500' }
//             ].map((social, idx) => (
//               <a
//                 key={idx}
//                 href={social.link}
//                 target={social.link.startsWith('http') ? '_blank' : undefined}
//                 rel={social.link.startsWith('http') ? 'noopener noreferrer' : undefined}
//                 className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-2xl`}
//               >
//                 <social.icon size={24} />
//               </a>
//             ))}
//           </div>
//           <button onClick={handleDownloadResume} className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden group">
//             <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <Download size={20} className="relative z-10 group-hover:animate-bounce" />
//             <span className="relative z-10">Download Resume</span>
//           </button>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <User className="text-blue-500 animate-pulse" />
//             <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">About Me</span>
//           </h2>
//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="transform hover:scale-105 transition-all duration-500 group">
//               <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} backdrop-blur-sm shadow-xl hover:shadow-2xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'} relative overflow-hidden`}>
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
//                 <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//                   <Sparkles className="text-yellow-500" />
//                   Who I Am
//                 </h3>
//                 <p className="text-lg leading-relaxed mb-6 relative z-10">
//                   I'm Vaibhav Sharma, an aspiring AI Engineer currently in the learning phase. I recently completed my BCA and am actively exploring the data science field while building various projects. I'm pursuing a Data Science with Gen AI course on PW Skills, combining theoretical knowledge with hands-on project development.
//                 </p>
//                 <p className="text-lg leading-relaxed relative z-10">
//                   I believe in the philosophy: <span className="italic font-semibold text-blue-500 animate-pulse">"Jo kuch bhi hota hai, ache ke liye hota hai"</span> (Whatever happens, happens for good). This mindset keeps me motivated through challenges and continuous learning.
//                 </p>
//               </div>
//             </div>
//             <div className="transform hover:scale-105 transition-all duration-500 group">
//               <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} backdrop-blur-sm shadow-xl hover:shadow-2xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'} relative overflow-hidden`}>
//                 <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
//                 <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 relative z-10">
//                   <Heart className="text-red-500 animate-[pulse_2s_ease-in-out_infinite]" />
//                   Personal Interests
//                 </h3>
//                 <ul className="space-y-3 text-lg relative z-10">
//                   {[
//                     'Exploring new technologies and staying updated with AI/ML trends',
//                     'Regular exercise and playing cricket',
//                     'Reading articles and powerful thoughts for personal growth',
//                     'Exploring astrology and finding methods for self-improvement',
//                     'Gaining diverse experiences and trying new things'
//                   ].map((interest, idx) => (
//                     <li key={idx} className="flex items-start gap-2 group/item hover:translate-x-2 transition-transform duration-300">
//                       <span className="text-blue-500 text-xl group-hover/item:scale-125 transition-transform duration-300">•</span>
//                       <span>{interest}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Challenges Section */}
//       <section id="challenges" className={`py-20 px-4 transition-all duration-1000 ${isVisible.challenges ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <TrendingUp className="text-blue-500 animate-bounce" />
//             <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Challenges & Growth</span>
//           </h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             {challenges.map((challenge, index) => (
//               <div key={index} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
//                 <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10">{challenge.icon}</div>
//                 <h3 className="text-xl font-semibold mb-3 text-blue-500 relative z-10 group-hover:text-purple-500 transition-colors duration-300">{challenge.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 relative z-10">{challenge.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Skills Section */}
//       <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <Code className="text-blue-500 animate-pulse" />
//             <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Technical Skills</span>
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {Object.entries(skills).map(([category, items]) => (
//               <div key={category} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
//                 <div className="flex items-center gap-2 mb-4 relative z-10">
//                   <Zap className="text-yellow-500 group-hover:animate-bounce" />
//                   <h3 className="text-xl font-semibold text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{category}</h3>
//                 </div>
//                 <div className="flex flex-wrap gap-2 relative z-10">
//                   {items.map((skill, index) => (
//                     <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl cursor-pointer">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <WhyHireMe />
// <CurrentlyLearning />


//       {/* Experience Section */}
//       <section id="experience" className={`py-20 px-4 transition-all duration-1000 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <Briefcase className="text-blue-500 animate-bounce" />
//             <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Experience</span>
//           </h2>
//           <div className="space-y-8">
//             {experiences.map((exp, index) => (
//               <div key={index} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
//                 <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 relative z-10">
//                   <div>
//                     <h3 className="text-2xl font-semibold text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{exp.role}</h3>
//                     <p className="text-xl font-medium mt-1">{exp.company}</p>
//                   </div>
//                   <span className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300`}>
//                     {exp.duration}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed relative z-10">{exp.description}</p>
//                 <div className="flex flex-wrap gap-2 relative z-10">
//                   {exp.skills.map((skill, idx) => (
//                     <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm hover:from-pink-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg cursor-pointer">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Projects Section */}
//       <section id="projects" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <Github className="text-blue-500 animate-pulse" />
//             <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">GitHub Projects</span>
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {githubRepos.length > 0 ? githubRepos.map((repo, index) => (
//               <div key={index} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform hover:scale-105 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
//                 <h3 className="text-xl font-semibold mb-2 text-blue-500 group-hover:text-purple-500 transition-colors duration-300 relative z-10">{repo.name}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2 relative z-10">
//                   {repo.description || 'No description available'}
//                 </p>
//                 <div className="flex justify-between items-center relative z-10">
//                   {repo.language && (
//                     <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs transform group-hover:scale-110 transition-all duration-300">
//                       {repo.language}
//                     </span>
//                   )}
//                   <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-purple-500 transform hover:scale-125 hover:rotate-12 transition-all duration-300">
//                     <ExternalLink size={20} />
//                   </a>
//                 </div>
//               </div>
//             )) : (
//               <div className="col-span-3 text-center text-gray-500 animate-pulse">Loading projects...</div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Certifications */}
//       <section id="certifications" className={`py-20 px-4 transition-all duration-1000 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <Award className="text-blue-500 animate-bounce" />
//             <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Certifications & Learning</span>
//           </h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             {certifications.map((cert, index) => (
//               <div key={index} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group relative overflow-hidden`}>
//                 <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
//                 <div className="flex items-start gap-4 relative z-10">
//                   <Award className={`text-yellow-500 mt-1 group-hover:animate-bounce flex-shrink-0`} />
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-300">{cert.name}</h3>
//                     <p className="text-gray-600 dark:text-gray-400">{cert.org}</p>
//                     <p className={`text-sm bg-gradient-to-r ${cert.color} bg-clip-text text-transparent font-semibold mt-2`}>{cert.year}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Goals Section */}
//       <section id="goals" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm transition-all duration-1000 ${isVisible.goals ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <Target className="text-blue-500 animate-pulse" />
//             <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">My Goals</span>
//           </h2>
//           <div className="grid md:grid-cols-2 gap-12">
//             <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
//               <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-blue-500/0 group-hover:from-green-500/20 group-hover:to-blue-500/20 transition-all duration-500"></div>
//               <h3 className="text-2xl font-semibold mb-6 text-blue-500 group-hover:text-green-500 transition-colors duration-300 relative z-10">Short-term Goals</h3>
//               <ul className="space-y-4 relative z-10">
//                 {goals.shortTerm.map((goal, index) => (
//                   <li key={index} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300 group/item">
//                     <span className="text-green-500 text-2xl group-hover/item:scale-125 transition-transform duration-300">✓</span>
//                     <span className="text-lg">{goal}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group relative overflow-hidden`}>
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
//               <h3 className="text-2xl font-semibold mb-6 text-purple-500 group-hover:text-pink-500 transition-colors duration-300 relative z-10">Long-term Goals</h3>
//               <ul className="space-y-4 relative z-10">
//                 {goals.longTerm.map((goal, index) => (
//                   <li key={index} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300 group/item">
//                     <span className="text-purple-500 text-2xl group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300">★</span>
//                     <span className="text-lg">{goal}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className={`py-20 px-4 transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
//             <Mail className="text-blue-500 animate-bounce" />
//             <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Get In Touch</span>
//           </h2>
//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="space-y-6">
//               <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
//               {[
//                 { icon: Mail, text: 'vaibhavsharma95124v@gmail.com', link: 'mailto:vaibhavsharma95124v@gmail.com' },
//                 { icon: Phone, text: '+91-9012907709', link: 'tel:+919012907709' },
//                 { icon: Github, text: 'github.com/vaibhavsharma45', link: 'https://github.com/vaibhavsharma45' },
//                 { icon: Linkedin, text: 'linkedin.com/in/vaibhav-0sharma', link: 'https://linkedin.com/in/vaibhav-0sharma' },
//               ].map((contact, idx) => (
//                 <div key={idx} className="flex items-center gap-3 transform hover:translate-x-4 transition-all duration-300 group">
//                   <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300`}>
//                     <contact.icon className="text-blue-500 group-hover:text-white transition-colors duration-300" size={20} />
//                   </div>
//                   <a href={contact.link} target={contact.link.startsWith('http') ? '_blank' : undefined} rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="hover:text-blue-500 transition-colors duration-300">
//                     {contact.text}
//                   </a>
//                 </div>
//               ))}
//             </div>
//             <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105`}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105`}
//                 />
//                 <textarea
//                   placeholder="Your Message"
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   rows="4"
//                   className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105`}
//                 />
//                 <button onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <span className="relative z-10">Send Message</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={`py-8 text-center ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//         <p className="text-gray-600 dark:text-gray-400 animate-pulse">
//           © 2025 Vaibhav Sharma. Built with React & Tailwind CSS. "Everything happens for a reason". ❤️
//         </p>
//       </footer>

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 z-50 animate-bounce"
//         >
//           <ArrowUp size={24} />
//         </button>
//       )}

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes slideUp {
//           from { transform: translateY(50px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Portfolio;

import { useState, useEffect, useRef } from "react";

// ─── CSS-in-JS Styles injected once ─────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --cream:#F5F0E8; --cream2:#EDE7D9; --cream3:#E4DDD0;
    --ink:#1A1410; --ink2:#3D3530; --muted:#8A7F72;
    --violet:#6B3FA0; --rose:#E8435A; --gold:#D4900A; --mint:#1A9E7A; --sky:#2878C8;
    --glass:rgba(255,255,255,0.55); --glass2:rgba(255,255,255,0.35); --glass3:rgba(255,255,255,0.2);
    --blur:blur(24px); --blur2:blur(14px);
    --shadow:0 8px 32px rgba(26,20,16,0.12); --shadow2:0 24px 64px rgba(26,20,16,0.18);
    --border:rgba(255,255,255,0.7); --border2:rgba(26,20,16,0.08);
    --disp:'Playfair Display',serif; --mono:'Space Mono',monospace; --body:'DM Sans',sans-serif;
    --ease:cubic-bezier(0.16,1,0.3,1);
  }
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{background:var(--cream);color:var(--ink);font-family:var(--body);overflow-x:hidden;cursor:none;min-height:100vh;}

  /* BG BLOBS */
  @keyframes blobdrift{0%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.08)}66%{transform:translate(-30px,50px) scale(0.95)}100%{transform:translate(0,0) scale(1)}}
  .blob{position:fixed;border-radius:50%;filter:blur(80px);opacity:0.55;animation:blobdrift linear infinite;pointer-events:none;z-index:0;}

  /* CURSOR */
  #cur-dot{position:fixed;width:10px;height:10px;background:var(--violet);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s,background .2s;mix-blend-mode:multiply;}
  #cur-ring{position:fixed;width:40px;height:40px;border:1.5px solid rgba(107,63,160,0.4);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:left .12s var(--ease),top .12s var(--ease),width .3s,height .3s,border-color .3s;}

  /* NAV */
  nav.vs-nav{position:fixed;top:0;left:0;right:0;z-index:900;padding:0 5%;height:70px;display:flex;align-items:center;justify-content:space-between;transition:all .4s var(--ease);}
  nav.vs-nav.glass{background:rgba(245,240,232,0.75);backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);border-bottom:1px solid var(--border);box-shadow:0 2px 24px rgba(26,20,16,0.06);}
  .nav-logo{font-family:var(--disp);font-size:1.5rem;font-weight:900;color:var(--ink);letter-spacing:-1px;text-decoration:none;cursor:none;}
  .nav-logo em{font-style:italic;color:var(--violet);}
  .nav-pill{display:flex;gap:0;background:var(--glass);backdrop-filter:var(--blur2);border:1px solid var(--border);border-radius:100px;padding:4px;box-shadow:0 4px 16px rgba(26,20,16,0.08);}
  .nav-pill a{font-family:var(--mono);font-size:.58rem;letter-spacing:1px;text-transform:uppercase;color:var(--muted);padding:8px 16px;border-radius:100px;text-decoration:none;transition:all .25s;cursor:none;}
  .nav-pill a:hover,.nav-pill a.active{background:var(--ink);color:var(--cream);}
  .nav-badge{display:flex;align-items:center;gap:7px;background:var(--glass);backdrop-filter:var(--blur2);border:1px solid var(--border);border-radius:100px;padding:8px 16px;font-family:var(--mono);font-size:.58rem;color:var(--mint);letter-spacing:1px;box-shadow:var(--shadow);}
  @keyframes bdot{0%,100%{transform:scale(1)}50%{transform:scale(1.8);opacity:.5}}
  .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--mint);box-shadow:0 0 6px var(--mint);animation:bdot 2s ease-in-out infinite;}

  /* GLASS CARD */
  .glass-card{background:var(--glass);backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);border:1px solid var(--border);border-radius:20px;box-shadow:var(--shadow);transition:transform .4s var(--ease),box-shadow .4s var(--ease);}

  /* HERO */
  #home{position:relative;min-height:100vh;display:flex;align-items:center;padding:100px 5% 60px;z-index:1;}
  .hero-inner{max-width:1240px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 420px;gap:3rem;align-items:center;}
  @keyframes fadeup{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadefrom{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
  .hero-tag{display:inline-flex;align-items:center;gap:10px;background:var(--glass);backdrop-filter:var(--blur2);border:1px solid var(--border);border-radius:100px;padding:6px 16px 6px 8px;margin-bottom:2rem;font-family:var(--mono);font-size:.6rem;color:var(--muted);letter-spacing:1.5px;box-shadow:var(--shadow);opacity:0;animation:fadeup .8s .2s var(--ease) forwards;}
  .hero-tag-pip{width:8px;height:8px;border-radius:50%;background:var(--mint);box-shadow:0 0 8px var(--mint);}
  h1.hero-h{font-family:var(--disp);font-size:clamp(3.5rem,8vw,7.5rem);font-weight:900;line-height:.95;letter-spacing:-3px;color:var(--ink);margin-bottom:1.5rem;opacity:0;animation:fadeup .9s .4s var(--ease) forwards;}
  h1.hero-h em{font-style:italic;color:var(--violet);}
  .hero-role{font-family:var(--mono);font-size:clamp(.85rem,1.5vw,1rem);color:var(--violet);margin-bottom:1.2rem;min-height:1.5em;opacity:0;animation:fadeup .9s .6s var(--ease) forwards;}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  .tw-cur{display:inline-block;width:2px;height:.9em;background:var(--violet);vertical-align:middle;margin-left:2px;animation:blink 1s step-end infinite;}
  .hero-desc{font-size:.97rem;color:var(--muted);line-height:1.85;max-width:460px;margin-bottom:2.5rem;font-weight:300;opacity:0;animation:fadeup .9s .8s var(--ease) forwards;}
  .hero-desc strong{color:var(--ink);font-weight:500;}
  .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;opacity:0;animation:fadeup .9s 1s var(--ease) forwards;}
  .btn-fill{display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:var(--cream);font-family:var(--mono);font-size:.65rem;letter-spacing:1.5px;text-transform:uppercase;padding:14px 28px;border-radius:100px;text-decoration:none;transition:all .3s var(--ease);cursor:none;box-shadow:0 4px 20px rgba(26,20,16,0.2);}
  .btn-fill:hover{background:var(--violet);transform:translateY(-3px);box-shadow:0 8px 30px rgba(107,63,160,0.35);}
  .btn-glass{display:inline-flex;align-items:center;gap:8px;background:var(--glass);backdrop-filter:var(--blur2);color:var(--ink);font-family:var(--mono);font-size:.65rem;letter-spacing:1.5px;text-transform:uppercase;padding:14px 28px;border:1px solid var(--border);border-radius:100px;text-decoration:none;transition:all .3s var(--ease);cursor:none;box-shadow:var(--shadow);}
  .btn-glass:hover{background:rgba(255,255,255,0.8);transform:translateY(-3px);}
  .hero-right{opacity:0;animation:fadefrom .9s 1.1s var(--ease) forwards;}
  .orb-field{position:relative;width:100%;height:420px;display:flex;align-items:center;justify-content:center;}
  .center-orb{width:120px;height:120px;border-radius:50%;background:var(--glass);backdrop-filter:var(--blur);border:1.5px solid var(--border);box-shadow:var(--shadow2),inset 0 1px 0 rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;position:relative;z-index:2;}
  .center-orb .co-name{font-family:var(--disp);font-size:1.1rem;font-weight:700;color:var(--ink);}
  .center-orb .co-sub{font-family:var(--mono);font-size:.52rem;color:var(--muted);letter-spacing:1px;}
  @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes counter-orbit{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
  .orbit{position:absolute;width:100%;height:100%;top:0;left:0;animation:orbit linear infinite;}
  .o1{animation-duration:12s;}.o2{animation-duration:16s;animation-direction:reverse;}.o3{animation-duration:20s;}
  .orb-pill{position:absolute;top:50%;left:50%;background:var(--glass);backdrop-filter:var(--blur2);border:1px solid var(--border);border-radius:100px;padding:6px 14px;font-family:var(--mono);font-size:.6rem;color:var(--ink2);white-space:nowrap;box-shadow:var(--shadow);}
  .o1 .orb-pill{animation:counter-orbit 12s linear infinite;}
  .o2 .orb-pill{animation:counter-orbit 16s linear reverse infinite;}
  .o3 .orb-pill{animation:counter-orbit 20s linear infinite;}
  .ring-d{position:absolute;top:50%;left:50%;border-radius:50%;border:1px dashed rgba(26,20,16,0.08);transform:translate(-50%,-50%);pointer-events:none;}
  .pill-violet{border-color:rgba(107,63,160,0.3);color:var(--violet);}
  .pill-rose{border-color:rgba(232,67,90,0.3);color:var(--rose);}
  .pill-gold{border-color:rgba(212,144,10,0.3);color:var(--gold);}
  .pill-mint{border-color:rgba(26,158,122,0.3);color:var(--mint);}
  .pill-sky{border-color:rgba(40,120,200,0.3);color:var(--sky);}

  /* SECTIONS */
  .sec-wrap{max-width:1200px;margin:0 auto;padding:100px 5%;position:relative;z-index:1;}
  .sec-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:1.5rem;}
  .sec-eyebrow::before{content:'';width:24px;height:1px;background:var(--muted);}
  .big-h{font-family:var(--disp);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:900;line-height:.97;letter-spacing:-2px;color:var(--ink);margin-bottom:3rem;}
  .big-h em{font-style:italic;color:var(--violet);}
  .sec-alt{background:var(--cream2);}

  /* REVEAL */
  .rv{opacity:0;transform:translateY(32px);transition:opacity .7s var(--ease),transform .7s var(--ease);}
  .rv.in{opacity:1;transform:translateY(0);}
  .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}

  /* ABOUT */
  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:stretch;}
  .about-card{padding:2.5rem;}
  .about-card h3{font-family:var(--disp);font-size:1.4rem;font-weight:700;color:var(--ink);margin-bottom:1.2rem;}
  .about-card h3 em{color:var(--violet);font-style:italic;}
  .about-card p{font-size:.9rem;font-weight:300;color:var(--muted);line-height:1.85;margin-bottom:1rem;}
  .about-card p strong{color:var(--ink);font-weight:500;}
  .motto-box{margin-top:1.5rem;padding:1.2rem 1.5rem;background:var(--glass2);border-left:3px solid var(--violet);border-radius:0 12px 12px 0;font-family:var(--mono);font-size:.72rem;color:var(--violet);line-height:1.7;}
  .int-list{display:flex;flex-direction:column;gap:0;}
  .int-li{display:flex;align-items:center;gap:14px;padding:13px 16px;border-bottom:1px solid rgba(26,20,16,0.06);font-size:.88rem;color:var(--muted);font-weight:300;transition:background .2s,color .2s,padding-left .25s;border-radius:8px;}
  .int-li:last-child{border:none;}
  .int-li:hover{background:rgba(107,63,160,0.06);color:var(--ink);padding-left:22px;}
  .int-num{font-family:var(--mono);font-size:.55rem;color:var(--violet);min-width:28px;}
  .term-bar{display:flex;align-items:center;gap:7px;background:rgba(26,20,16,0.05);border-bottom:1px solid rgba(26,20,16,0.08);padding:10px 16px;}
  .td{width:10px;height:10px;border-radius:50%;}
  .term-body{padding:1.5rem;font-family:var(--mono);font-size:.75rem;line-height:2.1;}
  .tc{color:var(--violet)}.tw{color:var(--ink)}.tm{color:var(--muted)}.tg{color:var(--mint)}.ta{color:var(--gold)}
  .trow{display:grid;grid-template-columns:120px 1fr;gap:.5rem;}
  @keyframes scanl{0%{top:0}100%{top:100%}}
  .scan-l{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(107,63,160,0.1);animation:scanl 5s ease-in-out infinite;}

  /* SKILLS */
  .skills-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
  .skill-block{padding:2rem;}
  .sk-cat-label{font-family:var(--mono);font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:1rem;display:flex;align-items:center;gap:8px;}
  .sk-cat-label::after{content:'';flex:1;height:1px;background:var(--border2);}
  .tag-cloud{display:flex;flex-wrap:wrap;gap:.45rem;}
  .tag{font-family:var(--mono);font-size:.62rem;padding:5px 12px;border-radius:100px;border:1px solid rgba(26,20,16,0.1);color:var(--ink2);background:var(--glass2);backdrop-filter:var(--blur2);transition:all .25s var(--ease);cursor:default;}
  .tag:hover{background:var(--ink);color:var(--cream);border-color:transparent;transform:translateY(-2px);}
  .tag.v:hover{background:var(--violet);}
  .tag.r:hover{background:var(--rose);}
  .tag.g:hover{background:var(--mint);}
  .tag.s:hover{background:var(--sky);}

  /* EXPERIENCE */
  .xp-cards{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;}
  .xp-card{padding:2.2rem;}
  .xp-period{font-family:var(--mono);font-size:.6rem;color:var(--violet);letter-spacing:2px;text-transform:uppercase;margin-bottom:.8rem;}
  .xp-role{font-family:var(--disp);font-size:1.5rem;font-weight:700;color:var(--ink);margin-bottom:.3rem;line-height:1.1;}
  .xp-co{font-family:var(--mono);font-size:.65rem;color:var(--muted);margin-bottom:1.4rem;}
  .xp-bullets li{font-size:.85rem;font-weight:300;color:var(--muted);padding:5px 0 5px 1.2rem;position:relative;line-height:1.65;}
  .xp-bullets li::before{content:'→';position:absolute;left:0;color:var(--violet);font-size:.7rem;top:7px;}
  .xp-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.2rem;}
  .xp-tag{font-family:var(--mono);font-size:.55rem;color:var(--violet);background:rgba(107,63,160,0.08);border:1px solid rgba(107,63,160,0.2);padding:3px 10px;border-radius:100px;}

  /* PROJECTS */
  .proj-intro{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:2rem;}
  .proj-count{font-family:var(--mono);font-size:.6rem;color:var(--muted);letter-spacing:2px;}
  .proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;}
  .pcard{padding:2.2rem;transition:transform .4s var(--ease),box-shadow .4s var(--ease);}
  .pcard:hover{transform:translateY(-8px) rotate(-0.5deg);box-shadow:var(--shadow2);}
  .pc-num{font-family:var(--mono);font-size:.58rem;color:var(--muted);letter-spacing:2px;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;}
  .pc-live{font-size:.55rem;color:var(--mint);background:rgba(26,158,122,0.1);border:1px solid rgba(26,158,122,0.25);border-radius:100px;padding:2px 10px;letter-spacing:1px;}
  .pc-live.no{color:var(--muted);background:transparent;border-color:rgba(26,20,16,0.1);}
  .pc-name{font-family:var(--disp);font-size:1.6rem;font-weight:700;color:var(--ink);margin-bottom:.7rem;line-height:1.05;}
  .pc-desc{font-size:.85rem;font-weight:300;color:var(--muted);line-height:1.75;margin-bottom:1.2rem;}
  .pc-score{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:.58rem;color:var(--gold);background:rgba(212,144,10,0.08);border:1px solid rgba(212,144,10,0.25);border-radius:100px;padding:3px 12px;margin-bottom:1rem;}
  .pc-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.5rem;}
  .pc-tag{font-family:var(--mono);font-size:.55rem;color:var(--sky);background:rgba(40,120,200,0.07);border:1px solid rgba(40,120,200,0.2);border-radius:100px;padding:3px 10px;}
  .pc-btns{display:flex;gap:.7rem;}
  .pc-btn{font-family:var(--mono);font-size:.62rem;letter-spacing:1px;text-transform:uppercase;padding:9px 20px;border-radius:100px;text-decoration:none;transition:all .25s var(--ease);cursor:none;}
  .pc-btn.fill{background:var(--ink);color:var(--cream);}
  .pc-btn.fill:hover{background:var(--violet);box-shadow:0 4px 16px rgba(107,63,160,0.35);}
  .pc-btn.outline{border:1px solid rgba(26,20,16,0.15);color:var(--muted);}
  .pc-btn.outline:hover{border-color:var(--ink);color:var(--ink);}

  /* CHALLENGES */
  .ch-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;}
  .ch-card{padding:2rem;}
  .ch-card:hover{transform:translateY(-6px) rotate(0.3deg);}
  .ch-icon-box{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:.65rem;background:rgba(107,63,160,0.1);color:var(--violet);margin-bottom:1.2rem;border:1px solid rgba(107,63,160,0.2);}
  .ch-title{font-family:var(--disp);font-size:1.2rem;font-weight:700;color:var(--ink);margin-bottom:.6rem;}
  .ch-desc{font-size:.85rem;font-weight:300;color:var(--muted);line-height:1.75;}

  /* CERTS */
  .certs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;}
  .cert-card{padding:2rem;display:flex;align-items:flex-start;gap:1.2rem;}
  .cert-icon{width:44px;height:44px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.2rem;background:rgba(212,144,10,0.1);border:1px solid rgba(212,144,10,0.2);}
  .cert-year{font-family:var(--mono);font-size:.58rem;color:var(--muted);letter-spacing:1px;margin-bottom:.5rem;}
  .cert-name{font-family:var(--disp);font-size:1.05rem;font-weight:700;color:var(--ink);margin-bottom:.25rem;line-height:1.2;}
  .cert-org{font-family:var(--mono);font-size:.62rem;color:var(--violet);letter-spacing:1px;}

  /* GOALS */
  .goals-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;}
  .goal-card{padding:2.2rem;}
  .goal-label{font-family:var(--mono);font-size:.62rem;color:var(--violet);letter-spacing:2px;text-transform:uppercase;margin-bottom:1.5rem;}
  .goal-card.long .goal-label{color:var(--mint);}
  .goal-li{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(26,20,16,0.06);font-size:.87rem;font-weight:300;color:var(--muted);line-height:1.6;transition:color .2s,padding-left .25s;}
  .goal-li:last-child{border:none;}
  .goal-li:hover{color:var(--ink);padding-left:6px;}
  .gl-icon{color:var(--violet);flex-shrink:0;margin-top:1px;}
  .goal-card.long .gl-icon{color:var(--mint);}

  /* NUMBERS */
  .nums-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;}
  .num-card{padding:2.5rem 1.5rem;text-align:center;}
  .num-val{font-family:var(--disp);font-size:4rem;font-weight:900;line-height:1;letter-spacing:-3px;color:var(--ink);margin-bottom:.4rem;}
  .num-val span{color:var(--violet);}
  .num-label{font-family:var(--mono);font-size:.58rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;}

  /* CONTACT */
  .contact-grid{display:grid;grid-template-columns:1fr 400px;gap:4rem;align-items:start;}
  .contact-sub{font-size:.95rem;font-weight:300;color:var(--muted);line-height:1.85;margin-top:1rem;margin-bottom:2.5rem;}
  .contact-cta{display:inline-flex;align-items:center;gap:12px;background:var(--ink);color:var(--cream);font-family:var(--mono);font-size:.7rem;letter-spacing:2px;text-transform:uppercase;padding:18px 36px;border-radius:100px;text-decoration:none;cursor:none;box-shadow:0 4px 24px rgba(26,20,16,0.2);transition:all .35s var(--ease);}
  .contact-cta:hover{background:var(--violet);box-shadow:0 8px 36px rgba(107,63,160,0.4);}
  .clinks{display:flex;flex-direction:column;gap:.6rem;}
  .clink{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:14px;background:var(--glass);backdrop-filter:var(--blur2);border:1px solid var(--border);text-decoration:none;color:var(--muted);transition:all .25s var(--ease);cursor:none;box-shadow:0 2px 12px rgba(26,20,16,0.06);}
  .clink:hover{background:rgba(255,255,255,0.8);color:var(--ink);transform:translateX(6px);}
  .clink-info{flex:1;}
  .clink-lbl{font-family:var(--mono);font-size:.52rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:1px;}
  .clink-val{font-size:.82rem;}
  .clink-arr{color:var(--violet);opacity:0;transition:opacity .25s;font-size:.75rem;}
  .clink:hover .clink-arr{opacity:1;}

  /* EASTER EGG */
  #click-score{font-family:var(--mono);font-size:.55rem;color:var(--violet);margin-left:4px;opacity:0;transition:opacity .3s;}
  #click-score.show{opacity:1;}
  @keyframes cpop{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-60px) scale(0.5);opacity:0}}
  .click-pop{position:fixed;pointer-events:none;z-index:99997;font-family:var(--mono);font-size:.75rem;font-weight:700;color:var(--violet);animation:cpop .8s var(--ease) forwards;}

  /* SCROLL TOP */
  #stt{position:fixed;bottom:2rem;right:2rem;z-index:800;width:48px;height:48px;border-radius:50%;background:var(--glass);backdrop-filter:var(--blur);border:1px solid var(--border);color:var(--ink);font-size:1rem;display:flex;align-items:center;justify-content:center;cursor:none;opacity:0;pointer-events:none;transition:all .3s;box-shadow:var(--shadow);}
  #stt.show{opacity:1;pointer-events:all;}
  #stt:hover{background:var(--ink);color:var(--cream);transform:translateY(-4px);}

  /* FOOTER */
  footer{background:var(--cream3);border-top:1px solid var(--border2);padding:2.5rem 5%;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;position:relative;z-index:1;}
  .foot-logo{font-family:var(--disp);font-size:1.4rem;font-weight:900;color:var(--ink);}
  .foot-logo em{color:var(--violet);font-style:italic;}
  .foot-txt{font-family:var(--mono);font-size:.6rem;color:var(--muted);text-align:center;line-height:1.8;letter-spacing:.5px;}
  .foot-txt span{color:var(--violet);}

  @media(max-width:960px){
    .hero-inner,.about-grid,.xp-cards,.proj-grid,.contact-grid{grid-template-columns:1fr;}
    .hero-right{display:none;}
    .skills-grid{grid-template-columns:1fr 1fr;}
    .nums-row{grid-template-columns:1fr 1fr;}
    .nav-pill{display:none;}
  }
  @media(max-width:600px){
    .ch-grid,.certs-grid,.goals-grid,.nums-row{grid-template-columns:1fr;}
    .skills-grid{grid-template-columns:1fr;}
    footer{flex-direction:column;text-align:center;}
  }
`;

// ─── Cursor Component ────────────────────────────────────────────────────────
function Cursor() {
  useEffect(() => {
    const dot = document.getElementById("cur-dot");
    const ring = document.getElementById("cur-ring");
    if (!dot || !ring) return;
    const move = (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      setTimeout(() => {
        ring.style.left = e.clientX + "px";
        ring.style.top = e.clientY + "px";
      }, 90);
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div id="cur-dot" />
      <div id="cur-ring" />
    </>
  );
}

// ─── Background Blobs ────────────────────────────────────────────────────────
function BgBlobs() {
  useEffect(() => {
    const handleMouse = (e) => {
      const bx = (e.clientX / window.innerWidth - 0.5) * 30;
      const by = (e.clientY / window.innerHeight - 0.5) * 30;
      document.querySelectorAll(".blob").forEach((b, i) => {
        const f = (i + 1) * 0.4;
        b.style.transform = `translate(${bx * f}px,${by * f}px)`;
      });
    };
    document.addEventListener("mousemove", handleMouse);
    return () => document.removeEventListener("mousemove", handleMouse);
  }, []);

  const blobs = [
    { style: { width: 600, height: 600, background: "radial-gradient(circle,rgba(107,63,160,0.25),transparent 70%)", top: -100, left: -100, animationDuration: "25s" } },
    { style: { width: 500, height: 500, background: "radial-gradient(circle,rgba(232,67,90,0.18),transparent 70%)", top: "30%", right: -80, animationDuration: "30s", animationDelay: "-10s" } },
    { style: { width: 700, height: 700, background: "radial-gradient(circle,rgba(212,144,10,0.15),transparent 70%)", bottom: -150, left: "20%", animationDuration: "35s", animationDelay: "-18s" } },
    { style: { width: 400, height: 400, background: "radial-gradient(circle,rgba(26,158,122,0.18),transparent 70%)", top: "60%", left: "5%", animationDuration: "20s", animationDelay: "-5s" } },
    { style: { width: 350, height: 350, background: "radial-gradient(circle,rgba(40,120,200,0.15),transparent 70%)", top: "10%", right: "25%", animationDuration: "28s", animationDelay: "-14s" } },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {blobs.map((b, i) => (
        <div key={i} className="blob" style={{ ...b.style, position: "absolute", borderRadius: "50%", filter: "blur(80px)", opacity: 0.55 }} />
      ))}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [glassy, setGlassy] = useState(false);
  const [active, setActive] = useState("home");
  const [clicks, setClicks] = useState(0);
  const scoreRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setGlassy(window.scrollY > 60);
      const ids = ["home", "about", "skills", "projects", "experience", "contact"];
      let cur = "home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    const newClicks = clicks + 1;
    setClicks(newClicks);
    // floating pop
    const pop = document.createElement("div");
    pop.className = "click-pop";
    const msgs = ["", "🚀", "🔥", "💡", "⚡", "🧠", "🏆", "🎯", "✨", "🤖", "👾"];
    pop.textContent = msgs[newClicks % msgs.length] || "+" + newClicks;
    pop.style.left = e.clientX - 10 + "px";
    pop.style.top = e.clientY - 10 + "px";
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
    if (newClicks === 10) {
      const burst = document.createElement("div");
      burst.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--disp);font-size:4rem;color:var(--violet);z-index:99999;animation:cpop 1.5s var(--ease) forwards;pointer-events:none;text-align:center;";
      burst.textContent = "You found it! 🎉";
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 1500);
    }
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={`vs-nav${glassy ? " glass" : ""}`}>
      <a href="#home" className="nav-logo" onClick={handleLogoClick}>
        V<em>S</em>
        <span id="click-score" ref={scoreRef} className={clicks > 0 ? "show" : ""}>
          {clicks > 0 ? ` ×${clicks}` : ""}
        </span>
      </a>
      <div className="nav-pill">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href.slice(1) ? "active" : ""}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="nav-badge">
        <span className="badge-dot" />
        Open to Work
      </div>
    </nav>
  );
}

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(roles) {
  const [text, setText] = useState("");
  const state = useRef({ ri: 0, ci: 0, del: false });

  useEffect(() => {
    let timer;
    const tick = () => {
      const { ri, ci, del } = state.current;
      const word = roles[ri];
      if (!del) {
        const next = ci + 1;
        setText(word.slice(0, next));
        state.current.ci = next;
        if (next === word.length) {
          state.current.del = true;
          timer = setTimeout(tick, 2400);
          return;
        }
        timer = setTimeout(tick, 90);
      } else {
        const next = ci - 1;
        setText(word.slice(0, next));
        state.current.ci = next;
        if (next === 0) {
          state.current.del = false;
          state.current.ri = (ri + 1) % roles.length;
        }
        timer = setTimeout(tick, 55);
      }
    };
    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, []);
  return text;
}

// ─── Scroll Reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Card Tilt ────────────────────────────────────────────────────────────────
function useTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll(".glass-card");
    const handlers = [];
    cards.forEach((card) => {
      const mm = (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
        card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
      };
      const ml = () => {
        card.style.transform = "";
        card.style.transition = "transform .5s var(--ease)";
        setTimeout(() => (card.style.transition = ""), 500);
      };
      card.addEventListener("mousemove", mm);
      card.addEventListener("mouseleave", ml);
      handlers.push({ card, mm, ml });
    });
    return () => handlers.forEach(({ card, mm, ml }) => {
      card.removeEventListener("mousemove", mm);
      card.removeEventListener("mouseleave", ml);
    });
  }, []);
}

// ─── Scroll Top button ────────────────────────────────────────────────────────
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const s = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  return (
    <button id="stt" className={show ? "show" : ""} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      ↑
    </button>
  );
}

// ─── Orbit Field (hero right) ─────────────────────────────────────────────────
function OrbitField() {
  const orb = (cls, pcls, label) => (
    <div className={cls} style={{ transform: "translate(-50%,-50%)" }}>
      <div className={`orb-pill ${pcls}`} style={{ transform: "" }}>{label}</div>
    </div>
  );

  const makeOrbit = (cls, pills) => (
    <div className={`orbit ${cls}`}>
      {pills.map(([pos, color, label], i) => (
        <div key={i} className={`orb-pill ${color} ${pos}`}>{label}</div>
      ))}
    </div>
  );

  const o1Pills = [
    ["op1", "pill-violet", "Python"],
    ["op2", "pill-rose", "YOLOv8"],
    ["op3", "pill-gold", "LangChain"],
    ["op4", "pill-mint", "Flask"],
    ["op5", "pill-sky", "TensorFlow"],
    ["op6", "pill-violet", "PyTorch"],
    ["op7", "pill-mint", "OpenCV"],
    ["op8", "pill-rose", "NLP"],
  ];
  const o2Pills = [
    ["op9", "pill-gold", "Pandas"],
    ["op10", "pill-sky", "SQL"],
    ["op11", "pill-violet", "React"],
    ["op12", "pill-mint", "Streamlit"],
  ];

  const posStyle = {
    op1: "translate(-50%,-50%) translate(160px,0)",
    op2: "translate(-50%,-50%) translate(113px,113px)",
    op3: "translate(-50%,-50%) translate(0,160px)",
    op4: "translate(-50%,-50%) translate(-113px,113px)",
    op5: "translate(-50%,-50%) translate(-160px,0)",
    op6: "translate(-50%,-50%) translate(-113px,-113px)",
    op7: "translate(-50%,-50%) translate(0,-160px)",
    op8: "translate(-50%,-50%) translate(113px,-113px)",
    op9: "translate(-50%,-50%) translate(110px,0)",
    op10: "translate(-50%,-50%) translate(0,110px)",
    op11: "translate(-50%,-50%) translate(-110px,0)",
    op12: "translate(-50%,-50%) translate(0,-110px)",
  };

  return (
    <div className="orb-field">
      <div className="ring-d" style={{ width: 320, height: 320 }} />
      <div className="ring-d" style={{ width: 220, height: 220 }} />
      <div className="ring-d" style={{ width: 400, height: 400 }} />
      <div className="orbit o1">
        {o1Pills.map(([pos, color, label]) => (
          <div key={pos} className={`orb-pill ${color}`} style={{ transform: posStyle[pos] }}>{label}</div>
        ))}
      </div>
      <div className="orbit o2">
        {o2Pills.map(([pos, color, label]) => (
          <div key={pos} className={`orb-pill ${color}`} style={{ transform: posStyle[pos] }}>{label}</div>
        ))}
      </div>
      <div className="center-orb glass-card">
        <div className="co-name">VS</div>
        <div className="co-sub">AI ENGINEER</div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const roles = ["AI Engineer", "Data Scientist", "ML Enthusiast", "Computer Vision Dev", "Gen AI Builder", "Problem Solver"];
  const tw = useTypewriter(roles);
  return (
    <section id="home">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-tag">
            <span className="hero-tag-pip" />
            Gen AI Engineer · Muzaffarnagar, India
          </div>
          <h1 className="hero-h">
            Vaibhav<br /><em>Sharma</em>
          </h1>
          <div className="hero-role">
            {tw}<span className="tw-cur" />
          </div>
          <p className="hero-desc">
            <strong>20 years old. BCA final year.</strong> Building intelligent systems that think, learn, and solve real problems — CV, NLP, Gen AI. No shortcuts, real production apps.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-fill"><span>View My Work</span><span>→</span></a>
            <a href="#contact" className="btn-glass">Let's Talk ✦</a>
          </div>
        </div>
        <div className="hero-right"><OrbitField /></div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  const interests = [
    "Exploring AI/ML trends & new tech",
    "Cricket & regular exercise 🏏",
    "Reading powerful thoughts for growth",
    "Astrology & self-improvement",
    "Diverse experiences & challenges",
  ];
  return (
    <section id="about" className="sec-alt" style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">01 · About</div>
        <h2 className="big-h rv">Strong<br />fundamentals.<br /><em>Real solutions.</em></h2>
        <div className="about-grid">
          <div className="glass-card about-card rv">
            <h3><em>Who</em> I Am</h3>
            <p>I'm <strong>Vaibhav Sharma</strong>, a 20-year-old Gen AI Engineer from Muzaffarnagar, UP — final year BCA at Maa Shakumbhari University. I don't just study AI, I build with it.</p>
            <p>Pursuing <strong>Data Science with Gen AI</strong> at PW Skills. My apps run in production on Vercel, Render, and Streamlit Cloud. Real users, real impact.</p>
            <p>I believe: <em>"Jo kuch bhi hota hai, ache ke liye hota hai."</em></p>
            <div className="motto-box"># Strong fundamentals. Real solutions. No shortcuts.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="glass-card rv d2" style={{ position: "relative", overflow: "hidden" }}>
              <div className="scan-l" />
              <div className="term-bar">
                <span className="td" style={{ background: "#FF5F57" }} />
                <span className="td" style={{ background: "#FFBD2E" }} />
                <span className="td" style={{ background: "#28C840" }} />
                <span style={{ fontFamily: "var(--mono)", fontSize: ".55rem", color: "var(--muted)", marginLeft: "auto" }}>vaibhav@ai-lab</span>
              </div>
              <div className="term-body" style={{ background: "rgba(255,255,255,0.6)" }}>
                <div className="tc">$ whoami</div><br />
                <div className="trow"><span className="tm">Location</span><span className="tw">Muzaffarnagar, UP</span></div>
                <div className="trow"><span className="tm">Degree</span><span className="tw">BCA Final Year</span></div>
                <div className="trow"><span className="tm">Focus</span><span className="tc">Gen AI · CV · NLP</span></div>
                <div className="trow"><span className="tm">Kaggle</span><span className="ta">Top 20% 🏆</span></div>
                <div className="trow"><span className="tm">Status</span><span className="tg">OPEN TO WORK ▮</span></div>
                <br /><div className="tc">$ <span className="tw-cur" /></div>
              </div>
            </div>
            <div className="glass-card rv d3">
              <div className="int-list" style={{ padding: ".5rem" }}>
                {interests.map((item, i) => (
                  <div key={i} className="int-li">
                    <span className="int-num">0{i + 1}</span>{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
function Skills() {
  const cats = [
    { label: "Languages", color: "v", tags: ["Python", "C++", "HTML", "CSS", "SQL", "JavaScript"] },
    { label: "ML / AI", color: "r", tags: ["TensorFlow", "PyTorch", "Scikit-learn", "YOLOv8", "LangChain", "HuggingFace", "OpenCV", "NLTK"] },
    { label: "Data", color: "g", tags: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Power BI"] },
    { label: "Tools", color: "s", tags: ["Kaggle", "Jupyter", "Google Colab", "Git", "VS Code", "Postman"] },
    { label: "Databases", color: "v", tags: ["MySQL", "MongoDB"] },
    { label: "Deployment", color: "r", tags: ["Flask", "FastAPI", "Streamlit", "React", "Vercel", "Render"] },
  ];
  return (
    <section id="skills" style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">02 · Skills & Stack</div>
        <h2 className="big-h rv">Full Stack <em>AI.</em></h2>
        <div className="skills-grid">
          {cats.map((c, i) => (
            <div key={i} className={`glass-card skill-block rv d${i}`}>
              <div className="sk-cat-label">{c.label}</div>
              <div className="tag-cloud">
                {c.tags.map((t) => <span key={t} className={`tag ${c.color}`}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      num: "01", live: false, name: "Helmet Detection System",
      desc: "Real-time safety compliance using YOLOv8. Detects helmet usage in live video streams — a full computer vision production pipeline.",
      tags: ["YOLOv8", "OpenCV", "Python"],
      btns: [{ href: "https://github.com/Vaibhavsharma45", label: "GitHub ↗", cls: "outline" }],
    },
    {
      num: "02", live: true, name: "Resume Analyser",
      desc: "NLP-powered ATS scoring. Helps candidates beat applicant tracking systems using TF-IDF and semantic similarity.",
      tags: ["NLP", "TF-IDF", "Flask", "React"],
      btns: [
        { href: "https://resume-analyser-gbp1.vercel.app/", label: "Live Demo", cls: "fill" },
        { href: "https://github.com/Vaibhavsharma45", label: "GitHub", cls: "outline" },
      ],
    },
    {
      num: "03", live: true, name: "Crypto Volatility Predictor",
      desc: "ML predicts crypto market volatility with 0.85 R² score. Advanced feature engineering on time-series data, interactive Streamlit dashboard.",
      tags: ["Random Forest", "Streamlit", "Time-Series"],
      score: "✦ R² Score: 0.85",
      btns: [
        { href: "https://crypto-volatility-prediction-projectmak4penaud7jwri5vptzto.streamlit.app/", label: "Live Demo", cls: "fill" },
        { href: "https://github.com/Vaibhavsharma45", label: "GitHub", cls: "outline" },
      ],
    },
    {
      num: "04", live: true, name: "Marg Darshak",
      desc: "ML-powered career prediction platform combining Career Compass, Gyan Kosh & Skill Saathi. Guides students to their ideal path.",
      tags: ["Flask", "Random Forest", "Plotly", "SQLite"],
      btns: [
        { href: "https://marg-darshak-lzy4.onrender.com/", label: "Live Demo", cls: "fill" },
        { href: "https://github.com/Vaibhavsharma45", label: "GitHub", cls: "outline" },
      ],
    },
  ];

  return (
    <section id="projects" className="sec-alt" style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">03 · Projects</div>
        <div className="proj-intro rv">
          <h2 className="big-h" style={{ marginBottom: 0 }}>Things I built<br />that <span style={{ color: "var(--rose)" }}>work.</span></h2>
          <span className="proj-count">04 / Projects</span>
        </div>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <div key={i} className={`glass-card pcard rv d${i}`}>
              <div className="pc-num">
                {p.num} /
                <span className={`pc-live${p.live ? "" : " no"}`}>{p.live ? "Live ↗" : "CV System"}</span>
              </div>
              <div className="pc-name">{p.name}</div>
              {p.score && <div className="pc-score">{p.score}</div>}
              <p className="pc-desc">{p.desc}</p>
              <div className="pc-tags">{p.tags.map((t) => <span key={t} className="pc-tag">{t}</span>)}</div>
              <div className="pc-btns">
                {p.btns.map((b) => <a key={b.href} href={b.href} target="_blank" rel="noopener noreferrer" className={`pc-btn ${b.cls}`}>{b.label}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
function Experience() {
  const jobs = [
    {
      period: "Nov 2025 — Dec 2025", role: "Data Analyst Intern", co: "@ InternGeek",
      bullets: ["Power BI Dashboard — Titanic Survival Dataset KPI analysis", "Survival rate visualization by Pclass & Gender", "Data storytelling with Power BI Desktop & Google Sheets"],
      tags: ["Power BI", "Data Analysis", "Visualization"],
    },
    {
      period: "Jan 2025 — Present", role: "AI/ML Training Program", co: "@ PW Skills · 6 Months",
      bullets: ["Full stack: ML → DL → Computer Vision → NLP → Gen AI", "10+ production-grade projects shipped", "Model optimization, deployment, MLOps fundamentals"],
      tags: ["Machine Learning", "Deep Learning", "Gen AI"],
    },
  ];
  return (
    <section id="experience" style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">04 · Experience</div>
        <h2 className="big-h rv">Where I've <em>grown.</em></h2>
        <div className="xp-cards">
          {jobs.map((j, i) => (
            <div key={i} className={`glass-card xp-card rv d${i * 2}`}>
              <div className="xp-period">{j.period}</div>
              <div className="xp-role">{j.role}</div>
              <div className="xp-co">{j.co}</div>
              <ul className="xp-bullets">{j.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <div className="xp-tags">{j.tags.map((t) => <span key={t} className="xp-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Challenges Section ───────────────────────────────────────────────────────
function Challenges() {
  const items = [
    { n: "01", title: "Self-taught ML Journey", desc: "Learned Python and ML independently, no formal mentorship. Built projects that gained peer recognition and opened bigger doors." },
    { n: "02", title: "Mastering Algorithms", desc: "Struggled with complex ML algorithms. Revisited foundational math and practiced with multiple real datasets until concepts clicked." },
    { n: "03", title: "Kaggle Comeback", desc: "First Kaggle attempt failed. Analyzed mistakes, practiced relentlessly, achieved top 20% finish in subsequent competitions." },
    { n: "04", title: "GPU Constraints", desc: "Limited GPU access → learned lightweight models, cloud resources & optimized pipelines. Made me a sharper, more resourceful engineer." },
  ];
  return (
    <section className="sec-alt" style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">05 · Challenges & Growth</div>
        <h2 className="big-h rv">Obstacles <span style={{ color: "var(--gold)" }}>overcome.</span></h2>
        <div className="ch-grid">
          {items.map((c, i) => (
            <div key={i} className={`glass-card ch-card rv d${i}`}>
              <div className="ch-icon-box">{c.n}</div>
              <div className="ch-title">{c.title}</div>
              <p className="ch-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────
function Certifications() {
  const certs = [
    { icon: "🎓", year: "2025 — Present (Ongoing)", name: "Data Science with Gen AI", org: "PW Skills" },
    { icon: "⚡", year: "2025", name: "Gen AI for All", org: "PW Skills" },
    { icon: "🐍", year: "2025 — 2026", name: "Python Programming & ML", org: "Self-Learned" },
    { icon: "🤖", year: "2026", name: "Introduction to Prompt Engineering", org: "Simplilearn" },
  ];
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">06 · Certifications</div>
        <h2 className="big-h rv">Certified <em>learning.</em></h2>
        <div className="certs-grid">
          {certs.map((c, i) => (
            <div key={i} className={`glass-card cert-card rv d${i}`}>
              <div className="cert-icon">{c.icon}</div>
              <div>
                <div className="cert-year">{c.year}</div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-org">{c.org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Goals ────────────────────────────────────────────────────────────────────
function Goals() {
  const short = [
    "Complete Data Science with Gen AI course",
    "Build 5+ ML projects for portfolio",
    "Secure an AI/ML internship or full-time role",
    "Complete the Agentic AI journey",
  ];
  const long = [
    "Become a skilled AI Engineer at a product company",
    "Work on cutting-edge AI products impacting millions",
    "Contribute meaningfully to open-source AI",
  ];
  return (
    <section className="sec-alt" style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">07 · Goals</div>
        <h2 className="big-h rv">Where I'm <span style={{ color: "var(--mint)" }}>headed.</span></h2>
        <div className="goals-grid">
          <div className="glass-card goal-card rv">
            <div className="goal-label">Short-term</div>
            {short.map((g) => <div key={g} className="goal-li"><span className="gl-icon">→</span>{g}</div>)}
          </div>
          <div className="glass-card goal-card long rv d2">
            <div className="goal-label">Long-term</div>
            {long.map((g) => <div key={g} className="goal-li"><span className="gl-icon">★</span>{g}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Numbers ──────────────────────────────────────────────────────────────────
function Numbers() {
  const nums = [
    { val: "10", suf: "+", label: "Projects Shipped", color: "var(--ink)" },
    { val: "0.85", suf: "", label: "Best R² Score", color: "var(--gold)" },
    { val: "6", suf: "+", label: "Frameworks", color: "var(--ink)" },
    { val: "20", suf: "%", label: "Kaggle Top Finish", color: "var(--ink)" },
  ];
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "80px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="nums-row rv">
          {nums.map((n, i) => (
            <div key={i} className="glass-card num-card">
              <div className="num-val" style={{ color: n.color }}>{n.val}<span>{n.suf}</span></div>
              <div className="num-label">{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const links = [
    { href: "mailto:vaibhavsharma95124v@gmail.com", lbl: "Email", val: "vaibhavsharma95124v@gmail.com", icon: "✉" },
    { href: "tel:+919012907709", lbl: "Phone", val: "+91-9012907709", icon: "📞" },
    { href: "https://github.com/Vaibhavsharma45", lbl: "GitHub", val: "github.com/Vaibhavsharma45", icon: "⌥" },
    { href: "https://linkedin.com/in/vaibhav-0sharma", lbl: "LinkedIn", val: "linkedin.com/in/vaibhav-0sharma", icon: "in" },
    { href: "https://kaggle.com/Vaibhavsharma45", lbl: "Kaggle", val: "kaggle.com/Vaibhavsharma45", icon: "◈" },
  ];
  return (
    <section id="contact" className="sec-alt" style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
      <div className="sec-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="sec-eyebrow rv">08 · Contact</div>
        <div className="contact-grid">
          <div className="rv">
            <h2 className="big-h">Let's build<br />something<br /><em>intelligent.</em></h2>
            <p className="contact-sub">Actively looking for AI/ML engineering, data science & Gen AI roles. Full-time, internship, or an interesting project — I'm all ears.</p>
            <a href="mailto:vaibhavsharma95124v@gmail.com" className="contact-cta">
              <span>Send me a message</span>
              <span>→</span>
            </a>
          </div>
          <div className="clinks rv d2">
            {links.map((l) => (
              <a key={l.lbl} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="clink">
                <span style={{ fontFamily: "var(--mono)", fontSize: "1rem", color: "var(--muted)", minWidth: 20 }}>{l.icon}</span>
                <div className="clink-info">
                  <span className="clink-lbl">{l.lbl}</span>
                  <span className="clink-val">{l.val}</span>
                </div>
                <span className="clink-arr">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <span className="foot-logo">V<em>S</em></span>
      <p className="foot-txt">
        Built with <span>Python</span> in my soul and <span>JavaScript</span> in production.<br />
        Vaibhav Sharma © 2025 · "Jo kuch bhi hota hai, ache ke liye hota hai"
      </p>
      <span className="foot-logo" style={{ opacity: 0.15 }}>V<em>S</em></span>
    </footer>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // Inject global styles once
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Wire up scroll reveal + tilt after mount
  useReveal();
  useTilt();

  return (
    <>
      <BgBlobs />
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Challenges />
      <Certifications />
      <Goals />
      <Numbers />
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}