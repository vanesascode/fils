import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  // First check if user is logged in with Clerk.

  const user = await currentUser();
  if (!user) return null; //Clerk already redirects to /sign-in page

  // Then check if user is onboarded and we have it in our mongodb database.

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="head-text">Create Fil</h1>

      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
