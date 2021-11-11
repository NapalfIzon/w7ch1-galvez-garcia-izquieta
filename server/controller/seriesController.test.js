const Serie = require("../../database/models/serie");
const User = require("../../database/models/user");
const {
  getSeries,
  deletedSerie,
  addSerie,
  updateSerie,
  markViewedSerie,
} = require("./seriesController");

jest.mock("../../database/models/serie");

describe("Given a Serie Controller", () => {
  describe("When it receives an object res", () => {
    test("Then it should summon the method json", async () => {
      const series = [
        {
          id: 1,
          name: "serie",
          season: 2,
          view: true,
          platform: ["HBO", "Netflix"],
        },
        {
          id: 2,
          name: "serie2",
          season: 2,
          view: false,
          platform: ["HBO", "Netflix"],
        },
      ];
      Serie.find = jest.fn().mockResolvedValue(series);
      const res = {
        json: jest.fn(),
      };
      await getSeries(null, res);

      expect(Serie.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(series);
    });
  });

  describe("When it receives a getSeries function", () => {
    test("Then it should summon the Serie.find", async () => {
      Serie.find = jest.fn().mockResolvedValue({});

      const res = {
        json: () => {},
      };
      const next = () => {};

      await getSeries(null, res, next);

      expect(Serie.find).toHaveBeenCalled();
    });
  });

  describe("When a Id arrives and there isn't in the database", () => {
    test("Then it should return a error with a 404 code", async () => {
      Serie.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const idSerie = 21;
      const req = {
        params: {
          idSerie,
        },
      };
      const next = jest.fn();
      const error = {
        code: 404,
        message: "Serie no encontrada",
      };

      await deletedSerie(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives an Id with wrong format", () => {
    test("Then it should return an error with a 400 code", async () => {
      const idSerie = "SDFVGBRFDVX";
      const error = {
        code: 400,
        message: "Datos erroneos!",
      };
      Serie.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idSerie,
        },
      };
      const next = jest.fn();

      await deletedSerie(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a correct id and the function deletedSerie", () => {
    test("Then it should delete the serie of the list", async () => {
      const idSerie = 12;
      Serie.findByIdAndDelete = jest.fn().mockResolvedValue({});
      const req = {
        params: {
          idSerie,
        },
      };
      const res = {
        json: () => {},
      };

      await deletedSerie(req, res);

      expect(Serie.findByIdAndDelete).toHaveBeenCalledWith(idSerie);
    });
  });

  describe("When it receives an Id and the function addSerie", () => {
    test("Then it should create a new serie, and added to the series list", async () => {
      const newSerie = {
        name: "serie",
        season: 2,
        view: true,
        platform: ["618c2ee6666bcb02723c198c"],
      };
      const req = {
        body: newSerie,
      };
      const res = {
        json: jest.fn(),
      };
      const userId = {
        _id: req.userId,
        series: [],
        save: jest.fn(),
      };
      const next = jest.fn();
      Serie.create = jest.fn().mockResolvedValue(newSerie);
      User.findOne = jest.fn().mockResolvedValue(userId);

      await addSerie(req, res, next);

      expect(Serie.create).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newSerie);
    });
  });

  describe("When arrives a wrong id and updateSerie function", () => {
    test("Then it should return an error and a status 404", async () => {
      Serie.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const idSerie = 12;
      const req = {
        body: {
          idSerie,
        },
      };
      const next = jest.fn();
      const error = {
        code: 404,
        message: "Serie no encontrada",
      };

      await updateSerie(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When arrives a wrong format id and updateSerie function", () => {
    test("Then it should return an error and a status 400", async () => {
      const idSerie = "rfegbrbdfcx";
      const req = {
        body: {
          idSerie,
        },
      };
      const next = jest.fn();
      const error = {
        code: 400,
        message: "Formato erroneo",
      };
      Serie.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateSerie(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When arrives an id and updateSerie function", () => {
    test("Then it should return the serie updated", async () => {
      const idSerie = 10;
      const req = {
        body: {
          idSerie,
        },
      };
      const res = {
        json: jest.fn(),
      };

      Serie.findByIdAndUpdate = jest.fn().mockResolvedValue(idSerie);

      await updateSerie(req, res);

      expect(res.json).toHaveBeenCalledWith(idSerie);
    });
  });

  describe("When it receives a wrong id and markviewedSerie function", () => {
    test("Then it should receives a errorwith a 404 code", async () => {
      Serie.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const idSerie = 12;
      const req = {
        params: {
          idSerie,
        },
      };
      const next = jest.fn();
      const error = {
        code: 404,
        message: "Serie no encontrada",
      };

      await markViewedSerie(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
});
