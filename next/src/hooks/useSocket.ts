import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export type OnEvents = {
  [key: string]: (data: any) => void;
};

// takes a map of onEvents that map strings to functions
const useSocket = (onEvents?: OnEvents) => {
  const [socket] = useState<Socket>(() => io());

  useEffect(() => {
    if (!onEvents) return;
    for (const [event, handler] of Object.entries(onEvents)) {
      if (typeof event !== "string" || typeof handler !== "function") {
        throw new Error("Invalid event or handler");
      }
      socket.on(event, handler);
    }
    return () => {
      for (const [event, handler] of Object.entries(onEvents)) {
        socket.off(event, handler);
      }
    };
  }, [socket, onEvents]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
