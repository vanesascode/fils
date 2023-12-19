"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { saveLike, getAllLikedThreadIds } from "@/lib/actions/like.actions";
import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  currentUserId: string;
  userId: string;
  isComment?: boolean;
  likes: number;
  likedThreads: boolean;
}

export default function Likes({
  threadId,
  currentUserId,
  isComment,
  userId,
  likes,
  likedThreads,
}: Props) {
  const pathname = usePathname();

  const handleSaveLike = async () => {
    try {
      await saveLike(threadId, userId, pathname);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <>
      <div className="flex  items-center gap-[6px]">
        <Image
          alt="heart"
          src={
            likedThreads && isComment
              ? "/assets/heart-filled-white.svg"
              : likedThreads
              ? "/assets/heart-filled-black.svg"
              : isComment
              ? "/assets/heart-white.svg"
              : "/assets/heart-black.svg"
          }
          width={24}
          height={24}
          className="cursor-pointer object-contain"
          onClick={handleSaveLike}
        />

        <div
          className={
            isComment
              ? "text-light-1 text-small-regular"
              : "text-small-semibold	text-dark-1"
          }
        >
          {" "}
          {likes}
        </div>
      </div>
    </>
  );
}
