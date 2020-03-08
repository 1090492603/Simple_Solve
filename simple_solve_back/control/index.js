

const {   User, question, answer, answerImage, comment, banner, technology, technologyimg,
    hotword,hotwordimg,hotstem,stemimg } = require("../db/model/index");  

 


async function getHotWord() {

    let data = await hotword.findAndCountAll({
        attributes:["id","name"],
        order: [ ["id","desc"]],
        limit: 6,
        offset: 0
        })
   let list = data.rows.map(hotword => {
        let val = hotword.dataValues
        return val;
   })
    
    return list
}

async function getHotStem() {
    let data = await hotstem.findAndCountAll({
        attributes:['id','name'],
        order: [['id', 'decs']],
        limit: 6,
        offset: 0
        })
   let list = data.rows.map(hotStem => {
        let val = hotStem.dataValues
        return val;
   })
    
    return list
}

async function getBanner () {
    let data = await banner.findAndCountAll({
        attributes:['id','link','title'],
        order: [['id', 'decs']],
        limit: 4,
        offset: 0
        })
   let list = data.rows.map(banner => {
        let val = banner.dataValues
        return val;
   })
    
    return list
}

async function getFeatured () {
    let data = await stemimg.findAndCountAll({
        attributes:['link'],
        order: [['id', 'decs']],
        limit: 6,
        offset: 0,
        include: [{
            model: hotstem,
            attributes: ['id', 'name','article']
        }]
        })
    let list = data.rows.map(stemimg => {

        // 到时可能要修改
       let val = stemimg.dataValues;
        val.data   = val.hotStems.dataValues;
        return val;
   })
    
    return list
}

async function getFeaturedAnswer() {

    let data = await answerImage.findAndCountAll({
        attributes:['link'],
        order: [['id', 'decs']],
        limit: 6,
        offset: 0,
        include: [{
            model: answer,
            attributes: ['answer','time','count','question_id']
        }]
        })

    
    let list = data.rows.map(async (answerImage) => {

        // 到时可能要修改
       let val = answerImage.dataValues;
        val.answer   = val.answers.dataValues;

        // 取出answer的question_id
        let question_id = val.answer.question_id;

        val.question  = await question.findOne({
            attributes: ['question','id'],   //返回的数据
            where: {
                id: question_id
            }
        })
    

        return val;
   })
    
    return list;
    
}

module.exports = {
    getHotWord,
    getHotStem,
    getBanner,
    getFeatured,
    getFeaturedAnswer
}