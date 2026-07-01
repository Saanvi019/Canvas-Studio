"use client";

import { useParams } from "next/navigation";

import { useDesignStore } from "../../../src/store/designStore";
import AIChatPanel from "../../../src/components/editor/aiChatPanel";

export default function ProjectEditorPage() {
  const params = useParams();

  const designModel = useDesignStore((state) => state.designModel);

  const selectedComponentId = useDesignStore(
    (state) => state.selectedComponentId
  );

  const selectComponent = useDesignStore((state) => state.selectComponent);

  const setDesignModel = useDesignStore((state) => state.setDesignModel);

  const pushVersion = useDesignStore((state) => state.pushVersion);

  const undo = useDesignStore((state) => state.undo);

  const redo = useDesignStore((state) => state.redo);

  return (
    <main className="h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6">
        <div>
          <h1 className="font-semibold text-lg">CanvasStudio</h1>

          <p className="text-xs text-slate-500">Project ID: {params.id}</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600">
            AI Chat
          </button>

          <button className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600">
            Preview
          </button>

          <button className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600">
            Code
          </button>

          <button className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700">
            Export
          </button>

          <button
            onClick={undo}
            className="px-4 py-2 rounded-lg border border-slate-700"
          >
            Undo
          </button>

          <button
            onClick={redo}
            className="px-4 py-2 rounded-lg border border-slate-700"
          >
            Redo
          </button>

          <button
            onClick={pushVersion}
            className="px-4 py-2 rounded-lg border border-slate-700"
          >
            Save Version
          </button>
        </div>
      </header>

      {/* Main Editor Area */}
      <div className="flex-1 grid grid-cols-12">
        {/* Left Sidebar */}
        <aside className="col-span-2">
          <AIChatPanel />
        </aside>

        {/* Canvas */}
        <section className="col-span-8 flex items-center justify-center p-10">
          <div className="w-full max-w-5xl h-full border border-dashed border-slate-700 rounded-2xl p-8 overflow-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Canvas Area</h2>

            {designModel.components.length === 0 ? (
              <p className="text-slate-400 text-center">
                Add components from the sidebar
              </p>
            ) : (
              <div className="space-y-4">
                {designModel.components.map(
                  (component: { id: string; type: string }) => (
                    <div
                      key={component.id}
                      onClick={() => selectComponent(component.id)}
                      className={`p-4 rounded-lg border cursor-pointer ${
                        selectedComponentId === component.id
                          ? "border-violet-500"
                          : "border-slate-700"
                      }`}
                    >
                      {component.type}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-2 border-l border-slate-800 p-5">
          <h2 className="font-semibold mb-5">Properties</h2>

          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-slate-800">
              Font Size
            </div>

            <div className="p-3 rounded-lg border border-slate-800">Color</div>

            <div className="p-3 rounded-lg border border-slate-800">
              Padding
            </div>
          </div>

          <div className="mt-6 text-slate-400 text-sm">
            Selected Component:
            <br />
            {selectedComponentId ?? "None"}
          </div>

          <div className="mt-4 text-slate-400 text-sm">
            Components Count:
            <br />
            {designModel.components.length}
          </div>
        </aside>
      </div>
    </main>
  );
}
