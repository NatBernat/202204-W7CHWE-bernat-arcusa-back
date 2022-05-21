const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  friends: [
    {
      type: SchemaTypes.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  enemies: [
    {
      type: SchemaTypes.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
