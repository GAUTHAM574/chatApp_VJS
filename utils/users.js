const users = [];


function userJoin(id, username, room) {
    const user = {
        id,
        username,
        room
    };
    users.push(user);
    return user;

}

function getCurrUser(id) {
    return users.find(user => user.id === id);
}

function getRoomUsers(room) {
    const ul = users.filter(user => user.room === room)
    return ul;
}

function userLeaves(id) {
    const ind = users.findIndex(user => user.id === id)
    if (ind != -1) {
        return users.splice(ind, 1)[0];
    }
}

module.exports = {
    userJoin,
    getCurrUser,
    userLeaves,
    getRoomUsers
}