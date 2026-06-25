export default function TechStackSection() {
  const stack = [
    "Next.js",
    "TypeScript",
    "Tailwind",
    "Express",
    "Prisma",
    "PostgreSQL",
    "Zustand",
  ];

  return (
    <section className="py-24 px-6 text-center">
      <h2 className="text-4xl font-bold mb-10">Built With</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {stack.map((item) => (
          <span
            key={item}
            className="border border-slate-800 px-4 py-2 rounded-lg"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
