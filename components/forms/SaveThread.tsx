"use client";

import React from "react";
import Image from "next/image";
import { saveThread } from "@/lib/actions/saved.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface Props {
  threadId: string;
  currentUserId: string;
  userId: string;
  isComment?: boolean;
  saves: number;
}

const SaveThread = ({
  threadId,
  currentUserId,
  isComment,
  userId,
  saves,
}: Props) => {
  const [saveMessage, setSaveMessage] = useState("");

  const pathname = usePathname();

  const HandleSaveThread = async () => {
    try {
      const response = await saveThread(threadId, userId, pathname);
      if (
        response ===
        `Thread ${threadId} for user ${userId} was deleted from saved list`
      ) {
        setSaveMessage(`Removed from your save fils`);
      } else {
        setSaveMessage(`Added to your saved fils`);
      }

      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-[3px]">
        <Image
          src={isComment ? "/assets/save-white.svg" : "/assets/save-black.svg"}
          alt="save button"
          width={25}
          height={25}
          onClick={HandleSaveThread}
          className="cursor-pointer object-contain"
        />
        <div
          className={
            isComment
              ? "text-light-1 text-small-regular"
              : "text-small-semibold	text-dark-1"
          }
        >
          {" "}
          {saves}
        </div>
      </div>

      {/*TOAST MESSAGE*/}

      {saveMessage === "Removed from your save fils" && (
        <div
          className="rounded-lg bg-dark-1 px-4 py-2 absolute max-md2:right-[-40px] bottom-[-55px] animate-in fade-in zoom-in duration-600 text-subtle-regular 
        text-light-1 whitespace-nowrap"
        >
          Removed from your save fils
        </div>
      )}

      {saveMessage === "Added to your saved fils" && (
        <div
          className="rounded-lg bg-dark-1 px-4 py-2 absolute text-subtle-regular 
        text-light-1 text-center flex flex-column max-md2:right-[-40px] bottom-[-55px] animate-in fade-in zoom-in whitespace-nowrap"
        >
          <div>Added to your saved fils</div>
          <div>
            <Link href={`/profile/${currentUserId}`}>
              <div className="text-[13px] font-extrabold cursor-pointer ml-3">
                {" "}
                View
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveThread;
