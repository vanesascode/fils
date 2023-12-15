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
  red: boolean;
}

export default function Likes({
  threadId,
  currentUserId,
  isComment,
  userId,
  likes,
  red,
}: Props) {
  const pathname = usePathname();

  const [heartLiked, setHeartLiked] = useState(true);

  const handleSaveLike = async () => {
    try {
      await saveLike(threadId, userId, pathname);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  console.log(red, "red");

  return (
    <>
      <div className="flex  items-center gap-2">
        <Image
          alt="heart"
          src={
            (red && "/assets/heart-filled.svg") || isComment
              ? "/assets/heart-white.svg"
              : "/assets/heart-black.svg"
          }
          width={24}
          height={24}
          className="cursor-pointer object-contain"
          onClick={handleSaveLike}
        />

        <div className={isComment ? "text-light-1" : "	text-dark-1"}>
          {" "}
          {likes}
        </div>
      </div>
    </>
  );
}
