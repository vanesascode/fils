"use client";
import { useState } from "react";
import { saveThread } from "@/lib/actions/saved.actions";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  const [addBookmarks, setAddBookmarks] = useState(false);
  const [removeBookmarks, setRemoveBookmarks] = useState(false);

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
    <>
      {/* SAVED & REMOVED FILSTOASTS*/}
      {addBookmarks && (
        <div className="fixed bottom-20  left-0 w-full h-full flex justify-center items-end  z-50 ">
          <div className="bg-light-2 px-[30px] py-[20px] rounded-lg shadow text-center gap-2 text-dark-1 flex items-center">
            <div className="text-base-semibold">Added to your bookmarks</div>
            <Link
              href={`/profile/${currentUserId}`}
              className="text-light-1 text-base-bold sm:text-body-bold "
            >
              View
            </Link>
          </div>
        </div>
      )}

      {removeBookmarks && (
        <div
          className=" fixed bottom-20 left-0  w-full h-full flex justify-center items-end
        
         z-50 "
        >
          <div className="bg-light-2 px-[30px] py-[20px] rounded-lg shadow text-center flex gap-2 text-dark-1 text-base-semibold">
            <div>Removed from your bookmarks</div>
          </div>
        </div>
      )}

      {/* SAVED & REMOVED BUTTONS & COUNTER*/}
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
            alt="save icon"
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
    </>
  );
};

export default SaveThread;
