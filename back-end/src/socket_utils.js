const crypto = require('crypto');

function alreadyInRoom(room, clientUsername) {
    const result = room.filter(item =>
        item.players.some(player =>
            player.client === clientUsername
        )
    );

    if (result.length > 0)
        return true;
    else 
        return false;
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
    let rooms = {id: "", players: []};
    room.forEach(element => {
        const players = [];
        if (element.length === 1)
        rooms.players.push(element[0].client);
    });
    rooms.id = room.id;
    return rooms;
}

function getRoom(room) {
    let rooms = [];
    room.forEach(element => {
        // console.log("Element", element);
        const players = [];
        element.players.forEach(p => {
            players.push(p.client);
        });
        rooms.push({id: element.id, players: players});
    });
    return rooms;
}

function createHashRoomId(room) {
    let hash = crypto.createHash('sha256');
    const stringCombined = room.map((r) => r.client).join('');
    hash.update(stringCombined);
    return hash.digest('hex');

}

function createSimpleHash(username) {
    let hash = crypto.createHash('sha256');
    hash.update(username);
    return hash.digest('hex');
}

function getRoomByName(room, username) {
    
    const result = room.filter(item =>
        item.players.some(player =>
            player.client === username
        )
    );

    const resultWithoutSocket = result.map(item => {
        // Créer une copie de l'objet courant
        const { socket, ...itemWithoutSocket } = item;
    
        // Retirer l'élément 'socket' de chaque objet joueur dans le tableau 'players'
        const playersWithoutSocket = itemWithoutSocket.players.map(player => {
            const { socket, ...playerWithoutSocket } = player;
            return playerWithoutSocket;
        });
    
        // Retourner l'objet sans la propriété 'socket'
        return { ...itemWithoutSocket, players: playersWithoutSocket };
    });
    
    return resultWithoutSocket[0];
}

function isUsernameValid(user, username) {
    if (username === undefined || username === "")
        return false;
    let returnState = false;
    user.forEach(element => {
        if (element.client === username)
            returnState = true;
    });

    return returnState;
}

module.exports = {
    alreadyInRoom,
    sendMessageToRoom,
    sendToAllUser,
    getWaitingRoom,
    getRoomByName,
    createHashRoomId,
    getRoom,
    createSimpleHash,
    isUsernameValid
}