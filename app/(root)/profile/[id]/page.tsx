import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
// import RepliesTab from "@/components/shared/RepliesTab";
import SavedTab from "@/components/shared/SavedTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchSavedThreadsIds } from "@/lib/actions/saved.actions";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const savedThreads = await fetchSavedThreadsIds(userInfo._id);

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id} // other users profile
        currentUserId={user.id} // current user profile
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="fils" className="w-full">
          {/* TABS LIST*/}

          <TabsList className="tab">
            {profileTabs
              .filter(
                (tab) => !(tab.label === "Saved" && user.id !== params.id)
              )
              .map((tab) => (
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

                  {tab.label === "Fils" && (
                    <p className="ml-1 rounded-sm bg-light-1 px-2 py-1 !text-tiny-medium text-dark-1">
                      {userInfo.threads.length}
                    </p>
                  )}
                  {tab.label === "Saved" && (
                    <p className="ml-1 rounded-sm bg-light-1 px-2 py-1 !text-tiny-medium text-dark-1">
                      {savedThreads.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
          </TabsList>

          {/* TABS CONTENT*/}

          <TabsContent value="fils" className="w-full text-light-1">
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType="User"
            />
          </TabsContent>

          {user.id === params.id && (
            <TabsContent value="saved" className="w-full text-light-1">
              {/* @ts-ignore */}
              <SavedTab currentUserId={user.id} savedThreads={savedThreads} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </section>
  );
}
export default Page;
