const { User } = require("./models/user");
const { Reading } = require("./models/reading");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    email: "patient1@patients.com",
    password: "passwordUser1",
    readings: [
      { value: 400, preMed: "preMed", dateTime: "2020-01-23T19:04:28.8092" },
      {
        value: 380,
        preMed: "postMed",
        dateTime: "2020-01-24T09:04:28.8092",
        notes: "sfdsdfsdf",
      },
    ],
  },
  {
    email: "patient2@patients.com",
    password: "passwordUser2",
    readings: [
      {
        value: 410,
        preMed: "preMed",
        dateTime: "2020-01-24T19:04:28.8092",
        notes: "sfdsdfsdf",
      },

      {
        value: 800,
        preMed: "postMed",
        dateTime: "2020-01-25T19:14:28.8092",
        notes: "sfdsdfsdf",
      },
    ],
  },
];
