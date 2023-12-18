import { redirect } from "next/navigation";
import { getUserId } from "@/lib/actions/user.actions";
import {
  fetchSavedThreadsIds,
  getSavedPosts,
} from "@/lib/actions/saved.actions";

import ThreadCard from "../cards/ThreadCard";
// interface savedResults {
//   threads: {
//     _id: string;
//     text: string;
//     parentId: string | null;
//     author: {
//       name: string;
//       image: string;
//       id: string;
//       _id: string;
//     };
//     createdAt: string;
//     likes: number;
//     children: {
//       author: {
//         image: string;
//       };
//     }[];
//   }[];
// }

interface Props {
  currentUserId: string;
}

async function SavedTab({ currentUserId }: Props) {
  // let savedResults: savedResults;

  const userId = await getUserId(currentUserId);

  let savedResults = await getSavedPosts(userId);

  // console.log("RESULTS SAVEDTAB", savedResults);

  /////////////////////////////////////////////////////////////

  return (
    <section className="mt-9 flex flex-col gap-10">
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
            id: thread.author._id,
          }}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}

export default SavedTab;
