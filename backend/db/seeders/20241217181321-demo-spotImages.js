// ! THIS FILE IS DONE

"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuc2lvbnxlbnwwfHwwfHx8MA%3D%3D",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVybiUyMG1hbnNpb258ZW58MHx8MHx8fDA%3D",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://plus.unsplash.com/premium_photo-1661872770044-5b5155c69ea5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.pinimg.com/736x/68/f8/ef/68f8ef9e27f6c8929f0f3d6f0857ff11.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://media.istockphoto.com/id/154952872/photo/contemporary-island-villa.jpg?s=612x612&w=0&k=20&c=s_hHCWCofvWaar-NjSTPbCDFtUkEB6AFGCY4U9Xz2RQ=",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/4/20/0/HUHH2022_Amazing%20Kitchens_Greenwich-CT-Estate-06.jpg.rend.hgtvcom.616.411.85.suffix/1650498253351.webp",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://intdesigners.com/wp-content/uploads/2024/03/luxurious-living-room.webp",
          preview: false,
        },
        
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: { [Op.in]: ["google.com"] },
      },
      {}
    );
  },
};
