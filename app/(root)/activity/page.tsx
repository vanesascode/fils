import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";

import { formatDistanceToNow } from "date-fns"; //npm install date-fns

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card ">
                  {/*LEFT SIDE**************************/}

                  <div className="flex gap-2 sm:items-center max-sm2:flex-col">
                    {/*IMAGE*/}

                    <Image
                      src={activity.author.image}
                      alt="user_logo"
                      width={25}
                      height={25}
                      className="rounded-full object-cover"
                    />
                    {/*USER NAME*/}

                    <div className=" text-light-1">
                      <span className="mr-1 text-light-1 text-small-bold break-all">
                        {activity.author.name}
                      </span>
                      <span className="mr-1 text-small-regular text-light-2 break-all">
                        {" "}
                        replied to your fil
                      </span>
                      <span className="!text-small-regular text-light-1 sm:hidden">
                        {" "}
                        {formatDistanceToNow(new Date(activity.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  {/*RIGHT SIDE**************************/}

                  <div className="!text-small-regular text-light-1 max-sm:hidden">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-1 text-center">
            No notifications yet
          </p>
        )}
      </section>
    </>
  );
}

export default Page;
