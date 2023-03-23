import  handler from "../pages/api/average-prices";
import { getMonthlyAverages } from "../helpers/average-prices";
import googleStockPrice from "../public/data/google-stock-price.json";
import amazoneStockPrice from "../public/data/amazone-stock-price.json";

// Mock the response object for testing
const createResponse = () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  return res;
};

describe("averagePrices API endpoint", () => {
  it("returns 405 status code for non GET requests", async () => {
    const req = { method: "POST" };
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
  });

  it("returns monthly average prices", async () => {
    const req = { method: "GET" };
    const res = createResponse();

    await handler(req, res);

    const expectedGoogleStockPrice = [...getMonthlyAverages(googleStockPrice)];

    const expectedAmazoneStockPrice = [
      ...getMonthlyAverages(amazoneStockPrice),
    ];

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      googleStockPrices: expectedGoogleStockPrice,
      amazonStockPrices: expectedAmazoneStockPrice,
    });
  });
});
