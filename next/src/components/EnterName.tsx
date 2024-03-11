"use client";

import { navigate } from "@/actions";
import useSocket, { OnEvents } from "@/hooks/useSocket";
import { Events } from "@/lib/events";
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

type Props = { roomId?: string };
export default function EnterName({ roomId }: Props): React.ReactNode {
  const socket = useSocket(onEvents);
  const [name, setName] = useState("");
  const [buttonDisabled, setButtonsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateRoom = () => {
    setButtonsDisabled(true);
    socket.emit(Events.CREATE_ROOM, name);
  };

  const handleJoinRoom = () => {
    socket.emit("join-room", name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setButtonsDisabled(newName.length < 3);
    setErrorMessage(""); // Clear the error message

    if (newName.length < 3) {
      setErrorMessage("Name must be at least 3 characters long");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-bold">Please enter your name</h1>
      </div>
      <div className="flex w-1/2 flex-col items-center gap-4">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="AB12..."
            className="rounded border border-gray-300 px-4 py-2 text-center"
          />
          <button
            onClick={roomId ? handleJoinRoom : handleCreateRoom}
            className="rounded bg-green-500 px-4 py-2 text-white disabled:bg-green-300"
            disabled={buttonDisabled}
          >
            Continue
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
      </div>
    </>
  );
}
