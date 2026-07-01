"use client";

import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useDesignStore } from "../../../src/store/designStore";

export default function AIChatPanel() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const projectId = params.id as string;
  const setDesignModel = useDesignStore((state) => state.setDesignModel);
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/ai/generate", {
        prompt,
        projectId,
      });

      setDesignModel(res.data.designModel);

      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white">AI Assistant</h2>

        <p className="text-sm text-slate-400 mt-1">
          Describe the UI you want to generate or refine.
        </p>
      </div>

      {/* Prompt */}
      <div className="flex-1 p-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Create a modern SaaS landing page with a navbar, hero, pricing section and footer..."
          className="w-full h-52 rounded-xl bg-slate-950 border border-slate-700 p-4 text-white resize-none focus:outline-none focus:border-violet-500"
        />
      </div>

      {/* Buttons */}
      <div className="p-4 space-y-3 border-t border-slate-800">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 rounded-lg py-3 font-medium"
        >
          Generate Design
        </button>

        <button className="w-full border border-slate-700 hover:border-slate-600 rounded-lg py-3 font-medium">
          Refine Design
        </button>
      </div>
    </div>
  );
}
