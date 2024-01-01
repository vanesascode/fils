"use client";
// import Link from "next/link";
import Image from "next/image";
import { useState, ChangeEvent, useRef } from "react";
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

// BLOB VERCEL:

import type { PutBlobResult } from "@vercel/blob";

// INTERFACE PROPS
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
  const [saveError, setSaveError] = useState("");
  const [openModal, setOpenModal] = useState(false);

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

  // HANDLE EDIT MODE AND MODAL

  const handleEditProfileClick = () => {
    setEditMode(true);
  };

  const handleCancelProfileClick = () => {
    setEditMode(false);
  };

  const handleOpenModel = () => {
    setOpenModal(true);
  };

  const handleCancelClick = () => {
    setOpenModal(false);
  };

  // PICTURE UPLOAD

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader(); // read a file
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // BLOB VERCEL

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  console.log("blob.url", blob ? blob.url : null);

  console.log("imgUrl", imgUrl);
  /// SAVE ALL:

  interface UpdatedUser {
    name: string;
    username: string;
    userId: string;
    bio: string;
    image?: string | null;
  }

  const handleSaveProfileClick = async () => {
    // BLOB VERCEL MODE:

    if (blob) {
      await fetch("/api/blobvercel", {
        method: "DELETE",
        body: JSON.stringify({
          imgUrl,
        }),
      });
    }

    // REST OF CODE:

    try {
      const updatedUser: UpdatedUser = {
        name: newName,
        username: newUsername,
        userId: currentUserId,
        bio: newBio,
      };

      if (blob) {
        // Standard mode: if (file)
        updatedUser.image = blob.url; // Standard mode: updatedUser.image = imageUrl;
      }
      console.log(imageUrl);
      await updateUserInProfile(updatedUser);
      setEditMode(false);
      setSaveError("");
    } catch (error: any) {
      console.error("Error updating user:", error);
      setSaveError("Error updating user");
    }

    router.refresh();
  };

  return (
    <>
      {/*UPLOAD PICTURE*/}

      <div className="flex w-full flex-col  ">
        {editMode && (
          <div className="flex items-center gap-3 w-full justify-start max-xs:justify-center flex-col">
            <div className="relative h-20 w-20 object-cover">
              {!blob?.url && (
                <img
                  src={imgUrl} // Standard mode: src={imageUrl || imgUrl}
                  alt="profile pic"
                  className="rounded-image-profile-page"
                />
              )}

              {blob?.url && (
                <img
                  src={blob?.url} // Standard mode: src={imageUrl || imgUrl}
                  alt="profile pic"
                  className="rounded-image-profile-page"
                />
              )}
            </div>

            {/* BLOB VERCEL MODE */}

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                if (!inputFileRef.current?.files) {
                  throw new Error("No file selected");
                }

                const file = inputFileRef.current.files[0];

                const response = await fetch(
                  `/api/blobvercel?filename=${file.name}`,
                  {
                    method: "POST",
                    body: file,
                  }
                );

                const newBlob = (await response.json()) as PutBlobResult;

                setBlob(newBlob);
              }}
            >
              <div className="flex  flex-col justify-center">
                <input
                  name="file"
                  ref={inputFileRef}
                  type="file"
                  required
                  className="cursor-pointer  text-light-1
                max-xs:text-small-regular  max-xs:py-1 max-xs:w-[290px] me-2"
                />
                <button
                  type="submit"
                  className=" cursor-pointer mt-1  bg-light-1 text-dark-1 hover:bg-dark-1 hover:text-light-1
               px-2 py-1 
                max-xs:text-small-regular  max-xs:my-1 max-xs:w-[270px]"
                >
                  Upload new picture
                </button>
              </div>
            </form>
            {/* {blob && (
              <div>
                Blob url: <a href={blob.url}>{blob.url}</a>
              </div>
            )} */}

            {/* STANDARD MODE}

            {/* <input
              type="file"
              placeholder="Add profile photo"
              className="   px-4 py-2 text-light-1
            max-xs:text-small-regular max-xs:px-3 max-xs:py-1 max-xs:w-[290px]
            "
              onChange={handleImageChange}
            /> */}
          </div>
        )}

        {/*PROFILE PIC*/}

        <div className="flex items-center justify-between">
          {!editMode && (
            <div className="relative h-20 w-20 object-cover">
              <img
                src={imageUrl || imgUrl}
                alt="profile pic"
                className="rounded-image-profile-page"
              />
            </div>
          )}

          {/*BUTTON TO EDIT PROFILE*/}

          <div>
            {!editMode &&
              accountId === currentUserId &&
              type !== "Community" && (
                <div>
                  <button
                    className="flex cursor-pointer gap-2 rounded-lg bg-dark-1 px-3 py-2 items-center justify-center box-shadow-small"
                    onClick={handleEditProfileClick}
                  >
                    <Image
                      src="/assets/edit-white.svg"
                      alt="logout"
                      width={18}
                      height={18}
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
                userName={name}
              />
            )}
          </div>
        </div>

        {/* NAME - USERNAME */}
        {editMode ? (
          <div className="flex-1 mt-4">
            <div className="text-left text-heading4-bold text-light-1 ">
              <input
                defaultValue={name}
                className="rounded-lg bg-dark-1 px-4 py-1 w-full outline-none text-light-1"
                onChange={(e) => setNewName(e.target.value)}
              ></input>
            </div>
            <div className="text-small-semibold text-light-1 mt-3 flex flex-row justify-start items-center rounded-lg bg-dark-1 px-4 py-2 w-full ">
              <input
                defaultValue={username}
                className=" bg-dark-1  w-full outline-none ml-1 "
                onChange={(e) => setNewUsername(e.target.value)}
              ></input>
            </div>
          </div>
        ) : (
          <div className="flex-1 mt-2">
            <div className="text-left text-heading3-bold text-light-1 break-all">
              {name}
            </div>
            <p className="text-small-semibold  text-light-2 break-all mt-[-2px]">
              {username}
            </p>
          </div>
        )}

        {/*BIO*/}

        {editMode ? (
          <div className="mt-3 text-small-regular text-light-1 w-full">
            <textarea
              defaultValue={bio}
              className="rounded-lg bg-dark-1 px-4 py-2 w-full outline-none"
              style={{ height: "200px", overflow: "auto" }}
              onChange={(e) => setNewBio(e.target.value)}
              placeholder="Tell us more about yourself"
            ></textarea>
            {saveError && (
              <p className="text-light-2 text-small-semibold whitespace-nowrap text-center mt-2">
                {saveError}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-2  text-base-regular leading-7 text-light-1 w-full">
            {bio}
          </div>
        )}

        {/*SAVE AND CANCEL EDIT PROFILE BUTTONS*/}
        <div className="flex flex-col items-center justify-between mt-2 mb-4 gap-2">
          {editMode && accountId === currentUserId && type !== "Community" && (
            <div className="flex gap-3 ">
              {/*save changes button*/}
              <button
                className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center box-shadow-small hover:bg-dark-1 hover:text-light-1"
                onClick={() => handleSaveProfileClick()}
              >
                <p>Save</p>
              </button>
              {/*cancel changes button*/}
              <button
                className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center box-shadow-small hover:bg-dark-1 hover:text-light-1"
                onClick={handleCancelProfileClick}
              >
                <p>Cancel</p>
              </button>
            </div>
          )}

          {/*DELETE ACCOUNT BUTTON*/}

          {editMode && accountId === currentUserId && type !== "Community" && (
            <div
              className="xs:text-base-regular text-light-2 text-end my-2 cursor-pointer text-small-semibold"
              onClick={handleOpenModel}
            >
              Delete Account
            </div>
          )}
        </div>

        {/*TOTAL FOLLOWED USERS*/}

        {/*current user*/}

        <div className=" flex ">
          <Link href={`/followers/${currentUserId}`}>
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
          <Link href={`/followers/${accountId}`}>
            {accountId !== currentUserId && !editMode && (
              <div className="me-[24px]">
                <span className="text-base-regular text-light-1 ">
                  {totalFollowedUsersIdsOtherUsers}{" "}
                </span>{" "}
                <span className="text-light-2 text-small-semibold">
                  Following
                </span>
              </div>
            )}
          </Link>
          {/*TOTAL FOLLOWERS*/}
          {/*current user*/}
          <Link href={`/followers/${currentUserId}`}>
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
          <Link href={`/followers/${accountId}`}>
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
          </Link>
        </div>

        {/*DELETE ACCOUNT MODAL*/}

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
      </div>
    </>
  );
}

export default ProfileHeader;
