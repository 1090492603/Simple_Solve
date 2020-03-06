var express = require('express');
var router = express.Router();

let {
    SuccessModel,
    ErrorModel
} = require("../model/resModel");


let { getHotWord } = require("../control/index");


/* GET home page. */
router.get('/getHotWord', async function(req, res, next) {
    
    let data = await getHotWord();

    res.json(new SuccessModel(data));

});

module.exports = router;
