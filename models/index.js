const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

const Sharer = require('./Sharer');
const Itinerary = require('./Itinerary');
const Place = require('./Place');
// 모델 간의 관계 설정
Itinerary.hasMany(Place, { foreignKey: 'itinerary_id', onDelete: 'CASCADE' });
Place.belongsTo(Itinerary, { foreignKey: 'itinerary_id' });

Itinerary.hasMany(Sharer, { foreignKey: 'itinerary_id', onDelete: 'CASCADE' });
Sharer.belongsTo(Itinerary, { foreignKey: 'itinerary_id' });

// 모델들을 내보내기
const db = {
    Sequelize,
    sequelize,
    Itinerary,
    Place,
    Sharer
};


module.exports = db;
