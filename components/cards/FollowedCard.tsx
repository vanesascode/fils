"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { Button } from "../ui/button";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { saveFollower } from "@/lib/actions/user.actions";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  followedUsersIds: boolean;
  currentUserId: string;
  accountId: string;
}

function UserCard({
  id,
  name,
  username,
  imgUrl,
  followedUsersIds,
  currentUserId,
  accountId,
}: Props) {
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleFollowUserClick = async () => {
    try {
      const response = await saveFollower(currentUserId, accountId, pathname);
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
    <article className="user-card">
      <Link href={`/profile/${id}`}>
        <div className="user-card_avatar">
          <div className="relative h-12 w-12">
            <Image
              src={imgUrl}
              alt="user_logo"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1 break-all">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-light-1">@{username}</p>
          </div>
        </div>
      </Link>

      <Button
        className="user-card_btn bg-light-1 text-dark-1 box-shadow-small hover:bg-dark-1 hover:text-light-1"
        onClick={handleFollowUserClick}
      >
        {followedUsersIds ? "Follow" : "Unfollow"}
      </Button>

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
          {/* <div>
            <Link href={`/profile/${currentUserId}`}>
              <div className="text-[13px] font-extrabold cursor-pointer ml-3">
                {" "}
                View
              </div>
            </Link>
          </div> */}
        </div>
      )}
    </article>
  );
}

export default UserCard;
