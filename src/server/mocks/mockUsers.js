const mockUser = {
  _id: { $oid: "6288d5594983b043b55e675c" },
  username: "bernat",
  password: "$2a$10$TPPPTy8XMLu2UEX/i5UgMeHvmonW9Jn4.fMcF2KK65HyovOzQvq4i",
  name: "Bernat Arcusa",
  image:
    "https://i.pinimg.com/originals/7b/91/90/7b919051b721676676b8c9b8fca26425.png",
  enemies: [],
  friends: [],
};

const mockUsers = [
  {
    _id: { $oid: "6288d5594983b043b55e675c" },
    username: "bernat",
    password: "$2a$10$TPPPTy8XMLu2UEX/i5UgMeHvmonW9Jn4.fMcF2KK65HyovOzQvq4i",
    name: "Bernat Arcusa",
    image:
      "https://i.pinimg.com/originals/7b/91/90/7b919051b721676676b8c9b8fca26425.png",
    enemies: [],
    friends: [],
  },
];

module.exports = { mockUser, mockUsers };
