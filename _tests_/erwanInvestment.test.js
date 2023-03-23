
import  handler from "../pages/api/erwan-investment";


// Mock the response object for testing
const createResponse = () => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    return res;
  };
  
  describe("erwanInvestment API endpoint", () => {
    it("returns 405 status code for non-GET requests", async () => {
      const req = { method: "POST" };
      const res = createResponse();
  
      await handler(req, res);
  
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
    });
  
    it("returns a list of Erwan's transactions and profit", async () => {
      const req = { method: "GET" };
      const res = createResponse();
  
      await handler(req, res);
  
      const erwanInvestment = res.json.mock.calls[0][0].erwan;
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(erwanInvestment.transactions.length).toBeGreaterThan(0);
      expect(erwanInvestment.profit).toBeDefined();
    });
  
    it("returns the time taken by the algorithm", async () => {
      const req = { method: "GET" };
      const res = createResponse();
  
      await handler(req, res);
  
      const timeTaken = res.json.mock.calls[0][0].timeTaken;
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(timeTaken).toBeDefined();
      expect(timeTaken).toBeGreaterThanOrEqual(0);
    });
  });