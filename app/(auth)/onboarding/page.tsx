import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const user = await currentUser();

  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);

  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
    email: userInfo ? userInfo?.email : user.emailAddresses[0].emailAddress,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-1 text-center">
        Complete your profile and start using Fils!
      </p>

      <section className="mt-9 bg-light-1 p-10 rounded-lg box-shadow-big">
        <AccountProfile user={userData} />
      </section>
    </main>
  );
}

export default Page;
