"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
// import DeleteThread from "../forms/DeleteThread";

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

  const { editThreadMode, setEditThreadMode } = useContext(
    DataContext
  ) as DataContextType;

  //pathname

  const pathname = usePathname();

  if (
    currentUserId !== authorId
    // || pathname === "/"
  )
    return null;

  //OPEN MENU

  const handleImageClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // EDIT THREAD

  const handleEditClick = async () => {
    setEditThreadMode(true);
    setIsMenuOpen(false);
  };

  // DELETE THREAD

  const router = useRouter();

  const handleDeleteThreadClick = () => {
    setIsMenuOpen(false);
  };

  console.log(threadId);

  return (
    <>
      {/* OPTIONS ICON */}
      <div className="relative">
        <div

        // onBlur={() => setIsMenuOpen(false)}
        // onFocus={() => setIsMenuOpen(true)}
        >
          <img
            alt="card options dots"
            src={
              isComment ? "/assets/dots-white.svg" : "/assets/dots-black.svg"
            }
            className="cursor-pointer object-contain xs:h-[40px] xs:w-[40px] h-[20px] w-[20px]"
            onClick={handleImageClick}
          />
        </div>

        {/*POP-UP MENU*/}
        {isMenuOpen && (
          <div className="absolute right-[0px] top-[30px] w-[180px] max-xs:w-[150px] flex justify-center items-start flex-col z-50d  bg-light-1  rounded-lg box-shadow-small overflow-hidden">
            {/*OPTIONS*/}

            <div className="pt-[12px] pb-[8px] px-5 hover:bg-light-2 w-[180px] max-xs:w-[150px] hover:border-b-2 border-dark-1">
              {/*EDIT BUTTON*/}
              <button className="flex items-center" onClick={handleEditClick}>
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
                onClick={handleDeleteThreadClick}
              >
                <Image
                  src="/assets/delete-red.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="cursor-pointer object-contain me-1"
                />
                <div className="text-dark-1 max-xs:text-small-semibold">
                  Delete Post
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
