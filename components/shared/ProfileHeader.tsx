"use client";
// import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { updateUser, deleteUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import FollowUser from "../forms/FollowUser";

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
        userId: currentUserId,
        bio: newBio,
        image: imgUrl,
      });
    } catch (error: any) {
      console.error("Error updating user:", error);
    }
    setEditMode(false);
    router.refresh();
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

        {/*EDIT PROFILE BUTTON*/}
        <div>
          {editMode
            ? accountId === currentUserId &&
              type !== "Community" && (
                <div
                  className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 "
                  onClick={handleSaveProfileClick}
                >
                  <Image
                    src="/assets/edit-black.svg"
                    alt="save button"
                    width={16}
                    height={16}
                  />

                  <p className="text-dark-1 ">Save</p>
                </div>
              )
            : accountId === currentUserId &&
              type !== "Community" && (
                <div
                  className="flex cursor-pointer gap-3 rounded-lg bg-dark-1 px-4 py-2 "
                  onClick={handleEditProfileClick}
                >
                  <Image
                    src="/assets/edit-white.svg"
                    alt="logout"
                    width={16}
                    height={16}
                  />

                  <p className="text-light-1">Edit</p>
                </div>
              )}
        </div>
        {/*FOLLOW USER BUTTON */}

        {accountId !== currentUserId && (
          <FollowUser currentUserIdObject={currentUserIdObject} accountUserIdObject={accountUserIdObject}  currentUserId={currentUserId}/>
        )}
      </div>

      {/* NAME - USERNAME */}
      {editMode ? (
        <div className="flex-1 mt-4">
          <h2 className="text-left text-heading3-bold text-light-1 ">
            <input
              defaultValue={name}
              className="rounded-lg bg-dark-1 px-4 py-1 w-full outline-none text-light-1"
              onChange={(e) => setNewName(e.target.value)}
            ></input>
          </h2>
          <div className="text-base-medium text-light-1 mt-3 flex flex-row justify-start items-center rounded-lg bg-dark-1 px-4 py-2 w-full ">
            <p>@ </p>
            <input
              defaultValue={username}
              className=" bg-dark-1  w-full outline-none ml-1 "
              onChange={(e) => setNewUsername(e.target.value)}
            ></input>
          </div>
        </div>
      ) : (
        <div className="flex-1 mt-2">
          <h2 className="text-left text-body-bold text-light-1 break-all">
            {name}
          </h2>
          <p className="text-base-semibold text-light-2 break-all mt-1">
            @{username}
          </p>
        </div>
      )}

      {/*BIO*/}

      {editMode ? (
        <div className="mt-5 text-base-regular text-light-1 w-full">
          <textarea
            defaultValue={bio}
            className="rounded-lg bg-dark-1 px-4 py-2 w-full outline-none"
            style={{ height: "200px", overflow: "auto" }}
            onChange={(e) => setNewBio(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <div className="mt-3  text-base-regular leading-7 text-light-1 w-full">
          {bio}
        </div>
      )}

      {/*DELETE ACCOUNT BUTTON*/}

      {editMode && accountId === currentUserId && type !== "Community" && (
        <div
          className="text-base-regular text-light-1 text-end mt-2 cursor-pointer"
          onClick={deleteProfile}
        >
          Delete Account
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
