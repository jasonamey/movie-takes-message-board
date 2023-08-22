import { commentRouter} from './routers/comments'
import { movieRouter } from "./routers/movies";
import { replyRouter } from "./routers/replies";
import { takeRouter} from './routers/takes'
import { voteRouter } from "./routers/votes";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  movies: movieRouter, 
  takes: takeRouter,
  comments: commentRouter,
  replies: replyRouter, 
  votes: voteRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
