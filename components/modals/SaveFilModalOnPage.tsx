"use client";

import React from "react";
import SaveFilModal from "./SaveFilModal";

interface Props {
  currentUserId: string;
}

const SaveFilModalOnPage = ({ currentUserId }: Props) => {
  return (
    <>
      <SaveFilModal currentUserId={currentUserId} />
    </>
  );
};

export default SaveFilModalOnPage;
