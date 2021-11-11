const isAdmin = require("./isAdmin");

describe("Given a isAdmin middleware", () => {
  describe("When it receives req with admin user", () => {
    test("Then it should invoke next", async () => {});

    const req = { isAdmin: true };
    const res = null;
    const next = jest.fn();

    isAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
  describe("When it receives req with no admin user", () => {
    test("Then it should invoke next with error", async () => {});

    const req = { isAdmin: false };
    const res = null;
    const next = jest.fn();

    const expectedError = {
      message: "No Admin user!",
      code: 403,
    };

    isAdmin(req, res, next);

    expect(next.mock.calls[0][0]).toHaveProperty(
      "message",
      expectedError.message
    );
    expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
  });
});
