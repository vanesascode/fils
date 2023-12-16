"use client";

import React from "react";
import Image from "next/image";
import { unSaveThread } from "@/lib/actions/saved.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  userId: string;
  isComment?: boolean;
  author: string;
}

const SaveThread = ({
  threadId,
  currentUserId,
  isComment,
  userId,
  author,
}: Props) => {
  const [saveMessage, setSaveMessage] = useState("");

  const pathname = usePathname();

  const HandleSaveThread = async () => {
    try {
      const response = await unSaveThread(threadId, userId, pathname);
      if (response === `Successfully unsaved thread ${threadId}`) {
        setSaveMessage(`Removed`);
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
    <>
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/unsave.svg"}
          alt="save button"
          width={24}
          height={24}
          onClick={HandleSaveThread}
          className="cursor-pointer object-contain"
        />
        {saveMessage && (
          <div
            className={`text-small-regular ${
              isComment ? "text-light-1" : "text-dark-1"
            }`}
          >
            {saveMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default SaveThread;
