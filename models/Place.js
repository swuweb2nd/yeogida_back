const Sequelize = require('sequelize');

class Place extends Sequelize.Model {
    static initiate(sequelize) {
        Place.init({
            placelist_id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            itinerary_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Itineraries',
                    key: 'itinerary_id'
                },
                onDelete: 'CASCADE'
            },
            place_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            visitdate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            contents: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            latitude: {
                type: Sequelize.DECIMAL(10, 8),
                allowNull: true
            },
            longitude: {
                type: Sequelize.DECIMAL(11, 8),
                allowNull: true
            },
            photo_url: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            address: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            place_id: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            
        }, {
            sequelize,
            modelName: 'Place',
            tableName: 'Places',
            ttimestamps: true, // Sequelize의 기본 타임스탬프 필드 사용
            underscored: true, // createdAt과 updatedAt을 snake_case로 변환

        });
    }

    static associate(db) {
        db.Place.belongsTo(db.Itinerary, { foreignKey: 'itinerary_id', onDelete: 'CASCADE' });
        db.Itinerary.hasMany(db.Place, { foreignKey: 'itinerary_id', onDelete: 'CASCADE' });
    }
}

module.exports = Place;
