"use client";

import React from "react";
import Image from "next/image";
import { saveThread } from "@/lib/actions/saved.actions";
import { saveFollower } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

// context:

import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

interface Props {
  currentUserIdObject: string;
  accountUserIdObject: string;
  currentUserId: string;
  followedUsersIds: boolean;
}

const FollowUser = ({
  currentUserIdObject,
  accountUserIdObject,
  currentUserId,
  followedUsersIds,
}: Props) => {
  // console.log(currentUserId, accountId);
  const [saveMessage, setSaveMessage] = useState("");

  const { message, setMessage, modalAppear, setModalAppear } = useContext(
    DataContext
  ) as DataContextType;

  const pathname = usePathname();

  const handleFollowUserClick = async () => {
    try {
      const response = await saveFollower(
        currentUserIdObject,
        accountUserIdObject,
        pathname
      );
      if (response === `Successfully saved new user followed`) {
        setModalAppear(true);
        setMessage(`Followed`);
        setSaveMessage(`Followed`);
      } else if (response === `Unfollowed`) {
        setModalAppear(true);
        setMessage(`Unfollowed`);
        setSaveMessage(`Unfollowed`);
      }
      setTimeout(() => {
        setModalAppear(false);
        setSaveMessage("");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="flex cursor-pointer  rounded-lg bg-dark-1 px-4 py-2 relative"
        onClick={handleFollowUserClick}
      >
        <p className="text-light-1 ">
          {followedUsersIds ? "Unfollow" : "Follow"}
        </p>
        {/*TOAST MESSAGE*/}
      </button>
      {saveMessage === "Unfollowed" && (
        <div className=" rounded-lg bg-dark-1 px-4 py-2 right-[10px] absolute bottom-[-55px] animate-in fade-in zoom-in duration-600">
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
        text-light-1 text-center flex flex-column right-[10px] bottom-[-55px] animate-in fade-in zoom-in duration-600"
        >
          <div>Followed</div>
          <div>
            <Link href={`/followers`}>
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
