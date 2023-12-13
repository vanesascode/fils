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
      <h1 className="head-text ">Create Fil</h1>

      {/*We are sending the user id of the mongodb database to the FORM - How do I know that it is exactly "_id" ?? Well, look at what property MongoDBAtlas has used to save the id of the user */}

      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;

//The ? after userInfo is called the optional chaining operator in JavaScript. It is used to safely access nested properties or methods of an object without causing an error if any of the properties or methods are undefined or null.

// So, if userInfo is not onboarded, it means that userInfo itself is either undefined or null. In other words, it means that the userInfo object does not exist.

// Therefore, the condition if (!userInfo?.onboarded) is checking if the userInfo object does not exist or if the onboarded property of userInfo is falsy. If either of these conditions is true, it means that the user is not onboarded and the code will redirect the user to the "/onboarding" page.
