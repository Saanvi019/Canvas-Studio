"use client";

import { useDesignStore } from "../store/designStore";
import type { DesignComponent } from "@repo/types";

export default function PropertyPanel() {
  const { designModel, selectedComponentId, updateComponent } =
    useDesignStore();

  const selectedComponent: DesignComponent | undefined =
    designModel?.components.find(
      (component) => component.id === selectedComponentId
    );

  if (!selectedComponent) {
    return <div className="p-6 text-slate-400">Select a component</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Properties</h2>

      <div>
        <label className="block mb-2 text-sm">Content</label>

        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2"
          value={selectedComponent.content ?? ""}
          onChange={(e) =>
            updateComponent(selectedComponent.id, {
              content: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
