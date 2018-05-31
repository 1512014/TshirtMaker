'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var products = [
      {
          name: "Gildan Ultra Cotton T-shirt",
          qty: 2,
          imagePath: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          qty: 2,
          imagePath: "/img/templates/template7.jpg",
          price: 20.00,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Gildan Ultra Cotton T-shirt",
          qty: 2,
          imagePath: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          qty: 2,
          imagePath: "/img/templates/template7.jpg",
          price: 20.00,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Gildan Ultra Cotton T-shirt",
          qty: 2,
          imagePath: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          qty: 2,
          imagePath: "/img/templates/template7.jpg",
          price: 20.00,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Gildan Ultra Cotton T-shirt",
          qty: 2,
          imagePath: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          qty: 2,
          imagePath: "/img/templates/template7.jpg",
          price: 20.00,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Gildan Ultra Cotton T-shirt",
          qty: 2,
          imagePath: "/img/templates/template1.jpg",
          price: 20.00,
          discount: 20,
          description: "This is a nice T-shirt",
          review: 4.5
      },
      {
          name: "Next Level Ladies Tri‑Blend Racerback Tank",
          qty: 2,
          imagePath: "/img/templates/template7.jpg",
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
