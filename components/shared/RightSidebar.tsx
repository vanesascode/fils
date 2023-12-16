import UsersList from "./UsersList";
import CommunitiesList from "./CommunitiesList";

export default function RightSidebar() {
  return (
    <section className="rightsidebar custom-scrollbar">
      {/* <div className="flex flex-1 flex-col justify-start">
        <h3 className=" text-dark-1 text-base-semibold my-5 bg-light-1 rounded-lg p-4  flex justify-center box-shadow-small">
          Suggested Communities
        </h3>
        <CommunitiesList />
      </div> */}

      <div className="flex flex-1 flex-col justify-start">
        <h3 className=" text-dark-1 text-base-semibold mb-5  bg-light-1 rounded-lg py-4 px-6 flex justify-center box-shadow-small">
          Welcome New Users!
        </h3>
        <UsersList />
      </div>
    </section>
  );
}
