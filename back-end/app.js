const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const { alreadyInRoom, sendMessageToRoom, sendToAllUser, getWaitingRoom, getRoomByName, createHashRoomId, createSimpleHash, getRoom, isUsernameValid, deleteSocket } = require('./src/socket_utils.js');
const Game = require('./src/game.js');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 4000;

const   user = [];
let     room = [
    {
        id: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822", 
        players: [
            {
                client: "mlecherb", 
                socket: "test"
            }
        ]
    }
];

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log("Client connecté");


    socket.on('Username', (data) => {
        if (user.includes(data.client)) {
            socket.emit('UsernameKO');
            return ;
        }
        user.push({socket, client: data.client});
        socket.emit('UsernameOK', {username: data.client}); //send back the allowed name so frontend knows what name to display
        sendToAllUser(user, 'roomUpdate', rooms);
    })

    socket.on('Create', (data) => {
        if (!isUsernameValid(user, data.client)) {
            socket.emit('CreateKO', { error: "Invalid username" });
            return;
        }
        else if (alreadyInRoom(room, data.client)) {
            socket.emit('CreateKO', { error: "User already in room" });
            return;
        }


        room.push({id : createSimpleHash(data.client), players : [{socket, client: data.client}]});
        const rooms = getRoomByName(room, data.client);
        socket.emit('CreateOK', rooms); 
        sendToAllUser(user, 'roomUpdate', rooms);
    })

    socket.on('Start', (data) => {
        const currRoom = getRoomByName(room, data.client);


        sendMessageToRoom(room, 'GameStarted', {});
    });

    socket.on('Join', (data) => {
        if (!isUsernameValid(user, data.client)) {
            socket.emit('JoinKO', { error: "Invalid username" });
            return;
        }
        else if (alreadyInRoom(room, data.client)) {
            socket.emit('JoinKO', { error: "User already in room" });
            return;
        }

        const roomWithClient = room.find(item =>
            item.players.some(player =>
                player.client === data.player
            )
        );
        
        if (roomWithClient) {
            roomWithClient.players.push({
                client: data.client,
                socket: socket
            });
        
            socket.emit('JoinOK', getRoomByName(room, data.client));
            sendToAllUser(user, 'roomUpdate', getWaitingRoom(room));
        } else {
            socket.emit('JoinKO', { error: "Room not found" });
        }
    })
})
