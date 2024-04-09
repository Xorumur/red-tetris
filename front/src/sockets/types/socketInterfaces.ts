//https://socket.io/docs/v4/typescript/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  boardUpdate: (board: string[][]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ClientToServerEvents {
  joinGame: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface InterServerEvents {
  ping: () => void;
}

export {}