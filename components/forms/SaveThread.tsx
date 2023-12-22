"use client";

import React from "react";
import Image from "next/image";
import { saveThread } from "@/lib/actions/saved.actions";
import { usePathname } from "next/navigation";

// context:

import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

interface Props {
  threadId: string;
  currentUserId: string;
  userId: string;
  isComment?: boolean;
  saves: number;
  savedThreads: boolean;
}

const SaveThread = ({
  threadId,
  currentUserId,
  isComment,
  userId,
  saves,
  savedThreads,
}: Props) => {
  const { addBookmarks, removeBookmarks, setAddBookmarks, setRemoveBookmarks } =
    useContext(DataContext) as DataContextType;

  const pathname = usePathname();

  const HandleSaveThread = async () => {
    try {
      const response = await saveThread(threadId, userId, pathname);
      if (
        response ===
        `Thread ${threadId} for user ${userId} was deleted from saved list`
      ) {
        setRemoveBookmarks(true);
        setTimeout(() => {
          setRemoveBookmarks(false);
        }, 1500);
      } else {
        setAddBookmarks(true);
        setTimeout(() => {
          setAddBookmarks(false);
        }, 4000);
      }
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-[3px]">
        <img
          src={
            savedThreads && isComment
              ? "/assets/save-filled-white.svg"
              : savedThreads
              ? "/assets/save-filled-black.svg"
              : isComment
              ? "/assets/save-white.svg"
              : "/assets/save-black.svg"
          }
          alt="save button"
          onClick={HandleSaveThread}
          className="cursor-pointer object-contain w-[20px] h-[20px] xxs:w-[24px] xxs:h-[24px]"
        />
        <div
          className={
            isComment
              ? "text-light-1 xxs:text-small-regular text-subtle-regular"
              : "xxs:text-small-semibold text-subtle-regular	text-dark-1"
          }
        >
          {" "}
          {saves}
        </div>
      </div>
    </div>
  );
};

export default SaveThread;
