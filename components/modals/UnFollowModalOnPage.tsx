"use client";

import React from "react";
import UnFollowModal from "./UnFollowModal";

interface Props {
  currentUserIdObject: string;
  accountUserIdObject: string;
  userName: string;
}

const UnFollowModalOnPage = ({
  currentUserIdObject,
  accountUserIdObject,
  userName,
}: Props) => {
  return (
    <>
      <UnFollowModal
        currentUserIdObject={currentUserIdObject} // current MongoDB user profile id
        accountUserIdObject={accountUserIdObject}
        userName={userName}
      />
    </>
  );
};

export default UnFollowModalOnPage;
