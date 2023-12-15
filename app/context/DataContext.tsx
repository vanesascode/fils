"use client";

import { createContext, useState, ReactNode } from "react";

const DataContext = createContext({});

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [saveMessage, setSaveMessage] = useState<string>("message");
  return (
    <DataContext.Provider value={{ saveMessage, setSaveMessage }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
