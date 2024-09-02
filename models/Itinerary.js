const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Itinerary extends Model {}

Itinerary.init({
  itinerary_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  startdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  enddate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  public_private: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  thumbnail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  likenumber: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  description: {
    type: DataTypes.STRING(255),
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
  modelName: 'Itinerary',
  tableName: 'Itineraries',
  timestamps: false
});

module.exports = Itinerary;
