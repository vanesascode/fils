import { redirect } from "next/navigation";
import {
  getAllThreadsByUserId,
  getCompleteThreadsfromThreadsIds,
} from "@/lib/actions/thread.actions";
import { getUserId } from "@/lib/actions/user.actions";

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

// interface ReplyThreadsList {
//   threads: Thread[];
// }

interface Props {
  currentUserId: string;
}

async function RepliesTab({ currentUserId }: Props) {
  const userId = await getUserId(currentUserId);

  const threadsOfCurrentUser = await getAllThreadsByUserId(userId);

  // console.log(
  //   "threadsOfCurrentUser - repliesTab component:",
  //   threadsOfCurrentUser
  // );

  // [
  //   {
  //     _id: new ObjectId("656f33310b0b77515576060d"),
  //     text: '\n' +
  //       'Cats are fascinating creatures that have captivated humans for centuries. They are independent, curious, and intelligent animals that come in a wide variety of breeds. ',
  //     author: new ObjectId("656cc645d5da3bae5cc79782"),
  //     community: new ObjectId("656cc959c2f2b4c2d042b477"),
  //     children: [
  //       new ObjectId("656f3b400b0b77515576073a"),
  //       new ObjectId("6574fb737e35f151521e986a")
  //     ],
  //     likes: 0,
  //     createdAt: 2023-12-05T14:26:57.590Z,
  //     __v: 2
  //   },
  //   {
  //     _id: new ObjectId("656f3b740b0b775155760755"),
  //     text: 'The impacts of climate change are already being felt around the world. In recent years, we have seen a number of record-breaking heat waves, droughts, and floods. These events have caused widespread damage and loss of life, and they are a sign of what is to come if we do not take action to reduce greenhouse gas emissions.',
  //     author: new ObjectId("656cc645d5da3bae5cc79782"),
  //     community: new ObjectId("656cc959c2f2b4c2d042b477"),
  //     children: [ new ObjectId("656f3b940b0b775155760779") ],
  //     likes: 0,
  //     createdAt: 2023-12-05T15:02:12.479Z,
  //     __v: 1
  //   }
  // ]

  const childrenArray = threadsOfCurrentUser.flatMap((item) => item.children);

  // console.log("All children from threads array:", childrenArray);

  // [
  //   new ObjectId("656f3b400b0b77515576073a"),
  //   new ObjectId("6574fb737e35f151521e986a"), ////////// SE LO HA INVENTADO ??????????????????????????????????????
  //   new ObjectId("656f3b940b0b775155760779")
  // ]

  const childrenIds = childrenArray.map((item) => item.toString());

  // console.log("childrenIds:", childrenIds);

  // [
  //   '656f3b400b0b77515576073a',
  //   '6574fb737e35f151521e986a',
  //   '656f3b940b0b775155760779'
  // ]

  const threads = await getCompleteThreadsfromThreadsIds(childrenIds);

  // console.log("getCompleteThreadsfromChildren", threads);

  // [
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
  //     community: undefined,
  //     createdAt: 2023-12-05T15:01:20.686Z,
  //     children: [],
  //     likes: 0
  //   },
  //   {
  //     _id: new ObjectId("656f3b940b0b775155760779"),
  //     text: "It's true. It's scaring...",
  //     author: {
  //       _id: new ObjectId("65566bd3fe922aa5c1add5f9"),
  //       username: 'vanesa',
  //       name: 'Vanesa',
  //       image: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWURkQVYyc3MzUzkzdGRteHlpSGhWTkJWVEYifQ'
  //     },
  //     parentId: '656f3b740b0b775155760755',
  //     community: undefined,
  //     createdAt: 2023-12-05T15:02:44.312Z,
  //     children: [],
  //     likes: 0
  //   }
  // ]

  //////////////////////// RENDERING THE CHILDREN/REPLIES:

  return (
    <section className="mt-9 flex flex-col gap-10">
      <h1> Replies:</h1>

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

export default RepliesTab;
