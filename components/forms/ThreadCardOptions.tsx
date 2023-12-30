"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
// import DeleteThread from "../forms/DeleteThread"
import { deleteThread } from "@/lib/actions/thread.actions";

import Image from "next/image";

// context:

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

function ThreadCardOptions({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  //states

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //context

  const {
    threadToBeEdited,
    setThreadToBeEdited,
    threadToBeDeleted,
    setThreadToBeDeleted,
    editThreadMode,
    setEditThreadMode,
    deleteThreadMode,
    setDeleteThreadMode,
  } = useContext(DataContext) as DataContextType;

  //pathname

  const pathname = usePathname();

  if (
    currentUserId !== authorId
    // || pathname === "/"
  )
    return null;

  //OPEN MENU

  const handleOpenMenuClick = () => {
    setIsMenuOpen(true);
  };

  // CLOSE MENU

  const handleCloseMenuClick = () => {
    setIsMenuOpen(false);
  };

  // EDIT THREAD

  const handleEditThreadClick = async (id: string) => {
    setThreadToBeEdited(id);
    setEditThreadMode(true);
    setIsMenuOpen(false);
  };

  // DELETE THREAD

  const router = useRouter();

  const handleDeleteThreadClick = async (id: string) => {
    setThreadToBeDeleted(id);
    setIsMenuOpen(false);
    setDeleteThreadMode(true);
    setEditThreadMode(false);
  };

  return (
    <>
      {/*BACKGROUND TO TURN OFF MENU WHEN CLICKED*/}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0   w-full h-full flex justify-center items-center z-30"
          onClick={handleCloseMenuClick}
        ></div>
      )}

      {/* OPTIONS ICON */}
      <div className="relative">
        <div>
          <img
            alt="card options dots"
            src={
              isComment ? "/assets/dots-white.svg" : "/assets/dots-black.svg"
            }
            className="cursor-pointer object-contain xs:h-[40px] xs:w-[40px] h-[20px] w-[20px]"
            onClick={handleOpenMenuClick}
          />
        </div>

        {/*POP-UP MENU*/}
        {isMenuOpen && (
          <div className="absolute right-[0px] top-0  w-[180px] max-xs:w-[150px] flex justify-center items-start flex-col z-50d  bg-light-1  rounded-lg box-shadow-small overflow-hidden z-50">
            {/*OPTIONS*/}

            <div className="pt-[12px] pb-[8px] px-5 hover:bg-light-2 w-[180px] max-xs:w-[150px] hover:border-b-2 border-dark-1">
              {/*EDIT BUTTON*/}
              <button
                className="flex items-center"
                onClick={() => handleEditThreadClick(threadId)}
              >
                <Image
                  src="/assets/edit.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="cursor-pointer object-contain me-1"
                />
                <div className="text-dark-1 max-xs:text-small-semibold">
                  Edit Post
                </div>
              </button>
            </div>
            <div className=" pb-[12px] pt-[8px] px-5 hover:bg-light-2 w-[180px] max-xs:w-[150px] hover:border-t-2 border-dark-1 ">
              {/*DELETE BUTTON*/}

              <button
                className="flex items-center"
                disabled={isButtonDisabled}
                onClick={() => handleDeleteThreadClick(threadId)}
              >
                <Image
                  src="/assets/delete-red.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="cursor-pointer object-contain me-1"
                />
                <div className="text-dark-1 max-xs:text-small-semibold">
                  Delete Post{" "}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ThreadCardOptions;
