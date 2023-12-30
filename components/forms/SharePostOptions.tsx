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
  text: string;
}

function SharePostOptions({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
  text,
}: Props) {
  //states

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSocialMediaModalOpen, setIsSocialMediaModalOpen] = useState(false);

  //context

  const {
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

  const threadWithoutQuotes = threadId.slice(1, -1);

  //OPEN MENU

  const handleOpenMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenusClick = () => {
    setIsMenuOpen(false);
    setIsSocialMediaModalOpen(false);
  };

  // COPY LINK

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://fils.vercel.app/thread/${threadWithoutQuotes}`
    );
    setIsMenuOpen(false);
  };

  // SOCIAL MEDIA MODAL

  const handleOpenSocialMediaModal = () => {
    setIsSocialMediaModalOpen(true);
    setIsMenuOpen(false);
  };

  // EMAIL SHARE

  const handleEmailShare = () => {
    const subject = "Check out this post";
    const body = `I wanted to share this Fil with you:\n\n${text}\n\nCheck it out at: https://fils.vercel.app/thread/${threadWithoutQuotes}`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setIsSocialMediaModalOpen(false);
  };

  return (
    <>
      {/*BACKGROUNDS TO TURN OFF MENUS WHEN CLICKED*/}

      {isMenuOpen && (
        <div
          className="fixed top-0 left-0   w-full h-full flex justify-center items-center z-30"
          onClick={handleCloseMenusClick}
        ></div>
      )}

      {isSocialMediaModalOpen && (
        <div
          className="fixed top-0 left-0  w-full h-full flex justify-center items-center z-30"
          onClick={handleCloseMenusClick}
        ></div>
      )}

      {/* OPTIONS ICON */}
      <div className="relative">
        <div>
          <img
            alt="share icon"
            src={
              isComment ? "/assets/share-white.svg" : "/assets/share-black.svg"
            }
            className="cursor-pointer object-contain  w-[20px] h-[20px] xxs:w-[24px] xxs:h-[24px]"
            onClick={handleOpenMenuClick}
          />
        </div>

        {/*POP-UP MENU*/}
        {isMenuOpen && (
          <div className="absolute right-[0px] top-[30px] w-[180px] max-xs:w-[150px] flex justify-center items-start flex-col z-50d  bg-light-1  rounded-lg box-shadow-small overflow-hidden z-50">
            {/*OPTIONS*/}

            <div className="pt-[12px] pb-[8px] px-5 hover:bg-light-2 w-[180px] max-xs:w-[150px] hover:border-b-2 border-dark-1">
              {/*EDIT BUTTON*/}
              <button className="flex items-center" onClick={handleCopyLink}>
                <Image
                  src="/assets/edit.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="cursor-pointer object-contain me-1"
                />
                <div className="text-dark-1 max-xs:text-small-semibold">
                  Copy Link
                </div>
              </button>
            </div>
            <div className=" pb-[12px] pt-[8px] px-5 hover:bg-light-2 w-[180px] max-xs:w-[150px] hover:border-t-2 border-dark-1 ">
              {/*DELETE BUTTON*/}

              <button
                className="flex items-center"
                disabled={isButtonDisabled}
                onClick={handleOpenSocialMediaModal}
              >
                <Image
                  src="/assets/delete-red.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="cursor-pointer object-contain me-1"
                />
                <div className="text-dark-1 max-xs:text-small-semibold">
                  Share fil via...
                </div>
              </button>
            </div>
          </div>
        )}

        {/*SOCIAL MEDIA MODAL*/}

        {isSocialMediaModalOpen && (
          <div className="fixed top-0 left-0  bg-black w-full h-full flex justify-center items-center bg-opacity-50 z-10">
            <div className="bg-white p-[30px] rounded-lg shadow text-center box-shadow-small max-xs:p-[25px] z-50">
              {/*DELETE FIL BUTTONS*/}

              <div className="flex gap-5 justify-center mt-5 ">
                <button
                  className="flex cursor-pointer gap-3 rounded-lg bg-dark-2 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold text-light-1 hover:bg-light-2 hover:text-dark-1"
                  onClick={handleEmailShare}
                  disabled={isButtonDisabled}
                >
                  Email
                </button>

                <button
                  className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1 text-dark-1"
                  // onClick={handleCancelClick}
                >
                  Whasapp
                </button>
                <button
                  className="flex cursor-pointer gap-3 rounded-lg bg-dark-2 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold text-light-1 hover:bg-light-2 hover:text-dark-1"
                  // onClick={handleClick}
                  disabled={isButtonDisabled}
                >
                  Twitter
                </button>

                <button
                  className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1 text-dark-1"
                  // onClick={handleCancelClick}
                >
                  Facebook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SharePostOptions;
