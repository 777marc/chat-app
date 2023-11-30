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

addUser(1, "mike", "123");
addUser(2, "marc", "123");
addUser(3, "marc", "1234");

console.log(users);

console.log(getUser(3));
console.log(getUsersInRoom("123"));
