'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    var products = [
      {
          name: "Gildan Ultra Cotton T-shirt",
          types_id: "[1, 2, 3]",
          qty: 2,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          types_id: "[2, 3]",
          qty: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/templates/template7.jpg",
          imagePath2: "/img/templates/template8.jpg",
          price: 20.00,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Gildan Ultra Cotton T-shirt",
          types_id: "[1, 2, 3]",
          qty: 2,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          types_id: "[2, 3]",
          qty: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/templates/template7.jpg",
          imagePath2: "/img/templates/template8.jpg",
          price: 20.00,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Gildan Ultra Cotton T-shirt",
          types_id: "[1, 2, 3]",
          qty: 2,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          types_id: "[2, 3]",
          qty: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/templates/template7.jpg",
          imagePath2: "/img/templates/template8.jpg",
          price: 20.00,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Gildan Ultra Cotton T-shirt",
          types_id: "[1, 2, 3]",
          qty: 2,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          types_id: "[2, 3]",
          qty: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/templates/template7.jpg",
          imagePath2: "/img/templates/template8.jpg",
          price: 20.00,
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