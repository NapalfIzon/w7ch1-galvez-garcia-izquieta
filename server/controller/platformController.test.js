const Platform = require("../../database/models/platform");
const {
  getPlatforms,
  addPlatform,
  updatePlatform,
  removePlatform,
} = require("./platformController");

jest.mock("../../database/models/platform");

describe("Given a getPlatforms function,", () => {
  describe("When it receives a request and a response,", () => {
    test("Then it should invoke a json function with a list of platforms in the DB,", async () => {
      const platforms = [
        {
          name: "Netflix",
        },
        {
          name: "Amazon prime",
        },
        {
          name: "HBO max",
        },
      ];
      Platform.find = jest.fn().mockResolvedValue(platforms);
      const res = {
        json: jest.fn(),
      };

      await getPlatforms(null, res);

      expect(Platform.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(platforms);
    });
  });
});

describe("Given a addPlatform function,", () => {
  describe("When it receives a request with a platform, a response and a next function,", () => {
    test("Then it should invokes a json function with the new platform.", async () => {
      const newPlatform = {
        name: "Disney plus",
      };
      const req = {
        body: newPlatform,
      };
      const res = {
        json: jest.fn(),
      };
      const next = () => {};
      Platform.create = jest.fn().mockResolvedValue(newPlatform);

      await addPlatform(req, res, next);

      expect(Platform.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newPlatform);
    });
  });

  describe("When it receives a request with a null request, a response and a next function,", () => {
    test("Then it should invoke the next function with an error.", async () => {
      const error = {};
      const next = jest.fn();
      const req = {
        body: {},
      };
      const res = {};
      Platform.create = jest.fn().mockRejectedValue(error);

      await addPlatform(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a updatePlatform", () => {
  describe("When it receives a request with a existent id and a update platform, a response and a next function,", () => {
    test("Then it should invoke a res.json with the updated platform.", async () => {
      const updatedPlatform = {
        id: 1,
        name: "Disney plus",
      };
      const req = {
        body: updatedPlatform,
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedPlatform);

      await updatePlatform(req, res, next);

      expect(Platform.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenLastCalledWith(updatedPlatform);
    });
  });

  describe("When it receives a request with a non-existent id and a update platform, a response and a next function,", () => {
    test("Then it should invoke a next function with a 404 code.", async () => {
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();
      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(false);

      await updatePlatform(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code");
      expect(next.mock.calls[0][0].code).toBe(404);
    });
  });

  describe("When it receives a request with a null request, a response and a next function,", () => {
    test("Then it should invoke the next function with an error and a 404 error code.", async () => {
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();
      const error = {};
      const errorProperty = "code";
      const errorCode = 401;
      Platform.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updatePlatform(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(errorProperty);
      expect(next.mock.calls[0][0].code).toBe(errorCode);
    });
  });
});

describe("Given a removePlatform,", () => {
  describe("When it receives a request with a existent id, a response and a next function,", () => {
    test("Then it should invoke a res.json with the deleted platform.", async () => {
      const id = 1;
      const deletedPlatform = {
        id,
        name: "Disney plus",
      };
      const req = {
        params: id,
      };
      const res = {
        json: jest.fn(),
      };
      const next = () => {};
      Platform.findByIdAndDelete = jest.fn().mockResolvedValue(deletedPlatform);

      await removePlatform(req, res, next);

      expect(res.json).toHaveBeenCalledWith(deletedPlatform);
    });
  });
});
