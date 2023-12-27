"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions/thread.actions";

// context API:

import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  isComment?: boolean;
  parentId: string | null | undefined;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { deleteThreadMode, setDeleteThreadMode } = useContext(
    DataContext
  ) as DataContextType;

  //context
  const { unFollowModalAppear, setUnfollowModalAppear } = useContext(
    DataContext
  ) as DataContextType;
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = async () => {
    setIsButtonDisabled(true);
    await deleteThread(JSON.parse(threadId), pathname);
    if (!parentId || !isComment) {
      router.push(pathname);
    }

    setDeleteThreadMode(false);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  const handleModalClick = () => {
    setDeleteThreadMode(!deleteThreadMode);
  };

  const handleCancelClick = () => {
    setDeleteThreadMode(false);
  };

  if (currentUserId !== authorId) return null;

  // console.log(threadId);

  return (
    <>
      {/*DELETE FIL TOAST*/}

      {deleteThreadMode && (
        <div className="fixed top-0 left-0  bg-black w-full h-full flex justify-center items-center bg-opacity-50 z-50">
          <div className="bg-white p-[30px] rounded-lg shadow text-center box-shadow-small max-xs:p-[25px]">
            <div className="mb-1 text-heading3-bold  text-dark-1  tracking-tight">
              Delete Fil?
            </div>
            <div className="text-body2-regular  mt-2 text-dark-1">
              This can't be undone and it will be <br />
              removed from your profile, the <br /> timeline of any accounts
              that follow <br />
              you, and from search results.
            </div>

            {/*DELETE FIL BUTTONS*/}

            <div className="flex gap-5 justify-center mt-5 ">
              <button
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-2 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold text-light-1 hover:bg-light-2 hover:text-dark-1"
                onClick={handleClick}
                disabled={isButtonDisabled}
              >
                Delete
              </button>

              <button
                className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1 text-dark-1"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteThread;
