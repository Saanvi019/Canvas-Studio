import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { groq } from "../lib/groq.js";
import { generateSystemPrompt } from "../prompts/generateSystemPrompt.js";
import { DesignModelSchema } from "../validators/designModel.schema.js";
import merge from "lodash/merge.js";
import sharp from "sharp";
import { hf } from "../lib/huggingface.js";
import { refineSystemPrompt } from "../prompts/refineSystemPrompts.js";
import { aiRetry } from "../utils/aiRetry.js";

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

    const completion = await aiRetry(() =>
      groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: generateSystemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.5,

        response_format: {
          type: "json_object",
        },
      })
    );

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      res.status(500).json({
        success: false,
        message: "Groq returned no content",
      });

      return;
    }

    const parsed = JSON.parse(content);

    const designModel = DesignModelSchema.parse(parsed);

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

    res.json({
      success: true,
      version: projectVersion,
      designModel,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "AI generation failed",
      code: "AI_GENERATION_ERROR",
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

    const completion = await aiRetry(() =>
      groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: refineSystemPrompt,
          },
          {
            role: "user",
            content: JSON.stringify({
              designModel,
              instruction,
            }),
          },
        ],

        temperature: 0.2,

        response_format: {
          type: "json_object",
        },
      })
    );

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      res.status(500).json({
        success: false,
        message: "Groq returned no content",
      });

      return;
    }

    const patch = JSON.parse(content);

    const updatedDesignModel = merge(structuredClone(designModel), patch);
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
        designModel: updatedDesignModel,
      },
    });
    res.json({
      success: true,
      version: projectVersion,
      designModel: updatedDesignModel,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "AI refinement failed",
      code: "AI_REFINEMENT_ERROR",
    });
  }
}

export async function generateFromImage(req: Request, res: Response) {
  const projectId = req.body.projectId;
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Image is required",
      });

      return;
    }

    const imageBuffer = await sharp(req.file.buffer)
      .resize({
        width: 1024,
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
      })
      .toBuffer();

    const base64 = imageBuffer.toString("base64");

    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-VL-7B-Instruct",

      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this UI sketch and return ONLY valid DesignModel JSON.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
          ],
        },
      ],

      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      res.status(500).json({
        success: false,
        message: "No response from Hugging Face",
      });

      return;
    }

    const parsed = JSON.parse(content);

    const designModel = DesignModelSchema.parse(parsed);

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

    res.json({
      success: true,
      version: projectVersion,
      designModel,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Image processing failed",
      code: "IMAGE_PROCESSING_ERROR",
    });
  }
}
