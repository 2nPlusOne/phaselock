"use client";

import { navigate } from "@/actions";
import useSocket, { OnEvents } from "@/hooks/useSocket";
import { Events } from "@/lib/events";
import Link from "next/link";
import React, { useState } from "react";

const onEvents: OnEvents = {
  [Events.ROOM_CREATED]: (roomId: string) => {
    console.log(`Room ${roomId} created`);
    navigate(roomId.slice(0, 4));
  },
  [Events.DISCONNECT]: () => {
    console.log("User disconnected");
  },
};

const MainMenu: React.FC = () => {
  const socket = useSocket(onEvents);
  const [roomName, setRoomName] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleCreateRoom = () => {
    setButtonsDisabled(true);
    socket.emit(Events.CREATE_ROOM);
  };

  const handleJoinRoom = () => {
    socket.emit(Events.JOIN_ROOM, roomName);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-bold">Phaselock</h1>
        <p className="mb-4 max-w-md text-center text-lg">
          A web adaptation of{" "}
          <Link
            className=" text-blue-400 hover:underline active:underline"
            href="https://www.wavelength.zone/"
          >
            Wavelength
          </Link>{" "}
          by Wolfgang Warsch, Alex Hague, and Justin Vickers.
        </p>
      </div>
      <div className="flex w-1/2 flex-col items-center gap-4">
        <button
          onClick={handleCreateRoom}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white disabled:bg-blue-300"
          disabled={buttonsDisabled}
        >
          Create
        </button>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="AB12..."
            className="rounded border border-gray-300 px-4 py-2 text-center"
          />
          <button
            onClick={handleJoinRoom}
            className="rounded bg-green-500 px-4 py-2 text-white disabled:bg-green-300"
            disabled={buttonsDisabled}
          >
            Join
          </button>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
