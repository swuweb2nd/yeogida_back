const Sequelize = require('sequelize');

class Itinerary extends Sequelize.Model {
    static initiate(sequelize) {
        Itinerary.init({
            itinerary_id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            startdate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            enddate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            destination: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            public_private: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            thumbnail: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            likenumber: {
                type: Sequelize.BIGINT,
                defaultValue: 0
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                onUpdate: Sequelize.NOW
            }
        }, {
            sequelize,
            modelName: 'Itinerary',
            tableName: 'Itineraries',
            timestamps: false
        });
    }

    static associate(db) {
        db.Itinerary.hasMany(db.Place, { foreignKey: 'itinerary_id', onDelete: 'CASCADE' });
        db.Itinerary.hasMany(db.Sharer, { foreignKey: 'itinerary_id', onDelete: 'CASCADE' });
    }
}

module.exports = Itinerary;
