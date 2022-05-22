const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectDB = require("../../../db");
const app = require("../../index");
const User = require("../../../db/model/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST /users/register/ endpoint ", () => {
  describe("When receives a request object with a new user data", () => {
    test("Then it should respond with a 201 status code", async () => {
      const mockNewUser = {
        username: "testUser",
        password: "testUser",
        name: "Test User",
      };
      await request(app).post("/users/register").send(mockNewUser).expect(201);
    });
  });

  describe("When receives a request object without a required property", () => {
    test("Then it should respond with a 400 status code", async () => {
      const wrongUser = {
        username: "newTestUser",
        password: "newtestUser",
      };
      await request(app).post("/users/register").send(wrongUser).expect(400);
    });
  });

  describe("When receives a request object with an existing username in DB", () => {
    test("Then it should respond with a 409 status code", async () => {
      const existingNewUser = {
        username: "testUser",
        password: "testUser",
        name: "Test User",
      };
      await User.create(existingNewUser);

      await request(app)
        .post("/users/register")
        .send(existingNewUser)
        .expect(409);
    });
  });
});
