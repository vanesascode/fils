"server side rendering";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { getAllLikedThreadIds } from "@/lib/actions/like.actions";

// import DataContext from "../context/DataContext";
// import { useContext } from "react";
// import { DataContextType } from "../context/types";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // console.log("searchParams", searchParams); // searchParams { page: '2' }
  //It is like this as long as you have an URL such as: http://localhost:3000/?page=2

  /////////////// WORKING ON A DATA CONTEXT: ////////////////////

  // const { saveMessage, setSaveMessage } = useContext(
  //   DataContext
  // ) as DataContextType;

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  //FETCH POSTS///////////////////////////////////////////////////////////////////////////

  const result = await fetchPosts(
    // if searchParams.page is truthy, it means that the page parameter is present in the URL and has a value. (example: ?page=2) --- +searchParams.page expression is used to convert the value to a number.

    // Why is it ".page" ? Because we are using it in the URL and it's between "?"" and "=" (?page=) We are sending it like this from the Pagination.tsx component.

    searchParams.page ? +searchParams.page : 1,
    5
  );

  console.log("existing posts", result);

  // {
  //   posts: [
  //     {
  //       _id: new ObjectId("65809c9910ba3f31d10add1c"),
  //       text: 'sdfsdfsdfsdf',
  //       author: [Object],
  //       children: [Array],
  //       likes: 0,
  //       createdAt: 2023-12-18T19:25:13.628Z,
  //       __v: 3
  //     },
  //     {
  //       _id: new ObjectId("65809c9710ba3f31d10add06"),
  //       text: 'sdfsdfsdfsdf',
  //       author: [Object],
  //       children: [Array],
  //       likes: 0,
  //       createdAt: 2023-12-18T19:25:11.757Z,
  //       __v: 2
  //     },
  //     {
  //       _id: new ObjectId("65809c8f10ba3f31d10adcf4"),
  //       text: 'sdfsdfsdfsdf',
  //       author: [Object],
  //       children: [Array],
  //       likes: 0,
  //       createdAt: 2023-12-18T19:25:03.429Z,
  //       __v: 1
  //     },
  //     {
  //       _id: new ObjectId("658095fc10ba3f31d10adb66"),
  //       text: 'sdfgsdfg',
  //       author: [Object],
  //       children: [],
  //       likes: 0,
  //       createdAt: 2023-12-18T18:57:00.318Z,
  //       __v: 1
  //     }
  //   ],
  //   isNext: false
  // }
  const likedThreadIds = await getAllLikedThreadIds(userInfo._id);

  console.log(
    "''''''''''''''''''''''LikedThreadIds on home page",
    likedThreadIds
  );

  // [
  //   new ObjectId("65809c9710ba3f31d10add06"),
  //   new ObjectId("65809c9910ba3f31d10add1c")
  // ]

  const likedThread = result.posts.some((post) =>
    likedThreadIds.includes(post._id)
  );

  console.log("Are LikedThreadIds included????(home page)", likedThread);

  return (
    <>
      <h1 className="head-text ">What's up?</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result text-light-1">No threads found </p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;
