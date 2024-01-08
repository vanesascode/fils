"use client";

import React, { useState, useEffect } from "react";

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

  colorMode: "red",
  setColorMode: () => {},
});

export const DataContextProvider = (props: { children: React.ReactNode }) => {
  const [threadToBeDeleted, setThreadToBeDeleted] = useState<string>("");
  const [editThreadMode, setEditThreadMode] = useState(false);
  const [deleteThreadMode, setDeleteThreadMode] = useState(false);
  const [threadToBeEdited, setThreadToBeEdited] = useState<string>("");
  // COLOR SWITCH CONFIGURATION:
  const [colorMode, setColorMode] = useState(() => {
    let initialColorMode = "light";
    if (typeof localStorage !== "undefined") {
      initialColorMode = localStorage.getItem("colorMode") || "light";
    }
    return initialColorMode;
  });

  useEffect(() => {
    if (colorMode === "dark") {
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        htmlElement.classList.add("dark");
      }
    } else {
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        htmlElement.classList.remove("dark");
      }
    }

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("colorMode", colorMode);
    }
  }, [colorMode]);

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

        colorMode,
        setColorMode,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
