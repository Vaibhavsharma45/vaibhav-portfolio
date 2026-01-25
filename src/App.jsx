import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StarsBackground from './components/StarsBackground'
import CursorGlow from './components/CursorGlow'

function App() {
  return (
    <div className="min-h-screen bg-dark-950 relative">
      <StarsBackground />
      <CursorGlow />
      <div className="relative z-10">
        <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
      </div>
    </div>
  )
}

export default App
