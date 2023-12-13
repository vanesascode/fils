"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { saveLike } from "@/lib/actions/thread.actions";
import { getAllLikedThreadIds } from "@/lib/actions/thread.actions";
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

  const [heartLiked, setHeartLiked] = useState(true);

  const handleSaveLike = async () => {
    try {
      const response = await saveLike(threadId, userId, pathname);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const ids = await getAllLikedThreadIds(userId);
  //     console.log(ids);
  //     let isLiked = false;
  //     if (ids.includes(threadId)) {
  //       isLiked = true;
  //       setHeartLiked(true);
  //     }
  //     console.log(isLiked);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="flex  items-center gap-2">
        <Image
          alt="heart"
          src={
            // (heartLiked && "/assets/heart-filled.svg") ||
            isComment ? "/assets/heart-white.svg" : "/assets/heart-black.svg"
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
