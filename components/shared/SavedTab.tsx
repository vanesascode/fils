import { getUserId } from "@/lib/actions/user.actions";
import {
  fetchSavedThreadsIds,
  getCompleteThreadsfromThreadsIds,
} from "@/lib/actions/saved.actions";

import SavedCard from "../cards/SavedCard";

interface Props {
  currentUserId: string;
  savedThreads: string[];
}

async function SavedTab({ currentUserId, savedThreads }: Props) {
  const threads = await getCompleteThreadsfromThreadsIds(savedThreads);

  // console.log(profileId);

  /////////////////////////////////////////////////////////////

  return (
    <section className="mt-9 flex flex-col gap-10">
      {threads.map((thread) => (
        <SavedCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId} // id of Clerk user
          parentId={thread.parentId}
          content={thread.text}
          author={{
            name: thread.author.name,
            image: thread.author.image,
            id: thread.author._id,
          }}
          community={{
            name: thread.author.name,
            image: thread.author.image,
            id: thread.author._id,
          }}
          createdAt={thread.createdAt.toISOString()}
          comments={thread.children}
        />
      ))}
    </section>
  );
}

export default SavedTab;
