import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function createProject(req: Request, res: Response) {
  try {
    const { name } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const project = await prisma.project.create({
      data: {
        name: name || "Untitled Project",
        userId,

        versions: {
          create: {
            versionNumber: 1,

            designModel: {
              id: "root",
              type: "page",
              children: [],
            },
          },
        },
      },

      include: {
        versions: true,
      },
    });

    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getProjects(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId,
        deletedAt: null,
      },

      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function getProjectById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const userId = req.user?.id as string;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },

      include: {
        versions: {
          orderBy: {
            versionNumber: "desc",
          },

          take: 1,
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function updateProject(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const { name, thumbnailUrl } = req.body;

    const userId = req.user?.id as string;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id },

      data: {
        name,
        thumbnailUrl,
      },
    });

    return res.status(200).json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function deleteProject(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const userId = req.user?.id as string;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await prisma.project.update({
      where: { id },

      data: {
        deletedAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
