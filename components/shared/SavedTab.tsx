import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
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
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
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

// props come from the profile page:
async function SavedTab({ currentUserId, accountId, accountType }: Props) {
  /////////////////////// FETCHING THE THREADS FROM A USER (FROM USER MODEL)
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);

    if (!result) {
      redirect("/");
    }

    ///////////////////////

    return (
      <section className="mt-9 flex flex-col gap-10">
        {result.threads.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId} // id of Clerk user
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
            community={
              accountType === "Community"
                ? { name: result.name, id: result.id, image: result.image }
                : thread.community
            }
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        ))}
      </section>
    );
  }
}

export default SavedTab;
