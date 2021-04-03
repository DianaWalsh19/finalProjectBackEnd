const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.email = req.body.email;
  res.send(user);
});

router.delete("/:id", (req, res) => {
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

module.exports = router;
