"use client";

import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { Events } from "@/lib/events";
import { ChatMessage } from "@/lib/types";

interface ChatProps {
  socket: Socket;
  roomId: string;
  playerName: string;
  messages: ChatMessage[];
}

const Chat: React.FC<ChatProps> = ({ socket, roomId, playerName, messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit(Events.CHAT_MESSAGE, roomId, playerName, input);
    setInput("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="mb-2 h-40 overflow-y-auto border p-2">
        {messages.map((m, idx) => (
          <div key={idx}>
            <strong>{m.name}: </strong>
            <span>{m.message}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="grow rounded border px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button className="rounded bg-blue-500 px-4 py-1 text-white" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
