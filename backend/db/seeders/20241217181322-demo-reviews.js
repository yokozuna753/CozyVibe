// ! THIS FILE IS DONE

"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          review:
            "Here is a pretty forgiving review!",
          stars: 1,
        },
        {
          spotId: 2,
          userId: 1,
          review:
            "this is the most wonderful property in the world. It would be an absolute dream to live here, and the fact that i get to vacation here is unimaginable. 10/10",
          stars: 2,
        },
        {
          spotId: 1,
          userId: 3,
          review:
            "this is the most wonderful property in the world. It would be an absolute dream to live here, and the fact that i get to vacation here is unimaginable. 10/10",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 3,
          review:
            "this should be the most RECENT REVIEW!!!",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 2,
          review:
            "this is the most wonderful property in the world. It would be an absolute dream to live here, and the fact that i get to vacation here is unimaginable. 10/10",
          stars: 1,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
