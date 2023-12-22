"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { saveFollower } from "@/lib/actions/user.actions";

// context:

import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

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
  const router = useRouter();
  const pathname = usePathname();
  const { setUnfollowModalAppear } = useContext(DataContext) as DataContextType;

  const handleModalQuestion = () => {
    setUnfollowModalAppear(true);
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
              priority
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
        onClick={handleModalQuestion}
      >
        Unfollow
      </Button>
    </article>
  );
}

export default UserCard;
