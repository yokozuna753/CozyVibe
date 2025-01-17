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
            "Set in the heart of wine country, discover Nature's Nook, where nature meets globally inspired, modern design. The compact interior sleeps up to 4 people in layered bunks, lofts and nooks, while the exterior space sprawls, overlooking the fern filled valley below. Built around a living oak tree, enjoy creature comforts such as Heat, AC, + full bathroom, while embracing the peaceful beauty of this high design escape. Come adventure, hike, sip and savor the serenity of Nature's Nook. The space Nature’s Nook is the culmination of the fine work of a number of craftsmen. The overall design was crafted by Susan Scranton. There are so many unique features that set it apart. Below are a few. Hand scribed live edge poplar floors Large deck for outdoor enjoyment whose shape mirrors the treehouse itself Back deck perched high above the fern forest with two custom whiskey barrel Adirondack chairs Main bed is a queen tucked into its own nook with views out the massive window Custom cabinets in kitchen and bath built by the Treehouse Squad A Living roof covered in moss (will be planted this fall in the cooler weather) Built around a massive oak tree that runs through middle of the treehouse Huge glass window overlooking the Fern Forest Concrete site poured countertops Shou Sugi Ban cypress siding- an ancient technique where the wood is charred using a torch. This makes the wood rot and insect resistant. Glass tiled shower with rainfall shower head. Whiskey barrel Adirondack chairs custom made by the Treehouse Squad All rainfall is channeled to the back of the roof and directed at the base of the tree ensuring the tree has plenty of water. Deck boasts a grill and a built in YETI cooler for extra cold storage.  Guest access There are two parking spots right near the entrance to the treehouse. Guest have access to the entire treehouse including the fire pit, front porch, and the 7 acres of grounds, as well as 'work remote' Wifi. There is a Nature Trail just below the Treehouse that is available for guests use. There are 3 other units located on this large property. All of the units are spaced out to maximize privacy for each group. Other things to note This listing is located on an 8 acre property off of a main road and while it is easily accessible to the Dahlonega area you will hear some normal road noise from passing cars.",
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
