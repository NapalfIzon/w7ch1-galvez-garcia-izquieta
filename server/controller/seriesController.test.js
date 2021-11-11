const Serie = require("../../database/models/serie");
const { getSeries, deletedSerie } = require("./seriesController");

jest.mock("../../database/models/serie");

describe("Given a Serie function", () => {
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
});
