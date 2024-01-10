const users = [];

const addUser = ({id, name, room}) => {
    let name2 = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const userHandling = users.find( (user)=> user.room === room && user.name.trim().toLowerCase() === name2 );

    if(userHandling) {
        return {error:'Username is already taken'};
    }

    const user = {id, name, room}
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex( (user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user)=> user.id === id);

const getRoomUsers = (room) => users.filter((user) => user.room === room)


module.exports = {
    getRoomUsers,
    getUser,
    addUser,
    removeUser
}