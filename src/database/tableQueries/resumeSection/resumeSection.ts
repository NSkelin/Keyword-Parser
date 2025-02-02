import prisma from "@/database/client";

export async function getResumeAssistData() {
  const data = await prisma.resumeSection.findMany({
    include: {
      positions: {
        include: {
          bullets: {
            include: {
              requiredKeywords: {
                include: {
                  aliases: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}
