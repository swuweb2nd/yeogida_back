const sequelize = require('sequelize');

//공유여행 알림 모델

class Alarm extends sequelize.Model {
  static initiate(sequelize) {
    User.init({
    //(공유 요청을 보낸) 회원 식별 아이디 
      name: {
        type: sequelize.STRING(40),
        allowNull: false,
      },
    //(공유 요청 된) 여행일정 식별 아이디
      email: {
        type: sequelize.STRING(40),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Alarm',
      tableName: 'alarms',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  //다른 모델(테이블)과 관계 정의 부분
  static associate(db) {
    // 여행공유알림 - 회원정보
    db.User.hasMany(db.여행일정모델명, { foreignKey: '타모델의 외래키', sourceKey: 'alarm_id' });

   // 여행공유알림 - 여행일정(itinerary)
   db.User.hasMany(db.여행일정모델명, { foreignKey: '타모델의 외래키', sourceKey: 'alarm_id' });

    }

};

module.exports = Alarm;