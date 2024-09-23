const { Sequelize, DataTypes } = require('sequelize'); //은수9/23 11:47

//공유여행 알림 모델
class Alarm extends Sequelize.Model {
  static initiate(sequelize) {
    Alarm.init({
      //식별 아이디
      alarm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,  // 은수 primarykey => primaryKey로 수정
        autoIncrement: true,
      },
      //(여행공유 또는 친구추가를 보낸) 회원 식별 아이디
      user_id: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      //(여행공유 요청 된) 여행일정 식별 아이디
      itinerary_id: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      // 알림 상태 : 0=친구추가 1=여행공유
      status: {
        type: DataTypes.INTEGER,
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

  // 다른 모델(테이블)과 관계 정의 부분
  static associate(db) {
    // 알림 - 회원정보
    db.Alarm.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });

    // 알림 - 여행일정(itinerary)
    db.Alarm.belongsTo(db.Itinerary, { foreignKey: 'itinerary_id', targetKey: 'itinerary_id' });
  }
}

module.exports = Alarm;
