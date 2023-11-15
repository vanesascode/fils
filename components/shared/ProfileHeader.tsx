"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { usePathname } from "next/navigation";

import { updateUser } from "@/lib/actions/user.actions";

import { useRouter } from "next/navigation";
import { updateDatabaseCommunityInfo } from "@/lib/actions/community.actions";

// this info comes from the profile page or the community page?
interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  communityId?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  communityId,
}: Props) {
  // NAVIGATION

  const pathname = usePathname();
  const router = useRouter();

  // EDIT MODE

  const [editMode, setEditMode] = useState(false);
  // const [editCommunityMode, setEditCommunityMode] = useState(false);

  // NEW DATA PROFILE

  const [newBio, setNewBio] = useState(bio);
  const [newUsername, setNewUsername] = useState(username);
  const [newName, setNewName] = useState(name);

  // HANDLERS EDIT PROFILE

  const handleEditProfileClick = () => {
    setEditMode(true);
  };

  const handleSaveProfileClick = async () => {
    try {
      await updateUser({
        name: newName,
        username: newUsername,
        userId: authUserId,
        bio: newBio,
        image: imgUrl,
      });
    } catch (error: any) {
      console.error("Error updating user:", error);
    }
    setEditMode(false);
    router.refresh();
  };

  // HANDLERS COMMUNITY PROFILE

  const handleEditCommunityClick = () => {
    setEditMode(true);
  };

  const handleSaveCommunityClick = async () => {
    try {
      await updateDatabaseCommunityInfo({
        communityId: communityId || "",
        name: newName,
        username: newUsername,
        image: imgUrl,
        bio: newBio,
      });
    } catch (error: any) {
      console.error("Error updating user:", error);
    }
    setEditMode(false);
    router.refresh();
  };

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/*IMAGE - NAME - USERNAME*/}

          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          {editMode ? (
            <div className="flex-1">
              <h2 className="text-left text-heading3-bold text-light-1">
                <input
                  defaultValue={name}
                  className="rounded-lg bg-dark-3 px-4 py-2 w-full outline-none"
                  onChange={(e) => setNewName(e.target.value)}
                ></input>
              </h2>
              <div className="text-base-medium text-gray-1 mt-3 flex flex-row justify-start items-center rounded-lg bg-dark-3 px-4 py-2 w-full">
                <p>@ </p>
                <input
                  defaultValue={username}
                  className=" bg-dark-3  w-full outline-none ml-1"
                  onChange={(e) => setNewUsername(e.target.value)}
                ></input>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <h2 className="text-left text-heading3-bold text-light-1">
                {name}
              </h2>
              <p className="text-base-medium text-gray-1">@{username}</p>
            </div>
          )}
        </div>

        {/*EDIT PROFILE BUTTON*/}

        {editMode
          ? accountId === authUserId &&
            type !== "Community" && (
              <div
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
                onClick={handleSaveProfileClick}
              >
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />

                <p className="text-light-2 max-sm:hidden">Save</p>
              </div>
            )
          : accountId === authUserId &&
            type !== "Community" && (
              <div
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
                onClick={handleEditProfileClick}
              >
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />

                <p className="text-light-2 max-sm:hidden">Edit</p>
              </div>
            )}

        {/*EDIT COMMUNITY BUTTON*/}

        {editMode
          ? accountId === authUserId &&
            type === "Community" && (
              <div
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
                onClick={handleSaveCommunityClick}
              >
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />

                <p className="text-light-2 max-sm:hidden">Save</p>
              </div>
            )
          : accountId === authUserId &&
            type === "Community" && (
              <div
                className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2"
                onClick={handleEditCommunityClick}
              >
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />

                <p className="text-light-2 max-sm:hidden">Edit</p>
              </div>
            )}
      </div>

      {/*PROFILE & COMMUNITY BIO*/}

      {editMode ? (
        <div className="mt-6  text-base-regular text-light-2 w-full">
          <textarea
            defaultValue={bio}
            className="rounded-lg bg-dark-3 px-4 py-2 w-full outline-none"
            style={{ height: "200px", overflow: "auto" }}
            onChange={(e) => setNewBio(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <div className="mt-6  text-base-regular text-light-2 w-full">{bio}</div>
      )}

      <div className="mt-5 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
