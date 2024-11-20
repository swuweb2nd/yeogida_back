const Sequelize = require('sequelize');

//회원가입 > 이메일 인증단계에서 임시데이터 저장 용도

class UnverifiedUser extends Sequelize.Model {
  static initiate(sequelize) {
    UnverifiedUser.init({
    //식별 아이디
      uvUser_id: {
        type : Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    //사용자 이메일
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // 이메일을 고유 속성으로 설정
      },
    //사용자 이름
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    //인증번호
    verificationCode: {
        type: Sequelize.STRING,
        allowNull: false,  
      },
    //인증번호 만료시간
      verificationExpiresAt: {
        type: Sequelize.DATE,
        allowNull: false,  
      },

    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'UnverifiedUser',
      tableName: 'unverifiedUsers',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }



};

module.exports = UnverifiedUser;