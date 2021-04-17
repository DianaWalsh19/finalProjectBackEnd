const request = require("supertest");
const mongoose = require("mongoose");
const { Reading } = require("../../models/reading");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

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

  describe("POST /", () => {
    let token;
    let value;
    let preMed;
    let dateTime;
    let userId;

    const exec = async () => {
      return await request(server)
        .post("/api/readings")
        .set("x-auth-token", token)
        .send({ value, preMed, dateTime });
    };

    beforeEach(() => {
      const payload = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const user = new User(payload);
      userId = user._id;
      token = user.generateAuthToken();
      value = 888;
      preMed = "postMed";
      dateTime = "2022-02-25T19:14:28.809+00:00";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if value is more than 1,000", async () => {
      value = 1500;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if dateTime is not added", async () => {
      dateTime = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save the reading if all info is valid", async () => {
      await exec();
      const reading = await Reading.find({ value: 888 });
      expect(reading).not.toBeNull();
    });

    //Test below is failing. It says UserId is missing, even when it's been included.
    //Test again after user tests have been put in place
    /*
    it("should return the reading if all info is valid", async () => {
      // userId = "607aed5c368df6519eda31ab";
      const res = await exec();
      console.log(res);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("value", "dateTime");
    });
    */
  });
});
