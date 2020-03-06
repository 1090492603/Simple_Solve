const ENV = process.env.NODE_ENV    // 配置环境变量


module.exports = {
    isDev: ENV === 'dev',
    isProd:ENV === 'production' 
}
