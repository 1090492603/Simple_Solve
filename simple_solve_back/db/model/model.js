const seq = require('../seq');

const Sequelize = require("Sequelize");

const User = seq.define('user', {
    // id 会自动创建 ,并 设为主键 , 自增
    userName: {
        type: Sequelize.STRING , // varchar(255)
        allowNull : false
    },
    password: {
        type: Sequelize.STRING,
        allowNull : false
    },
    nickName: {
        type: Sequelize.STRING,
        comment:'昵称'
    },
    avator: {
        type: Sequelize.STRING,
        comment:'头像'
    }

    // 自动创建  createdAt 和 updatedAt 
});


const question = seq.define('question', {
    question: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    time: {
        type: Sequelize.DATE,
        allowNull:false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:"问题的浏览数"
    }
})

const answer = seq.define('answer', {
    answer: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    time: {
        type: Sequelize.DATE,
        allowNull:false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:"答案的浏览数"
    },
    like: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:"点赞数"
    },
    question_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    }

})


const comment = seq.define('comment', {
    comment: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    time: {
        type: Sequelize.DATE,
        allowNull:false
    },
    answer_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    time: {
        type: Sequelize.DATE,
        allowNull:false
    }
})

const hotWord = seq.define('hotWord', {
    article: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    type: {
        type: Sequelize.STRING,
        allowNull:false
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

const img = seq.define('image', {
    link: {
        type: Sequelize.STRING,
        allowNull:false
    },
    hotWord_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    type: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

const answerImage = seq.define('answerImage', {
    link: {
        type: Sequelize.STRING,
        allowNull:false
    },
    answer_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})


module.exports = {User,question,answer,answerImage,img,hotWord,comment}