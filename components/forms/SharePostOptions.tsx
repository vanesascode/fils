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
  authorName: string;
}

function SharePostOptions({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
  text,
  authorName,
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
    navigator.clipboard.writeText(`https://fils.vercel.app/thread/${threadId}`);
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
    const body = `I wanted to share this Fil by ${authorName} with you:\n\n${text}\n\nCheck it out at: https://fils.vercel.app/thread/${threadId}`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setIsSocialMediaModalOpen(false);
  };

  // WHATSAPP SHARE

  const handleWhatsAppShare = () => {
    const message = `Check out this Fil by ${authorName}: https://fils.vercel.app/thread/${threadId}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/*BACKGROUNDS TO TURN OFF MENUS WHEN CLICKED*/}

      {(isMenuOpen || isSocialMediaModalOpen) && (
        <div
          className="fixed top-0 left-0   w-full h-full flex justify-center items-center z-30 bg-black opacity-30"
          onClick={handleCloseMenusClick}
        ></div>
      )}

      {/* OPTIONS ICON */}
      <div className="relative">
        <div>
          <img
            alt="share icon"
            src={isComment ? "/assets/share-white.svg" : "/assets/share.svg"}
            className="cursor-pointer object-contain  w-[20px] h-[20px] xxs:w-[24px] xxs:h-[24px]"
            onClick={handleOpenMenuClick}
          />
        </div>

        {/*POP-UP MENU*/}
        {isMenuOpen && (
          <div className="absolute max-sm2:right-[-30px] top-[30px] w-[180px] max-sm2:w-[170px] flex justify-center items-start flex-col z-50d  bg-light-1  rounded-lg box-shadow-small overflow-hidden z-50">
            {/*OPTIONS*/}

            <button className="pt-[12px] pb-[8px] px-5 hover:bg-light-2 w-[180px] max-sm2:w-[170px] hover:border-b-2 border-dark-1">
              {/*COPY LINK BUTTON*/}
              <div className="flex items-center" onClick={handleCopyLink}>
                <Image
                  src="/assets/link.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="cursor-pointer object-contain me-2"
                />
                <div className="text-dark-1 max-sm2:text-small-semibold">
                  Copy Link
                </div>
              </div>
            </button>
            <div className=" pb-[12px] pt-[8px] px-5 hover:bg-light-2 w-[180px] max-sm2:w-[150px] hover:border-t-2 border-dark-1  ">
              {/*SHARE BUTTON*/}

              <button
                className="flex items-center"
                disabled={isButtonDisabled}
                onClick={handleOpenSocialMediaModal}
              >
                <Image
                  src="/assets/send-fil.svg"
                  alt="delete"
                  width={20}
                  height={20}
                  className="cursor-pointer object-contain me-2"
                />
                <div className="text-dark-1 max-sm2:text-small-semibold whitespace-nowrap">
                  Share fil via...
                </div>
              </button>
            </div>
          </div>
        )}

        {/*SOCIAL MEDIA MODAL*/}

        {isSocialMediaModalOpen && (
          <div className="bg-light-1 p-[10px] max-sm2:right-[-30px] rounded-lg shadow text-center box-shadow-small z-50 absolute top-[30px] flex xs:gap-5 gap-3 items-center sm2:w-[170px] w-[150px] justify-center">
            <img
              src="/assets/email.svg"
              alt="email icon"
              className="cursor-pointer object-contain me-2 sm2:h-[40px] sm2:w-[40px] h-[33px] w-[35px]"
              onClick={handleEmailShare}
            />

            <img
              src="/assets/whatsapp.svg"
              alt="whatsapp icon"
              className="cursor-pointer object-contain me-2 sm2:h-[45px] sm2:w-[45px] h-[35px] w-[35px]"
              onClick={handleWhatsAppShare}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default SharePostOptions;
