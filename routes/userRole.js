var express = require('express');
var router = express.Router();
let userRoleSchema = require('../models/userRole');

// Create a new userRole
router.post('/', async function(req, res, next) {
  let body = req.body;
  let newUserRole = new userRoleSchema({
    userId: body.userId,
    roleId: body.roleId,
    isDeleted: false
  });
  await newUserRole.save();
  res.send(newUserRole);
});

// Read all userRoles
router.get('/', async function(req, res, next) {
  let userRoles = await userRoleSchema.find({ isDeleted: false }).populate('userId').populate('roleId');
  res.send(userRoles);
});

// Read a single userRole by ID
router.get('/:id', async function(req, res, next) {
  try {
    let userRole = await userRoleSchema.findById(req.params.id).populate('userId').populate('roleId');
    res.send(userRole);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Update a userRole by ID
router.put('/:id', async function(req, res, next) {
  try {
    let body = req.body;
    let userRole = await userRoleSchema.findByIdAndUpdate(req.params.id, body, { new: true });
    res.send(userRole);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Delete a userRole by ID (soft delete)
router.delete('/:id', async function(req, res, next) {
  try {
    let userRole = await userRoleSchema.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.send(userRole);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = router;