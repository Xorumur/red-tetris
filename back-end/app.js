const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const { alreadyInRoom, sendMessageToRoom, sendToAllUser, getWaitingRoom } = require('./src/socket_utils.js');
const Game = require('./src/game.js');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

const user = [];
const room = [[{client: "mlecherb"}]];

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log("Client connecté");


    socket.on('Username', (data) => {
        if (user.includes(data.client)) {
            socket.send('UsernameKO');
            return ;
        }
        user.push({socket, client: data.client});
        socket.send('UsernameOK');
    })

    socket.on('Create', (data) => {
        // if (alreadyInRoom(room, data.client))
        //     return;
        room.push([{socket, client: data.client}]);
        // sendToAllUser('boardUpdate', getWaitingRoom(room));
        const game = new Game(io, socket);
        console.log(room);
    })

    socket.on('Join', (data) => {
        room.map((r) => {
            if (r.some((p) => p.client === data.player))
                r.push({socket, client: data.client});
        })
        sendToAllUser('boardUpdate', getWaitingRoom(room));
        console.log(room);

    })
})
