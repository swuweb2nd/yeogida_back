const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // 적절한 경로로 수정
const Itinerary = require('../Itinerary');  // Itinerary 모델 import

class Place extends Model {}

Place.init({
  placelist_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  itinerary_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Itinerary,
      key: 'itinerary_id'
    },
    onDelete: 'CASCADE'
  },
  place_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  visitdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  },
  photo_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  place_id: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Place',
  tableName: 'Places',
  timestamps: false
});

// 관계 설정
Itinerary.hasMany(Place, {
  foreignKey: 'itinerary_id',
  onDelete: 'CASCADE'
});

Place.belongsTo(Itinerary, {
  foreignKey: 'itinerary_id'
});

module.exports = Place;
