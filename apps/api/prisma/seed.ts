import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "demo@canvasstudio.com",
      passwordHash: "demo-password",
      plan: "FREE",
    },
  });

  const project = await prisma.project.create({
    data: {
      userId: user.id,
      name: "Landing Page Demo",
    },
  });

  await prisma.projectVersion.create({
    data: {
      projectId: project.id,
      versionNumber: 1,
      designModel: {
        type: "page",
        children: [
          {
            type: "hero",
            text: "Welcome to CanvasStudio",
          },
        ],
      },
    },
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
