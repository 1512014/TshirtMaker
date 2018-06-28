'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    var products = [
        {
			id: 1,
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 1,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template1.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."
        },
		{
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 1,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template1.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."

        },
		{
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 1,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template1.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."

        },
		{
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 1,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template1.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."

        },
        {
          name: "Anvil Jersey T-shirt",
          typeId: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/products/template2.jpg",
          price: 15,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank."
        }
    ];

    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
