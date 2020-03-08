let {   User, question, answer, answerImage, comment, banner, technology, technologyimg,
    hotword,hotwordimg,hotstem,stemimg } = require('./model');

// 问题和回答之间的外键
answer.belongsTo(question, {
    foreignKey:'question_id'
})

question.hasMany(answer, {
    foreignKey:'question_id'
})

// 评论和回答之间的外键
comment.belongsTo(answer, {
    foreignKey:'answer_id'
})

answer.hasMany(comment, {
    foreignKey:'answer_id'
})

// 回答图片和回答之间的关系
answerImage.belongsTo(answer, {
    foreignKey:'answer_id'
})

answer.hasMany(answerImage, {
    foreignKey:'answer_id'
})

// 热词图片和热词之间的关系
hotwordimg.belongsTo(hotword, {
    foreignKey:'hotWord_id'
})

hotword.hasMany(hotwordimg, {
    foreignKey:'hotWord_id'
})

// 热梗图片和热梗之间的关系
stemimg.belongsTo(hotstem, {
    foreignKey:'hotStem_id'
})

hotstem.hasMany(stemimg, {
    foreignKey:'hotStem_id'
})

// 科技图片和科技词之间的关系
technologyimg.belongsTo(technology, {
    foreignKey:'technology_id'
})

technology.hasMany(technologyimg, {
    foreignKey:'technology_id'
})



// 导出数据表
module.exports = {  User, question, answer, answerImage, comment, banner, technology, technologyimg,
    hotword,hotwordimg,hotstem,stemimg};