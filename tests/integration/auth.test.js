const { User } = require("../../models/user");
const { Reading } = require("../../models/reading");
const request = require("supertest");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/api/readings")
      .set("x-auth-token", token)
      .send({
        value: 888,
        preMed: "postMed",
        dateTime: "2022-02-25T19:14:28.809+00:00",
      });
  };

  beforeEach(() => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
    };
    const user = new User(payload);
    userId = user._id;
    token = user.generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  /*
  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });*/
});
