'use strict';
module.exports = function(sequelize, DataTypes) {
  const Reviews = sequelize.define('reviews', {
    uuid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    published: {
      type: DataTypes.TEXT,
      allownull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    crawled: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Reviews;
};
