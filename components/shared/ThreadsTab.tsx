import { redirect } from "next/navigation";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    createdAt: string;

    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  result = await fetchUserPosts(accountId);

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-5 flex flex-col gap-6">
      {result.threads.length === 0 ? (
        <p className="no-result text-light-1">
          {currentUserId === accountId
            ? "You haven't posted any fils yet"
            : "They haven't posted any fils yet"}
        </p>
      ) : (
        <>
          {result.threads.reverse().map((thread) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              author={
                accountType === "User"
                  ? { name: result.name, image: result.image, id: result.id } //** this is why here we get the name, image and id directly from user
                  : {
                      name: thread.author.name, //** whereas here, we get it from the threads
                      image: thread.author.image,
                      id: thread.author.id,
                    }
              }
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))}
        </>
      )}
    </section>
  );
}

export default ThreadsTab;
