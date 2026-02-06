// Hero.jsx
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-light dark:bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
          Hi, I’m <span className="text-primary">Vaibhav Sharma</span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Full-Stack Developer & Aspiring AI Engineer building scalable,
          user-centric digital products with clean UI and solid engineering.
        </p>

        <div className="mt-8 flex gap-4">
          <a href="#projects" className="px-6 py-3 bg-primary text-white rounded-lg">
            View Projects
          </a>
          <a href="/resume.pdf" className="px-6 py-3 border border-primary text-primary rounded-lg">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
