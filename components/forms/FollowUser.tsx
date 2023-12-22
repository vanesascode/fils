"use client";

import React from "react";
import Image from "next/image";
import { saveThread } from "@/lib/actions/saved.actions";
import { saveFollower } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

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
  const { setModalAppear } = useContext(DataContext) as DataContextType;

  const pathname = usePathname();

  const handleFollowUserClick = async () => {
    try {
      const response = await saveFollower(
        currentUserIdObject,
        accountUserIdObject,
        pathname
      );
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  const handleModalQuestion = () => {
    setModalAppear(true);
  };

  return (
    <div className="relative">
      {followedUsersIds ? (
        <button
          className="flex cursor-pointer gap-3 rounded-lg bg-dark-1 text-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-light-2 hover:text-dark-1"
          onClick={handleModalQuestion}
        >
          Following
        </button>
      ) : (
        <button
          className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1"
          onClick={handleFollowUserClick}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowUser;
