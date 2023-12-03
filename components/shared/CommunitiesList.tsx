import { fetchSuggestedCommunities } from "@/lib/actions/community.actions";

import { currentUser } from "@clerk/nextjs";
import CommunitySuggestedCard from "../cards/CommunitySuggestedCard";

async function UsersList() {
  const user = await currentUser();

  // By checking for a null value of user and extracting the id before calling fetchSuggestedUsers, you ensure that the correct type is passed and avoid the TypeScript errors:

  if (!user) return null;

  const { id } = user;

  const result = await fetchSuggestedCommunities();

  return (
    <>
      {result.communities.length === 0 ? (
        <p className="no-result">No Result</p>
      ) : (
        <>
          {result.communities.map((community) => (
            <CommunitySuggestedCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              bio={community.bio}
              members={community.members}
            />
          ))}
        </>
      )}
    </>
  );
}

export default UsersList;
