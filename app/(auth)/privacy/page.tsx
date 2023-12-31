"use client";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center ">
        {/*BOX OF INFO*/}

        <div
          className="bg-white rounded-lg shadow px-10 box-shadow-small overflow-auto
        sm2:mx-10 sm2:mt-10 sm2:mb-20 
        mx-5 mt-5 mb-10  text-dark-1 max-w-[1440px]"
        >
          {/*Title*/}

          <div className="flex items-center gap-3 mt-10 justify-center max-sm2:flex-col">
            <img
              src="/assets/logo-black.svg"
              alt="logo"
              className="md:w-[45px] w-[45px]"
            />
            <h1 className="mb-1 text-heading2-semibold   font-lobster">
              Privacy Policy
            </h1>
          </div>

          {/*Info*/}

          <div className="sm2:text-body2-regular text-small-regular mt-8">
            Welcome to the Fils Service. In here we explain our privacy policy.
            Fils is social media app created and coded by{" "}
            <a href="https://github.com/vanesascode" target="_blank">
              <b>vanesascode</b>
            </a>
            .
          </div>
          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold ">
            What information do we collect?
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            We collect the information that you provide when you create your
            Fils profile, including your name, email address, profile picture,
            and other information such as the bio you share with others.
          </div>
          <br />

          <h2 className="sm2:text-heading4-semibold  text-body-semibold  ">
            How do we use this information?
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            The information collected by Fils is solely for the purpose of
            enhancing your user experience and providing the functionality of
            the app. We do not share, sell, or disclose any personal or
            identifiable information to third parties. We only share your name,
            email address and profile picture with{" "}
            <a href="https://clerk.com" target="_blank">
              <b>Clerk</b>
            </a>
            , which is the platform that handles the tasks of user
            authentication.
            <br /> <br />
            Your data is securely stored on your device and within the Clerk's
            internal storage and is used solely for the operation of the app. We
            take appropriate measures to protect the privacy and security of
            your information. However, please note that no method of data
            transmission or storage is 100% secure. Therefore, while we strive
            to protect your data, we cannot guarantee its absolute security.
          </div>

          <br />

          <h2 className="sm2:text-heading4-semibold  text-body-semibold  ">
            Use of cookies.
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            We use cookies to verify your account and determine if you are
            logged in. So, we use cookies to keep you logged in while you browse
            the Fils pages. Cookies also help us remember your browser so you
            don't have to log into Fils constantly. We don't use cookies for
            other purposes such as publicity or marketing.
          </div>

          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold  ">
            Exercising your rights
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            In the case you want us to completely delete any information that
            may be stored after you delete your account, please notify us via
            email{" "}
            <a href="mailto:vanesascode@gmail.com">
              <b>vanesascode@gmail.com</b>{" "}
            </a>
          </div>

          {/* OK BUTTON*/}

          <div className="flex  justify-center my-10 ">
            <Link
              href="/"
              className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1 text-dark-1"
            >
              Ok
            </Link>
          </div>
        </div>

        <div className="text-light-1 fixed bottom-0 md:text-[12px] text-[10px] justify-center flex  flex-wrap   bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 w-full">
          <Link href="/" className="me-5 md:me-8">
            &copy; 2023 Fils
          </Link>
          <Link href="/conditions" className="me-5 md:me-8">
            Conditions
          </Link>
          <div className="me-5 md:me-8">Privacy policy</div>
        </div>
      </div>
    </>
  );
}
