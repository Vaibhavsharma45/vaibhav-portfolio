import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data'

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-card' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => handleNav('hero')} className="font-semibold text-lg gradient-text">
          {profile.name.split(' ')[0]}
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleNav(id)}
                className="text-gray-400 hover:text-accent-cyan transition-colors text-sm font-medium"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/5 mt-2 mx-4 rounded-xl overflow-hidden animate-fade-in">
          <ul className="p-4 flex flex-col gap-2">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className="block w-full text-left py-2 px-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-accent-cyan transition"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
