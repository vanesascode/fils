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

const MAX_WORD_LENGTH = 20;

const ThreadText = ({
  text,
  isComment,
  authorId,
  currentUserId,
  author_Id,
  threadId,
}: Props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { editThreadMode, setEditThreadMode, threadToBeEdited } = useContext(
    DataContext
  ) as DataContextType;

  const pathname = usePathname();

  const [newText, setNewText] = useState(text);

  const handleClick = async () => {
    setIsButtonDisabled(true);
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

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  const handleCancelClick = () => {
    setEditThreadMode(false);
  };

  //To know if words are longer than 20 characters:
  const shouldBreakWord = (word: string) => {
    return word.length > MAX_WORD_LENGTH;
  };

  // To render the text:
  const renderText = () => {
    const words = text.split(" ");

    return words.map((word, index) => {
      return (
        <span key={index} className={shouldBreakWord(word) ? "break-all" : ""}>
          {word}
          {index !== words.length - 1 && " "}{" "}
          {/* Add a space between words, except for the last word */}
        </span>
      );
    });
  };

  return (
    <>
      {editThreadMode &&
      authorId === currentUserId &&
      threadId === threadToBeEdited.slice(1, -1) ? (
        // & threadid  ==== id(en context)
        <>
          <div className="mt-3 text-base-regular text-light-1 w-full">
            <textarea
              defaultValue={text}
              className="rounded-lg bg-dark-1 px-4 py-2 w-full outline-none overflow-auto h-[200px]"
              onChange={(e) => setNewText(e.target.value)}
            ></textarea>
          </div>
          <button
            className="flex cursor-pointer gap-3 rounded-lg bg-dark-2 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold text-light-1 hover:bg-light-2 hover:text-dark-1"
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            Save
          </button>
          <button
            className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1 text-dark-1"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </>
      ) : (
        <div
          className={`mt-2 break-words text-small-regular ${
            isComment ? "text-light-1" : "text-dark-1"
          }`}
        >
          {renderText()}
        </div>
      )}
    </>
  );
};

export default ThreadText;
