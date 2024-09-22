const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

// 모델 정의
db.Itinerary = require('./Itinerary');
db.Sharer = require('./Sharer');
db.Place = require('./Place');
//db.User = require('./User');  // 필요한 모델 추가
//db.FriendList = require('./FriendList');  // 필요한 모델 추가

// 모델 초기화
db.Itinerary.initiate(sequelize);
db.Sharer.initiate(sequelize);
db.Place.initiate(sequelize);
//db.User.initiate(sequelize);
//db.FriendList.initiate(sequelize);

// 관계 설정은 모든 모델을 초기화한 후에 해야 합니다.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);  // 관계 설정
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
