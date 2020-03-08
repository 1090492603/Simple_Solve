var express = require('express');
var router = express.Router();

let {
  SuccessModel,
  ErrorModel
} = require("../model/resModel");


let { getUser } = require("../control/user");
/* GET users listing. */
router.get('/getUser',async function (req, res, next) {

  let data = await getUser();

  res.json(new SuccessModel(data));
  
});

module.exports = router;
