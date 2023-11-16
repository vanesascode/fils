"use client";

import {
  fetchThreadIDs,
  updateThreadLikes,
} from "@/lib/actions/thread.actions";
import { addLikedThread } from "@/lib/actions/user.actions";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { useState } from "react";

interface Props {
  threadsWithIDs: string[];
  userId: string;
  likes: number;
}

export default function Likes({ threadsWithIDs, userId, likes }: Props) {
  // LIKES
  const [liked, setLiked] = useState(false);

  const router = useRouter();

  console.log("threadIds in Like component", threadsWithIDs);

  const handleLikeClick = async () => {
    setLiked(liked);
    try {
      const currentThread = threadsWithIDs[0];
      console.log("currentThread", currentThread);
      console.log("currentLikes", likes);
      await updateThreadLikes(currentThread, likes + 1); // from thread.actions --  NOOOOT WORKING

      await addLikedThread(currentThread, userId); // from user.actions -- WORKING
    } catch (error: any) {
      console.error("Error updating user:", error);
    }
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src={liked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
          onClick={handleLikeClick}
        />
        <div className="text-light-1">
          {" "}
          {likes} {likes === 1 ? "like" : "likes"}{" "}
        </div>
      </div>
    </>
  );
}
