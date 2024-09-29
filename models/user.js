const Sequelize = require('sequelize');

//회원정보 모델

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
    //식별 아이디
      user_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    //이름
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    //이메일
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    //전화번호
      phonenumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    //생년월일
      birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    //회원 아이디
      id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    //비밀번호
      password: {
        type : Sequelize.STRING,
        allowNull: false,
      },
    //닉네임
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    //프로필사진 (수정은 마이페이지에서 가능, 추후 디폴트값 설정, 이미지경로가 길어질수있기에 100설정)
      userImage: {
        type: Sequelize.STRING,
        allowNull: true,  
      },
    //인증번호
      verificationCode: {
        type: Sequelize.STRING,
        allowNull: true,  
      },
    //인증번호 만료시간
      verificationExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true,  
      },
    }, {
      sequelize,
      timestamps: true, // createdAt, updatedAt 필드를 자동 생성
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
    //db.User.hasMany(db.FriendList, { foreignKey: 'friend_id', sourceKey: 'user_id' });

    db.User.hasMany(db.FriendList, { foreignKey: 'from_user_id', sourceKey: 'user_id' });
    db.User.hasMany(db.FriendList, { foreignKey: 'to_user_id', sourceKey: 'user_id' });
  
    //회원정보 - 알림
    db.User.hasMany(db.Alarm, { foreignKey: 'alarm_id', sourceKey: 'user_id' });

    //회원정보 - 댓글
    db.User.hasMany(db.Comment, { foreignKey: 'comment_id', sourceKey: 'user_id' });

    }

};

module.exports = User;