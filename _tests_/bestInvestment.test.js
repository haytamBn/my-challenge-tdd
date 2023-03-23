import handler from "../pages/api/best-investment";

// Mock the response object for testing
const createResponse = () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  return res;
};

describe("bestInvestment API endpoint", () => {
  it("returns 405 status code for non-GET requests", async () => {
    const req = { method: "POST" };
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
  });

  it("returns best buy and sell dates and profit for Aymen and Anouar", async () => {
    const req = { method: "GET" };
    const res = createResponse();

    await handler(req, res);

    const expectedAymen = {
      buyDate: 1653364800000,
      sellDate: 1660622400000,
      profit: 45.30999999999999,
    };

    const expectedAnouar = {
      buyDate: 1643000400000,
      sellDate: 1643778000000,
      profit: 27.458,
    };

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      aymen: expectedAymen,
      anouar: expectedAnouar,
    });
  });
});
