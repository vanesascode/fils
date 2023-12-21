"client side";

import React, { useState } from "react";

import { DataContext } from "../../app/context/DataContext";
import { useContext } from "react";
import { DataContextType } from "../../app/context/types";

const Test = () => {
  const { message, setMessage, modalAppear, setModalAppear } = useContext(
    DataContext
  ) as DataContextType;

  return (
    <>
      {modalAppear && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <div>{message}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default Test;
