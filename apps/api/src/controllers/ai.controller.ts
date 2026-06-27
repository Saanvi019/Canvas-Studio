import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { gemini } from "../lib/gemini.js";
import { generateSystemPrompt } from "../prompts/generateSystemPrompt.js";
import { DesignModelSchema } from "../validators/designModel.schema.js";
import merge from "lodash/merge.js";

export async function generateDesign(req: Request, res: Response) {
  try {
    const { prompt, projectId } = req.body;

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

    const latestVersion = await prisma.projectVersion.findFirst({
      where: {
        projectId,
      },
      orderBy: {
        versionNumber: "desc",
      },
    });

    const versionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;

    const projectVersion = await prisma.projectVersion.create({
      data: {
        projectId,
        versionNumber,
        designModel,
      },
    });

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
      version: projectVersion,
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

export async function refineDesign(req: Request, res: Response) {
  try {
    const { projectId, designModel, instruction } = req.body;

    if (!projectId || !designModel || !instruction) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });

      return;
    }

    const mockPatch = {
      theme: {
        primaryColor: "#2563eb",
      },
    };

    const updatedDesignModel = merge(structuredClone(designModel), mockPatch);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Refinement failed",
    });
  }
}
