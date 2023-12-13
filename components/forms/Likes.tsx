"use client";

import {
  countLikes,
  fetchThreadIDs,
  updateThreadLikes,
} from "@/lib/actions/thread.actions";
import { addLikedThread } from "@/lib/actions/user.actions";
import Image from "next/image";

import { useState } from "react";
import { saveLike } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  currentUserId: string;
  userId: string;
  isComment?: boolean;
  likes: number;
}

export default function Likes({
  threadId,
  currentUserId,
  isComment,
  userId,
  likes,
}: Props) {
  const pathname = usePathname();

  const handleSaveLike = async () => {
    try {
      const response = await saveLike(threadId, userId, pathname);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <>
      <div className="flex  items-center gap-2">
        <Image
          src={
            isComment ? "/assets/heart-white.svg" : "/assets/heart-black.svg"
          }
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
          onClick={handleSaveLike}
        />

        <div className="text-dark-1"> {likes}</div>
      </div>
    </>
  );
}
