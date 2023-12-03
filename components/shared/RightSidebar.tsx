import UsersList from "./UsersList";
import CommunitiesList from "./CommunitiesList";

export default function RightSidebar() {
  return (
    <section className="rightsidebar custom-scrollbar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 font-lobster tracking-wider my-5">
          Suggested Communities
        </h3>
        <CommunitiesList />
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 font-lobster tracking-wider mb-5">
          Suggested Users
        </h3>
        <UsersList />
      </div>
    </section>
  );
}
