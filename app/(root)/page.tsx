import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchFollowingUsersThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeTabs } from "@/constants";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // console.log("searchParams", searchParams); // searchParams { page: '2' }
  // It is like this as long as you have an URL such as: http://localhost:3000/?page=2

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // FETCH ALL POSTS

  const resultAll = await fetchPosts(
    // If searchParams.page is truthy, it means that the page parameter is present in the URL and has a value. (example: ?page=2) --- +searchParams.page expression is used to convert the value to a number.

    // Why is it ".page" ? Because we are using it in the URL and it's between "?"" and "=" (?page=) We are sending it like this from the Pagination.tsx component.

    searchParams.page ? +searchParams.page : 1,
    5
  );

  // FETCH ONLY FOLLOWING USERS POSTS

  const resultFollowed = await fetchFollowingUsersThreads(
    searchParams.page ? +searchParams.page : 1,
    5,
    userInfo._id
  );

  return (
    <>
      <h1 className="head-text ">What's up?</h1>

      {/* TABS LIST*/}

      <div className="mt-9">
        <Tabs defaultValue="all Fils" className="w-full">
          {/* TABS LIST*/}

          <TabsList className="tab">
            {homeTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="tab rounded-lg box-shadow-small"
              >
                <p className=" text-light-1">{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* TABS CONTENT*/}

          {/*FOLLOWING USERS POSTS TAB: */}

          <TabsContent value="following" className="w-full text-light-1 ">
            {/* @ts-ignore */}
            <section className="mt-5 flex flex-col gap-6">
              {resultFollowed.threads.length === 0 ? (
                <p className="no-result text-light-1">
                  You are not following any users yet.{" "}
                </p>
              ) : (
                <>
                  {resultFollowed.threads.map((post) => (
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
              isNext={resultFollowed.isNext}
            />
          </TabsContent>

          {/*ALL USERS POSTS TAB: */}

          <TabsContent value="all Fils" className="w-full text-light-1">
            {/* @ts-ignore */}
            <section className="mt-5 flex flex-col gap-6">
              {resultAll.posts.length === 0 ? (
                <p className="no-result text-light-1">No threads found </p>
              ) : (
                <>
                  {resultAll.posts.map((post) => (
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
              isNext={resultAll.isNext}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Home;
