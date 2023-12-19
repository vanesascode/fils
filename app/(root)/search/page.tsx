import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }; // STEP 2 SEARCHBAR: we get the current URL
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q, // STEP 3 SEARCHBAR: we send what's after the ?q= in the URL to our fetch function

    // however, if there are no searchString, all users will be included in 'result' (except from the current user) // Why is it "?q=" ? We are sending it like this from the Searchbar.tsx component.
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 6,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search users</h1>
      {/*STEP 1 SEARCHBAR: The Searchbar component makes the URL changed:*/}
      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;
