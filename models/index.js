const Sequelize = require('sequelize');  //sequelize 모듈 불러오기
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];



//db 객체 생성
const db = {};
const sequelize = new Sequelize(
    //원래는 일일이 데이터베이스 정보를 적어주어야 하지만, config에 정보를 저장해주었기 때문에 이렇게 작성 가능.
    config.database,
    config.username, 
    config.password, 
    config
);


// 모델 정의
db.User = require('./user');
db.Itinerary = require('./Itinerary');
db.Place = require('./Place');
db.Alarm = require('./alarm');  
db.FriendList = require('./friendList');
db.ScrapFolder = require('./scrapfolder');
db.Scrap = require('./scrap');
db.Sharer = require('./sharer');
db.Comment = require('./comment');  


// 모델 초기화
db.User.initiate(sequelize);
db.Itinerary.initiate(sequelize);
db.Place.initiate(sequelize);
db.Alarm.initiate(sequelize);
db.FriendList.initiate(sequelize);
db.ScrapFolder.initiate(sequelize);
db.Scrap.initiate(sequelize);
db.Sharer.initiate(sequelize);
db.Comment.initiate(sequelize); 

/*
db.Itinerary.associate(db);
db.Sharer.associate(db);
db.Place.associate(db);
db.Scrap.associate(db);
db.ScrapFolder.associate(db);
db.FriendList.associate(db);
db.User.associate(db);
*/

// 관계 설정은 모든 모델을 초기화한 후에 해야 합니다.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);  // 관계 설정
  }
});

db.sequelize = sequelize;


module.exports = db;
