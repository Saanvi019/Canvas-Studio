import type { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";

export async function saveVersion(req: Request, res: Response) {
  try {
    const projectId = req.params.id as string;

    const { designModel } = req.body;

    const latestVersion = await prisma.projectVersion.findFirst({
      where: {
        projectId,
      },

      orderBy: {
        versionNumber: "desc",
      },
    });

    const version = await prisma.projectVersion.create({
      data: {
        projectId,

        versionNumber: (latestVersion?.versionNumber ?? 0) + 1,

        designModel,
      },
    });

    return res.status(201).json({
      success: true,
      version,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function getVersions(req: Request, res: Response) {
  try {
    const projectId = req.params.id as string;

    const versions = await prisma.projectVersion.findMany({
      where: {
        projectId,
      },

      orderBy: {
        versionNumber: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      versions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export async function getVersion(req: Request, res: Response) {
  try {
    const projectId = req.params.id as string;

    const versionNumber = Number(req.params.vnum);

    const version = await prisma.projectVersion.findUnique({
      where: {
        projectId_versionNumber: {
          projectId,
          versionNumber,
        },
      },
    });

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }

    return res.status(200).json({
      success: true,
      version,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
