import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const replyRouter = createTRPCRouter({
  create: protectedProcedure.input( z.object({content: z.string(), commentId: z.string()})).mutation(async ({input: {content, commentId}, ctx}) => {
    const currentUserId = ctx.session?.user.id;
    const reply = await ctx.prisma.reply.create({
      data: {
        content, 
        authorId: currentUserId, 
        commentId
      }  
    })
    return reply
  }), 
  byId: publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input : { id}, ctx }) => {
    const replies = await ctx.prisma.reply.findMany({
      where: {commentId: id},
      select: {
        content: true,
        author: true,
        id: true, 
        createdAt: true,
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    return replies
  }),
})