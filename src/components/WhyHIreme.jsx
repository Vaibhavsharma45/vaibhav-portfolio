const WhyHireMe = () => {
  const points = [
    {
      title: "Problem Solver",
      desc: "I focus on solving real-world problems with clean, scalable and maintainable solutions.",
    },
    {
      title: "Fast Learner",
      desc: "I quickly adapt to new technologies and improve by building real projects.",
    },
    {
      title: "Professional Mindset",
      desc: "I communicate clearly, accept feedback, and work well in collaborative environments.",
    },
  ];

  return (
    <section className="py-24 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Hire Me?
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {points.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyHireMe;
