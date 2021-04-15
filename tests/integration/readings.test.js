const request = require("supertest");
const { Reading } = "../../models/readings";

let server;

describe("/api/readings", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Reading.remove({});
  });
  describe("GET /", () => {
    it("should return all readings", async () => {
      await Reading.collection.insertMany([
        {
          value: 867,
          userId: "606e0cd1aab05f246cacef95",
          preMed: "postMed",
          dateTime: "2021-02-25T19:14:28.809+00:00",
          notes: "sfdsdfsdf",
        },
        {
          value: 950,
          userId: "606e0cd1aab05f246cacef95",
          preMed: "postMed",
          dateTime: "2021-02-25T19:14:28.809+00:00",
          notes: "sfdsdfsdf",
        },
      ]);
      const res = await request(server).get("/api/readings");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });
});
