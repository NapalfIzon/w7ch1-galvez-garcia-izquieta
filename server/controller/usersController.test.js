const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const { addUser, loginUser } = require("./usersController");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a addUser function", () => {
  describe("When it receives new user", () => {
    test("Then it should invoke res.json() function with a new user", async () => {
      const req = {
        body: {
          userName: "Usuario_Admin",
          password: "admin",
          isAdmin: true,
        },
      };

      const user = {
        userName: "Usuario_Admin",
        password:
          "$2b$10$.xShGXjq4bjeueI7/9/DquWq5AIJ0d.mBxYs/lmMnf9FFollI4pMC",
        isAdmin: true,
        id: "618c181075e76774517f1aa0",
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      bcrypt.hash = jest.fn().mockResolvedValue(user.password);
      User.create = jest.fn().mockResolvedValue(user);

      await addUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
  describe("When it receives new user with wrong user", () => {
    test("Then it should invoke next() function with a error", async () => {
      const req = {
        body: {
          userName: "Usuario_Admin",
          password: "admin",
          isAdmin: true,
        },
      };

      const user = {
        userName: "Usuario_Admin",
        password:
          "$2b$10$.xShGXjq4bjeueI7/9/DquWq5AIJ0d.mBxYs/lmMnf9FFollI4pMC",
        isAdmin: true,
        id: "618c181075e76774517f1aa0",
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      const expectedError = {
        message: "Datos erroneos!",
        code: 400,
      };

      bcrypt.hash = jest.fn().mockResolvedValue(user.password);
      User.create = jest.fn().mockRejectedValue(expectedError);

      await addUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});

describe("Given a loginUser function", () => {
  describe("When it receives existing user login", () => {
    test("Then it should invoke res.json() function with a new token", async () => {
      const req = {
        body: {
          userName: "Usuario_Admin",
          password: "admin",
        },
      };

      const user = {
        userName: "Usuario_Admin",
        password:
          "$2b$10$.xShGXjq4bjeueI7/9/DquWq5AIJ0d.mBxYs/lmMnf9FFollI4pMC",
        isAdmin: true,
        series: [
          "618c3b91ee2427e9c8460e76",
          "618c3b95ee2427e9c8460e7a",
          "618c3b97ee2427e9c8460e7e",
          "618ccbb93af649fe80bebd3e",
        ],
        __v: 4,
        id: "618c181075e76774517f1aa0",
      };

      const expectedToken = {
        token: "Token_Bonito",
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("Token_Bonito");

      await loginUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedToken);
    });
  });
  describe("When it receives non existing user login", () => {
    test("Then it should invoke next() function with a error", async () => {
      const req = {
        body: {
          userName: "Usuario_Admin",
          password: "admin",
        },
      };

      const res = {
        json: jest.fn(),
      };

      const expectedError = {
        message: "Wrong credentials",
        code: 401,
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(null);

      await loginUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When it receives non correct user login password", () => {
    test("Then it should invoke next() function with a error", async () => {
      const req = {
        body: {
          userName: "Usuario_Admin",
          password: "admin",
        },
      };

      const res = {
        json: jest.fn(),
      };

      const user = {
        userName: "Usuario_Admin",
        password:
          "$2b$10$.xShGXjq4bjeueI7/9/DquWq5AIJ0d.mBxYs/lmMnf9FFollI4pMC",
        isAdmin: true,
        series: [
          "618c3b91ee2427e9c8460e76",
          "618c3b95ee2427e9c8460e7a",
          "618c3b97ee2427e9c8460e7e",
          "618ccbb93af649fe80bebd3e",
        ],
        __v: 4,
        id: "618c181075e76774517f1aa0",
      };

      const expectedError = {
        message: "Wrong credentials",
        code: 401,
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});
