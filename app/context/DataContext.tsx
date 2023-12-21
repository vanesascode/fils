"use client";

import React, { useState } from "react";

// import { createContext, useState, ReactNode } from "react";

import { DataContextType } from "./types";

export const DataContext = React.createContext<DataContextType>({
  message: "",
  setMessage: () => {},
  modalAppear: false,
  setModalAppear: () => {},
});

export const DataContextProvider = (props: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [modalAppear, setModalAppear] = useState(false);

  return (
    <DataContext.Provider
      value={{
        message,
        setMessage,
        modalAppear,
        setModalAppear,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
