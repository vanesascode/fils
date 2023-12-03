import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/assets/ball.svg" alt="logo" width={40} height={40} />
        <p className="text-heading1-bold text-light-1 max-xs:hidden font-lobster ">
          Fils
        </p>
      </Link>

      <div className="flex items-center pag 1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
            </SignOutButton>
          </SignedIn>
        </div>

        <div className="hover:bg-dark-2 rounded-lg">
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "py-2 px-4",
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}
