const Sequelize = require('sequelize');

class FriendList extends Sequelize.Model {
  static initiate(sequelize) {
    FriendList.init({
      friend_id: {  // 고유 식별자 (Primary Key)
        type: DataTypes.BIGINT,
        autoIncrement: true,   // 자동 증가
        primaryKey: true,      // Primary Key 설정
        allowNull: false
      },
      user_id: {  // 친구 요청을 보낸 사용자 ID (외래 키)
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'Users', // Users 테이블을 참조
          key: 'user_id'
        },
        onUpdate: 'CASCADE',  // Users 테이블이 업데이트될 때 연쇄적으로 업데이트
        onDelete: 'CASCADE'   // Users 테이블에서 삭제될 때 연쇄적으로 삭제
      },
      friend_user_id: {  // 친구 요청을 받은 사용자 ID (외래 키)
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'Users', // Users 테이블을 참조
          key: 'user_id'
        },
        onUpdate: 'CASCADE',  // Users 테이블이 업데이트될 때 연쇄적으로 업데이트
        onDelete: 'CASCADE'   // Users 테이블에서 삭제될 때 연쇄적으로 삭제
      },
      add_date: {  // 친구 요청이 발생한 날짜
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      status: {  // 친구 상태 (0: 친구, 1: 요청받음, 2: 요청보냄, 3: 거절)
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,  // sequelize 인스턴스
      timestamps: false,  // createdAt, updatedAt 필드를 사용하지 않음
      underscored: false,  // camelCase 사용
      modelName: 'FriendList',  // 모델 이름 설정
      tableName: 'friendList',  // 테이블 이름 설정
      paranoid: false,  // 삭제된 데이터 유지 안 함
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    // 다른 모델과의 관계를 정의하는 부분 (필요 시 추가)
    db.FriendList.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    db.FriendList.belongsTo(db.User, { foreignKey: 'friend_user_id', targetKey: 'user_id' });
  }
}

module.exports = FriendList;
