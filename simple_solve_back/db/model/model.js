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

const hotword = seq.define('hotWord', {
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

const hotwordimg = seq.define('hotWordimage', {
    link: {
        type: Sequelize.STRING,
        allowNull:false
    },
    hotWord_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})


const hotstem = seq.define('hotStem', {
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

const stemimg = seq.define('hotStemimage', {
    link: {
        type: Sequelize.STRING,
        allowNull:false
    },
    hotStem_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

const technology = seq.define('technology', {
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

const technologyimg = seq.define('technologyimage', {
    link: {
        type: Sequelize.STRING,
        allowNull:false
    },
    technology_id: {
        type: Sequelize.INTEGER,
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


const banner = seq.define('banner', {
    link: {
        type: Sequelize.STRING,
        allowNull:false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    title: {
        type: Sequelize.STRING,
        allowNull:false
    }
})


module.exports = {
    User, question, answer, answerImage, comment, banner, technology, technologyimg,
    hotword,hotwordimg,hotstem,stemimg

}