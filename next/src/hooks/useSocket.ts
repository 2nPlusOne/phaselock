import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export type OnEvents = {
  [key: string]: (data: any) => void;
};

// takes a map of onEvents that map strings to functions
const useSocket = (onEvents?: OnEvents) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    if (onEvents) {
      for (const [event, handler] of Object.entries(onEvents)) {
        // check type of event and handler
        if (typeof event !== "string" || typeof handler !== "function") {
          throw new Error("Invalid event or handler");
        }
        newSocket.on(event, handler);
      }
    }

    return () => {
      newSocket.disconnect();
    };
  }, [onEvents]);

  return socket as Socket;
};

export default useSocket;
