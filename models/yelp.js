'use strict';
module.exports = function(sequelize, DataTypes) {
  var Yelp = sequelize.define(
    'yelp',
    {
      alias: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      yelp_id: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      review_count: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      rating: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      latitude: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );
  return Yelp;
};
