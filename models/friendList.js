const { DataTypes } = require('sequelize');
const sequelize = require('./path_to_your_sequelize_instance'); // Sequelize 인스턴스를 불러옵니다.

const FriendList = sequelize.define('FriendList', {
  friend_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'Users', // Users 테이블과 연결
      key: 'user_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  add_date: {
    type: DataTypes.TIMESTAMP,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'friendList', // 테이블 이름 명시
  timestamps: false // createdAt, updatedAt 컬럼을 생성하지 않음
});

module.exports = FriendList;
