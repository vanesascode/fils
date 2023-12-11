import { redirect } from "next/navigation";
import { getUserId } from "@/lib/actions/user.actions";
import {
  fetchSavedThreadsIds,
  getCompleteThreadsfromThreadsIds,
} from "@/lib/actions/thread.actions";

// interface Thread {
//   _id: string;
//   text: string;
//   author: string;
//   parentId?: string | null;
//   community?: string | null;
//   createdAt: Date;
//   children: Thread[] | null;
//   likes: number;
// }

// interface SavedThreadsList {
//   totalThreads: number;
//   threads: Thread[];
// }

interface Props {
  currentUserId: string;
}

async function SavedTab({ currentUserId }: Props) {
  const userId = await getUserId(currentUserId);

  const savedThreadsIds = await fetchSavedThreadsIds(userId);

  // console.log("  results - savedTab component:", results);

  // [
  //   new ObjectId("656f33310b0b77515576060d"),
  //   new ObjectId("6575da806a8cefef206c1d21")
  // ]

  const threadsIds = savedThreadsIds.map((item) => item.toString());

  // [
  //   "656f33310b0b77515576060d",
  //   "6575da806a8cefef206c1d21"
  // ]

  const threads = await getCompleteThreadsfromThreadsIds(threadsIds);

  // console.log("  threads - savedTab component:", threads);

  // [
  //   {
  //     _id: new ObjectId("656f33310b0b77515576060d"),
  //     text: '\n' +
  //       'Cats are fascinating creatures that have captivated humans for centuries. They are independent, curious, and
  // intelligent animals that come in a wide variety of breeds. ',
  //     author: {
  //       _id: new ObjectId("656cc645d5da3bae5cc79782"),
  //       username: 'walter',
  //       name: 'Walter',
  //       image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4RDK 60503 more characters
  //     },
  //     parentId: undefined,
  //     community: new ObjectId("656cc959c2f2b4c2d042b477"),
  //     createdAt: 2023-12-05T14:26:57.590Z,
  //     children: [
  //       new ObjectId("656f3b400b0b77515576073a"),
  //       new ObjectId("6574fb737e35f151521e986a")
  //     ],
  //     likes: 0
  //   },
  //   {
  //     _id: new ObjectId("6575da806a8cefef206c1d21"),
  //     text: 'The potential benefits of AI are immense, but it is important to use it responsibly and ethically. We need to ensure that AI is used to enhance human lives, not replace them. We also need to be aware of the potential risks of AI, such as bias and discrimination.',
  //     author: {
  //       _id: new ObjectId("65566bd3fe922aa5c1add5f9"),
  //       username: 'vanesa',
  //       name: 'Vanesa',
  //       image: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWURkQVYyc3MzUzkzdGRteHlpSGhWTkJWVEYifQ'
  //     },
  //     parentId: undefined,
  //     community: null,
  //     createdAt: 2023-12-10T15:34:24.426Z,
  //     children: [],
  //     likes: 0
  //   }
  // ]

  /////////////////////////////////////////////////////////////

  return (
    <section className="mt-9 flex flex-col gap-10">
      <h1>Saved threads:</h1>
      {threads.map((thread) => (
        <div key={thread._id}>
          <div>
            {" "}
            {thread.text} {thread.author.username}
          </div>
          <img src={thread.author.image} alt="user_community_image" />
        </div>
      ))}
    </section>
  );
}

export default SavedTab;
