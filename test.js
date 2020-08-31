const backend = require(".");

describe("backend", () => {
  it("should return correct message", () => {
    const result = backend();
    expect(result).toBe("Hi from the backend module");
  });
});
