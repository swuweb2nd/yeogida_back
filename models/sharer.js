const Sequelize = require('sequelize');

class Sharer extends Sequelize.Model {
    static initiate(sequelize) {
        Sharer.init({
            share_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            itinerary_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Itinerary',
                    key: 'itinerary_id',
                },
            },
            sharer_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'user_id',
                },
            },
            friend_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'user_id',
                },
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false, // 0=대기중, 1=수락됨, 2=거절됨
            },
            shared_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            modelName: 'Sharer',
            tableName: 'sharer',
            timestamps: false,
        });
    }

    static associate(db) {
        db.Sharer.belongsTo(db.Users, { foreignKey: 'sharer_id' });
        db.Sharer.belongsTo(db.Users, { foreignKey: 'friend_id' });
        db.Sharer.belongsTo(db.Itinerary, { foreignKey: 'itinerary_id' });
    }
}

module.exports = Sharer;
