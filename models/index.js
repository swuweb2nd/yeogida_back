const Sequelize = require('sequelize');  //sequelize 모듈 불러오기
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const ScrapFolder = require('./scrapfolder');
const Scrap = require('./scrap');
const FriendList = require('./friendList');
const Sharer = require('./sharer');
const User = require('./user');

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
db.Itinerary = require('./Itinerary');
db.Place = require('./Place');

db.User = require('./user');
db.Alarm = require('./alarm');  
//db.FriendList = require('./FriendList');  // 필요한 모델 추가

// 모델 초기화
db.Itinerary.initiate(sequelize);
db.Place.initiate(sequelize);

db.User.initiate(sequelize);
db.Alarm.initiate(sequelize);
//db.FriendList.initiate(sequelize);



// 관계 설정은 모든 모델을 초기화한 후에 해야 합니다.
/*Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);  // 관계 설정
  }
});*/

db.sequelize = sequelize;
//db라는 객체에 ScrapFolder, Scrap, FriendList 담아두기
db.ScrapFolder = ScrapFolder;
db.Scrap = Scrap;
db.FriendList = FriendList;
db.User = User;
db.Sharer = Sharer;

Scrap.initiate(sequelize);
ScrapFolder.initiate(sequelize);
FriendList.initiate(sequelize);
User.initiate(sequelize);
Sharer.initiate(sequelize);

db.Itinerary.associate(db);
db.Sharer.associate(db);
db.Place.associate(db);

Scrap.associate(db);
ScrapFolder.associate(db);
FriendList.associate(db);
User.associate(db);
Sharer.associate(db);


module.exports = db;
