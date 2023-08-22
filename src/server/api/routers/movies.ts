import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const movieRouter = createTRPCRouter({

  create: protectedProcedure.input(
    z.object({
      budget: z.number(),
      revenue: z.number(),
      releaseDate: z.string(),
      posterPath: z.string(),
      tagline: z.string(),
      title: z.string(),
      runtime: z.number()
    })
  ).mutation(async ({input: {budget, revenue, releaseDate, posterPath, tagline, title, runtime}, ctx}) => {
    const movie = await ctx.prisma.movie.create({
      data: {
        budget,
        revenue, 
        releaseDate, 
        posterPath, 
        tagline, 
        title, 
        runtime, 
      }
    })
    
    return movie
    
    }),

    getAll : publicProcedure.query(async ({ctx}) => {
      return await ctx.prisma.movie.findMany()
    })
  
  })
