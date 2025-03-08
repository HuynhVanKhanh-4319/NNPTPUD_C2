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
router.put('/:id', async function(req, res, next) {
  try {
    let body = req.body;
    let categories= await categorySchema.findByIdAndUpdate(req.params.id,
      body,{new:true});
    res.status(200).send({
      success:true,
      data:categories
    });
  } catch (error) {
    res.status(404).send({
      success:fail,
      message:error.message
    })
  }
});
router.delete('/:id', async function(req, res, next) {
  try {
    let categories = await categorySchema.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    }, { new: true });
    res.status(200).send({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;