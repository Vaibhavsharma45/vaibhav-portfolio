import { FileDown, Github, Mail, Linkedin } from 'lucide-react'
import { profile } from '../data'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050510_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-accent-cyan font-mono text-sm mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Hi, I'm
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <span className="gradient-text">{profile.name}</span>
        </h1>
        <p className="text-xl sm:text-2xl text-accent-cyan font-semibold mb-2 opacity-0 animate-slide-up stagger-1" style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}>
          {profile.role}
        </p>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 opacity-0 animate-slide-up" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
          {profile.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-dark-950 font-semibold hover:shadow-glow-cyan hover:scale-105 transition-all"
          >
            <FileDown size={18} /> Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-gray-200 hover:border-accent-cyan/50 hover:text-accent-cyan transition-all"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-gray-200 hover:border-accent-purple/50 hover:text-accent-purple transition-all"
          >
            <Mail size={18} /> Contact
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-cyan transition" aria-label="LinkedIn">
            <Linkedin size={22} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-cyan transition" aria-label="GitHub">
            <Github size={22} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-accent-cyan animate-bounce" />
        </div>
      </div>
    </section>
  )
}
