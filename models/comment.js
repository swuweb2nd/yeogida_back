const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init({
            comment_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id',
                },
            },
            itinerary_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Itineraries',
                    key: 'itinerary_id',
                },
            },
            comment_contents: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Comment',
            tableName: 'comment',
            timestamps: false,
        });
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'user_id' });
        db.Comment.belongsTo(db.Itinerary, { foreignKey: 'itinerary_id' });
    }
}

module.exports = Comment;
