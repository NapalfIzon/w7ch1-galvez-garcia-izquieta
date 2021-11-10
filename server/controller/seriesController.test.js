const Serie = require("../../database/models/serie");
const { getSeries } = require("./seriesController");

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
});
