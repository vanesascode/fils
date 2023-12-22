"use client";

import React, { useState } from "react";

// import { createContext, useState, ReactNode } from "react";

import { DataContextType } from "./types";

export const DataContext = React.createContext<DataContextType>({
  message: "",
  setMessage: () => {},
  unFollowModalAppear: false,
  setUnfollowModalAppear: () => {},
  addBookmarks: false,
  removeBookmarks: false,
  setAddBookmarks: () => {},
  setRemoveBookmarks: () => {},
});

export const DataContextProvider = (props: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [unFollowModalAppear, setUnfollowModalAppear] = useState(false);
  const [addBookmarks, setAddBookmarks] = useState(false);
  const [removeBookmarks, setRemoveBookmarks] = useState(false);

  return (
    <DataContext.Provider
      value={{
        message,
        setMessage,
        unFollowModalAppear,
        setUnfollowModalAppear,
        addBookmarks,
        removeBookmarks,
        setAddBookmarks,
        setRemoveBookmarks,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
