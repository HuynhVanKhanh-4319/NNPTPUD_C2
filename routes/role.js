var express = require('express');
var router = express.Router();
let roleSchema = require('../models/role');

// Create a new role
router.post('/', async function(req, res, next) {
  let body = req.body;
  let newRole = new roleSchema({
    roleName: body.roleName,
    description: body.description,
    isDeleted: false
  });
  await newRole.save();
  res.send(newRole);
});

// Read all roles
router.get('/', async function(req, res, next) {
  let roles = await roleSchema.find({ isDeleted: false });
  res.send(roles);
});

// Read a single role by ID
router.get('/:id', async function(req, res, next) {
  try {
    let role = await roleSchema.findById(req.params.id);
    res.send(role);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Update a role by ID
router.put('/:id', async function(req, res, next) {
  try {
    let body = req.body;
    let role = await roleSchema.findByIdAndUpdate(req.params.id, body, { new: true });
    res.send(role);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Delete a role by ID (soft delete)
router.delete('/:id', async function(req, res, next) {
  try {
    let role = await roleSchema.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    }, { new: true });
    res.status(200).send({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;