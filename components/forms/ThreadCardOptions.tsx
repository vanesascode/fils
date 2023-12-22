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
          <Image
            alt="card options dots"
            src={
              isComment ? "/assets/dots-white.svg" : "/assets/dots-black.svg"
            }
            width={30}
            height={30}
            className="cursor-pointer object-contain"
            onClick={handleImageClick}
          />
        </div>

        {/*POP-UP MENU*/}
        {isMenuOpen && (
          <div className="absolute right-[0px] top-[30px] w-[180px] flex justify-center items-start flex-col z-50d  bg-light-1  rounded-lg box-shadow-small">
            {/*OPTIONS*/}

            <div className="pt-[20px] pb-[10px] px-5">
              <EditThread
                threadId={threadId}
                currentUserId={currentUserId}
                authorId={authorId}
                parentId={parentId}
                isComment={isComment}
              />
            </div>
            <div className=" pb-[20px] pt-[10px] px-5">
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
