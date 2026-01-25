import { Github, ExternalLink, AlertCircle, Lightbulb } from 'lucide-react'
import { projects } from '../data'

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Projects</h2>
        <p className="text-gray-500 font-mono text-sm mb-12">// problem → solution</p>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-accent-cyan/20 transition-all group"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-accent-cyan transition">
                  {p.title}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-dark-700/80 text-gray-400 hover:text-accent-cyan hover:bg-accent-cyan/10 transition"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-dark-700/80 text-gray-400 hover:text-accent-purple hover:bg-accent-purple/10 transition"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md bg-accent-cyan/10 text-accent-cyan text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex gap-2">
                  <AlertCircle size={18} className="text-amber-500/80 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-500/90 font-medium">Problem: </span>
                    <span className="text-gray-400">{p.problem}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Lightbulb size={18} className="text-emerald-500/80 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-emerald-500/90 font-medium">Solution: </span>
                    <span className="text-gray-400">{p.solution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
