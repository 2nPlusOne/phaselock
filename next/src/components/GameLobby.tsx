"use client";

import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LobbyProps {
  roomId: string;
}

const Lobby: React.FC<LobbyProps> = ({ roomId }) => {
  const handleCopy = () => {
    copy("localhost:3000/" + roomId.slice(0, 4));
    toast("Copied to clipboard!");
  };

  return (
    <>
      <div className="flex flex-col justify-center p-4">
        <div className="mb-4 flex items-center justify-center gap-4">
          <h2 className="text-2xl">Room ID: {roomId.slice(0, 4)}</h2>
          <button
            onClick={handleCopy}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Copy Invite Link
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Lobby;
