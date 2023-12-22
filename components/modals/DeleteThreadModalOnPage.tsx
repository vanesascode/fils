"use client";

import React from "react";
import DeleteThreadModal from "./DeleteThreadModal";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  isComment?: boolean;
  parentId: string | null | undefined;
}

const UnFollowModalOnPage = ({
  threadId,
  currentUserId,
  authorId,
  parentId,
}: Props) => {
  return (
    <>
      <DeleteThreadModal
        threadId={threadId}
        currentUserId={currentUserId}
        parentId={parentId}
        authorId={authorId}
        isComment
      />
    </>
  );
};

export default UnFollowModalOnPage;
