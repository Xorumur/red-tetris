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
        u.socket.emit(event, data);
    })
}

function getWaitingRoom(room) {
    return room.filter((r) => r.length === 1);
}

module.exports = {
    alreadyInRoom,
    sendMessageToRoom,
    sendToAllUser,
    getWaitingRoom
}