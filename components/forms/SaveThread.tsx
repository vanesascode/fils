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
    <div className="relative">
      <div className="flex items-center gap-2 ">
        <Image
          src={isComment ? "/assets/save-white.svg" : "/assets/save-black.svg"}
          alt="save button"
          width={24}
          height={24}
          onClick={HandleSaveThread}
          className="cursor-pointer object-contain"
        />
        <div className={isComment ? "text-light-1" : "	text-dark-1"}>
          {" "}
          {saves}
        </div>
      </div>

      {/*TOAST MESSAGE*/}

      {saveMessage === "Already saved" && (
        <div className=" rounded-lg bg-dark-1 px-4 py-2 absolute bottom-[-55px]">
          <div
            className="text-subtle-regular 
              text-light-1 text-center"
          >
            {saveMessage}
          </div>
        </div>
      )}

      {saveMessage === "Saved" && (
        <div
          className=" rounded-lg bg-dark-1 px-4 py-2 absolute text-subtle-regular 
        text-light-1 text-center flex flex-column right-[-40px] bottom-[-40px]"
        >
          <div>{saveMessage}</div>
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
{
  /* <div>
              {saveMessage === "Saved" && (
               
              )}
            </div> */
}
