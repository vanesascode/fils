import { fetchSuggestedUsers } from "@/lib/actions/user.actions";

import { currentUser } from "@clerk/nextjs";
import UserSuggestedCard from "../cards/UserSuggestedCard";

async function UsersList() {
  const user = await currentUser();

  // By checking for a null value of user and extracting the id before calling fetchSuggestedUsers, you ensure that the correct type is passed and avoid the TypeScript errors:

  if (!user) return null;

  const { id } = user;

  const result = await fetchSuggestedUsers({ userId: id });

  return (
    <>
      {result.users.length === 0 ? (
        <p className="no-result">No Result</p>
      ) : (
        <>
          {result.users.map((person) => (
            <UserSuggestedCard
              key={person.id}
              id={person.id} // the clerk user id, because it is the one we use go to the profile page
              name={person.name}
              username={person.username}
              imgUrl={person.image}
            />
          ))}
        </>
      )}
    </>
  );
}

export default UsersList;
