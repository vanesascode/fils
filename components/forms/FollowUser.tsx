"use client";

import { saveFollower } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  currentUserIdObject: string;
  accountUserIdObject: string;
  currentUserId: string;
  followedUsersIds: boolean;
  userName: string;
}

const FollowUser = ({
  currentUserIdObject,
  accountUserIdObject,
  currentUserId,
  followedUsersIds,
  userName,
}: Props) => {
  const [unFollowModalAppear, setUnFollowModalAppear] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const pathname = usePathname();

  const handleFollowUserClick = async () => {
    setIsButtonDisabled(true);
    try {
      const response = await saveFollower(
        currentUserIdObject,
        accountUserIdObject,
        pathname
      );
    } catch (error: any) {
      console.error("Error saving thread:", error);
    }
    setUnFollowModalAppear(false);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  const handleModalQuestion = () => {
    setUnFollowModalAppear(true);
  };

  const handleCancelClick = () => {
    setUnFollowModalAppear(false);
  };

  return (
    <>
      {/* UNFOLLOW USER MODAL*/}
      {unFollowModalAppear && (
        <>
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-[30px] max-xs:p-[25px] rounded-lg shadow text-center box-shadow-small">
              {/*Question*/}

              <div className="text-heading3-bold   tracking-tight">{`Unfollow  ${userName}?`}</div>

              {/*Explanation*/}

              <div className="text-body2-regular mt-2">
                {" "}
                Their posts will no longer show <br />
                up in your home feed.
              </div>

              {/*Buttons*/}

              <div className="flex gap-5 justify-center mt-5">
                <button
                  className="flex cursor-pointer gap-3 rounded-lg px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold
               sm:bg-light-1 max-sm:bg-dark-1 max-sm:text-light-1 sm:text-dark-1 hover:bg-dark-1 hover:text-light-1"
                  onClick={handleFollowUserClick}
                  disabled={isButtonDisabled}
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
        </>
      )}

      {/* FOLLOW/UNFOLLOW USER BUTTON*/}
      <div className="relative">
        {followedUsersIds ? (
          <button
            className="flex cursor-pointer gap-3 rounded-lg bg-dark-1 text-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-light-2 hover:text-dark-1"
            onClick={handleModalQuestion}
          >
            Following
          </button>
        ) : (
          <button
            className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1"
            onClick={handleFollowUserClick}
          >
            Follow
          </button>
        )}
      </div>
    </>
  );
};

export default FollowUser;
