import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";

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

        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                "py-2 px-4 bg-dark-2 rounded-lg text-light-1 hover:text-dark-1 hover:bg-light-1 rounded-lg ms-2 box-shadow-small outline-none",
            },
          }}
        />
      </div>
    </nav>
  );
}
