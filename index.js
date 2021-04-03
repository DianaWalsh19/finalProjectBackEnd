const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const authenticator = require("./authenticator");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(authenticator);
app.use(helmet());
app.use(morgan("tiny"));

const users = [
  {
    id: 1,
    email: "patient1@patients.com",
    password: "passwordUser1",
  },

  {
    id: 2,
    email: "patient2@patients.com",
    password: "passwordUser2",
  },

  {
    id: 3,
    email: "patient3@patients.com",
    password: "passwordUser3",
  },
];

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

app.post("/api/users", (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(user);
  res.send(user);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.email = req.body.email;
  res.send(user);
});

app.delete("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(user);
});

function validateUser(user) {
  const schema = {
    email: Joi.string(),
    password: Joi.string().min(8),
  };

  return Joi.validate(user, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
