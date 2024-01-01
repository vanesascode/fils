import { getUserId } from "@/lib/actions/user.actions";
import { getSavedPosts } from "@/lib/actions/saved.actions";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
}

async function SavedTab({ currentUserId }: Props) {
  const userId = await getUserId(currentUserId);

  let savedResults = await getSavedPosts(userId);

  return (
    <section className="mt-5 flex flex-col gap-6">
      {savedResults.length === 0 ? (
        <p className="no-result text-light-1">You haven't saved any fils yet</p>
      ) : (
        <>
          {savedResults.map((thread) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              author={{
                name: thread.author.name,
                image: thread.author.image,
                id: thread.author.id,
              }}
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))}
        </>
      )}
    </section>
  );
}

export default SavedTab;
