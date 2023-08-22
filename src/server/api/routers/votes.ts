import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const voteRouter = createTRPCRouter({
  upVote: protectedProcedure
    .input(
      z.object({
        takeId: z.string(),
        voteType: z.string(),
      })
    )
    .mutation(async ({ input: { takeId, voteType }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      if (!currentUserId) {
        throw new Error("not logged in");
      }
      if (voteType === "DOWN") {
        await ctx.prisma.vote.delete({
          where: {
            userId_takeId: { userId: currentUserId, takeId },
          },
        });
      } else {
        const vote = await ctx.prisma.vote.create({
          data: {
            userId: currentUserId,
            takeId: takeId,
          },
        });
        return vote;
      }
    }),
});
