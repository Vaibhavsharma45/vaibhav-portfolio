import { skills } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Skills</h2>
        <p className="text-gray-500 font-mono text-sm mb-12">// tech & tools</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-accent-cyan/20 transition-all hover:shadow-glow-cyan"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-semibold text-accent-cyan mb-4 text-sm uppercase tracking-wider">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-dark-700/80 text-gray-300 text-sm border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
