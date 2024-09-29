const Sequelize = require('sequelize');

class ScrapFolder extends Sequelize.Model{
  static initiate(sequelize){
    ScrapFolder.init({
      scrapfolder_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      scrapfolder_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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

  static associate(db){
    db.ScrapFolder.belongsTo(db.User, {foreinKey: 'scrapfolder_id', targetKey:'user_id'});
    db.ScrapFolder.hasMany(db.Scrap, { foreignKey: 'scrapfolder_id', sourceKey: 'scrapfolder_id' });

  }
};


module.exports = ScrapFolder;
