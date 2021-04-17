const request = require("supertest");
const mongoose = require("mongoose");

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
      expect(res.status).toBe(200);
    });
  });
});
