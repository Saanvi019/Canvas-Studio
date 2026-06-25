export default function FeaturesSection() {
  const features = [
    {
      icon: "✨",
      title: "AI Layout Generation",
      description:
        "Generate complete UI layouts, sections and components using natural language prompts.",
    },
    {
      icon: "🕒",
      title: "Version History",
      description:
        "Track every design change and instantly restore previous versions whenever needed.",
    },
    {
      icon: "⚡",
      title: "React Code Export",
      description:
        "Export clean production-ready React code directly from your designs.",
    },
    {
      icon: "🎨",
      title: "Visual Editing",
      description:
        "Modify layouts visually through an intuitive drag-and-edit experience.",
    },
    {
      icon: "🤖",
      title: "AI Assistant",
      description:
        "Let AI generate components, improve layouts and automate repetitive tasks.",
    },
    {
      icon: "📦",
      title: "Project Management",
      description:
        "Organize multiple projects, save versions and continue work seamlessly.",
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-8 py-40">
      {/* Header */}
      <div className="text-center mb-24">
        <div className="inline-flex px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-8">
          🚀 FEATURES
        </div>

        <h2 className="text-5xl font-bold mb-8">
          Everything you need to build
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-8">
          Powerful tools designed to help developers create, manage and export
          beautiful interfaces faster than ever.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="border border-slate-800 rounded-3xl p-10 min-h-[260px] bg-slate-900/20"
          >
            <div className="text-5xl mb-8">{feature.icon}</div>

            <h3 className="text-2xl font-semibold mb-5">{feature.title}</h3>

            <p className="text-slate-400 leading-8">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
