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
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank.",
          review: 4.5

      },
      {
          name: "Anvil Jersey T-shirt",
          types_id: "[2, 3]",
          qty: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/templates/template2.jpg",
          price: 15,
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
          name: "Gildan Ultra Cotton Long Sleeve T-shirt",
          types_id: "[2, 3]",
          qty: 2,
          minSize: 2,
          maxSize: 3,
          imagePath1: "/img/templates/template3.jpg",
          price: 12.00,
          discount: 5,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.",
          review: 4.5
      },
      {
          name: "Dyenomite 100% Cotton Rainbow Tie-Dye T-shirt",
          types_id: "[1, 2, 3]",
          qty: 2,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/templates/template4.jpg",
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
          imagePath1: "/img/templates/template9.jpg",
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
        name: "Anvil Jersey Tank",
        types_id: "[1]",
        qty: 2,
        minSize: 1,
        maxSize: 6,
        imagePath1: "/img/templates/template10.jpg",
        price: 20.00,
        discount: 20,
        description: "This tank offers either a trendy contrast ringer or a traditional solid option. Super soft fabrication will keep your group on‑trend and comfortable all season long!",
        review: 4.5

    },
    {
        name: "Bella Ladies Flowy Racerback Tankk",
        types_id: "[2, 3]",
        qty: 2,
        minSize: 2,
        maxSize: 5,
        imagePath1: "/img/templates/template11.jpg",
        imagePath2: "/img/templates/template12.jpg",
        imagePath3: "/img/templates/template13.jpg",
        price: 20.00,
        discount: 20,
        description: "Bring on the luxurious flowy fabric and a fashion‑forward silhouette in this trendy tank! Perfect for yoga studios, college groups or just a girls night out!",
        review: 4.5
    },
    {
        name: "Next Level Tri‑Blend Baseball Raglan",
        types_id: "[1, 2, 3]",
        qty: 2,
        minSize: 2,
        maxSize: 5,
        imagePath1: "/img/templates/template14.jpg",
        price: 20.00,
        discount: 20,
        description: "This premium raglan was made for comfort and style. With seventeen trendy color combinations, there is a perfect match for every group!",
        review: 4.5
    },
    {
        name: "Next Level Ladies Tri‑Blend Racerback Tank",
        types_id: "[2, 3]",
        qty: 2,
        minSize: 1,
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
        price: 19.99,
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
        price: 19.99,
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
