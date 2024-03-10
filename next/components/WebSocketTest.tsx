"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const socket = io();

const WebSocketTest = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server via WebSocket");
    });

    socket.on("update-input", (msg: string) => {
      console.log("Received input from server:", msg);
      setInput(msg);
    });

    // Clean up on component unmount
    return () => {
      socket.off("connect");
      socket.off("update-input");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    socket.emit("input-change", value);
  };

  return (
    <input value={input} onChange={handleChange} placeholder="Type something" />
  );
};

export default WebSocketTest;
