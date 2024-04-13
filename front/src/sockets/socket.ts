import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./types/socketInterfaces";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:4000');