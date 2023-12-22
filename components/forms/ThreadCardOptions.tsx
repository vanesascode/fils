"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import DeleteThread from "../forms/DeleteThread";
import EditThread from "../forms/EditThread";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (
    currentUserId !== authorId
    // || pathname === "/"
  )
    return null;

  const handleImageClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

            <div className="pt-[12px] pb-[8px] px-5 hover:bg-light-2 w-[180px] max-xs:w-[150px]">
              <EditThread
                threadId={threadId}
                currentUserId={currentUserId}
                authorId={authorId}
                parentId={parentId}
                isComment={isComment}
              />
            </div>
            <div className=" pb-[12px] pt-[8px] px-5 hover:bg-light-2 w-[180px] max-xs:w-[150px]">
              <DeleteThread
                threadId={threadId}
                currentUserId={currentUserId}
                authorId={authorId}
                parentId={parentId}
                isComment={isComment}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ThreadCardOptions;
