var express = require('express');
var router = express.Router();
let userSchema = require('../models/user');

// Create a new user
router.post('/', async function(req, res, next) {
  let body = req.body;
  let newUser = new userSchema({
    username: body.username,
    password: body.password,
    email: body.email,
    isDeleted: false
  });
  await newUser.save();
  res.send(newUser);
});

// Read all users
router.get('/', async function(req, res, next) {
  let users = await userSchema.find({ isDeleted: false });
  res.send(users);
});

// Read a single user by ID
router.get('/:id', async function(req, res, next) {
  try {
    let user = await userSchema.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Update a user by ID
router.put('/:id', async function(req, res, next) {
  try {
    let body = req.body;
    let user = await userSchema.findByIdAndUpdate(req.params.id, body, { new: true });
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Delete a user by ID (soft delete)
router.delete('/:id', async function(req, res, next) {
  try {
    let user = await userSchema.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = router;