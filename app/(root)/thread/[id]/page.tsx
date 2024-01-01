import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comment from "@/components/forms/Comment";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);
  !thread && redirect("/");

  return (
    <>
      <section className="relative">
        <div>
          <ThreadCard
            id={thread._id}
            currentUserId={user.id}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        </div>

        <div className="mt-7">
          <Comment
            threadId={params.id}
            currentUserImg={userInfo.image}
            currentUserId={JSON.stringify(userInfo._id)}
            authorEmail={thread.author.email}
            authorName={thread.author.name}
            replierName={userInfo.name}
          />
        </div>

        <div className="mt-10">
          {thread.children.map((childItem: any) => (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={user.id}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default page;
