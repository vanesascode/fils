"use client";

import React, { useState } from "react";

import { DataContextType } from "./types";

export const DataContext = React.createContext<DataContextType>({
  threadToBeEdited: "",
  setThreadToBeEdited: () => {},

  threadToBeDeleted: "",
  setThreadToBeDeleted: () => {},

  editThreadMode: false,
  setEditThreadMode: () => {},

  deleteThreadMode: false,
  setDeleteThreadMode: () => {},
});

export const DataContextProvider = (props: { children: React.ReactNode }) => {
  const [threadToBeDeleted, setThreadToBeDeleted] = useState<string>("");
  const [editThreadMode, setEditThreadMode] = useState(false);
  const [deleteThreadMode, setDeleteThreadMode] = useState(false);
  const [threadToBeEdited, setThreadToBeEdited] = useState<string>("");

  return (
    <DataContext.Provider
      value={{
        threadToBeDeleted,
        setThreadToBeDeleted,

        editThreadMode,
        setEditThreadMode,

        deleteThreadMode,
        setDeleteThreadMode,

        threadToBeEdited,
        setThreadToBeEdited,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
