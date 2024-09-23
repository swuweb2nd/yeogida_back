const Sequelize = require('sequelize');

class Scrap extends Sequelize.Model {
  static initiate(sequelize) {
    Scrap.init({
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
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Scrap',
      tableName: 'scrap',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // 여기에 다른 모델과의 관계를 설정할 수 있습니다.
    db.Scrap.belongsTo(db.ScrapFolder, { foreignKey: 'scrapfolder_id', targetKey: 'scrapfolder_id' });
  }
}

module.exports = Scrap;
