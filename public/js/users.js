const users = [];

const addUser = (id, username, room) => {
  username = username.trim().toLowerCase();
  room = room.toLowerCase();

  if (!username || !room) {
    return {
      error: "Username and Room are required",
    };
  }

  const existingUser = users.find((user) => {
    return user.room === room && user.usernane === username;
  });

  if (existingUser) {
    return {
      error: "Username is in use",
    };
  }

  const user = { id, username, room };
  users.push(user);

  return { users };
};

const getUser = (id) => {
  user = users.find((user) => user.id === id);
  return { user };
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
