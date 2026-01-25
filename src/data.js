/**
 * Portfolio content — edit here to update the site
 */

export const profile = {
  name: 'Vaibhav Sharma',
  role: 'Full Stack Developer & ML Engineer',
  tagline: 'Building production-ready ML pipelines, NLP systems & full-stack applications',
  email: 'vaibhavsharma95124v@gmail.com',
  phone: '+91 9012907709',
  location: 'Muzaffarnagar, Uttar Pradesh, India',
  resumeUrl: '/VaibhavSharmaResume.pdf',
  linkedin: 'https://www.linkedin.com/in/vaibhavasharma45',
  github: 'https://github.com/Vaibhavsharma45',
  portfolio: 'https://thevaibhavacom.vercel.app',
}

export const about = {
  story: `I'm a data-driven BCA student with hands-on experience in machine learning, data analysis, and NLP. I build end-to-end ML pipelines with high accuracy, and I'm skilled in Python, SQL, and Power BI with a track record of deploying production apps using Flask and Streamlit.`,
  passion: `I focus on building things that actually work—not just demos. Strong fundamentals, consistency, and clean system design matter more to me than shortcuts.`,
  focus: `Actively seeking Data Analyst or Machine Learning roles to apply my predictive modeling and analytical skills in real-world problems.`,
}

export const skills = [
  { category: 'Machine Learning & AI', items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'NLTK', 'Random Forest', 'Deep Learning'] },
  { category: 'Backend & APIs', items: ['Flask', 'FastAPI', 'REST', 'MongoDB', 'SQL', 'SQLite'] },
  { category: 'Frontend', items: ['React', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'Data & Visualization', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Power BI', 'EDA'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Jupyter', 'Vercel', 'Streamlit', 'VS Code'] },
]

export const projects = [
  {
    title: 'Cryptocurrency Volatility Prediction',
    tech: ['Python', 'Random Forest', 'Streamlit', 'Pandas', 'Scikit-learn'],
    problem: 'Volatility in crypto markets makes risk assessment difficult for traders and analysts.',
    solution: 'Built an ML model with 15 technical indicators on 50K+ records. Achieved R² 0.85, RMSE 0.0164, MAE 0.0098. Deployed real-time prediction web app with Streamlit.',
    github: 'https://github.com/Vaibhavsharma45/crypto-volatility-prediction-project',
    live: null,
  },
  {
    title: 'MARG-DARSHAK',
    tech: ['Flask', 'Random Forest', 'SQLite', 'Plotly'],
    problem: 'Students and professionals need data-driven career path recommendations.',
    solution: 'ML-based career prediction system using Random Forest with feature selection and cross-validation. Full-stack Flask app with SQLite and Plotly dashboards, deployed on Render.',
    github: 'https://github.com/Vaibhavsharma45/marg-darshak',
    live: null,
  },
  {
    title: 'Resume Analyser',
    tech: ['Flask', 'React', 'NLP', 'TF-IDF', 'NLTK'],
    problem: 'Resumes often fail ATS filters due to poor keyword matching and structure.',
    solution: 'NLP pipeline with TF-IDF and NLTK for automated resume scoring and ATS compatibility. Flask REST API with PDF parsing; React frontend for seamless UX.',
    github: 'https://github.com/Vaibhavsharma45/Resume_Analyser',
    live: null,
  },
  {
    title: 'Birth Weight Predictor',
    tech: ['Python', 'ML', 'HTML'],
    problem: 'Predicting birth weight helps in early medical risk assessment.',
    solution: 'ML model for birth weight prediction with a simple web interface.',
    github: 'https://github.com/Vaibhavsharma45/birth-weight-predictor',
    live: null,
  },
  {
    title: 'Myntra Review Scraper',
    tech: ['Python', 'Web Scraping', 'Jupyter'],
    problem: 'Structured product review data is needed for sentiment and trend analysis.',
    solution: 'Web scraping pipeline to collect and structure Myntra product reviews for analysis.',
    github: 'https://github.com/Vaibhavsharma45/MYNTRA_REVIEW_SCRAPER',
    live: null,
  },
]

export const experience = [
  {
    role: 'Data Analyst Intern',
    company: 'Intern Geek',
    period: 'Nov 2025 – Dec 2025',
    bullets: [
      'Conducted EDA on Titanic dataset; uncovered survival patterns and key statistical insights.',
      'Applied hypothesis testing and statistical analysis to validate data-driven assumptions.',
      'Designed interactive Power BI dashboards to visualize trends and communicate findings.',
      'Created data visualizations using Matplotlib and Seaborn for reporting.',
    ],
  },
]

export const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Maa Shakumbhari University',
    period: 'Aug 2023 – May 2026',
    location: 'Saharanpur',
  },
]

export const certifications = [
  { name: 'Data Science with Gen AI', issuer: 'PW Skills', period: '2025–Present (Ongoing)', icon: 'sparkles' },
  { name: 'Gen AI for all', issuer: 'PW Skills', period: '2025', icon: 'sparkles' },
  { name: 'Python Programming & ML', issuer: 'Self-learned', period: '2025–2026', icon: 'code' },
  { name: 'Introduction to Prompt Engineering', issuer: 'Simplilearn', period: '2026', icon: 'messageSquare' },
]
