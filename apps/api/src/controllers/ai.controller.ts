import type { Request, Response } from "express";

import { gemini } from "../lib/gemini.js";
import { generateSystemPrompt } from "../prompts/generateSystemPrompt.js";
import { DesignModelSchema } from "../validators/designModel.schema.js";
export async function generateDesign(req: Request, res: Response) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({
        success: false,
        message: "Prompt is required",
      });

      return;
    }

    const mockResponse = {
      name: "Landing Page",

      theme: {
        primaryColor: "#7c3aed",
        secondaryColor: "#0f172a",
        backgroundColor: "#ffffff",
        textColor: "#111827",
        borderRadius: "12px",
        fontFamily: "Inter",
      },

      components: [
        {
          id: "hero-1",
          type: "hero",
          content: "Build UI with AI",
        },
        {
          id: "button-1",
          type: "button",
          content: "Get Started",
        },
      ],
    };
    const designModel = DesignModelSchema.parse(mockResponse);

    const content = mockResponse;

    if (!content) {
      res.status(500).json({
        success: false,
        message: "Gemini returned no content",
      });

      return;
    }

    res.json({
      success: true,
      designModel,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
}
