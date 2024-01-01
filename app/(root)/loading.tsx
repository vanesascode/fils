const Loading = () => {
  return (
    <>
      <div className="flex items-center gap-3 md:mb-6 md:mt-16 mb-5 mt-10 justify-center ">
        <img
          src="/assets/logo-white.svg"
          alt="logo"
          className="md:w-[50px] w-[30px]"
        />
        <p className="text-bold md:text-[50px] text-[30px] text-light-1 font-lobster ">
          Loading...
        </p>
      </div>
    </>
  );
};

export default Loading;
