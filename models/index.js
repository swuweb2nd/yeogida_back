const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Itinerary = require('./Itinerary');
const Place = require('./Place');

// 모델 간의 관계 설정
Itinerary.hasMany(Place, { foreignKey: 'itinerary_id', onDelete: 'CASCADE' });
Place.belongsTo(Itinerary, { foreignKey: 'itinerary_id' });

// 모델들을 내보내기
const db = {
    Sequelize,
    sequelize,
    Itinerary,
    Place
};

module.exports = db;
