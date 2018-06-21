'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    var products = [
        {
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 1,
          qty: 2,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/templates/template1.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank.",
          review: 4.5

        },
        {
          name: "Anvil Jersey T-shirt",
          typeId: 2,
          qty: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/templates/template2.jpg",
          price: 15,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
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
