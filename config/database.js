const { Sequelize } = require('sequelize');
const config = require('./config');  // 환경 변수에서 설정 가져오기

const sequelize = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = sequelize;