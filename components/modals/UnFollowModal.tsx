"client side";

import { saveFollower } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";

// context API:
import React, { useState } from "react";
import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

interface Props {
  currentUserIdObject: string;
  accountUserIdObject: string;
  userName: string;
}

const UnFollowModal = ({
  currentUserIdObject,
  accountUserIdObject,
  userName,
}: Props) => {
  {
    /*context API*/
  }
  const { unFollowModalAppear, setUnfollowModalAppear } = useContext(
    DataContext
  ) as DataContextType;

  const pathname = usePathname();

  const handleFollowUserClick = async () => {
    try {
      const response = await saveFollower(
        currentUserIdObject,
        accountUserIdObject,
        pathname
      );
      if (response === `Successfully saved new user followed`) {
      } else if (response === `Unfollowed`) {
        setUnfollowModalAppear(false);
      }
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
  };

  const handleCancelClick = () => {
    setUnfollowModalAppear(false);
  };

  return (
    <>
      {unFollowModalAppear && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-[30px] rounded-lg shadow text-center">
            {/*QUESTION*/}

            <div className="text-heading4-semibold max-sm:hidden">{`Unfollow  @${userName}?`}</div>
            <div className="mb-1 text-heading4-semibold sm:hidden leading-tight">
              <div>Unfollow</div> <div>{`@${userName}?`}</div>
            </div>

            {/*EXPLANATION*/}

            <div>
              {" "}
              Their posts will no <br className="sm:hidden" /> longer show up{" "}
              <br /> in your home feed.
            </div>

            {/*BUTTONS*/}

            <div className="flex gap-5 justify-center mt-5">
              <button
                className="flex cursor-pointer gap-3 rounded-lg px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold
                 sm:bg-light-1 max-sm:bg-dark-1 max-sm:text-light-1 sm:text-dark-1 max-sm:hover:bg-dark-1 max-sm:hover:text-light-1"
                onClick={handleFollowUserClick}
              >
                Unfollow
              </button>
              <button
                className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1"
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
};
export default UnFollowModal;
