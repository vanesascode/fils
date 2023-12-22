"client side";

import { usePathname } from "next/navigation";
import Link from "next/link";

// context API:
import React, { useState } from "react";
import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

interface Props {
  currentUserId: string;
}

const SaveFilModal = ({ currentUserId }: Props) => {
  {
    /*context API*/
  }
  const { addBookmarks, removeBookmarks, setAddBookmarks, setRemoveBookmarks } =
    useContext(DataContext) as DataContextType;

  const pathname = usePathname();

  return (
    <>
      {addBookmarks && (
        <div className="fixed bottom-20  left-0 w-full h-full flex justify-center items-end  z-50 ">
          <div className="bg-light-2 px-[30px] py-[20px] rounded-lg shadow text-center gap-2 text-dark-1 flex items-center">
            <div className="text-base-semibold">Added to your bookmarks</div>
            <Link
              href={`/profile/${currentUserId}`}
              className="text-light-1 sm:text-body-bold "
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
    </>
  );
};
export default SaveFilModal;
