"use client";

import { saveLike } from "@/lib/actions/like.actions";
import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  userId: string;
  isComment?: boolean;
  likes: number;
  likedThreads: boolean;
}

export default function Likes({
  threadId,
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
        <img
          alt="heart icon"
          src={
            likedThreads && isComment
              ? "/assets/heart-filled-white.svg"
              : likedThreads
              ? "/assets/heart-filled-black.svg"
              : isComment
              ? "/assets/heart-white.svg"
              : "/assets/heart-black.svg"
          }
          className="cursor-pointer object-contain w-[20px] h-[20px] xxs:w-[24px] xxs:h-[24px]"
          onClick={handleSaveLike}
        />

        <div
          className={
            isComment
              ? "text-light-1 xxs:text-small-regular text-subtle-regular"
              : "xxs:text-small-semibold text-subtle-regular	text-dark-1"
          }
        >
          {" "}
          {likes}
        </div>
      </div>
    </>
  );
}
