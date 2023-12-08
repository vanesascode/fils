"use client";

import React from "react";
import Image from "next/image";
import { saveThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserId: string;
  isComment?: boolean;
}

const SaveThread = ({ threadId, currentUserId, isComment }: Props) => {
  console.log("the threadID getting to the SaveThread component", threadId);
  console.log(
    "the currentUserId getting to the SaveThread component",
    currentUserId
  ); // CONSOLE.LOGS WORK!

  const HandleSaveThread = async () => {
    try {
      await saveThread(threadId, currentUserId);
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  return (
    <div>
      <Image
        src={isComment ? "/assets/save-white.svg" : "/assets/save-black.svg"}
        alt="save button"
        width={24}
        height={24}
        onClick={HandleSaveThread}
        className="cursor-pointer object-contain"
      />
    </div>
  );
};

export default SaveThread;
