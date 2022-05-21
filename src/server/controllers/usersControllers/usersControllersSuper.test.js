const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectDB = require("../../../db");
const app = require("../../index");
const User = require("../../../db/model/User");

const mockNewUser = {
  username: "testUser",
  password: "testUser",
  name: "Test User",
};

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST /users/register/ endpoint ", () => {
  describe("When receives a request object with a new user data", () => {
    test("Then it should respond with a 201 status code", async () => {
      await request(app).post("/users/register").send(mockNewUser).expect(201);
    });
  });

  describe("When receives a request object with an existing username in DB", () => {
    test("Then it should respond with a 409 status code", async () => {
      await request(app).post("/users/register").send(mockNewUser);
      await request(app).post("/users/register").send(mockNewUser).expect(409);
    });
  });
});
