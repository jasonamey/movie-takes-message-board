import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure.input( z.object({content: z.string(), takeId: z.string()})).mutation(async ({input: {content, takeId}, ctx}) => {
    const currentUserId = ctx.session?.user.id;
    const comment = await ctx.prisma.comment.create({
      data: {
        content, 
        authorId: currentUserId, 
        takeId
      }  
    })
    return comment
  }), 
  byId: publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input : { id}, ctx }) => {
    const comments = await ctx.prisma.comment.findMany({
      where: {takeId: id},
      select: {
        content: true,
        author: true,
        id: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return comments
  }),
})