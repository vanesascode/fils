"server side rendering";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

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

  //FETCH POSTS///////////////////////////////////////////////////////////////////////////////////////////////

  // remember the function is:  fetchPosts(pageNumber = 1, pageSize = 20). Also, it returns 'posts' and 'isNext'. So will have access to those with the syntax: 'result.posts' & 'result.isNext':

  const result = await fetchPosts(
    // if searchParams.page is truthy, it means that the page parameter is present in the URL and has a value. (example: ?page=2) --- +searchParams.page expression is used to convert the value to a number.

    // Why is it ".page" ? Because we are using it in the URL and it's between "?"" and "=" (?page=) We are sending it like this from the Pagination.tsx component.

    searchParams.page ? +searchParams.page : 1,
    5
  );

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
                community={post.community}
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
