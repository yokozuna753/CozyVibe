"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
        hooks: true
      });

      Review.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });

      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  Review.init(
    {
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        validate: {
          len: [1, 5],
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
