"use client";

import React from "react";
import Image from "next/image";
import { saveThread } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  userId: string;
  isComment?: boolean;
}

const SaveThread = ({ threadId, currentUserId, isComment, userId }: Props) => {
  const [saveMessage, setSaveMessage] = useState("");

  const pathname = usePathname();

  // console.log("the threadID getting to the SaveThread component", threadId);
  // console.log(
  //   "the currentUserId getting to the SaveThread component",
  //   currentUserId
  // );
  // console.log("the UserId getting to the SaveThread component", userId);

  const HandleSaveThread = async () => {
    try {
      const response = await saveThread(threadId, userId, pathname);
      if (response === `Thread ${threadId} already saved for user ${userId}`) {
        setSaveMessage(`Already saved`);
      } else {
        setSaveMessage(`Saved`);
      }

      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Image
        src={isComment ? "/assets/save-white.svg" : "/assets/save-black.svg"}
        alt="save button"
        width={24}
        height={24}
        onClick={HandleSaveThread}
        className="cursor-pointer object-contain"
      />
      {saveMessage && (
        <div className={isComment ? "text-light-1" : "text-dark-1"}>
          {saveMessage}
        </div>
      )}
    </div>
  );
};

export default SaveThread;
