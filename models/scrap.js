const { DataTypes } = require('sequelize');
const sequelize = require('./path_to_your_sequelize_instance'); // Sequelize 인스턴스를 불러옵니다.

const Scrap = sequelize.define('Scrap', {
  scrap_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  scraptype_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  scrapfolder_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'ScrapFolder', // ScrapFolder 테이블과 연결
      key: 'scrapfolder_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'scrap', // 테이블 이름 명시
  timestamps: false // createdAt, updatedAt 컬럼을 생성하지 않음
});

module.exports = Scrap;
