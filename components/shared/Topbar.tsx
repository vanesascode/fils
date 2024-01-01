import Link from "next/link";
import Image from "next/image";
import { currentUser, SignOutButton, SignedIn } from "@clerk/nextjs";
import { getUserId, fetchUser } from "@/lib/actions/user.actions";

async function Topbar() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo) return null;

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/assets/logo-white.svg" alt="logo" width={40} height={40} />
        <p className="text-heading1-bold text-light-1 font-lobster ">Fils</p>
      </Link>

      <div className="flex items-center ">
        <div className="block md:hidden me-2 cursor-pointer">
          <SignedIn>
            <SignOutButton>
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={30}
                height={30}
              />
            </SignOutButton>
          </SignedIn>
        </div>

        <Link href={`/profile/${user.id}`} className="flex items-center me-2">
          <img
            src={userInfo.image}
            alt="Current user"
            className="rounded-image-profile-topbar ms-3"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Topbar;
