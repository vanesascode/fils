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
async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  //first set the types of result:
  let result: Result;

  //Then, fetch the 'result'
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId); //accountID = id of mongoDB user. The 'fetchUserPosts' action returns a user populated with their threads**
  }

  // console.log("results from ThreadsTab", result);

  // {
  //   _id: new ObjectId("656cc645d5da3bae5cc79782"),
  //   id: 'user_2YDmo498seTopzVzPejYayif20n',
  //   __v: 8,
  //   bio: 'I am the cutest dog ever!',
  //   communities: [
  //     new ObjectId("656cc900eeb2286d6e2c5329"),
  //     new ObjectId("656cc900eeb2286d6e2c5329"),
  //     new ObjectId("656cc959c2f2b4c2d042b477"),
  //     new ObjectId("656cc959c2f2b4c2d042b477"),
  //     new ObjectId("656cccb293af6ebe20c17dd4"),
  //     new ObjectId("656cccb293af6ebe20c17dd4"),
  //     new ObjectId("656cccf793af6ebe20c17dd9"),
  //     new ObjectId("656cccf793af6ebe20c17dd9")
  //   ],
  //   image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4R60503 more characters,
  //   likedThreads: [],
  //   name: 'Walter',
  //   onboarded: true,
  //   threads: [
  //     {
  //       _id: new ObjectId("656f33310b0b77515576060d"),
  //       text: '\n' +
  //         'Cats are fascinating creatures that have captivated humans for centuries. They are independent, curious, and intelligent animals that come in a wide variety of breeds. ',
  //       author: new ObjectId("656cc645d5da3bae5cc79782"),
  //       community: [Object],
  //       children: [Array],
  //       likes: 0,
  //       createdAt: 2023-12-05T14:26:57.590Z,
  //       __v: 3
  //     },
  //     {
  //       _id: new ObjectId("656f3b740b0b775155760755"),
  //       text: 'The impacts of climate change are already being felt around the world. In recent years, we have seen a number of record-breaking heat waves, droughts, and floods. These events have caused widespread damage and loss of life, and they are a sign of what is to come if we do
  // not take action to reduce greenhouse gas emissions.',
  //       author: new ObjectId("656cc645d5da3bae5cc79782"),
  //       community: [Object],
  //       children: [Array],
  //       likes: 0,
  //       createdAt: 2023-12-05T15:02:12.479Z,
  //       __v: 1
  //     }
  //   ],
  //   username: 'walter'
  // }

  if (!result) {
    redirect("/");
  }

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

export default ThreadsTab;
