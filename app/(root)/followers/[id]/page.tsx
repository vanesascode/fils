import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import {
  fetchUser,
  fetchFollowedUsers,
  getAllFollowedUsersIds,
  fetchFollowers,
  getUserId,
} from "@/lib/actions/user.actions";
import { followersTabs } from "@/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  //Here we get the MongoDB _id by taking the clerk id from the params, and passing it through the function 'getUserId':
  const idFromParams = await getUserId(params.id);

  const otherUserInfo = await fetchUser(params.id);

  const resultFollowed = await fetchFollowedUsers({
    userId: idFromParams,
  });

  const resultFollowers = await fetchFollowers({ userId: idFromParams });

  let followedUsersIds = await getAllFollowedUsersIds(idFromParams);
  followedUsersIds = followedUsersIds.map((el) => el.toString());

  return (
    <section>
      {/* TITLE*/}
      {params.id === user.id ? (
        <h1 className="head-text mb-10">Your follows</h1>
      ) : (
        <h1 className="head-text mb-10">{otherUserInfo.name}'s follows</h1>
      )}

      <div className="mt-9">
        <Tabs defaultValue="following" className="w-full">
          {/* TABS LIST*/}

          <TabsList className="tab">
            {followersTabs.map((tab) => (
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

          <TabsContent value="following" className="w-full text-light-1">
            {/* @ts-ignore */}
            <div className="mt-4 flex flex-col gap-4">
              {resultFollowed.length === 0 ? (
                <p className="no-result text-light-1">No users followed yet</p>
              ) : (
                <>
                  {resultFollowed.map((person) => (
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
          </TabsContent>

          <TabsContent value="followers" className="w-full text-light-1">
            {/* @ts-ignore */}
            <div className="mt-4 flex flex-col gap-4">
              {resultFollowers.length === 0 ? (
                <p className="no-result text-light-1">No followers yet</p>
              ) : (
                <>
                  {resultFollowers.map((person) => (
                    <UserCard
                      key={person.currentUserId.id}
                      id={person.currentUserId.id}
                      name={person.currentUserId.name}
                      username={person.currentUserId.username}
                      imgUrl={person.currentUserId.image}
                      personType="User"
                    />
                  ))}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
