"use client";

import React from "react";
import Image from "next/image";
import { saveThread } from "@/lib/actions/saved.actions";
import { saveFollower } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface Props {
  currentUserIdObject: string;
  accountUserIdObject: string;
  currentUserId: string;
}

const FollowUser = ({
  currentUserIdObject,
  accountUserIdObject,
  currentUserId,
}: Props) => {
  // console.log(currentUserId, accountId);
  const [saveMessage, setSaveMessage] = useState("");

  const pathname = usePathname();

  const handleFollowUserClick = async () => {
    try {
      const response = await saveFollower(
        currentUserIdObject,
        accountUserIdObject,
        pathname
      );
      if (response === `Successfully saved new user followed`) {
        setSaveMessage(`Followed`);
      } else if (response === `Unfollowed`) {
        setSaveMessage(`Unfollowed`);
      }
      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer gap-3 rounded-lg bg-dark-1 px-4 py-2 "
        onClick={handleFollowUserClick}
      >
        {/* <Image
              src="/assets/edit-white.svg"
              alt="logout"
              width={16}
              height={16}
            /> */}

        <p className="text-light-1 max-sm:hidden">Follow</p>
      </div>

      {/*TOAST MESSAGE*/}

      {saveMessage === "Unfollowed" && (
        <div className=" rounded-lg bg-dark-1 px-4 py-2 absolute bottom-[-55px] animate-in fade-in zoom-in duration-600">
          <div
            className="text-subtle-regular 
              text-light-1 text-center"
          >
            {saveMessage}
          </div>
        </div>
      )}
      {saveMessage === "Followed" && (
        <div
          className="rounded-lg bg-dark-1 px-4 py-2 absolute text-subtle-regular 
        text-light-1 text-center flex flex-column right-[-40px] bottom-[-40px] animate-in fade-in zoom-in duration-600"
        >
          <div>Followed</div>
          <div>
            <Link href={`/profile/${currentUserId}`}>
              <div className="text-[13px] font-extrabold cursor-pointer ml-3">
                {" "}
                View
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUser;
