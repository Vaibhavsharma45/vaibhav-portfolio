import { useState } from 'react'
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react'
import { profile } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Use mailto as fallback when no backend
    const mailto = `mailto:${profile.email}?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\n— ' + form.email)}`
    window.location.href = mailto
    setForm({ name: '', email: '', message: '' })
    setSent(true)
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Contact</h2>
        <p className="text-gray-500 font-mono text-sm mb-12">// get in touch</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <p className="text-gray-400">
              Open to Data Analyst and Machine Learning opportunities. Reach out for collabs or a chat.
            </p>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-gray-300 hover:text-accent-cyan transition">
              <div className="p-2 rounded-lg bg-accent-cyan/10"><Mail size={18} /></div>
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-accent-cyan transition">
              <div className="p-2 rounded-lg bg-accent-cyan/10"><Linkedin size={18} /></div>
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-accent-cyan transition">
              <div className="p-2 rounded-lg bg-accent-cyan/10"><Github size={18} /></div>
              GitHub
            </a>
            <div className="flex items-center gap-3 text-gray-400">
              <div className="p-2 rounded-lg bg-dark-700"><MapPin size={18} /></div>
              {profile.location}
            </div>
          </div>

          {/* Form */}
          <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-accent-cyan focus:outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-accent-cyan focus:outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-accent-cyan focus:outline-none transition resize-none"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-dark-950 font-semibold hover:shadow-glow-cyan transition"
              >
                <Send size={18} /> {sent ? 'Opened mail client' : 'Send message'}
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-3">Uses your mail client to send. For a custom backend, connect a form service.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
