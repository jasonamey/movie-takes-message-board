import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const takeRouter = createTRPCRouter({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id }, ctx }) => {
      const take = await ctx.prisma.take.findUnique({
        where: { id },
        include: {
          author: true,
          movie: true,
          comments: {
            select: {
              content: true,
              author: true,
            },
          },
          votes: true,
        },
      });
      return take;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const takes = await ctx.prisma.take.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        votes: true,
        comments: true,
        movie: true,
        releaseYear: true,
        author: true,
        genre: true,
      },
    });
    if (!takes) {
      return [];
    }

    return takes.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      tagline: post.movie.tagline,
      numVotes: post.votes.length,
      numComments: post.comments.length,
      releaseDate: post.movie.releaseDate,
      authorEmail: post.author.email,
      votes: post.votes,
      genre: post.genre,
    }));
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        movieId: z.string(),
        genre: z.string(),
        status: z.string(),
        releaseYear: z.string(),
      })
    )
    .mutation(
      async ({
        input: { title, content, movieId, status, genre, releaseYear },
        ctx,
      }) => {
        const currentUserId = ctx.session?.user.id;
        const takeToSend = await ctx.prisma.take.create({
          data: {
            authorId: currentUserId,
            content,
            title,
            movieId,
            status,
            genre,
            releaseYear,
          },
        });
        return takeToSend;
      }
    ),

  getStatus: publicProcedure.query(async ({ ctx }) => {
    const takes = await ctx.prisma.take.findMany();
    const statuses: Record<string, number> = {};
    takes.forEach((take) => {
      const takeStatus = take.status;
      if (!(takeStatus === "")) {
        if (statuses[takeStatus]) {
          statuses[takeStatus] += 1;
        } else {
          statuses[takeStatus] = 1;
        }
      }
    });
    return statuses;
  }),
});
