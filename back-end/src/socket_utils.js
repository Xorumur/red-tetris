function alreadyInRoom(room, clientUsername) {
    let alreadyInRoom = false;
    room.map((r) => {
        if (r.some((p) => p.client === clientUsername))
            alreadyInRoom = true;
    });
    return alreadyInRoom;
}

function sendMessageToRoom(room, event, data) {
    room.map((r) => {
        r.socket.send(event, data);
    });
}

function sendToAllUser(user, event, data) {
    user.map((u) => {
        if (u.socket === undefined)
            return ;
        u.socket.emit(event, data);
    })
}

function getWaitingRoom(room) {
    let rooms = [];
    room.forEach(element => {
        if (element.length === 1)
        rooms.push(element[0].client);
    });
    return rooms;
}

module.exports = {
    alreadyInRoom,
    sendMessageToRoom,
    sendToAllUser,
    getWaitingRoom
}