const Sequelize = require('sequelize');

class FriendList extends Sequelize.Model {
  static initiate(sequelize) {
    FriendList.init({
      friend_id: {  
        type: Sequelize.BIGINT,
        autoIncrement: true, 
        primaryKey: true,      
        allowNull: false
      },
      from_user_id: {  
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'user_id'
        },
        onUpdate: 'CASCADE',  
        onDelete: 'CASCADE'  
      },
      to_user_id: {  
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'user_id'
        },
        onUpdate: 'CASCADE',  
        onDelete: 'CASCADE'   
      },
      request_date: {  
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      friend_date: { 
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      status: {  
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,  // Sequelize instance
      timestamps: false,  // Do not use createdAt and updatedAt fields
      underscored: false,  // Use camelCase
      modelName: 'FriendList',  // Set model name
      tableName: 'friendList',  // Set table name
      paranoid: false,  // Do not keep deleted data
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    // Relationship with the user who sent the friend request
    db.FriendList.belongsTo(db.User, { foreignKey: 'from_user_id', targetKey: 'user_id' });

    // Relationship with the user who received the friend request
    db.FriendList.belongsTo(db.User, { foreignKey: 'to_user_id', targetKey: 'user_id' });
  }
}

module.exports = FriendList;
