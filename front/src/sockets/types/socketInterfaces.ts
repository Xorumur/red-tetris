//https://socket.io/docs/v4/typescript/
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  boardUpdate: (board: string[][]) => void;
}

interface ClientToServerEvents {
  joinGame: () => void;
}

interface InterServerEvents {
  ping: () => void;
}
