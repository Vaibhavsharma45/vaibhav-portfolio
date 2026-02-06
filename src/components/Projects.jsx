// Projects.jsx
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <div key={project.title}
              className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
  Focused on performance, responsiveness, and clean UI/UX.
</p>


              <div className="flex gap-2 mt-4 flex-wrap">
                {project.tech.map(t => (
                  <span key={t} className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <a href={project.live} className="text-primary">Live</a>
                <a href={project.github} className="text-primary">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
