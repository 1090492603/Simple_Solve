const seq = require('./seq');

require('./model/index');

require('./model/index')

seq.authenticate().then(() => {
    console.log('连接成功')
}).catch(() => {
    console.log('连接出错')
})

console.log('连接');

seq.sync().then(() => {
    console.log('数据同步成功')
})