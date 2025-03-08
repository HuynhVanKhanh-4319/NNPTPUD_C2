var express = require('express');
var router = express.Router();
let categorySchema = require('../models/category')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let categories = await categorySchema.find({});
  res.send(categories);
});
router.post('/', async function(req, res, next) {
  let body = req.body;
  console.log(body);
  let newCategory = new categorySchema({
    categoryName: body.categoryName,
    description: body.description,
    
  })
  await newCategory.save()
  res.send(newCategory);
});


module.exports = router;