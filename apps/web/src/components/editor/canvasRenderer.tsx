"use client";

import { useDesignStore } from "../../../src/store/designStore";

export default function CanvasRenderer() {
  const designModel = useDesignStore((state) => state.designModel);
  const isAiLoading = useDesignStore((state) => state.isAiLoading);

  if (isAiLoading) {
    return (
      <div className="w-full h-full animate-pulse rounded-2xl border border-slate-700 bg-slate-100 p-8">
        <div className="h-10 w-1/2 rounded bg-slate-300 mb-8"></div>

        <div className="h-32 rounded bg-slate-200 mb-6"></div>

        <div className="h-20 rounded bg-slate-200 mb-6"></div>

        <div className="h-12 w-40 rounded bg-slate-300"></div>
      </div>
    );
  }

  if (!designModel) {
    return (
      <div className="w-full h-full border border-dashed border-slate-700 rounded-2xl flex items-center justify-center">
        <p className="text-slate-400">Generate a design to begin.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full border border-slate-700 rounded-2xl bg-white p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-8 text-black">
        {designModel?.name}
      </h1>

      {designModel.components.map((component: any) => (
        <div key={component.id} className="mb-6 border rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">
            {component.type.toUpperCase()}
          </p>

          <p className="text-black">{component.content}</p>
        </div>
      ))}
    </div>
  );
}
