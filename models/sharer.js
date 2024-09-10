const Sequelize = require('sequelize');

class Sharer extends Sequelize.Model {
    static initiate(sequelize) {
        Sharer.init({
            share_friend_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            itinerary_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Itinerary',
                    key: 'itinerary_id',
                },
            },
            friend_id2: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'FriendList',
                    key: 'friend_id',
                },
            },
            role: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'user_id',
                },
            },
        }, {
            sequelize,
            modelName: 'Sharer',
            tableName: 'sharer',
            timestamps: false,
        });
    }

    static associate(db) {
        db.Sharer.belongsTo(db.User, { foreignKey: 'user_id' });
        db.Sharer.belongsTo(db.FriendList, { foreignKey: 'friend_id2' });
        db.Sharer.belongsTo(db.Itinerary, { foreignKey: 'itinerary_id' });
    }
}

module.exports = Sharer;