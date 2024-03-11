"use client";

import { navigate } from "@/actions";
import useSocket, { OnEvents } from "@/hooks/useSocket";
import { Events } from "@/lib/events";
import { generateRoomId } from "@/lib/gameRoom";
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
  const [playerName, setPlayerName] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleCreateRoom = () => {
    setButtonsDisabled(true);
    const roomId = generateRoomId();
    socket.emit(Events.CREATE_ROOM, roomId);
  };

  const handleJoinRoom = () => {
    socket.emit("join-room", roomName);
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-12">
      <div className="rounded-3xl bg-slate-100 px-4 py-24 md:px-12 lg:px-48">
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
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Name"
              className="max-w-24 rounded border border-gray-300 px-4 py-2 text-center"
            />
            <button
              onClick={handleCreateRoom}
              className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-blue-300"
              disabled={buttonsDisabled}
            >
              Create
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="AB12..."
              className="max-w-24 rounded border border-gray-300 px-4 py-2 text-center"
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
      </div>
    </div>
  );
};

export default MainMenu;
