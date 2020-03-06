let { User, question, answer, answerImage, img, hotWord, comment } = require('./model');

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
img.belongsTo(hotWord, {
    foreignKey:'hotWord_id'
})

hotWord.hasMany(img, {
    foreignKey:'hotWord_id'
})

// 导出数据表
module.exports = {User, question, answer, answerImage, img, hotWord, comment};