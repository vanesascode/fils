import { getUserId } from "@/lib/actions/user.actions";
import {
  fetchSavedThreadsIds,
  getCompleteThreadsfromThreadsIds,
} from "@/lib/actions/thread.actions";

import SavedCard from "../cards/SavedCard";

// import { currentUser } from "@clerk/nextjs";

interface Props {
  currentUserId: string;
  savedThreads: string[];
}

async function SavedTab({ currentUserId, savedThreads }: Props) {
  // const currentUserNow = await currentUser();
  // console.log("currentUserId", currentUserId); //user_2YDmo498seTopzVzPejYayif20n

  // console.log("currentUserId", currentUserNow?.id); //user_2YDmo498seTopzVzPejYayif20n

  // const userId = await getUserId(currentUserId);

  // const savedThreadsIds = await fetchSavedThreadsIds(userId);

  // console.log("  results - savedTab component:", results);

  // [
  //   new ObjectId("656f33310b0b77515576060d"),
  //   new ObjectId("6575da806a8cefef206c1d21")
  // ]

  // const threadsIds = savedThreadsIds.map((item) => item.toString());

  // [
  //   "656f33310b0b77515576060d",
  //   "6575da806a8cefef206c1d21"
  // ]

  const threads = await getCompleteThreadsfromThreadsIds(savedThreads);

  // console.log("  threads - savedTab component:", threads);

  // [

  //   {
  //     _id: new ObjectId("656f33310b0b77515576060d"),
  //     text: '\n' +
  //       'Cats are fascinating creatures that have captivated humans for centuries. They are independent, curious, and intelligent animals that come in a wide variety of breeds. ',
  //     author: {
  //       _id: new ObjectId("656cc645d5da3bae5cc79782"),
  //       username: 'walter',
  //       name: 'Walter',
  //       image: 'data:image/jpeg;bamore characters
  //     },
  //     parentId: undefined,
  //     community: {
  //       id: 'org_2Z2lqvtaFJFFvIp67LrsGBRjtNc',
  //       name: "Nina's fans",
  //       image: 'https://images.clerk.dev/uploaded/img_2Z2lquLKVAwWro2Jttkjt9LEBt4'
  //     },
  //     createdAt: 2023-12-05T14:26:57.590Z,
  //     children: [ [Object], [Object], [Object] ],
  //     likes: 0
  //   },

  //   {
  //     _id: new ObjectId("656f3b400b0b77515576073a"),
  //     text: 'Yes, cats are great',
  //     author: {
  //       _id: new ObjectId("656e69abd5da3bae5cca843a"),
  //       username: 'paris',
  //       name: 'Vanesa',
  //       image: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWXljbGJ5MHZFaWxadWNONkdkN3hQNEk2SlkifQ'
  //     },
  //     parentId: '656f33310b0b77515576060d',
  //     community: { id: undefined, name: undefined, image: undefined },
  //     createdAt: 2023-12-05T15:01:20.686Z,
  //     children: [],
  //     likes: 0
  //   },

  //   {
  //     _id: new ObjectId("6576b4a4cb927fa515a4f6f1"),
  //     text: "I'm glad you like them ❤️",
  //     author: {
  //       _id: new ObjectId("656cc645d5da3bae5cc79782"),
  //       username: 'walter',
  //       name: 'Walter',
  //       image: 'data:imag 60503 more characters
  //     },
  //     parentId: '656f33310b0b77515576060d',
  //     community: { id: undefined, name: undefined, image: undefined },
  //     createdAt: 2023-12-11T07:05:08.341Z,
  //     children: [],
  //     likes: 0
  //   }
  // ]

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
