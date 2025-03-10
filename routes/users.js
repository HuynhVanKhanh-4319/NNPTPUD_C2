var express = require('express');
var router = express.Router();
let userSchema = require('../models/user');
let { QueryUser } = require("../Utils/BuildQuery");


router.post('/', async function(req, res, next) {
  let body = req.body;
  let newUser = new userSchema({
    username: body.username,
    password: body.password,
    email: body.email,
    fullName: body.fullName,
    avatarUrl: body.avatarUrl,
    status: body.status,
    role: body.role,
    loginCount: body.loginCount,
    isDeleted: false
  });
  await newUser.save();
  res.send(newUser);
});

router.get("/", async function (req, res, next) {
  let queries = req.query;
  let queryConditions = QueryUser(queries);
  try {
    let users = await userSchema.find(queryConditions).populate("role");
    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});


router.get('/:id', async function(req, res, next) {
  try {
    let user = await userSchema.findById(req.params.id).populate('role');
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
router.get('/username/:username', async function(req, res, next) {
  try {
    let user = await userSchema.findOne({ username: req.params.username, isDeleted: false }).populate('role');
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let body = req.body;
    let user = await userSchema.findByIdAndUpdate(req.params.id, body, { new: true });
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
router.delete('/:id', async function(req, res, next) {
  try {
    let user = await userSchema.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    }, { new: true });
    res.status(200).send({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});
router.post('/updateStatus', async function(req, res, next) {
  let body = req.body;
  try {
    let user = await userSchema.findOne({ email: body.email, username: body.username, isDeleted: false });
    if (user) {
      user.status = true;
      await user.save();
      res.status(200).send({
        success: true,
        data: user
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});
module.exports = router;