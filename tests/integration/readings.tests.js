const { expectCt } = require("helmet");
const request = require("supertest");

let server;

describe("/api/readings", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return all readings", async () => {
      const res = await request(server).get("/api/readings");
      expectCt(res.status).toBe(200);
    });
  });
});
