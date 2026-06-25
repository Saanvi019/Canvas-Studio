export default function EditorPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-6">
          💻 EDITOR PREVIEW
        </div>

        <h2 className="text-6xl font-bold mb-6">Editor Preview</h2>

        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
          Experience the future of UI building with AI-powered design, real-time
          editing and code export.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/20 backdrop-blur-sm shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-800 px-8 py-5">
          <h3 className="text-xl font-semibold text-slate-200">
            CanvasStudio Editor
          </h3>
        </div>

        {/* Editor Layout */}
        <div className="grid grid-cols-12 min-h-[600px]">
          {/* Components */}
          <div className="col-span-3 border-r border-slate-800 p-8">
            <h3 className="text-2xl font-semibold mb-8">Components</h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800">
                <span>🖱️</span>
                <span>Button</span>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800">
                <span>📄</span>
                <span>Card</span>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800">
                <span>📑</span>
                <span>Navbar</span>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800">
                <span>🎯</span>
                <span>Hero</span>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="col-span-6 border-r border-slate-800 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.08),transparent_70%)]">
            <div className="border border-violet-500/40 rounded-2xl w-[280px] h-[180px] flex flex-col items-center justify-center bg-slate-900/40">
              <div className="text-4xl mb-4">🖼️</div>

              <p className="text-xl font-medium">Hero Section</p>
            </div>
          </div>

          {/* Properties */}
          <div className="col-span-3 p-8">
            <h3 className="text-2xl font-semibold mb-8">Properties</h3>

            <div className="space-y-5">
              <div className="border border-slate-800 rounded-xl p-4">
                Font Size
              </div>

              <div className="border border-slate-800 rounded-xl p-4">
                Color
              </div>

              <div className="border border-slate-800 rounded-xl p-4">
                Padding
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
