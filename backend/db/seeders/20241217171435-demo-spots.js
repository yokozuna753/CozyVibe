// ! THIS FILE IS DONE

"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "123 main st",
          city: "nashville",
          state: "TN",
          country: "USA",
          lat: 36.1627,
          lng: 86.7816,
          name: "The Mansion",
          description:
            "Set in the heart of wine country, discover Nature's Nook, where nature meets globally inspired, modern design. The compact interior sleeps up to 4 people in layered bunks, lofts and nooks, while the exterior space sprawls, overlooking the fern filled valley below. Built around a living oak tree, enjoy creature comforts such as Heat, AC, + full bathroom, while embracing the peaceful beauty of this high design escape. Come adventure, hike, sip and savor the serenity of Nature's Nook. The space Nature’s Nook is the culmination of the fine work of a number of craftsmen. The overall design was crafted by Susan Scranton. There are so many unique features that set it apart. Below are a few. Hand scribed live edge poplar floors Large deck for outdoor enjoyment whose shape mirrors the treehouse itself Back deck perched high above the fern forest with two custom whiskey barrel Adirondack chairs Main bed is a queen tucked into its own nook with views out the massive window Custom cabinets in kitchen and bath built by the Treehouse Squad A Living roof covered in moss (will be planted this fall in the cooler weather) Built around a massive oak tree that runs through middle of the treehouse Huge glass window overlooking the Fern Forest Concrete site poured countertops Shou Sugi Ban cypress siding- an ancient technique where the wood is charred using a torch. This makes the wood rot and insect resistant. Glass tiled shower with rainfall shower head. Whiskey barrel Adirondack chairs custom made by the Treehouse Squad All rainfall is channeled to the back of the roof and directed at the base of the tree ensuring the tree has plenty of water. Deck boasts a grill and a built in YETI cooler for extra cold storage.  Guest access There are two parking spots right near the entrance to the treehouse. Guest have access to the entire treehouse including the fire pit, front porch, and the 7 acres of grounds, as well as 'work remote' Wifi. There is a Nature Trail just below the Treehouse that is available for guests use. There are 3 other units located on this large property. All of the units are spaced out to maximize privacy for each group. Other things to note This listing is located on an 8 acre property off of a main road and while it is easily accessible to the Dahlonega area you will hear some normal road noise from passing cars.",
          price: 5000000.0,
        },
        {
          ownerId: 2,
          address: "2343 E Raleigh Road",
          city: "Tampa",
          state: "FL",
          country: "USA",
          lat: 78.0936,
          lng: 12.7316,
          name: "The Beach",
          description: "surf, volleyball, fun",
          price: 1000000.0,
        },
        {
          ownerId: 3,
          address: "456 Elmo Ln",
          city: "New York City",
          state: "NY",
          country: "USA",
          lat: 59.4334,
          lng: 90.7342,
          name: "The Town",
          description: "0 car garage, pool",
          price: 400000.0,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        state: { [Op.in]: ["NY", "FL", "TN"] },
      },
      {}
    );
  },
};
