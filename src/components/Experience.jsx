import { Briefcase, GraduationCap, Award, Github, BarChart3, Cpu, Sparkles, Code, MessageSquare } from 'lucide-react'
import { experience, education, certifications } from '../data'

const certIcons = { github: Github, chart: BarChart3, cpu: Cpu, sparkles: Sparkles, code: Code, messageSquare: MessageSquare }

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Experience & Education</h2>
        <p className="text-gray-500 font-mono text-sm mb-12">// timeline</p>

        <div className="space-y-12">
          {/* Experience */}
          <div>
            <h3 className="flex items-center gap-2 text-accent-cyan font-semibold mb-6">
              <Briefcase size={20} /> Experience
            </h3>
            <div className="relative pl-8 border-l-2 border-dark-600">
              {experience.map((job) => (
                <div key={job.role + job.company} className="mb-10 last:mb-0">
                  <div className="absolute -left-2.5 w-3 h-3 rounded-full bg-accent-cyan" />
                  <div className="glass rounded-xl p-6 ml-2 border border-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-semibold text-white">{job.role}</span>
                      <span className="text-gray-500 text-sm font-mono">{job.period}</span>
                    </div>
                    <p className="text-accent-cyan/90 text-sm mb-4">{job.company}</p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      {job.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent-cyan/60">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="flex items-center gap-2 text-accent-purple font-semibold mb-6">
              <GraduationCap size={20} /> Education
            </h3>
            <div className="relative pl-8 border-l-2 border-dark-600">
              {education.map((edu) => (
                <div key={edu.degree} className="mb-10 last:mb-0">
                  <div className="absolute -left-2.5 w-3 h-3 rounded-full bg-accent-purple" />
                  <div className="glass rounded-xl p-6 ml-2 border border-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-white">{edu.degree}</span>
                      <span className="text-gray-500 text-sm font-mono">{edu.period}</span>
                    </div>
                    <p className="text-accent-purple/90 text-sm">{edu.school}, {edu.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications — project-style tiles */}
          {certifications.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-accent-blue font-semibold mb-6">
                <Award size={20} /> Certifications
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((c) => {
                  const Icon = certIcons[c.icon] || Award
                  return (
                    <div
                      key={c.name}
                      className="glass rounded-2xl p-5 md:p-6 border border-white/5 hover:border-accent-cyan/25 hover:shadow-glow-cyan transition-all group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan/20 transition">
                          <Icon size={22} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white group-hover:text-accent-cyan transition">
                            {c.name}
                          </h4>
                          <p className="text-gray-500 text-sm">{c.issuer}</p>
                          {c.period && <p className="text-accent-cyan/80 text-xs font-mono mt-1">{c.period}</p>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
