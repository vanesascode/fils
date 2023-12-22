"use client";

import { useState } from "react";
import { updateThread } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

// context:

import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

interface Props {
  text: string;
  isComment?: boolean;
  authorId: string;
  currentUserId: string;
  author_Id: string;
  threadId: string;
}

const ThreadText = ({
  text,
  isComment,
  authorId,
  currentUserId,
  author_Id,
  threadId,
}: Props) => {
  const { editThreadMode, setEditThreadMode } = useContext(
    DataContext
  ) as DataContextType;

  const pathname = usePathname();

  const [newText, setNewText] = useState(text);

  // console.log(author_Id);

  const handleClick = async () => {
    try {
      await updateThread({
        text: newText,
        author: author_Id,
        path: pathname,
        _id: threadId,
      });
      setEditThreadMode(false);
    } catch (error) {
      console.log("Error updating text:", error);
    }
  };

  return (
    <>
      {editThreadMode && authorId === currentUserId ? (
        // &&
        // currentThreadId === threadId ?

        <>
          <div className="mt-3 text-base-regular text-light-1 w-full">
            <textarea
              defaultValue={text}
              className="rounded-lg bg-dark-1 px-4 py-2 w-full outline-none"
              style={{ height: "200px", overflow: "auto" }}
              onChange={(e) => setNewText(e.target.value)}
            ></textarea>
          </div>
          <button
            className="mt-3 text-base-regular text-dark-1 w-full"
            onClick={handleClick}
          >
            Save
          </button>
        </>
      ) : (
        <div
          className={`mt-2 break-all text-small-regular ${
            isComment ? "text-light-1" : "text-dark-1"
          }`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default ThreadText;
