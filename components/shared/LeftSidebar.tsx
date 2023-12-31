"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) || // any of the other routes, but not home which is just 1 ('/')
            pathname === link.route; // otherwise, home, which is ('/')

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <div className=" hover-black-text" key={link.label}>
              <Link
                href={link.route}
                className={`leftsidebar_link hover:bg-light-1 box-shadow-small-hovered  ${
                  isActive && "bg-light-1 box-shadow-small"
                } `}
              >
                <Image
                  src={isActive ? link.imgURLActive : link.imgURLnotActive}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p
                  className={`${
                    isActive ? "text-dark-1" : "text-light-1"
                  }  max-lg:hidden text-base-semibold`}
                >
                  {link.label}
                </p>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-3 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
