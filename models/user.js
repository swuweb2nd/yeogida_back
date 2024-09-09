const sequelize = require('sequelize');

//회원정보 모델

class User extends sequelize.Model {
  static initiate(sequelize) {
    User.init({
    //식별 아이디
      user_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    
    //이름 
      name: {
        type: sequelize.STRING(40),
        allowNull: false,
      },
    //이메일
      email: {
        type: sequelize.STRING(40),
        allowNull: false,
      },
    //전화번호
      phonenumber: {
        type: sequelize.STRING(40),
        allowNull: false,
      },
    //생년월일
      birth: {
        type: sequelize.DATE,
        allowNull: true,
      },
    //회원 아이디
      id: {
        type: sequelize.STRING(16),
        allowNull: false,
      },
    //비밀번호
      password: {
        type : sequelize.STRING(40),
        allowNull: false,
      },
    //비밀번호 재확인 
      passwordCheck: {
        type : sequelize.STRING(40),
        allowNull: false,
      },
    //닉네임
      nickname: {
        type: sequelize.STRING(40),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  //다른 모델(테이블)과 관계 정의 부분(1:N)
  static associate(db) {
    //회원정보 - 여행일정
    db.User.hasMany(db.Itinerary, { foreignKey: 'iternary_id', sourceKey: 'user_id' });

    //회원정보 - 스크랩폴더 
    db.User.hasMany(db.Scrap, { foreignKey: 'scrapfolder_id', sourceKey: 'user_id' });

    //회원정보 - 친구목록
    db.User.hasMany(db.FriendList, { foreignKey: 'friend_id', sourceKey: 'user_id' });

    //회원정보 - 알림
    db.User.hasMany(db.Alarm, { foreignKey: 'alarm_id', sourceKey: 'user_id' });

    //회원정보 - 댓글
    db.User.hasMany(db.Comment, { foreignKey: 'comment_id', sourceKey: 'user_id' });

    }

};

module.exports = User;