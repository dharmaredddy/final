import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";  // Import your AuthContext

export const SocketContext = createContext();  // Create Socket Context

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);  // Get current user from AuthContext
  const [socket, setSocket] = useState(null);

  // Initialize the socket connection when component mounts
  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      reconnectionAttempts: 5,   // Auto-reconnect in case of connection failure
      transports: ["websocket"], // Use WebSocket transport to avoid polling
    });

    setSocket(newSocket);

    // Cleanup socket when component unmounts
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  // Emit new user event to server when currentUser changes and socket is connected
  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.id);
    }
  }, [currentUser, socket]);

  // Provide the socket instance to the children components
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
