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
              Fils Terms of Use
            </h1>
          </div>

          {/*Info*/}

          <div className="sm2:text-body2-regular text-small-regular mt-8">
            Welcome to the Fils Service. These Fils Terms of Use primarily
            govern your use of the Fils Service. Fils is social media app
            created and coded by{" "}
            <a href="https://github.com/vanesascode" target="_blank">
              <b>vanesascode</b>
            </a>
            .
          </div>
          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold ">
            Understanding the Fils Service
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            The Fils Service allows you ("Fils Users") to access, upload and/or
            share content and information with other individuals using the Fils
            Service.
          </div>
          <br />

          <h2 className="sm2:text-heading4-semibold  text-body-semibold  ">
            Who can use the Fils Service?
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            You must be at least 13 years old to use the Fils Service.
          </div>

          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold ">
            Content of the Fils Service.
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            You are responsible for your use of the Services and any Content you
            provide, including compliance with applicable laws, rules and
            regulations. You should only provide us with content that you want
            to share with others.
            <br /> <br />
            Any reliance you place on any Content or materials posted through or
            obtained through the Services, or any use you make of them, is at
            your own risk. We do not endorse, endorse, affirm or guarantee the
            completeness, truthfulness, accuracy or reliability of any Content
            or communications posted through the Services, nor do we endorse any
            opinions expressed through the Services. You understand that by
            using the Services, you may be exposed to Content that may be
            offensive, harmful, inaccurate or otherwise inappropriate, or in
            some cases, to postings that may have been misinterpreted or may
            otherwise be misleading. All Content is the sole responsibility of
            the person who produces it. We do not monitor or control the Content
            posted through the Services, and we cannot be responsible for such
            Content.
            <br /> <br />
            We reserve the right to remove Content that violates the User
            Agreement, such as copyright or trademark violations or any other
            misuse of intellectual property, impersonation, unlawful conduct, or
            harassment.
            <br /> <br />
            If you believe that your Content has been copied in a way that
            constitutes copyright infringement, please notify us via email{" "}
            <a href="mailto:vanesascode@gmail.com">
              <b>vanesascode@gmail.com</b>{" "}
            </a>
          </div>

          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold ">
            Your rights and transfer of rights to the content.
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            You retain your rights to any Content you submit, post or display
            through our Services. What's yours is yours: you own your Content.
          </div>

          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold ">
            Your account.
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            You may be required to create an account to use the Services. You
            are responsible for the security of your account, so you should use
            a strong password and limit its use to this account. We cannot and
            will not be held liable for any loss or damage arising from your
            failure to comply with the above conditions.
          </div>

          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold ">
            Your license to use the Services.
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            We grant you a personal, worldwide, royalty-free, non-assignable,
            non-exclusive license to use the software provided to you as part of
            the Services. This license is for the sole purpose of enabling you
            to use and enjoy the benefit of the Services provided by Fils, in
            the manner authorized in these Terms.
          </div>

          <br />
          <h2 className="sm2:text-heading4-semibold  text-body-semibold ">
            Misuse of the Services
          </h2>
          <br />

          <div className="sm2:text-body2-regular text-small-regular">
            You also agree not to misuse the Services, for example, by
            interfering with them or accessing them using a method other than
            the interface and instructions we have provided to you. You agree
            not to circumvent the technical limitations of the software provided
            to you as part of the Services, nor to reverse engineer, decompile
            or disassemble the software.
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
          <Link href="/privacy">Privacy policy </Link>
        </div>
      </div>
    </>
  );
}
