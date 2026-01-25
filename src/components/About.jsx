import { User, Target, Zap } from 'lucide-react'
import { about } from '../data'

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 gradient-text">About Me</h2>
        <p className="text-gray-500 font-mono text-sm mb-12">// who I am</p>

        <div className="space-y-8">
          <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-accent-cyan/20 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan">
                <User size={20} />
              </div>
              <h3 className="font-semibold text-lg">Professional Story</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{about.story}</p>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-accent-purple/20 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                <Zap size={20} />
              </div>
              <h3 className="font-semibold text-lg">Passion & Approach</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{about.passion}</p>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-accent-blue/20 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                <Target size={20} />
              </div>
              <h3 className="font-semibold text-lg">Career Focus</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{about.focus}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
