import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchFollowedUsers } from "@/lib/actions/user.actions";

import { followersTabs } from "@/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

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

      <div className="mt-9">
        <Tabs defaultValue="followed" className="w-full">
          {/* TABS LIST*/}

          <TabsList className="tab">
            {followersTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="tab rounded-lg box-shadow-small"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                {/*Label shown only in big screens */}

                <p className="max-sm:hidden text-light-1">{tab.label}</p>

                {/* How many threads the user has :  */}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* TABS CONTENT*/}

          <TabsContent value="followed" className="w-full text-light-1">
            {/* @ts-ignore */}
            {/* <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType="User"
            /> */}
          </TabsContent>

          <TabsContent value="following" className="w-full text-light-1">
            {/* @ts-ignore */}
            {/* <SavedTab currentUserId={user.id} /> */}
          </TabsContent>
        </Tabs>
      </div>

      {/*********************************************** */}

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
