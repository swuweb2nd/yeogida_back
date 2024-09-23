const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 모델 불러오기
db.Itinerary = require('./Itinerary');
db.Sharer = require('./Sharer');
db.Place = require('./Place');
db.FriendList = require('./friendList');
db.ScrapFolder = require('./scrapfolder');
db.Scrap = require('./scrap');
db.User = require('./user');  
db.Comment = require('./comment');
db.Alarm = require('./alarm')

// 모델 초기화
Object.keys(db).forEach(modelName => {
  if (db[modelName].initiate) {
    db[modelName].initiate(sequelize);
  }
});

// 모델 초기화 후 연관 관계 설정
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sequelize 인스턴스를 db 객체에 추가
db.sequelize = sequelize;

module.exports = db;
