const express = require('express');
const router = express.Router();

// Load Item model
const Item = require("../models/Item");

/* GET items listing. */
router.get('/', function(req, res, next) {
  
  Item.find({}, function(err, items){
      //complete check
      if(err){
        return next(err);
      }
      return res.status(200).send({items: items});
    });
});

/* POST Create Item */
router.post('/', function(req, res, next) {
  //Validate and extract item input
  let item = {};
  try{
  	item.name = req.body.name;
  	item.description = req.body.description
  }
  catch(error){
  	return next(error);
  }
  Item.create(item, function(err, item) {
	if (err) {
	  return next(err);
	}
	res.status(200).send({item: item});
  });
});

module.exports = router;
