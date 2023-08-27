import { Comment } from "./Comment";
import { Container } from "../ui";
import type { User } from "@prisma/client";

interface CommentListProps {
  comments: { content: string; author: User; id: string; createdAt: Date }[];
  isLoggedIn: boolean;
}

export const CommentList = ({ comments, isLoggedIn }: CommentListProps) => {
  if (!comments) {
    return <div>loading...</div>;
  }
  return (
    <Container variant="primary" className="text-gray">
      <h2 className="mb-4 font-bold text-blue-300">{`${
        comments.length
      } Comment${comments.length === 1 ? "" : "s"}`}</h2>
      <ul>
        {comments.map((item) => (
          <Comment key={item.id} comment={item} isLoggedIn={isLoggedIn} />
        ))}
      </ul>
    </Container>
  );
};
