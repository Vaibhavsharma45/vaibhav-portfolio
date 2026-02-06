const CurrentlyLearning = () => {
  const learning = [
    "Advanced React Patterns",
    "Backend Architecture",
    "System Design Basics",
    "Machine Learning Fundamentals",
  ];

  return (
    <section className="py-20 px-4 bg-black/5 dark:bg-white/5">
      <h2 className="text-3xl font-bold text-center mb-8">
        Currently Learning
      </h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {learning.map((item, index) => (
          <span
            key={index}
            className="px-5 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyLearning;
