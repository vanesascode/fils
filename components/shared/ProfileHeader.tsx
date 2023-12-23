"use client";
// import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  updateUser,
  deleteUser,
  getAllFollowedUsersIds,
  updateUserInProfile,
} from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import FollowUser from "../forms/FollowUser";
import Link from "next/link";

// this info comes from the profile page or the community page?
interface Props {
  accountId: string;
  currentUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  communityId?: string;
  currentUserIdObject: string;
  accountUserIdObject: string;
  followedUsersIds: boolean;
  totalFollowedUsersCurrentUser?: number;
  totalFollowedUsersIdsOtherUsers?: number;
  totalFollowersCurrentUser?: number;
  totalFollowersOtherUsers?: number;
}

function ProfileHeader({
  accountId, // this is the id of the current clerk profile user
  currentUserId, // this is the clerk logged in user
  name,
  username,
  imgUrl,
  bio,
  type,
  communityId,
  accountUserIdObject,
  currentUserIdObject,
  followedUsersIds,
  totalFollowedUsersCurrentUser,
  totalFollowedUsersIdsOtherUsers,
  totalFollowersCurrentUser,
  totalFollowersOtherUsers,
}: Props) {
  // NAVIGATION

  const pathname = usePathname();
  const router = useRouter();

  // EDIT MODE

  const [editMode, setEditMode] = useState(false);

  // NEW DATA PROFILE

  const [newBio, setNewBio] = useState(bio);
  const [newUsername, setNewUsername] = useState(username);
  const [newName, setNewName] = useState(name);
  const [usernameError, setUsernameError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // HANDLERS EDIT PROFILE

  const handleEditProfileClick = () => {
    setEditMode(true);
  };

  interface UpdatedUser {
    name: string;
    username?: string;
    userId: string;
    bio: string;
    image: string;
  }

  const handleSaveProfileClick = async () => {
    try {
      const updatedUser: UpdatedUser = {
        name: newName,
        userId: currentUserId,
        bio: newBio,
        image: imgUrl,
      };

      if (newUsername !== username) {
        updatedUser.username = newUsername;
      }
      await updateUserInProfile(updatedUser);
      setEditMode(false);
      setUsernameError("");
    } catch (error: any) {
      console.error("Error updating user:", error);
      setUsernameError("Username already exists");
    }

    router.refresh();
  };

  const handleCancelProfileClick = () => {
    setEditMode(false);
  };

  // HANDLERS DELETE PROFILE

  const deleteProfile = async () => {
    try {
      const response = await deleteUser(currentUserId, pathname);
      // console.log(response);
    } catch (error: any) {
      console.error("Error updating user:", error);
    }
    router.push("/");
  };

  // HANDLE MODAL

  const handleOpenModel = () => {
    setOpenModal(true);
  };

  const handleCancelClick = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        {/*IMAGE - */}

        <div className="relative h-20 w-20 object-cover">
          <Image
            src={imgUrl}
            alt="profile pic"
            fill
            className="rounded-full object-cover shadow-2xl"
          />
        </div>

        {/*EDIT PROFILE BUTTONS*/}
        <div>
          {editMode
            ? accountId === currentUserId &&
              type !== "Community" && (
                <div className="flex gap-3 max-xs:flex-col">
                  {/*save changes button*/}
                  <button
                    className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center"
                    onClick={handleSaveProfileClick}
                  >
                    <Image
                      src="/assets/edit-black.svg"
                      alt="save button"
                      width={16}
                      height={16}
                    />

                    <p className="text-dark-1 ">Save</p>
                  </button>
                  {/*cancel changes button*/}
                  <button
                    className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center"
                    onClick={handleCancelProfileClick}
                  >
                    <Image
                      src="/assets/edit-black.svg"
                      alt="save button"
                      width={16}
                      height={16}
                    />

                    <p className="text-dark-1 ">Cancel</p>
                  </button>
                </div>
              )
            : accountId === currentUserId &&
              type !== "Community" && (
                <div>
                  {/*cancel changes button*/}
                  <button
                    className="flex cursor-pointer gap-3 rounded-lg bg-dark-1 px-4 py-2 items-center justify-center"
                    onClick={handleEditProfileClick}
                  >
                    <Image
                      src="/assets/edit-white.svg"
                      alt="logout"
                      width={16}
                      height={16}
                    />

                    <p className="text-light-1">Edit</p>
                  </button>
                </div>
              )}

          {/*FOLLOW USER BUTTON */}

          {accountId !== currentUserId && (
            <FollowUser
              currentUserIdObject={currentUserIdObject}
              accountUserIdObject={accountUserIdObject}
              currentUserId={currentUserId}
              followedUsersIds={followedUsersIds}
            />
          )}
        </div>
      </div>

      {/* NAME - USERNAME */}
      {editMode ? (
        <div className="flex-1 mt-4">
          <div className="text-left text-heading3-bold text-light-1 ">
            <input
              defaultValue={name}
              className="rounded-lg bg-dark-1 px-4 py-1 w-full outline-none text-light-1"
              onChange={(e) => setNewName(e.target.value)}
            ></input>
          </div>
          <div className="text-base-medium text-light-1 mt-3 flex flex-row justify-start items-center rounded-lg bg-dark-1 px-4 py-2 w-full ">
            <p>@</p>
            <input
              defaultValue={username}
              className=" bg-dark-1  w-full outline-none ml-1 "
              onChange={(e) => setNewUsername(e.target.value)}
            ></input>
            {usernameError && (
              <p className="text-red-light-1">{usernameError}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 mt-2">
          <div className="text-left text-heading3-bold text-light-1 break-all">
            {name}
          </div>
          <p className="text-small-semibold  text-light-2 break-all mt-[-2px]">
            @{username}
          </p>
        </div>
      )}

      {/*BIO*/}

      {editMode ? (
        <div className="mt-3 text-base-regular text-light-1 w-full">
          <textarea
            defaultValue={bio}
            className="rounded-lg bg-dark-1 px-4 py-2 w-full outline-none"
            style={{ height: "200px", overflow: "auto" }}
            onChange={(e) => setNewBio(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <div className="mt-2  text-base-regular leading-7 text-light-1 w-full">
          {bio}
        </div>
      )}

      {/*TOTAL FOLLOWED USERS*/}

      {/*current user*/}

      <div className="mt-2 flex ">
        <Link href={`/followers`}>
          {accountId === currentUserId && !editMode && (
            <div className="me-[24px]">
              <span className="text-base-regular text-light-1">
                {totalFollowedUsersCurrentUser}{" "}
              </span>{" "}
              <span className="text-light-2 text-small-semibold">
                Following
              </span>
            </div>
          )}
        </Link>
        {/*other users*/}
        {accountId !== currentUserId && !editMode && (
          <div className="me-[24px]">
            <span className="text-base-regular text-light-1 ">
              {totalFollowedUsersIdsOtherUsers}{" "}
            </span>{" "}
            <span className="text-light-2 text-small-semibold">Following</span>
          </div>
        )}
        {/*TOTAL FOLLOWERS*/}
        {/*current user*/}
        <Link href={`/followers`}>
          {accountId === currentUserId && !editMode && (
            <div>
              <span className="text-base-regular text-light-1">
                {totalFollowersCurrentUser}{" "}
              </span>{" "}
              <span className="text-light-2 text-small-semibold">
                {totalFollowersCurrentUser === 1 ? "Follower" : "Followers"}
              </span>
            </div>
          )}
        </Link>
        {/*other users*/}
        {accountId !== currentUserId && !editMode && (
          <div>
            <span className="text-base-regular text-light-1">
              {totalFollowersOtherUsers}{" "}
            </span>{" "}
            <span className="text-light-2 text-small-semibold">
              {totalFollowersOtherUsers === 1 ? "Follower" : "Followers"}
            </span>
          </div>
        )}
      </div>

      {/**MODAL*************************************************************fixed top-0 left-0  bg-black***************************************/}

      {openModal && (
        <div className="fixed top-0 left-0  bg-black w-full h-full flex justify-center items-center bg-opacity-50 z-50">
          <div className="bg-white p-[30px] rounded-lg shadow text-center box-shadow-small max-xs:p-[25px]">
            {/*QUESTION*/}

            <div className="mb-1 text-heading3-bold  text-dark-1  tracking-tight">
              Are you sure?
            </div>

            {/*EXPLANATION*/}

            <div className="text-body2-regular  mt-2 text-dark-1">
              If you delete your account you will <br />
              lose forever all the fils you <br />
              created and all your fils saved
            </div>

            {/*BUTTONS*/}

            <div className="flex gap-5 justify-center mt-5 ">
              <button
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-2 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold text-light-1 hover:bg-light-2 hover:text-dark-1"
                onClick={deleteProfile}
                // disabled={isButtonDisabled}
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
      {/*DELETE ACCOUNT BUTTON*/}

      {editMode && accountId === currentUserId && type !== "Community" && (
        <div
          className="text-base-regular text-light-1 text-end mt-2 cursor-pointer"
          onClick={handleOpenModel}
        >
          Delete Account
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
