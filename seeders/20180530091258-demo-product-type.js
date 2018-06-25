'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var productTypes = [
        {
            id: "1",
            name: "Short Sleeve",
			gender: "male",
			templateFront: "/img/templates/male/short_sleeve_front.png",
			templateBack: "/img/templates/male/short_sleeve_back.png",
			basicPrice: 15
        },
		{
            name: "Short Sleeve",
			gender: "female",
			templateFront: "/img/templates/female/short_sleeve_front.png",
			templateBack: "/img/templates/female/short_sleeve_back.png",
			basicPrice: 15
        },
		{
            name: "Long Sleeve",
			gender: "male",
			templateFront: "/img/templates/male/long_sleeve_front.png",
			templateBack: "/img/templates/male/long_sleeve_back.png",
			basicPrice: 20
        },
		{
            name: "Long Sleeve",
			gender: "female",
			templateFront: "/img/templates/female/long_sleeve_front.png",
			templateBack: "/img/templates/female/long_sleeve_back.png",
			basicPrice: 20
        },
		{
            name: "Tank Tops & Sleeveless",
			gender: "male",
			templateFront: "/img/templates/male/tank_tops_front.png",
			templateBack: "/img/templates/male/tank_tops_back.png",
			basicPrice: 10
        },
		{
            name: "Tank Tops & Sleeveless",
			gender: "female",
			templateFront: "/img/templates/female/tank_tops_front.png",
			templateBack: "/img/templates/female/tank_tops_back.png",
			basicPrice: 10
        },
		{
            name: "Hoodies",
			gender: "male",
			templateFront: "/img/templates/male/hoodies_front.png",
			templateBack: "/img/templates/male/hoodies_back.png",
			basicPrice: 25
        },
		{
            name: "Hoodies",
			gender: "female",
			templateFront: "/img/templates/female/hoodies_front.png",
			templateBack: "/img/templates/female/hoodies_back.png",
			basicPrice: 25
        }
    ];
    return queryInterface.bulkInsert('Product_types', productTypes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product_types', null, {});
  }
};
