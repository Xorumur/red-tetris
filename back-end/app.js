const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const { alreadyInRoom, sendMessageToRoom, sendToAllUser, getWaitingRoom, getRoomByName, createHashRoomId } = require('./src/socket_utils.js');
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
let     room = [[{client: "mlecherb", socket : "test"} ]];

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
    })

    socket.on('Create', (data) => {
        // if (alreadyInRoom(room, data.client))
        //     return;
        room.push([{socket, client: data.client}]);
        const waitingRoom = getWaitingRoom(room);
        room = room.filter((r) => r.length === 1 && r[0].client !== data.client);
        sendToAllUser(user, 'roomUpdate', getWaitingRoom(room));
        // const game = new Game(io, socket);
    })

    socket.on('Join', (data) => {
        let currRoom; 
        room.map((r) => {
            if (r.some((p) => p.client === data.player)) {
                r.push({socket, client: data.client});
                currRoom = r;
            }
        });



        // const currentRoom = getRoomByName(room, data.player);
        // console.log("CurrRoom", currentRoom);
        // if (currentRoom.length === 2) {
        //     room.id = createHashRoomId(currentRoom);
        //     console.log("CurrRoom", currentRoom);
        //     const game = new Game(io, socket);
        // }
        sendToAllUser(user, 'roomUpdate', getWaitingRoom(room));
    })
})
