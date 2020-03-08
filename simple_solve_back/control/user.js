
const { User } = require('../db/model/index')

async function getUser() {
  const name =  await User.findOne({
        attributes: ['id','userName','nickName'] 
  })
    console.log(name);
    return name;
}


module.exports = { getUser };