import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { ssgHelper } from "@/server/helpers/ssgHelper";
import {
  PageLayout,
  MovieHeader,
  MovieHeaderSkeleton,
  GoBack,
  CommentBox,
  CommentList,
} from "@/components";
import { Button } from "@/components/ui";

const TakeViewPage: NextPage<{ id: string }> = ({ id }) => {
  const [comment, setComment] = useState("");
  const { data, isLoading } = api.takes.byId.useQuery({ id });
  const ctx = api.useContext();
  const { status } = useSession();
  const createComment = api.comments.create.useMutation({
    onSuccess: () => {
      void ctx.comments.byId.invalidate();
      setComment("");
    },
  });

  const { data: commentsData } = api.comments.byId.useQuery({ id });
  const inputHandler = (commentInput: string) => {
    if (commentInput.length <= 256) {
      setComment(commentInput);
    }
  };

  const submitHandler = async () => {
    await createComment.mutateAsync({
      content: comment,
      takeId: id,
    });
  };
  if (!data) return <div>404</div>;

  const { movie, comments, content, votes, genre, author } = data;

  return (
    <PageLayout>
      <div className="flex w-11/12 flex-grow flex-col gap-4 sm:w-[730px]">
        <GoBack color="blue" />
        {isLoading ? (
          <MovieHeaderSkeleton />
        ) : (
          <MovieHeader
            movie={movie}
            numComments={comments.length}
            numVotes={votes.length}
            content={content}
            takeId={id}
            votes={votes}
            genre={genre}
            authorEmail={author.email}
            authorId={author.id}
          />
        )}
        {commentsData && (
          <CommentList
            comments={commentsData}
            isLoggedIn={status === "authenticated"}
          />
        )}
        {status === "authenticated" ? (
          <CommentBox
            submitHandler={() => void submitHandler()}
            inputHandler={inputHandler}
            comment={comment}
          />
        ) : (
          <div className="flex w-full flex-col items-end justify-end gap-2">
            <p className="text-blue-400">Log in to Comment:</p>
            <Button variant="submit">Log In</Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = ssgHelper();
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no id");
  await ssg.takes.byId.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default TakeViewPage;
