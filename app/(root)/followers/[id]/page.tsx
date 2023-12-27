import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import FollowedCard from "@/components/cards/FollowedCard";
import {
  fetchUser,
  fetchFollowedUsers,
  getAllFollowedUsersIds,
  fetchFollowers,
  getUserId,
} from "@/lib/actions/user.actions";

import { followersTabs } from "@/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnFollowModalOnPage from "@/components/modals/UnFollowModalOnPage";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  //Here we get the MongoDB _id by taking the clerk id from the params, and passing it through the function 'getUserId':
  const idFromParams = await getUserId(params.id);

  const resultFollowed = await fetchFollowedUsers({
    userId: idFromParams,
  });

  const resultFollowers = await fetchFollowers({ userId: idFromParams });

  let followedUsersIds = await getAllFollowedUsersIds(idFromParams);
  followedUsersIds = followedUsersIds.map((el) => el.toString());

  return (
    <section>
      {resultFollowed.map((person) => (
        <UnFollowModalOnPage
          currentUserIdObject={userInfo._id}
          accountUserIdObject={person.accountUserId._id}
          userName={person.accountUserId.name}
        />
      ))}

      <h1 className="head-text mb-10">Followers</h1>

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
                {/*Label shown only in big screens */}

                <p className=" text-light-1">{tab.label}</p>

                {/* How many threads the user has :  */}
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
                    <FollowedCard
                      key={person.accountUserId.id}
                      id={person.accountUserId.id}
                      accountId={person.accountUserId._id}
                      currentUserId={userInfo._id}
                      name={person.accountUserId.name}
                      username={person.accountUserId.username}
                      imgUrl={person.accountUserId.image}
                      followedUsersIds={followedUsersIds.includes(
                        person.accountUserId._id
                      )}
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

      {/*********************************************** */}
    </section>
  );
}

export default Page;
