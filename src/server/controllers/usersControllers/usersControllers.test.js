const { userLogin } = require("./usersControllers");

const token = "newToken";

jest.mock("../../../db/model/User", () => ({
  findOne: jest.fn().mockResolvedValue(true),
}));
jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));
jest.mock("jsonwebtoken", () => ({
  sign: () => token,
}));

describe("Given a loginUser function", () => {
  describe("When receives a request object with a correct username and password and a response", () => {
    const req = {
      body: {
        username: "usernameTest",
        password: "passwordTest",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response method status with 200", async () => {
      const expectedStatusCode = 200;

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response json method with a token", async () => {
      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith(token);
    });
  });
});
