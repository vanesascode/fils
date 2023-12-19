import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchFollowedUsers } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchFollowedUsers({
    userId: userInfo._id,
  });

  console.log(result);

  return (
    <section>
      <h1 className="head-text mb-10">Followers</h1>

      <div className="mt-14 flex flex-col gap-9">
        {result.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.map((person) => (
              <UserCard
                key={person.accountUserId.id}
                id={person.accountUserId.id}
                name={person.accountUserId.name}
                username={person.accountUserId.username}
                imgUrl={person.accountUserId.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
