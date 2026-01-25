import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {currentYear} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-cyan transition" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent-cyan transition" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={`mailto:${profile.email}`} className="text-gray-500 hover:text-accent-cyan transition" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
