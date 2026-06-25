import Link from "next/link";

export default function HeroSection() {
  return (
    <section className=" mx-auto px-6 min-h-[100vh] flex flex-col justify-center items-center text-center gap-15">
      <p className="inline-block px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-8">
        AI-Powered UI Builder
      </p>

      <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight mb-8">
        Design, Generate &
        <br />
        Export React UIs
      </h1>

      <p className="max-w-3xl text-lg md:text-xl text-slate-400 leading-8 mb-12">
        Create UI layouts with AI prompts, manage design versions, customize
        components visually, and export production-ready React code in minutes.
      </p>

      <div className="flex items-center gap-5 mb-16">
        <Link
          href="/auth/register"
          className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 transition"
        >
          Start Building
        </Link>

        <Link
          href="/auth/login"
          className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 transition"
        >
          Login
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
        <span>✨ AI Layout Generation</span>
        <span>⚡ React Code Export</span>
        <span>🕒 Version History</span>
        <span>🎨 Visual Editing</span>
      </div>
    </section>
  );
}
