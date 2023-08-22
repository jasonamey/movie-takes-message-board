import { createServerSideHelpers } from "@trpc/react-query/server"
import { createInnerTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";
import superjson from "superjson";

export function ssgHelper() {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null, revalidateSSG: null }),
    transformer: superjson,
  });
}