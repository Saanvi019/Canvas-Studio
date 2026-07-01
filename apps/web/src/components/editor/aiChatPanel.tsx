"use client";

import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useDesignStore } from "../../../src/store/designStore";

export default function AIChatPanel() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");

  const params = useParams();

  const projectId = params.id as string;

  const setDesignModel = useDesignStore((state) => state.setDesignModel);

  const setAiLoading = useDesignStore((state) => state.setAiLoading);

  const designModel = useDesignStore((state) => state.designModel);

  const handleGenerate = async () => {
    console.log("Generate clicked");
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setAiLoading(true);

      let res;

      if (designModel) {
        res = await axios.post("http://localhost:5000/api/ai/refine", {
          projectId,
          designModel,
          instruction: prompt,
        });
      } else {
        res = await axios.post("http://localhost:5000/api/ai/generate", {
          projectId,
          prompt,
        });
      }

      setDesignModel(res.data.designModel);
      setAiMessage(res.data.explanation);

      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setAiLoading(false);
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
          {loading
            ? "Thinking..."
            : designModel
              ? "Refine Design"
              : "Generate Design"}
        </button>
        {aiMessage && (
          <div className="mt-4 rounded-lg bg-slate-800 p-3 text-sm text-slate-300">
            <p className="font-semibold text-white mb-1">AI</p>

            <p>{aiMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
