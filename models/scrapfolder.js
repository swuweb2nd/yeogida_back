const Sequelize = require('sequelize');

class ScrapFolder extends Sequelize.Model{
  static initiate(sequelize){
    ScrapFolder.init({
      scrapfolder_id: {
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
      scrapfolder_name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      addDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'ScrapFolder',
      tableName: 'scrapfolder',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db){}
};


module.exports = ScrapFolder;
