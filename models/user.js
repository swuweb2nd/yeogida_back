const Sequelize = require('sequelize');

// 회원정보 모델
class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      // 식별 아이디
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // 이름
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      // 이메일
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,  // 이메일은 보통 고유 값으로 설정
      },
      // 전화번호
      phonenumber: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      // 생년월일
      birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      // 회원 아이디
      id: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true,  // 회원 아이디도 고유 값으로 설정
      },
      // 비밀번호
      password: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      // 닉네임
      nickname: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      // 프로필 사진
      userImage: {
        type: Sequelize.STRING(255),  // 사진 URL의 경우 길이가 더 길 수 있으므로
        allowNull: true,
      },
      // 인증번호
      verificationCode: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      // 인증번호 만료시간
      verificationExpiresAt: {
        type: Sequelize.DATE,  // sequelize.timestamps가 아닌 DATE 타입 사용
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

  // 다른 모델(테이블)과 관계 정의 부분(1:N)
  static associate(db) {
    // 회원정보 - 여행일정
    db.User.hasMany(db.Itinerary, { foreignKey: 'user_id', sourceKey: 'user_id' });

    // 회원정보 - 스크랩폴더
    db.User.hasMany(db.ScrapFolder, { foreignKey: 'user_id', sourceKey: 'user_id' });

    // 회원정보 - 친구목록
    db.User.hasMany(db.FriendList, { foreignKey: 'user_id', sourceKey: 'user_id' });

    // 회원정보 - 알림
    db.User.hasMany(db.Alarm, { foreignKey: 'user_id', sourceKey: 'user_id' });

    // 회원정보 - 댓글
    db.User.hasMany(db.Comment, { foreignKey: 'user_id', sourceKey: 'user_id' });
  }
}

module.exports = User;
