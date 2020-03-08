var express = require('express');
var router = express.Router();

let {
    SuccessModel,
    ErrorModel
} = require("../model/resModel");


let { getHotWord,
    getHotStem,
    getBanner,
    getFeatured,
    getFeaturedAnswer } = require("../control/index");


/* GET home page. */
router.get('/getHotWord', async function(req, res, next) {
    
    let data = await getHotWord();

    res.json(new SuccessModel(data));

});

router.get('/getHotStem', async function (req, res, next) {
    let data = await getHotStem();

    res.json(new SuccessModel(data));
})

router.get('/getBanner', async function (req, res, next) {
    let data = await getBanner();

    res.json(new SuccessModel(data));
})

router.get('/getFeatured',async function (req, res, next) {
    let data = await getFeatured();

    console.log(data);

    let arr = [] ;

    // 数据格式处理转换后返回
    for (let item of data) {

        let obj = {};

        for (let i in item) {
            
            if (i === 'data') {
                for (let j in item[i]) {
                    obj[j] = item[i][j]; 
                  }
            } else {
                obj[i] = item[i];
             }
        }

        arr.push(obj);
    }


    res.json(new SuccessModel(arr));
})

router.get('/getFeaturedAnswer', async function (req, res, next) {
    
    let data = await getFeaturedAnswer();

    console.log(data);

    let arr = [] ;

    // 数据格式处理转换后返回
    for (let item of data) {

        let obj = {};

        for (let i in item) {
            
            if (i === 'answer') {
                for (let j in item[i]) {
                    obj[j] = item[i][j]; 
                  }
            } else if (i === "question") {
                
                for (let j in item[i]) {
                    obj[j] = item[i][j]; 
                  }

            } else {
                obj[i] = item[i];
             }
        }

        arr.push(obj);
    }

    res.json(new SuccessModel(arr));
})



module.exports = router;
