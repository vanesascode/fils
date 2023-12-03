import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="flex items-center gap-3 md:mb-6 md:mt-16 mb-5 mt-10">
          <img
            src="/assets/ball.svg"
            alt="logo"
            className="md:w-[70px] w-[50px]"
          />
          <p className="text-bold md:text-[70px] text-[50px] text-light-1 font-lobster ">
            Fils
          </p>
        </div>

        <div className="mb-20">
          <SignIn redirectUrl="/onboarding" afterSignInUrl="/onboarding" />
        </div>

        <div className="text-light-1 fixed bottom-0 md:text-[12px] text-[10px] justify-center flex  flex-wrap  rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 w-full">
          <div className="me-5 md:me-8">&copy; 2023 </div>
          <div className="me-5 md:me-8">Fils conditions</div>
          <div className="me-5 md:me-8">Privacy policy</div>
          <div>Cookies policy</div>
        </div>
      </div>
    </>
  );
}
