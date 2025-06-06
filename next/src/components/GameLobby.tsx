"use client";

import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Socket } from "socket.io-client";
import { Events } from "@/lib/events";
import { ChatMessage, Player } from "@/lib/types";
import PlayerList from "./PlayerList";
import Chat from "./Chat";

interface LobbyProps {
  roomId: string;
  socket: Socket;
  playerName: string;
}

const Lobby: React.FC<LobbyProps> = ({ roomId, socket, playerName }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const handlePlayers = (pls: Player[]) => setPlayers(pls);
    const handleMessage = (msg: ChatMessage) =>
      setMessages((m) => [...m, msg]);

    socket.on(Events.PLAYERS_UPDATE, handlePlayers);
    socket.on(Events.CHAT_MESSAGE, handleMessage);

    return () => {
      socket.off(Events.PLAYERS_UPDATE, handlePlayers);
      socket.off(Events.CHAT_MESSAGE, handleMessage);
    };
  }, [socket]);
  const handleCopy = () => {
    copy("localhost:3000/" + roomId.slice(0, 4));
    toast("Copied to clipboard!");
  };

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-2xl">Room ID: {roomId.slice(0, 4)}</h1>
          <button
            onClick={handleCopy}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Copy Invite Link
          </button>
        </div>
        <PlayerList players={players} />
        <Chat socket={socket} roomId={roomId} playerName={playerName} messages={messages} />
      </div>
      <ToastContainer />
    </>
  );
};

export default Lobby;
