import Link from "next/link";

const FollowersNotFound = () => {
  return (
    <>
      <div className="flex items-center gap-3 md:mb-6 md:mt-16 mb-5 mt-10 justify-center flex-col text-bold md:text-[30px] text-[15px] text-light-1 ">
        <img
          src="/assets/logo-white.svg"
          alt="logo"
          className="md:w-[50px] w-[30px]"
        />
        <p>Page doesn't exist.</p>

        <Link href="/"> Click here to go back</Link>
      </div>
    </>
  );
};

export default FollowersNotFound;
